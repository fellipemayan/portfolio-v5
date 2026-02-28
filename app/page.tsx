import Link from 'next/link'
import contactInfo from './constants/contatInfo.json'
import './home.css'
import { HeroProjectList } from './components/ProjectList/ProjectList'
export default function Home() {
  return (
    <>
      <section id="hero">
        <h1>Designer full-stack com foco em produtos digitais, Arquitetura da Informação, Interface e Interação</h1>
        <p className="">Quixadá&ndash;CE, Brasil.</p>
        <ul>
          {contactInfo.map((contact) => (
            <li key={contact.name}>
              <a href={contact.url} target="_blank" rel="noopener noreferrer">
                {contact.name}
              </a>
            </li>
          ))}
        </ul>
        <button className="btn primary-btn">Entre em contato</button>
        <button className="btn secondary-btn">Currículo</button>
      </section>

      <section className="content-grid full-width" id="projects">
        <HeroProjectList style="grid" />
      </section>

      <section className="full-width" id="cta">
        <h2>Entre em contato</h2>
        <p>Estou sempre aberto a discutir novos projetos, ideias criativas ou oportunidades de colaboração. Sinta-se à vontade para me enviar uma mensagem!</p>
        <ul>
          <li>
            <Link href="/contato" className="cta primary-cta">Enviar mensagem</Link>
          </li>
          <li>
            <Link href="/projetos" className="cta secondary-cta">Ver projetos</Link>
          </li>
        </ul>
      </section>
    </>
  )
}
