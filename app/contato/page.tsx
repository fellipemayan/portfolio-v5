'use client';
import { animate } from 'motion';
import './page.css';
import { useForm, ValidationError } from '@formspree/react';
import { motion, AnimatePresence, useMotionValue } from 'motion/react';
import { containerVariants, itemVariants } from '../constants/motionVariants';
import { useState, useRef, useEffect } from 'react';
import validator from 'validator';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export default function ContactPage() {
  const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID;
  const [state, handleSubmit, resetFormspree] = useForm(formspreeId || '');

  const [emailError, setEmailError] = useState('');
  const [status, setStatus] = useState<FormStatus>('idle');
  const [shake, setShake] = useState(false);
  const [isPulverizing, setIsPulverizing] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);
  const pulverizeScale = useMotionValue(0);

  const triggerError = () => {
    setStatus('error');
    setShake(true);
    setTimeout(() => setShake(false), 500);
    setTimeout(() => setStatus('idle'), 3000);
  };

  useEffect(() => {
    let timerFakeLoading: NodeJS.Timeout;
    let timerSuccessRead: NodeJS.Timeout;
    let timerReset: NodeJS.Timeout;
    if (state.succeeded) {
      timerFakeLoading = setTimeout(() => {
        setStatus('success');
      }, 800);

      timerSuccessRead = setTimeout(() => {
        setIsPulverizing(true);
        animate(pulverizeScale, 20, { duration: 0.6, ease: 'easeOut' });
      }, 1800); 

      timerReset = setTimeout(() => {
        formRef.current?.reset();
        setStatus('idle');
        setIsPulverizing(false);
        pulverizeScale.set(0);
        resetFormspree();
      }, 2600);
    } else if (state.errors) {
      setTimeout(() => triggerError(), 0);
    }

    return () => {
      clearTimeout(timerFakeLoading);
      clearTimeout(timerSuccessRead);
      clearTimeout(timerReset);
    };
  }, [state.succeeded, state.errors, pulverizeScale, resetFormspree]);

  function customSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const email =
      (form.elements.namedItem('email') as HTMLInputElement)?.value || '';

    if (!validator.isEmail(email)) {
      setEmailError('Digite um e-mail válido!');
      triggerError();
      return;
    }

    setEmailError('');
    setStatus('loading');
    handleSubmit(e);
  }

  function handleInvalid() {
    triggerError();
  }

  const shakeVariants = {
    idle: { x: 0 },
    shake: {
      x: [0, -8, 8, -8, 8, -4, 4, 0],
      transition: { duration: 0.4 },
    },
  };

  const textVariants = {
    initial: { opacity: 0, scale: 0.8, filter: 'blur(4px)' },
    animate: {
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      transition: { duration: 0.3 },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      filter: 'blur(4px)',
      transition: { duration: 0.2 },
    },
  };

  const getButtonContent = () => {
    switch (status) {
      case 'loading':
        return 'Enviando...';
      case 'success':
        return 'Enviado!';
      case 'error':
        return 'Verifique os campos';
      default:
        return 'Enviar mensagem';
    }
  };

  const copyEmailToClipboard = () => {
    navigator.clipboard
      .writeText('fmayan999@gmail.com')
      .then(() => alert('E-mail copiado para a área de transferência!'));
  };

  return (
    <>
      <motion.section
        id="hero"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      >
        <motion.h1 variants={itemVariants}>
          Toda boa ideia começa com uma boa história
        </motion.h1>
        <motion.p className="" variants={itemVariants}>
          O contato pode ser feito via{' '}
          <button onClick={copyEmailToClipboard} className="copy">
            e-mail
          </button>
          ,{' '}
          <a
            href="https://www.linkedin.com/in/fellipemayan/"
            target="_blank"
            rel="noopener noreferrer"
            className="linkedin external-link"
          >
            LinkedIn
          </a>{' '}
          ou através do formulário abaixo. Sinta-se à vontade para compartilhar
          tantos detalhes quanto desejar; o objetivo é entender como posso somar
          ao seu desafio.
        </motion.p>
      </motion.section>

      <motion.section
        className="full-width"
        id="form-section"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      >
        <motion.form
          className={`contact-form ${isPulverizing ? 'pulverizing' : ''}`}
          onSubmit={customSubmit}
          ref={formRef}
          onInvalidCapture={handleInvalid}
          variants={itemVariants}
        >
          <svg
            style={{
              position: 'absolute',
              width: 0,
              height: 0,
              pointerEvents: 'none',
            }}
          >
            <filter
              id="dust-filter"
              x="-20%"
              y="-20%"
              width="140%"
              height="140%"
            >
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.85"
                numOctaves="3"
                result="noise"
              />
              <motion.feDisplacementMap
                in="SourceGraphic"
                in2="noise"
                scale={pulverizeScale}
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
          </svg>
          <label htmlFor="name">Como você se chama?</label>
          <div className="input-wrapper">
            <input id="name" type="text" name="name" required />
          </div>
          <ValidationError
            prefix="Nome"
            field="name"
            errors={state.errors}
            className="validation-error"
          />

          <label htmlFor="email">E-mail para contato</label>
          <div className="input-wrapper">
            <input id="email" type="email" name="email" required />
          </div>
          {emailError && (
            <span style={{ color: 'red', fontSize: '0.9em' }}>
              {emailError}
            </span>
          )}
          <ValidationError
            prefix="Email"
            field="email"
            errors={state.errors}
            className="validation-error"
          />

          <label htmlFor="subject">Assunto</label>
          <div className="input-wrapper">
            <input
              type="text"
              id="subject"
              name="subject"
              placeholder="O que você tem em mente?"
              required
            />
          </div>

          <label htmlFor="message">Mensagem</label>
          <div className="input-wrapper">
            <textarea
              id="message"
              name="message"
              placeholder="Descreva brevemente o projeto ou a ideia que gostaria de discutir..."
              required
            />
          </div>
          <ValidationError
            prefix="Mensagem"
            field="message"
            errors={state.errors}
            className="validation-error"
          />

          <motion.button
            type="submit"
            className={`btn submit-btn ${status}`}
            disabled={status === 'loading' || status === 'success'}
            variants={shakeVariants}
            animate={shake ? 'shake' : 'idle'}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={status}
                variants={textVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                style={{ display: 'inline-block' }}
              >
                {getButtonContent()}
              </motion.span>
            </AnimatePresence>
          </motion.button>
        </motion.form>
      </motion.section>
    </>
  );
}
