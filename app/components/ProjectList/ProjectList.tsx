"use client"
import './ProjectList.css'
import projectsData from '../../constants/projects.json'
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { QueueListIcon, Squares2X2Icon } from '@heroicons/react/20/solid';

export type ListStyle = 'grid' | 'list'

interface ProjectCardData {
  slug: string;
  featured: boolean;
  featuredOrder: number;
  title: string;
  description: string;
  category: string;
  period: {
    end: string;
  };
  thumbnailImage: {
    url: string;
    alt: string;
  };
  tags: string[];
}

export function ProjectCard({ project, style }: { project: ProjectCardData, style?: ListStyle }) { 

  return (
    <li className={`card-${style}`}>
      <Link href={`/projects/${project.slug}`}>
        <div className='thumbnail-container'>
          <Image 
            src={project.thumbnailImage.url} 
            alt={project.thumbnailImage.alt}
            width={400} 
            height={225}
            className='thumbnail'
            loading='eager' />
        </div>
        <div className='project-card-content'>
          <h3>{project.title}</h3>
          <ul className='tag-list'>
            {project.tags.map(tag => (
              <li key={tag} className='tag'>{tag}</li>
            ))}
          </ul>
          <p>{project.description}</p>
        </div>
      </Link>
    </li>
  )
}

export function ProjectList({ projects, style }: { projects: ProjectCardData[], style?: ListStyle }) { 

  return (
    <ul className={`breakout project-list ${style}`}>
      {projects.map(({
        slug,
        featured,
        featuredOrder,
        title,
        category,
        period: { end },
        description,
        tags,
        thumbnailImage: {
          url,
          alt
        },
      }) => (
        <ProjectCard key={slug} project={{
          slug,
          title,
          featured,
          featuredOrder,
          category,
          description,
          period: { end },
          tags,
          thumbnailImage: {
            url,
            alt
          }
        }} style={style} />
      ))}
    </ul>
  )
}

export function HeroProjectList({ style }: { style?: ListStyle }) { 
  const heroProjects = projectsData.filter(project => {
    return project.featured === true
  }).sort((a, b) => a.featuredOrder - b.featuredOrder)

  return (
    <ProjectList projects={heroProjects} style={style} />
  )
}

export function ProjectsProjectList() { 
  const [listStyle, setListStyle] = useState<ListStyle>(() => {
      if (typeof window !== 'undefined') {
        const savedStyle = localStorage.getItem('projectListStyle')
        return (savedStyle as ListStyle) || 'grid'
      }
      return 'grid'
    }
  )

  useEffect(() => {
    localStorage.setItem('projectListStyle', listStyle)
  }, [listStyle])

  const [selectedTag, setSelectedTag] = useState<string>('Todos')

  const allTags = Array.from(new Set(projectsData.flatMap(project => project.tags)))
  const tagsWithAll = ['Todos', ...allTags]

  const sortedProjects = projectsData.sort((a, b) => {
    const dateA = new Date(a.period.end)
    const dateB = new Date(b.period.end)
    return dateB.getTime() - dateA.getTime()
  }
  )

  const filteredProjects = sortedProjects.filter(project => {
    return (selectedTag === 'Todos' || project.tags.includes(selectedTag))
  })

  const tagRefs = useRef < (HTMLButtonElement | null)[]> ([]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex = index;

    switch (event.key) {
      case 'ArrowRight':
        nextIndex = (index + 1) % tagsWithAll.length;
        break;
      case 'ArrowLeft':
        nextIndex = (index - 1 + tagsWithAll.length) % tagsWithAll.length;
        break;
      case 'Home':
        nextIndex = 0;
        break;
      case 'End':
        nextIndex = tagsWithAll.length - 1;
        break;
      default:
        return;
    }

    event.preventDefault();
    tagRefs.current[nextIndex]?.focus();
  }

  return (
    <section className={`breakout project-list-container ${listStyle}`}>
      <div className='project-list-controls'>
        <div className='filter-container tags-filter' role="group" aria-labelledby="tag-label">
          <span id="tag-label" className='pill-group-label'>Tag</span>
          <div className='pill-list' role='presentation'>
            {tagsWithAll.map((tag, index) => {
              const isSelected = selectedTag === tag;

              return (
                <button
                  key={tag}
                  ref={(el) => { tagRefs.current[index] = el }}
                  tabIndex={isSelected ? 0 : -1}
                  onClick={() => setSelectedTag(tag)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className={`pill ${isSelected ? 'active' : ''}`}
                  aria-pressed={isSelected}
                >
                  {tag}
                </button>
              )
            })}
          </div>
        </div>
        <div className='view-toggle-container'>
          <button onClick={() => setListStyle('grid')} className={listStyle === 'grid' ? 'active' : ''}><Squares2X2Icon className="icon-md" /></button>
          <button onClick={() => setListStyle('list')} className={listStyle === 'list' ? 'active' : ''}><QueueListIcon className="icon-md" /></button>
        </div>
      </div>
      {filteredProjects.length > 0 ? (
        <ProjectList projects={filteredProjects} style={listStyle} />
      ) : (
        <>
          <p className='no-projects-message'>Nenhum projeto encontrado para os filtros selecionados :(</p>
            <button onClick={() => { setSelectedTag('Todos') }} className='btn primary-btn'>Limpar filtros</button>
        </>
      )}
    </section>
  )
}