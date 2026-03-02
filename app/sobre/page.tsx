"use client"
import './page.css'
import resumeData from '../constants/resume.json'
import Link from 'next/link'
import { motion } from 'motion/react';
import { containerVariants, itemVariants } from '../constants/motionVariants';

export default function AboutPage() {
  const currentEndeavors: string[] = [
    "Lendo Memórias de um Sargento de Milícia",
    "Estudando React e acessibilidade visual e em código",
    "Escrevendo artivos para o IHC",
    "Jogando Hades 2"
  ];
  return (
    <>
      <motion.section
        variants={containerVariants} initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      >
        <motion.h1 variants={itemVariants}>Designer, artista, pesquisador e programador nas horas vagas.</motion.h1>
        <motion.p variants={itemVariants}>Pondero profundamente a integração entre pessoas, sistemas e empresas. Atualmente estudando como alinhar meus conhecimentos em programação para melhor documentar processos e projetar sistemas.</motion.p>
        <motion.p variants={itemVariants}>Disponível para oportunidades de freelancing e trabalho remoto. Se você tem uma ideia que quer transformar em realidade, manda uma mensagem!</motion.p>
        <motion.p variants={itemVariants}>Além de design e programação, estou:</motion.p>
        <motion.ul className="endeavors-list" variants={itemVariants}>
          {currentEndeavors.map((endeavor, index) => (
            <motion.li key={index} variants={itemVariants}>{endeavor}</motion.li>
          ))}
        </motion.ul>
      </motion.section>

      <motion.section
        variants={containerVariants} initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      >
        <motion.h2 variants={itemVariants}>Experiência</motion.h2>
        <motion.ul className="resume-list" variants={itemVariants}>
          {resumeData.experiences.map((experience, index) => (
            <motion.li key={index} variants={itemVariants}>
              <motion.h3 variants={itemVariants}>{experience.title}</motion.h3>
              <div className='info'>
                <div className="metadata">
                  <motion.p variants={itemVariants}>{experience.company}</motion.p>
                  <motion.p variants={itemVariants}>{experience.location}</motion.p>
                  <motion.p variants={itemVariants}>{experience.startYear} - {experience.isPresent ? "Presente" : experience.endYear}</motion.p>
                </div>
                <motion.p className="description" variants={itemVariants}>{experience.description}</motion.p>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </motion.section>

      <motion.section
        variants={containerVariants} initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      >
        <motion.h2 variants={itemVariants}>Educação</motion.h2>
        <motion.ul className="resume-list" variants={itemVariants}>
          {resumeData.education.map((education, index) => (
            <motion.li key={index} variants={itemVariants}>
              <motion.h3 variants={itemVariants}>{education.title}</motion.h3>
              <div className='info'>
                <div className="metadata">
                  <p>{education.institution}</p>
                  <p>{education.startYear} - {education.isPresent ? "Presente" : education.endYear}</p>
                </div>
                <motion.p className="description" variants={itemVariants}>{education.description}</motion.p>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </motion.section>

      <motion.section
        variants={containerVariants} initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      >
        <motion.h2 variants={itemVariants}>Pesquisa</motion.h2>
        <motion.ul className="resume-list" variants={itemVariants}>
          {resumeData.research.map((research, index) => (
            <motion.li key={index} variants={itemVariants}>
              <motion.h3 variants={itemVariants}>{research.title}</motion.h3>
              <div className='info'>
                <div className="metadata">
                  <p className="first-item">{research.event}</p>
                  <p>{research.location}</p>
                  <p>{research.publishingYear}</p>
                </div>
                <motion.p className="description" variants={itemVariants}>{research.description}</motion.p>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </motion.section>

      {resumeData.clients && resumeData.clients.length > 0 && (
        <motion.section
          id='client-section'
          className='full-width'
          variants={containerVariants} initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}>
          <motion.h2 variants={itemVariants}  >Clientes</motion.h2>
          <motion.ul variants={itemVariants}>
            {resumeData.clients.map((client, index) => (
              <motion.li key={index} variants={itemVariants}>{client.name}</motion.li>
            ))}
          </motion.ul>
        </motion.section>
      )}

      <motion.section
        className="full-width"
        id="cta"
        variants={containerVariants} initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}>
        <motion.h2 variants={itemVariants}>Entre em contato</motion.h2>
        <motion.p variants={itemVariants}>Estou sempre aberto a discutir novos projetos, ideias criativas ou oportunidades de colaboração. Sinta-se à vontade para me enviar uma mensagem!</motion.p>
        <motion.ul variants={itemVariants}>
          <motion.li variants={itemVariants}>
            <Link href="/contato" className="cta primary-cta">Enviar mensagem</Link>
          </motion.li>
          <motion.li variants={itemVariants}>
            <Link href="/projetos" className="cta secondary-cta">Ver mais projetos</Link>
          </motion.li>
        </motion.ul>
      </motion.section>
    </>
  );
}