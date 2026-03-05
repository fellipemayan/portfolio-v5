'use client';
import { motion } from 'motion/react';
import { containerVariants, itemVariants } from '../constants/motionVariants';
import Link from 'next/link';

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
              <motion.div variants={itemVariants} className="item-header">
                <h3>{experience.title?.pt || experience.title}</h3>
                <p className="metadata-duration">
                  {experience.startYear} -{' '}
                  {experience.isPresent ? 'Presente' : experience.endYear}
                </p>
              </motion.div>
              <motion.div className="info" variants={itemVariants}>
                <div className="metadata">
                  <p>{experience.company?.pt || experience.company}</p>
                  <p>{experience.type?.pt || experience.type}</p>
                  <p>{experience.location?.pt || experience.location}</p>
                </div>
                <p className="description">
                  {experience.description?.pt || experience.description}
                </p>
              </motion.div>
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
              <motion.div variants={itemVariants} className="item-header">
                <h3>{edu.title?.pt || edu.title}</h3>
                <p className="metadata-duration">
                  {edu.startYear} - {edu.isPresent ? 'Presente' : edu.endYear}
                </p>
              </motion.div>
              <div className="info">
                <div className="metadata">
                  <p>{edu.institution?.pt || edu.institution}</p>
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
              <motion.div className="info" variants={itemVariants}>
                <div className="metadata">
                  <p className="first-item">{item.event?.pt || item.event}</p>
                  <p>{item.location?.pt || item.location}</p>
                  <p>{item.publishingYear}</p>
                </div>
                <p className="description">
                  {item.description?.pt || item.description}
                </p>
              </motion.div>
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
