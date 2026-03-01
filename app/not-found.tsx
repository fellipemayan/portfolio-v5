import Link from "next/link";
import projects from "./constants/projects.json";
import { ProjectCard } from "./components/ProjectList/ProjectList";

const randomIndex = Math.floor(Math.random() * projects.length);
const project = projects[randomIndex];

export default function NotFound() {

  return (
    <section className="not-found">
      <span className="four-o-four" aria-hidden>404</span>
      <h1 >Página não encontrada :/</h1>
      <p>Mas tudo bem, eu pensei nessa possibilidade.</p>
      <Link className="btn secondary-btn four-o-four-link" href="/">Voltar para a Home</Link>
      <Link className="btn secondary-btn four-o-four-link" href="/contato">Entrar em contato</Link>
      <h2 className="or-text">Ou confira um projeto aleatório:</h2>
      <ul className="single-project-list">
        <ProjectCard project={project} style="grid" />
      </ul>
    </section>
  );
}