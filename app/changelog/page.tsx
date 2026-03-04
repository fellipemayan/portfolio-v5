'use client';
import Link from 'next/link';
import './page.css';
import { motion } from 'motion/react';
import {
  containerVariants,
  itemVariants,
} from '@/app/constants/motionVariants';

export default function ChangelogPage() {
  return (
    <>
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      >
        <motion.h1 variants={itemVariants}>Changelog</motion.h1>
        <motion.p variants={itemVariants}>
          Veja abaixo o histórico de mudanças do portfólio.
        </motion.p>
      </motion.section>
      <motion.section
        variants={containerVariants}
        className=" changelog-page"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      >
        <motion.h2 variants={itemVariants}>
          v1.0.0 <span style={{ fontWeight: 400 }}>(03/03/2026)</span>
        </motion.h2>
        <motion.ul variants={itemVariants}>
          <motion.li variants={itemVariants}>
            Estrutura inicial do projeto com Next.js
          </motion.li>
          <motion.li variants={itemVariants}>Layout base e navegação</motion.li>
          <motion.li variants={itemVariants}>
            Páginas: inicial, sobre, contato e projetos
          </motion.li>
          <motion.li variants={itemVariants}>
            Componentes principais: Header, Footer, CustomCursor, ProjectList,
            ProjectHeader, MotionWrapper, ContentRenderer, ContentSummary,
            Colophon
          </motion.li>
          <motion.li variants={itemVariants}>
            Listagem e detalhamento de projetos
          </motion.li>
          <motion.li variants={itemVariants}>
            Estilização global e temas
          </motion.li>
          <motion.li variants={itemVariants}>
            Hooks customizados (ex: useWeather)
          </motion.li>
          <motion.li variants={itemVariants}>
            Configuração de arquivos estáticos e exemplos de projetos
          </motion.li>
        </motion.ul>
        <motion.p variants={itemVariants} data-cursor-text=":)">
          Para voltar, acesse o <Link href="/">início</Link> ou o{' '}
          <Link href="/sobre">sobre</Link>.
        </motion.p>
      </motion.section>
    </>
  );
}
