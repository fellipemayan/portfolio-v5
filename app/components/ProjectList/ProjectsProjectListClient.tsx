'use client';
import { ProjectList } from './ProjectList';

export default function ProjectsProjectListClient({
  projects,
  style = 'grid',
}: {
  projects: any[];
  style?: 'grid' | 'list';
}) {
  return <ProjectList projects={projects} style={style} />;
}
