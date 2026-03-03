'use client';
import './page.css';
import resumeData from '../constants/resume.json';
import Link from 'next/link';
import { motion } from 'motion/react';
import { containerVariants, itemVariants } from '../constants/motionVariants';

export default function AboutPage() {
  const currentEndeavors: string[] = [
    'Aprofundando em React e padrões de acessibilidade (visual e código)',
    'Escrevendo artigos sobre IHC e Comunicabilidade',
    'Lendo Memórias de um Sargento de Milícia',
    'Explorando o submundo em Hades 2',
  ];
  return (
    <>
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      >
        <motion.h1 variants={itemVariants}>
          Designer, desenvolvedor, pesquisador e artista nas horas vagas
        </motion.h1>
        <motion.p variants={itemVariants}>
          Há pouco mais de <span data-cursor-text="!">6 anos</span> atuando com
          design, pondero profundamente a integração entre pessoas, sistemas e
          empresas. Atualmente, foco em alinhar conhecimentos de programação
          para documentar processos e projetar sistemas de informação que
          sobrevivam ao tempo e à escala.
        </motion.p>
        <motion.p variants={itemVariants}>
          Além de design e programação, estou:
        </motion.p>
        <motion.ul className="endeavors-list" variants={itemVariants}>
          {currentEndeavors.map((endeavor, index) => (
            <motion.li key={index} variants={itemVariants}>
              {endeavor}
            </motion.li>
          ))}
        </motion.ul>
      </motion.section>

      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      >
        <motion.h2 variants={itemVariants}>Experiência</motion.h2>
        <motion.ul className="resume-list" variants={itemVariants}>
          {resumeData.experiences.map((experience, index) => (
            <motion.li key={index} variants={itemVariants}>
              <motion.h3 variants={itemVariants}>{experience.title}</motion.h3>
              <div className="info">
                <div className="metadata">
                  <motion.p variants={itemVariants}>
                    {experience.company}
                  </motion.p>
                  <motion.p variants={itemVariants}>
                    {experience.location}
                  </motion.p>
                  <motion.p variants={itemVariants}>
                    {experience.startYear} -{' '}
                    {experience.isPresent ? 'Presente' : experience.endYear}
                  </motion.p>
                </div>
                <motion.p className="description" variants={itemVariants}>
                  {experience.description}
                </motion.p>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </motion.section>

      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      >
        <motion.h2 variants={itemVariants}>Educação</motion.h2>
        <motion.ul
          className="resume-list"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '0px 0px -10% 0px' }}
        >
          {resumeData.education.map((education, index) => (
            <motion.li key={index} variants={itemVariants}>
              <h3>{education.title}</h3>
              <div className="info">
                <div className="metadata">
                  <p>{education.institution}</p>
                  <p>
                    {education.startYear} -{' '}
                    {education.isPresent ? 'Presente' : education.endYear}
                  </p>
                </div>
                <p className="description">{education.description}</p>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </motion.section>

      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      >
        <motion.h2 variants={itemVariants}>Pesquisa</motion.h2>
        <motion.ul className="resume-list" variants={itemVariants}>
          {resumeData.research.map((research, index) => (
            <motion.li key={index} variants={itemVariants}>
              <motion.h3 variants={itemVariants}>{research.title}</motion.h3>
              <div className="info">
                <div className="metadata">
                  <p className="first-item">{research.event}</p>
                  <p>{research.location}</p>
                  <p>{research.publishingYear}</p>
                </div>
                <motion.p className="description" variants={itemVariants}>
                  {research.description}
                </motion.p>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </motion.section>

      {resumeData.clients && resumeData.clients.length > 0 && (
        <motion.section
          id="client-section"
          className="full-width"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '0px 0px -10% 0px' }}
        >
          <motion.h2 variants={itemVariants}>Clientes</motion.h2>
          <motion.ul variants={itemVariants}>
            {resumeData.clients.map((client, index) => (
              <motion.li key={index} variants={itemVariants}>
                {client.name}
              </motion.li>
            ))}
          </motion.ul>
        </motion.section>
      )}

      <motion.section
        className="full-width"
        id="cta"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      >
        <motion.h2 variants={itemVariants}>
          Vamos tirar o projeto do papel?
        </motion.h2>
        <motion.p variants={itemVariants}>
          Disponibilidade para consultoria e atuação em projetos de design de
          produto, auditoria de acessibilidade ou desenvolvimento front-end.
        </motion.p>
        <motion.ul variants={itemVariants}>
          <motion.li variants={itemVariants}>
            <Link href="/contato" className="cta primary-cta">
              Enviar mensagem
            </Link>
          </motion.li>
          <motion.li variants={itemVariants}>
            <Link href="/projetos" className="cta secondary-cta">
              Ver mais projetos
            </Link>
          </motion.li>
        </motion.ul>
      </motion.section>
    </>
  );
}
