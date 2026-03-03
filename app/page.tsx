"use client"
import './home.css'
import contactInfo from './constants/contatInfo.json'
import { HeroProjectList } from './components/ProjectList/ProjectList'
import Link from 'next/link'
import { containerVariants, itemVariants } from './constants/motionVariants';
import { motion } from 'motion/react'

export default function Home() {
  return (
    <>
      <motion.section id="hero"
        variants={containerVariants} initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      >
        <motion.h1 variants={itemVariants}>Designer full-stack com foco em produtos digitais, Arquitetura da Informação, Interface e Interação</motion.h1>
        <motion.p className="" variants={itemVariants}>Quixadá&ndash;CE, Brasil.</motion.p>
        <motion.ul variants={itemVariants} className="horizontal">
          {contactInfo.map((contact) => (
            <li key={contact.name}>
              <a href={contact.url} target="_blank" rel="noopener noreferrer" className='external-link'>
                {contact.name}
              </a>
            </li>
          ))}
        </motion.ul>
        <motion.button className="btn primary-btn" variants={itemVariants}>Entre em contato</motion.button>
        <motion.button className="btn secondary-btn" variants={itemVariants}>Currículo</motion.button>
      </motion.section>

      <motion.section
        className="content-grid full-width"
        id="projects"
        variants={containerVariants} initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      >
        <HeroProjectList style="grid" />
      </motion.section>

      <motion.section
        className="full-width"
        id="cta"
        variants={containerVariants} initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      >
        <motion.h2 variants={itemVariants}>Entre em contato</motion.h2>
        <motion.p variants={itemVariants}>Estou sempre aberto a discutir novos projetos, ideias criativas ou oportunidades de colaboração. Sinta-se à vontade para me enviar uma mensagem!</motion.p >
        <motion.ul variants={itemVariants}>
          <motion.li variants={itemVariants}>
            <Link href="/contato" className="btn primary-btn">Enviar mensagem</Link>
          </motion.li>
          <motion.li variants={itemVariants}>
            <Link href="/projetos" className="btn secondary-btn">Ver projetos</Link>
          </motion.li>
        </motion.ul>
      </motion.section>
    </>
  )
}
