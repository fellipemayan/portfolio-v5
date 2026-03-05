import './home.css';
import HomeHeroClient from './components/HomeHeroClient';
import { groq } from 'next-sanity';
import { client } from '@/sanity/lib/client';

export const revalidate = 60;

async function getFeaturedProjects() {
  const locale = 'pt';
  const projects = await client.fetch(
    groq`*[_type == "project" && featured == true] | order(featuredOrder asc) {
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
  return projects.map((p: any) => ({
    ...p,
    title: p.title?.[locale] || '',
    description: p.description?.[locale] || '',
    category: p.category?.[locale] || '',
    thumbnailImage: {
      url: p.thumbnailImage?.asset?.url || '',
      alt: p.thumbnailImage?.alt?.[locale] || '',
    },
    tags: (p.tags || []).map((t: any) => t.title?.[locale] || ''),
    toolsAndskills: (p.toolsAndskills || []).map(
      (t: any) => t.title?.[locale] || ''
    ),
    isComingSoon: !!p.isComingSoon,
  }));
}

export default async function Home() {
  const projects = await getFeaturedProjects();
  // Buscar a URL do currículo do Sanity
  const siteSettings = await client.fetch(
    groq`*[_type == "siteSettings"][0]{ "resumeUrl": resumes.pt.asset->url }`
  );
  const resumeUrl = siteSettings?.resumeUrl || '';
  return <HomeHeroClient projects={projects} resumeUrl={resumeUrl} />;
}
