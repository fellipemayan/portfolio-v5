import ProjectsPageClient from './ProjectsPageClient';
import { client } from '@/sanity/lib/client';
import { groq } from 'next-sanity';

export const revalidate = 60;

async function getAllProjects() {
  const locale = 'pt';
  const projects = await client.fetch(
    groq`*[_type == "project"] | order(period.end desc) {
      title,
      slug,
      featured,
      featuredOrder,
      description,
      category,
      period,
      isComingSoon,
      thumbnailImage {
        asset->{url},
        alt,
      },
      externalLinks,
      tags[]-> { _id, title, slug },
      toolsAndskills[]-> { _id, title },
    }`
  );
  // Adaptar multilíngue
  function getLocaleString(val: any) {
    if (!val) return '';
    if (typeof val === 'string') return val;
    if (val.pt) return val.pt;
    if (val.en) return val.en;
    return '';
  }
  return projects.map((p: any) => ({
    ...p,
    title: getLocaleString(p.title),
    description: p.description?.[locale] || '',
    category: p.category?.[locale] || '',
    thumbnailImage: {
      url: p.thumbnailImage?.asset?.url || '',
      alt: p.thumbnailImage?.alt?.[locale] || '',
    },
    tags: (p.tags || []).map((t: any) => {
      if (typeof t === 'string') return t;
      if (t && typeof t.title === 'object' && t.title[locale])
        return t.title[locale];
      if (t && typeof t.slug === 'string') return t.slug;
      if (t && typeof t._id === 'string') return t._id;
      return '';
    }),
    toolsAndskills: (p.toolsAndskills || []).map((t: any) => {
      if (typeof t === 'string') return t;
      if (t && typeof t.title === 'object' && t.title[locale])
        return t.title[locale];
      if (t && typeof t._id === 'string') return t._id;
      return '';
    }),
    isComingSoon: !!p.isComingSoon,
  }));
}

export default async function ProjectsPage() {
  const projects = await getAllProjects();
  return <ProjectsPageClient projects={projects} />;
}
