import './page.css'
import projectsData from '../../constants/projects.json'
import Link from "next/link"
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { ContentRenderer } from '@/app/components/ContentRenderer/ContentRenderer';
import { ContentBlock } from '@/app/types/types';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/20/solid';
import ContentSummary from '@/app/components/ContentSummary/ContentSummary';
import { ProjectHeader } from '@/app/components/ProjectHeader/ProjectHeader';

export async function generateStaticParams() {
  return projectsData.map(project => ({
    slug: project.slug
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projectsData.find((p) => p.slug === slug);
  if (!project) return { title: 'Projeto não encontrado' };

  return {
    title: `${project.title} | Fellipe Mayan`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const sortedProjects = [...projectsData].sort((a, b) => {
    const dateA = new Date(a.period.start).getTime();
    const dateB = new Date(b.period.start).getTime();
    return dateB - dateA;
  });

  const projectIndex = sortedProjects.findIndex((p) => p.slug === slug);
  const project = sortedProjects[projectIndex];

  if (!project) {
    notFound();
  }

  const nextIndex = (projectIndex + 1) % sortedProjects.length;
  const nextProject = sortedProjects[nextIndex];

  const formattedPeriodStart = new Date(project.period.start).toLocaleDateString('pt-BR', { year: 'numeric', month: 'short' });
  const formattedPeriodEnd = project.period.end ? new Date(project.period.end).toLocaleDateString('pt-BR', { year: 'numeric', month: 'short' }) : 'Presente';
  const formattedDate = `${formattedPeriodStart} - ${formattedPeriodEnd}`;

  const contentBlocks: ContentBlock[] = project.content as ContentBlock[];

  return (
    <>
      <ProjectHeader title={project.title} contentBlocks={contentBlocks} />

      <section id="project-overview">
        <Link href="/projetos" className='btn ghost-btn back-link'><ArrowLeftIcon className="icon-md"></ArrowLeftIcon> Voltar</Link>
        <h1>{project.title}</h1>
        <p className="project-subtitle">{project.description}</p>
      </section>

      <Image 
        src={project.thumbnailImage.url} 
        alt={project.thumbnailImage.alt}
        width={600}
        height={300}
        className='breakout project-image'
        loading='eager'
      />

      <section className="full-width" id='project-overview'>
        <aside className="left" id="project-toc">
          <ContentSummary contentBlocks={contentBlocks} />
        </aside>

        <div className='right' id="projet-metadata">
          <div>
            <h2>Papel</h2>
            <p className='metadata-role'>{project.role}</p>
          </div>
          
          <div>
            <h2>Período</h2>
            <p className='metadata-period'>{formattedDate}</p>
          </div>

          <div>
            <h2>Tags</h2>
            <ul className='metadata-list'>
              {project.tags.map(tag => (
                <li key={tag} className='tag'>{tag}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2>Ferramentas</h2>
            <ul className='metadata-list'>
              {project.toolsAndskills.map(tool => (
                <li key={tool} className='tag'>{tool}</li>
              ))}
            </ul>
          </div>  

          <div>
            <h2>Veja o projeto</h2>
            {project.externalLinks && project.externalLinks.length > 0 ? (
              <div className='external-links'>
                {project.externalLinks.map(link => (
                  <Link key={link.url} href={link.url} target="_blank" className="btn secondary-btn">
                    {link.label}
                  </Link>
                ))}
              </div>
            ) : (
              <p>Não há links externos disponíveis para este projeto :(</p>
            )}
          </div>
        </div>
        
        {project.content && project.content.length > 0 && (
          <section className='content content-blocks'>
            {contentBlocks.map((block, index) => (
              <ContentRenderer key={index} block={block} level={2} index={index} />
            ))}
          </section>
        )}
      </section>

      <section className="breakout" id='gallery'>
        {project.gallery && project.gallery.length > 0 && (
          project.gallery.map((image) => {
            return (
              <Image
                key={image.url}
                src={image.url}
                alt={image.alt}
                width={600}
                height={300}
                className='gallery-image'
                loading="eager"
              />
            )
          })
        )}
      </section>

      <section className="full-width" id="cta">
        <h2>Gostou do projeto?</h2>
        <p>Estou sempre aberto a discutir novos projetos, ideias criativas ou oportunidades de colaboração. Sinta-se à vontade para me enviar uma mensagem!</p>
        <ul>
          <li>
            <Link href="/contato" className="cta primary-cta">Enviar mensagem</Link>
          </li>
          <li>
            <Link href={`/projetos/${nextProject.slug}`} className="cta secondary-cta">Próximo Projeto <ArrowRightIcon className="icon-md" ></ArrowRightIcon></Link>
          </li>
        </ul>
      </section>
    </>
  )
}