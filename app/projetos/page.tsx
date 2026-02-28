import './page.css';
import Link from "next/link";
import { ProjectsProjectList } from "../components/ProjectList/ProjectList";

export default function ProjectsPage() {
  return (
    <>
      <section>
        <h1>Projetos</h1>
        <p>Aqui estão alguns projetos profissionais, acadêmicos e pessoais que desenvolvi ao longo do tempo.</p>
      </section>

      <ProjectsProjectList />

      <section className="full-width" id="cta">
        <h2>Entre em contato</h2>
        <p>Estou sempre aberto a discutir novos projetos, ideias criativas ou oportunidades de colaboração. Sinta-se à vontade para me enviar uma mensagem!</p>
        <ul>
          <li>
            <Link href="/contato" className="cta primary-cta">Enviar mensagem</Link>
          </li>
        </ul>
      </section>
    </>
  )
}