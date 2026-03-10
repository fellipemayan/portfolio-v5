import './ProjectList.css';
import Link from 'next/link';
// import Image from 'next/image';
import { motion } from 'motion/react';
import {
  containerVariants,
  itemVariants,
} from '../../constants/motionVariants';
import { ProjectCardData } from '@/app/types/types';

export type ListStyle = 'grid' | 'list';

export function ProjectCard({
  project,
  style,
}: {
  project: ProjectCardData;
  style?: ListStyle;
}) {
  // Garante que slug seja sempre string
  const slug =
    typeof project.slug === 'string'
      ? project.slug
      : project.slug?.current || '';

  const handleArticleClick = (e: React.MouseEvent) => {
    if (project.isComingSoon) return;
    if ((e.target as HTMLElement).closest('.external-link, a')) return;
    if (slug) {
      window.location.href = `/projetos/${slug}`;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (project.isComingSoon) return;
    if ((e.key === 'Enter' || e.key === ' ') && slug) {
      window.location.href = `/projetos/${slug}`;
    }
  };

  return (
    <motion.li className={`card-${style}`} variants={itemVariants}>
      <article
        className={`project-card-article${project.isComingSoon ? ' coming-soon' : ''}`}
        tabIndex={0}
        role="link"
        aria-label={`Ver projeto: ${project.title}`}
        onClick={handleArticleClick}
        onKeyDown={handleKeyDown}
        aria-disabled={project.isComingSoon ? 'true' : undefined}
        style={project.isComingSoon ? { opacity: 0.95 } : {}}
      >
        <div className="thumbnail-container">
          {(() => {
            const verticalUrl = project.thumbnailImage?.vertical?.asset?.url;
            const horizontalUrl =
              project.thumbnailImage?.horizontal?.asset?.url;
            const altText =
              typeof project.thumbnailImage?.alt === 'string'
                ? project.thumbnailImage.alt
                : project.thumbnailImage?.alt?.pt ||
                  project.thumbnailImage?.alt?.en ||
                  '';
            // Debug log
            if (!verticalUrl && !horizontalUrl) {
              console.warn('Projeto sem imagem válida:', project);
            }
            if (verticalUrl || horizontalUrl) {
              return (
                <picture>
                  {verticalUrl && (
                    <source
                      media="(max-width: 767px)"
                      srcSet={verticalUrl}
                      width="320"
                      height="400"
                    />
                  )}
                  {horizontalUrl && (
                    <source
                      media="(min-width: 768px)"
                      srcSet={horizontalUrl}
                      width="400"
                      height="225"
                    />
                  )}
                  <img
                    src={horizontalUrl || verticalUrl}
                    alt={altText}
                    className="thumbnail"
                    loading="eager"
                    data-cursor-text={
                      project.isComingSoon ? 'Em breve...' : 'Ver projeto'
                    }
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
              );
            }
            // Fallback visual
            return <div className="thumbnail-missing">Sem imagem</div>;
          })()}
          {/* Tag Em breve no canto inferior esquerdo */}
          {project.isComingSoon && (
            <span className="coming-soon-tag" aria-label="Em breve">
              Em breve
            </span>
          )}
        </div>
        <div className="project-card-content">
          <h3
            className="project-title-with-cursor"
            data-cursor-text={
              project.isComingSoon ? 'Em breve...' : 'Ver projeto'
            }
          >
            <Link
              href={project.isComingSoon ? '#' : `/projetos/${slug}`}
              tabIndex={-1}
              aria-label={project.title}
              aria-disabled={project.isComingSoon ? 'true' : undefined}
              style={
                project.isComingSoon
                  ? { pointerEvents: 'none', color: '#aaa' }
                  : {}
              }
            >
              {project.title}
            </Link>
          </h3>
          <ul className="tag-list">
            {project.tags
              .filter((tag) => typeof tag === 'string' && tag)
              .map((tag, idx) => (
                <li
                  key={typeof tag === 'string' ? tag : `tag-${idx}`}
                  className="tag"
                >
                  {tag}
                </li>
              ))}
          </ul>
          <p>{project.description}</p>
          <ul className="link-list">
            {project.externalLinks &&
              project.externalLinks.map((link, idx) => {
                const url = typeof link.url === 'string' ? link.url : '';
                return (
                  <li key={url || `link-${idx}`}>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="external-link"
                    >
                      {link.label}
                    </a>
                  </li>
                );
              })}
          </ul>
        </div>
      </article>
    </motion.li>
  );
}

export function ProjectList({
  projects,
  style,
}: {
  projects: ProjectCardData[];
  style?: ListStyle;
}) {
  // Filtra projetos invisíveis
  const visibleProjects = projects.filter(
    (project) => project.isVisible !== false
  );
  return (
    <motion.ul
      className={`breakout project-list ${style}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
    >
      {visibleProjects.map((project, idx) => {
        const slug =
          typeof project.slug === 'string'
            ? project.slug
            : project.slug?.current || `project-${idx}`;
        return <ProjectCard key={slug} project={project} style={style} />;
      })}
    </motion.ul>
  );
}
