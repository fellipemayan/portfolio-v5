"use client"
import './page.css';
import { useForm, ValidationError } from '@formspree/react';
import { useState, useRef } from 'react';
import validator from 'validator';

export default function ContactPage() {
  const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID;
  const [state, handleSubmit] = useForm(formspreeId || "");

  const [emailError, setEmailError] = useState("");
  const formRef = useRef(null);

  function customSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (form.elements.namedItem('email') as HTMLInputElement)?.value || "";
    if (!validator.isEmail(email)) {
      setEmailError("Digite um e-mail válido!");
      return;
    }
    setEmailError("");
    handleSubmit(e);
    
    setTimeout(() => {
      form.reset();
    }, 100);
  }

  return (
    <>
      <section id="hero">
        <h1>Toda boa ideia começa com uma boa história. Se você tem um projeto ou simplesmente quer dizer <span id="cursor-oi">oi</span>, este é o lugar certo :)</h1>
        <p className="">Entre em contato via e-mail, LinkedIn ou pelo formulário abaixo. Dê tantos detalhes quanto sua imaginação permitir – vamos conversar!</p>
      </section>
      
      <section className='full-width' id="form-section">
        <form className="contact-form" onSubmit={customSubmit} ref={formRef}>
          <label htmlFor="name">Nome</label>
          <input id="name" type="text" name="name" required />
          <ValidationError prefix="Nome" field="name" errors={state.errors} className="validation-error" />

          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            type="email"
            name="email"
            required
          />
          {emailError && (
            <span style={{ color: 'red', fontSize: '0.9em' }}>{emailError}</span>
          )}
          <ValidationError prefix="Email" field="email" errors={state.errors} className="validation-error" />

          <label htmlFor="subject">Assunto</label>
          <input type="text" id="subject" name="subject" placeholder="O que você tem em mente?" required />

          <label htmlFor="message">Mensagem</label>
          <textarea id="message" name="message" placeholder="Sua mensagem aqui..." required />
          <ValidationError prefix="Mensagem" field="message" errors={state.errors} className="validation-error" />

          <button type="submit" className="btn submit-btn" disabled={state.submitting}>Enviar</button>
        </form>
      </section>
    </>
  )
}