'use client';

import '../home.css';
import Link from 'next/link';
import { motion } from 'motion/react';
import { containerVariants, itemVariants } from '../constants/motionVariants';
import HeroProjectListClient from '../components/ProjectList/HeroProjectListClient';

interface HomeHeroClientProps {
  projects: any[];
  resumeUrl?: string;
  socialLinks?: { name: string; url: string; order: number; isVisible: boolean }[];
  scrollToManifesto?: () => void;
}

export default function HomeHeroClient({
  projects,
  resumeUrl,
  scrollToManifesto,
}: HomeHeroClientProps) {
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
          Designer{' '}
          <em
            className="highlight"
            data-cursor-text="Mais em breve :)"
            onClick={scrollToManifesto}
          >
            fullstack
          </em>{' '}
          que{' '}
          <span data-cursor-icon="idea" data-cursor-icon-pos="only">
            planeja
          </span>
          ,{' '}
          <span data-cursor-icon="pencil" data-cursor-icon-pos="only">
            projeta
          </span>
          ,{' '}
          <span data-cursor-icon="code" data-cursor-icon-pos="only">
            desenvolve
          </span>{' '}
          e{' '}
          <span data-cursor-icon="search" data-cursor-icon-pos="only">
            refina
          </span>{' '}
          produtos digitais
        </motion.h1>
        <motion.ul variants={itemVariants} className="areas horizontal">
          <li>Arquitetura da Informação</li>
          <li>UX/UI</li>
          <li>Gráfico & Editorial</li>
          <li>Front-end</li>
        </motion.ul>
        
        <motion.div
          variants={itemVariants}
          style={{
            display: 'inline-block',
            marginRight: '12px',
            marginTop: '16px',
          }}
        >
          <Link href="/contato" className="btn primary-btn">
            Entre em contato
          </Link>
        </motion.div>
        <motion.div
          variants={itemVariants}
          style={{ display: 'inline-block', marginTop: '16px' }}
        >
          {resumeUrl && (
            <a
              href={resumeUrl}
              className="btn secondary-btn"
              target="_blank"
              rel="noopener noreferrer"
            >
              Currículo
            </a>
          )}
        </motion.div>
      </motion.section>

      <motion.section
        className="content-grid full-width"
        id="projects"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      >
        <HeroProjectListClient projects={projects} style="grid" />
      </motion.section>

      <motion.section
        className="full-width"
        id="cta"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      >
        <motion.h2 variants={itemVariants}>
          Sua busca por um designer fullstack termina aqui
        </motion.h2>
        <motion.p variants={itemVariants}>
          Estou sempre aberto a discutir novos projetos, ideias criativas ou
          oportunidades de colaboração. Sinta-se à vontade para me enviar uma
          mensagem!
        </motion.p>
        <motion.ul variants={itemVariants}>
          <motion.li variants={itemVariants}>
            <Link href="/contato" className="cta primary-cta">
              Entrar em contato
            </Link>
          </motion.li>
          <motion.li variants={itemVariants}>
            <Link href="/projetos" className="cta secondary-cta">
              Ver projetos
            </Link>
          </motion.li>
        </motion.ul>
      </motion.section>
    </>
  );
}
