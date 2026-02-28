import './page.css'
import resumeData from '../constants/resume.json'
import Link from 'next/link'

export default function AboutPage() {
  const currentEndeavors:string[] = [
    "Lendo Memórias de um Sargento de Milícia",
    "Estudando React e acessibilidade visual e em código",
    "Escrevendo artivos para o IHC",
    "Jogando Hades 2"
  ]
  return (
    <>
      <section>
        <h1>Designer, artista, pesquisador e programador nas horas vagas.</h1>
        <p>Pondero profundamente a integração entre pessoas, sistemas e empresas. Atualmente estudando como alinhar meus conhecimentos em programação para melhor documentar processos e projetar sistemas.</p>
        <p>Disponível para oportunidades de freelancing e trabalho remoto. Se você tem uma ideia que quer transformar em realidade, manda uma mensagem!</p>
        <p>Além de design e programação, estou:</p>
        <ul className="endeavors-list">
          {currentEndeavors.map((endeavor, index) => (
            <li key={index}>{endeavor}</li>
          ))}
        </ul>   
      </section>

      <section>
        <h2>Experiência</h2>
        <ul className="resume-list">
          {resumeData.experiences.map((experience, index) => (
            <li key={index}>
              <h3>{experience.title}</h3>
              <div className='info'>
                <div className="metadata">
                <p>{experience.company}</p>
                <p>{experience.location}</p>
                <p>{experience.startYear} - {experience.isPresent ? "Presente" : experience.endYear}</p>
                </div>
                <p className="description">{experience.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Educação</h2>
        <ul className="resume-list">
          {resumeData.education.map((education, index) => (
            <li key={index}>
              <h3>{education.title}</h3>
              <div className='info'>
                <div className="metadata">
                  <p>{education.institution} </p>
                  <p>{education.startYear} - {education.isPresent ? "Presente" : education.endYear}</p>
                </div>
                <p className="description">{education.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Pesquisa</h2>
        <ul className="resume-list">
          {resumeData.research.map((research, index) => (
            <li key={index}>
              <h3>{research.title}</h3>
              <div className='info'>
                <div className="metadata">
                <p className="first-item">{research.event}</p>
                <p>{research.location}</p>
                <p>{research.publishingYear}</p>
                </div>
                <p className="description">{research.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className='full-width' id="client-section">
        <h2>Clientes</h2>
        <ul>
          {resumeData.clients.map((client, index) => (
            <li key={index}>
              {client.name}
            </li>
          ))}
        </ul>
      </section>

      <section className="full-width" id="cta">
        <h2>Entre em contato</h2>
        <p>Estou sempre aberto a discutir novos projetos, ideias criativas ou oportunidades de colaboração. Sinta-se à vontade para me enviar uma mensagem!</p>
        <ul>
          <li>
            <Link href="/contato" className="cta primary-cta">Enviar mensagem</Link>
          </li>
          <li>
            <Link href="/projetos" className="cta secondary-cta">Ver mais projetos</Link>
          </li>
        </ul>
      </section>
    </>
  )
}