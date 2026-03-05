'use client';
import { ProjectList } from './ProjectList';

export default function HeroProjectListClient({
  projects,
  style,
}: {
  projects: any[];
  style?: 'grid' | 'list';
}) {
  return <ProjectList projects={projects} style={style} />;
}
