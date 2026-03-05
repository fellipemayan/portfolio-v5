import './page.css';
import AboutClient from './AboutClient';
import { client } from '@/sanity/lib/client';

export default async function AboutPage() {
  // Busca dados do Sanity
  const [experiences, education, research, clients] = await Promise.all([
    client.fetch(`*[_type == "experience"]|order(order asc)`),
    client.fetch(`*[_type == "education"]|order(order asc)`),
    client.fetch(`*[_type == "research"]|order(order asc)`),
    client.fetch(`*[_type == "client"]|order(name asc)`),
  ]);

  return (
    <AboutClient
      experiences={experiences}
      education={education}
      research={research}
      clients={clients}
    />
  );
}
