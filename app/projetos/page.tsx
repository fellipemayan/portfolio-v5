'use client';
import './page.css';
import Link from 'next/link';
import { ProjectsProjectList } from '../components/ProjectList/ProjectList';
import { motion } from 'motion/react';
import { containerVariants, itemVariants } from '../constants/motionVariants';

export default function ProjectsPage() {
  return (
    <>
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      >
        <motion.h1 variants={itemVariants}>
          Projetos e Casos de Estudo
        </motion.h1>
        <motion.p variants={itemVariants}>
          Uma seleção de projetos profissionais, acadêmicos e pessoais que
          desenvolvi ao longo do tempo, em que participei ou encabecei.
        </motion.p>
      </motion.section>

      <motion.section
        className="content-grid full-width"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      >
        <ProjectsProjectList />
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
          Em busca de design que conversa com código?
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
        </motion.ul>
      </motion.section>
    </>
  );
}
