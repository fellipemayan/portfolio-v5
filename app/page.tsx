import contactInfo from './constants/contatInfo.json'
import './home.css'
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
      </section>
    </>
  )
}
