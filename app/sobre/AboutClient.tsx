'use client';
import { motion } from 'motion/react';
import { containerVariants, itemVariants } from '../constants/motionVariants';

export default function AboutClient({
  experiences,
  education,
  research,
  clients,
}: any) {
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
          {experiences.map((experience: any, index: number) => (
            <motion.li key={index} variants={itemVariants}>
              <motion.h3 variants={itemVariants}>
                {experience.title?.pt || experience.title}
              </motion.h3>
              <div className="info">
                <div className="metadata">
                  <motion.p variants={itemVariants}>
                    {experience.company?.pt || experience.company}
                  </motion.p>
                  <motion.p variants={itemVariants}>
                    {experience.location?.pt || experience.location}
                  </motion.p>
                  <motion.p variants={itemVariants}>
                    {experience.startYear} -{' '}
                    {experience.isPresent ? 'Presente' : experience.endYear}
                  </motion.p>
                </div>
                <motion.p className="description" variants={itemVariants}>
                  {experience.description?.pt || experience.description}
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
          {education.map((edu: any, index: number) => (
            <motion.li key={index} variants={itemVariants}>
              <h3>{edu.title?.pt || edu.title}</h3>
              <div className="info">
                <div className="metadata">
                  <p>{edu.institution?.pt || edu.institution}</p>
                  <p>
                    {edu.startYear} - {edu.isPresent ? 'Presente' : edu.endYear}
                  </p>
                </div>
                <p className="description">
                  {edu.description?.pt || edu.description}
                </p>
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
          {research.map((item: any, index: number) => (
            <motion.li key={index} variants={itemVariants}>
              <motion.h3 variants={itemVariants}>
                {item.title?.pt || item.title}
              </motion.h3>
              <div className="info">
                <div className="metadata">
                  <p className="first-item">{item.event?.pt || item.event}</p>
                  <p>{item.location?.pt || item.location}</p>
                  <p>{item.publishingYear}</p>
                </div>
                <motion.p className="description" variants={itemVariants}>
                  {item.description?.pt || item.description}
                </motion.p>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </motion.section>

      {clients && clients.length > 0 && (
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
            {clients.map((client: any, index: number) => (
              <motion.li key={index} variants={itemVariants}>
                {client.name}
              </motion.li>
            ))}
          </motion.ul>
        </motion.section>
      )}
    </>
  );
}
