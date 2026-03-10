import { SummaryWithGallery } from '@/app/components/ContentSummary/SummaryWithGallery';
import './page.css';
import { client } from '@/sanity/lib/client';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/20/solid';
import { PortableText } from '@portabletext/react';
import {
  RevealItem,
  RevealSection,
} from '@/app/components/MotionWrapper/MotionWrapper';

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Busca o projeto pelo slug
  const project = await client.fetch(
    `*[_type == "project" && slug.current == $slug][0]{
      title,
      description,
      year,
      team,
      duration,
      role,
      tags[]->{_id, title},
      toolsAndskills[]->{_id, title},
      externalLinks,
      thumbnailImage{
        horizontal{asset->{url}},
        vertical{asset->{url}},
        alt
      },
      content{
        pt[]{
          ...,
          _type == "image" => {
            ...,
            asset->{url, _id}
          }
        }
      },
      gallery[]{
        horizontal{asset->{url}},
        vertical{asset->{url}},
        alt
      },
      isComingSoon
    }`,
    { slug }
  );
  if (!project) notFound();

  // Se o projeto está marcado como "Em breve", buscar um projeto aleatório disponível
  if (project.isComingSoon) {
    // Buscar todos os projetos disponíveis (não em breve)
    const availableProjects = await client.fetch(
      `*[_type == "project" && !isComingSoon && defined(slug.current)]{title, slug, thumbnailImage{asset->{url}, alt}}`
    );
    let randomProject = null;
    if (availableProjects.length > 0) {
      // Escolhe aleatório de forma pura, fora do render
      const idx = Math.floor(Math.random() * availableProjects.length);
      randomProject = availableProjects[idx];
    }
    // Retorna já com o randomProject definido, sem lógica impura no JSX
    return (
      <section className="coming-soon-project-page">
        <div className="coming-soon-message">
          <h1>Projeto em breve!</h1>
          <p>
            Este projeto ainda não está disponível para visualização. Volte em
            breve para mais novidades.
          </p>
        </div>
        <h2>Veja outro projeto:</h2>
        {randomProject && (
          <div className="random-project-suggestion">
            <Link
              href={`/projetos/${typeof randomProject.slug === 'string' ? randomProject.slug : randomProject.slug?.current}`}
              className="random-project-link"
            >
              <div className="random-project-thumb">
                <Image
                  src={randomProject.thumbnailImage?.asset?.url || ''}
                  alt={
                    typeof randomProject.thumbnailImage?.alt === 'string'
                      ? randomProject.thumbnailImage?.alt
                      : randomProject.thumbnailImage?.alt?.pt ||
                        randomProject.thumbnailImage?.alt?.en ||
                        randomProject.title ||
                        ''
                  }
                  width={400}
                  height={225}
                />
              </div>
              <span>
                {typeof randomProject.title === 'string'
                  ? randomProject.title
                  : randomProject.title?.pt || randomProject.title?.en || ''}
              </span>
            </Link>
          </div>
        )}
      </section>
    );
  }

  // Busca todos os slugs para navegação do próximo projeto
  const allSlugs = await client.fetch(
    `*[_type == "project" && defined(slug.current)]|order(period.start desc){ "slug": slug.current }`
  );
  const currentIndex = allSlugs.findIndex((p: any) => p.slug === slug);
  const nextSlug = allSlugs[(currentIndex + 1) % allSlugs.length]?.slug;

  // Função para pegar multilíngue
  const getLocaleString = (val: any) => {
    if (!val) return '';
    if (typeof val === 'string') return val;
    if (val.pt) return val.pt;
    if (val.en) return val.en;
    return '';
  };
  // Função para multilíngue
  const formattedDuration = getLocaleString(project.duration);

  return (
    <>
      <RevealSection id="project-overview">
        <RevealItem>
          <Link href="/projetos" className="btn ghost-btn back-link">
            <ArrowLeftIcon className="icon-md"></ArrowLeftIcon> Voltar
          </Link>
        </RevealItem>
        <RevealItem>
          <h1>{getLocaleString(project.title)}</h1>
        </RevealItem>
        <RevealItem>
          {project.tags && project.tags.length > 0 && (
            <ul className="tag-list">
              {project.tags.map((tag: { _id?: string; title: string }, idx: number) => (
                <li key={tag._id || idx} className="tag">
                  {getLocaleString(tag.title)}
                </li>
              ))}
            </ul>
          )}
        </RevealItem>
        <RevealItem>
          <p className="project-subtitle">
            {getLocaleString(project.description)}
          </p>
        </RevealItem>
      </RevealSection>
      <RevealSection className="breakout">
        <RevealItem>
          {(() => {
            const verticalUrl = project.thumbnailImage?.vertical?.asset?.url;
            const horizontalUrl =
              project.thumbnailImage?.horizontal?.asset?.url;
            const altText =
              getLocaleString(project.thumbnailImage?.alt) ||
              getLocaleString(project.title);
            if (!verticalUrl && !horizontalUrl) return null;
            return (
              <picture>
                {verticalUrl && (
                  <source media="(max-width: 767px)" srcSet={verticalUrl} />
                )}
                {horizontalUrl && (
                  <source media="(min-width: 768px)" srcSet={horizontalUrl} />
                )}
                <img
                  src={horizontalUrl || verticalUrl}
                  alt={altText}
                  className="breakout project-image"
                  loading="eager"
                  style={{
                    aspectRatio:
                      typeof window !== 'undefined' && window.innerWidth <= 767
                        ? '4/5'
                        : '16/9',
                    width: '100%',
                    height: 'auto',
                  }}
                />
              </picture>
            );
          })()}
        </RevealItem>
      </RevealSection>

      <RevealSection className="full-width">
        <aside className="left" id="project-toc">
          <SummaryWithGallery
            content={project.content?.pt}
            gallery={project.gallery}
          />
        </aside>

        <div className="right" id="projet-metadata">
          <RevealItem>
            <h2>Ano</h2>
            <ul className="metadata-list">
              <li className="metadata-period">{project.year || '—'}</li>
            </ul>
          </RevealItem>

          <RevealItem>
            <h2>Duração</h2>
            <ul className="metadata-list">
              <li className="metadata-period">{formattedDuration || '—'}</li>
            </ul>
          </RevealItem>

          <RevealItem>
            <h2>Papel</h2>
            <ul className="metadata-list">
              {Array.isArray(project.role)
                ? project.role.map((role: string, idx: number) => (
                    <li key={role || idx} className="tag">
                      {role}
                    </li>
                  ))
                : null}
            </ul>
          </RevealItem>

          <RevealItem>
            <h2>Ferramentas</h2>
            <ul className="metadata-list">
              {project.toolsAndskills && project.toolsAndskills.length > 0 ? (
                project.toolsAndskills.map(
                  (tool: { _id: string; title: string }, idx: number) => (
                    <li key={tool._id || idx} className="tag">
                      {getLocaleString(tool.title)}
                    </li>
                  )
                )
              ) : (
                <li>Nenhuma ferramenta cadastrada.</li>
              )}
            </ul>
          </RevealItem>

          <RevealItem>
            {project.externalLinks && project.externalLinks.length > 0 ? (
              <>
                <h2>Veja o projeto</h2>
                <ul className="metadata-list">
                  {project.externalLinks.map(
                    (link: { url: string; href: string; label: string }) => (
                      <li key={link.url}>
                        <a
                          href={link.url}
                          target="_blank"
                          className="external-link"
                        >
                          {link.label}
                        </a>
                      </li>
                    )
                  )}
                </ul>
              </>
            ) : null}
          </RevealItem>
        </div>

        <section className="content content-blocks">
          {/* Renderização do rich text principal do projeto com ids para navegação e animação */}
          {project.content?.pt && (
            <>
              {project.content.pt.map((block: any, idx: number) => (
                <RevealItem key={block._key || idx}>
                  <PortableText
                    value={[block]}
                    components={{
                      block: {
                        normal: ({ children }) => <p>{children}</p>,
                        h2: ({ children, ...props }) => {
                          // Adiciona id para navegação
                          const key = props.value?._key || undefined;
                          return (
                            <h2 id={key ? `pt-block-${key}` : undefined}>
                              {children}
                            </h2>
                          );
                        },
                        h3: ({ children }) => <h3>{children}</h3>,
                      },
                      marks: {
                        link: ({ children, value }) => (
                          <a
                            href={value?.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="external-link"
                          >
                            {children}
                          </a>
                        ),
                        em: ({ children }) => <em>{children}</em>,
                        strong: ({ children }) => <strong>{children}</strong>,
                      },
                      types: {
                        image: ({ value }) => {
                          // src seguro
                          const src =
                            typeof value.asset?.url === 'string'
                              ? value.asset.url
                              : null;
                          if (!src) return null;
                          // alt seguro
                          let alt = value.alt;
                          if (typeof alt !== 'string') {
                            alt = alt?.pt || alt?.en || '';
                          }
                          // caption pode ser multilíngue também
                          let caption = value.caption;
                          if (typeof caption !== 'string') {
                            caption = caption?.pt || caption?.en || '';
                          }
                          return (
                            <figure>
                              <Image
                                src={src}
                                alt={alt}
                                width={600}
                                height={300}
                                className="gallery-image"
                                loading="eager"
                              />
                              {caption && <figcaption>{caption}</figcaption>}
                            </figure>
                          );
                        },
                      },
                    }}
                  />
                </RevealItem>
              ))}
            </>
          )}
        </section>
      </RevealSection>

      <RevealSection className="breakout" id="gallery">
        {project.gallery &&
          project.gallery.length > 0 &&
          project.gallery.map((image: { vertical?: { asset?: { url?: string } }; horizontal?: { asset?: { url?: string } }; alt?: string }, idx: number) => {
            const verticalUrl = image?.vertical?.asset?.url;
            const horizontalUrl = image?.horizontal?.asset?.url;
            const altText = getLocaleString(image?.alt) || '';
            if (!verticalUrl && !horizontalUrl) return null;
            return (
              <RevealItem key={horizontalUrl || verticalUrl || idx}>
                <picture>
                  {verticalUrl && (
                    <source media="(max-width: 767px)" srcSet={verticalUrl} />
                  )}
                  {horizontalUrl && (
                    <source media="(min-width: 768px)" srcSet={horizontalUrl} />
                  )}
                  <img
                    src={horizontalUrl || verticalUrl}
                    alt={altText}
                    className="gallery-image"
                    loading="eager"
                    style={{
                      aspectRatio:
                        typeof window !== 'undefined' &&
                        window.innerWidth <= 767
                          ? '4/5'
                          : '16/9',
                      width: '100%',
                      height: 'auto',
                    }}
                  />
                </picture>
              </RevealItem>
            );
          })}
      </RevealSection>

      <RevealSection className="full-width" id="cta">
        <RevealItem>
          <h2>Gostou do projeto?</h2>
        </RevealItem>
        <RevealItem>
          <p>
            Estou sempre aberto a discutir novos projetos, ideias criativas ou
            oportunidades de colaboração. Sinta-se à vontade para me enviar uma
            mensagem!
          </p>
        </RevealItem>
        <RevealItem>
          <ul>
            <li>
              <Link href="/contato" className="cta primary-cta">
                Enviar mensagem
              </Link>
            </li>
            <li>
              <Link
                href={`/projetos/${nextSlug}`}
                className="cta secondary-cta"
              >
                Próximo Projeto{' '}
                <ArrowRightIcon className="icon-md"></ArrowRightIcon>
              </Link>
            </li>
          </ul>
        </RevealItem>
      </RevealSection>
    </>
  );
}
