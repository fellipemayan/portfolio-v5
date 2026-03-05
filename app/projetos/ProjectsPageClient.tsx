'use client';
import Link from 'next/link';
import { motion } from 'motion/react';
import { containerVariants, itemVariants } from '../constants/motionVariants';
import ProjectsProjectListClient from '../components/ProjectList/ProjectsProjectListClient';
import { useState, useMemo } from 'react';
import './projects-page.css';
import { QueueListIcon, Squares2X2Icon } from '@heroicons/react/20/solid';

import { ProjectCardData } from '../types/types';

export default function ProjectsPageClient({
  projects,
}: {
  projects: ProjectCardData[];
}) {
  const [selectedTag, setSelectedTag] = useState<string>('');
  const [view, setView] = useState<'grid' | 'list'>('grid');

  // Extrai todas as tags únicas dos projetos
  const allTags = useMemo(() => {
    const tags = projects.flatMap((p) => p.tags || []);
    // Remove qualquer variação de 'Todos' (case-insensitive, espaços)
    return Array.from(
      new Set(
        tags.filter(
          (t) =>
            typeof t === 'string' &&
            t.trim().toLowerCase().replace(/\s+/g, '') !== 'todos'
        )
      )
    );
  }, [projects]);

  // Filtra projetos pela tag selecionada
  const filteredProjects = useMemo(() => {
    // Se selectedTag for string vazia, retorna todos
    if (!selectedTag) return projects;
    return projects.filter((p) => (p.tags || []).includes(selectedTag));
  }, [projects, selectedTag]);

  return (
    <>
      <motion.div
        className="breakout projects-controls-row"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      >
        <motion.div
          className="projects-filters"
          variants={itemVariants}
          initial="hidden"
          whileInView="show"
        >
          <motion.button
            className={!selectedTag ? 'active' : ''}
            onClick={() => setSelectedTag('')}
            variants={itemVariants}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.96 }}
          >
            Todos
          </motion.button>
          {allTags.map((tag) => (
            <motion.button
              key={tag}
              className={selectedTag === tag ? 'active' : ''}
              onClick={() => setSelectedTag(tag)}
              variants={itemVariants}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.96 }}
            >
              {tag}
            </motion.button>
          ))}
        </motion.div>
        <motion.div className="projects-view-toggle" variants={itemVariants}>
          <motion.button
            className={view === 'grid' ? 'active' : ''}
            onClick={() => setView('grid')}
            aria-label="Visualização em grade"
            variants={itemVariants}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.96 }}
          >
            <Squares2X2Icon className="icon-md" />
          </motion.button>
          <motion.button
            className={view === 'list' ? 'active' : ''}
            onClick={() => setView('list')}
            aria-label="Visualização em lista"
            variants={itemVariants}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.96 }}
          >
            <QueueListIcon className="icon-md" />
          </motion.button>
        </motion.div>
      </motion.div>

      <motion.section
        className="content-grid full-width"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      >
        <ProjectsProjectListClient
          projects={filteredProjects}
          style={view}
          key={selectedTag + '-' + view}
        />
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
