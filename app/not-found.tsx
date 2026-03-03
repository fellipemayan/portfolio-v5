'use client';
import projects from './constants/projects.json';
import { ProjectCard } from './components/ProjectList/ProjectList';
import { motion } from 'motion/react';
import { containerVariants, itemVariants } from './constants/motionVariants';
import Link from 'next/link';

const randomIndex = Math.floor(Math.random() * projects.length);
const project = projects[randomIndex];

export default function NotFound() {
  return (
    <motion.section
      className="not-found"
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
    >
      <motion.span variants={itemVariants} className="four-o-four" aria-hidden>
        404
      </motion.span>
      <motion.h1 variants={itemVariants}>Página não encontrada :/</motion.h1>
      <motion.p variants={itemVariants}>
        Mas tudo bem, eu pensei nessa possibilidade.
      </motion.p>
      <motion.div variants={itemVariants} className="backup-link">
        <Link className="btn four-o-four-link" href="/">
          Voltar para a Home
        </Link>
      </motion.div>

      <motion.div variants={itemVariants} className="backup-link">
        <Link className="btn four-o-four-link" href="/contato">
          Entrar em contato
        </Link>
      </motion.div>
      <motion.h2 variants={itemVariants} className="or-text">
        Ou confira um projeto aleatório:
      </motion.h2>
      <motion.ul variants={itemVariants} className="single-project-list">
        <ProjectCard project={project} style="grid" />
      </motion.ul>
    </motion.section>
  );
}
