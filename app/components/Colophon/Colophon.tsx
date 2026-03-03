'use client';
import './Colophon.css';
import { motion } from 'motion/react';
import {
  containerVariants,
  itemVariants,
} from '@/app/constants/motionVariants';

export function Colophon() {
  return (
    <motion.section
      id="colophon"
      className="full-width"
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
    >
      <motion.p variants={itemVariants}>
        Este portfólio foi criado usando <strong>Next.js</strong>,{' '}
        <strong>React</strong> e <strong>CSS</strong>.
      </motion.p>
      <motion.p variants={itemVariants}>
        Os ícones usados são da biblioteca{' '}
        <a
          href="https://heroicons.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="external-link"
        >
          Heroicons
        </a>
        . As animações são foram com{' '}
        <a
          href="https://motion.dev/"
          target="_blank"
          rel="noopener noreferrer"
          className="external-link"
        >
          Motion.dev
        </a>
        . O código-fonte está disponível no{' '}
        <a
          href="https://github.com/yourusername/portfolio-v5"
          target="_blank"
          rel="noopener noreferrer"
          className="external-link"
        >
          GitHub
        </a>
        .
      </motion.p>
      <motion.p variants={itemVariants}>
        Os tipos utilizados nesse projeto foram Geist e Trispace.
      </motion.p>

      <hr />

      <motion.p variants={itemVariants}>
        v1.0.0 <a href="">[Ver changelog]</a>.{' '}
        <span data-cursor-text=":)">:)</span>
      </motion.p>
    </motion.section>
  );
}
