'use client';
import './ProjectHeader.css';
import {
  ArrowLeftIcon,
  ListBulletIcon,
  XMarkIcon,
} from '@heroicons/react/20/solid';
import Link from 'next/link';
import ContentSummary from '../ContentSummary/ContentSummary';
import { ContentBlock } from '@/app/types/types';

export function ProjectHeader({
  contentBlocks,
}: {
  title: string;
  contentBlocks: ContentBlock[];
}) {
  return (
    <>
      <div className="contianer-grid full-width project-header">
        <Link
          href="/projetos"
          className="left btn ghost-btn back-link icon-only"
        >
          <ArrowLeftIcon className="icon-md"></ArrowLeftIcon>
        </Link>
        <button
          popoverTarget="project-menu"
          className="menu-btn btn secondary-btn icon-only"
        >
          <ListBulletIcon className="icon-md" />
        </button>
      </div>
      <div popover="auto" id="project-menu" className="project-menu">
        <ContentSummary contentBlocks={contentBlocks} />
        <span
          aria-hidden="true"
          className="highlight-text"
        >{`//////////////`}</span>
        <button
          popoverTarget="project-menu"
          popoverTargetAction="hide"
          className="btn secondary-btn close-btn right icon-only"
        >
          <XMarkIcon className="icon-md" />
        </button>
      </div>
    </>
  );
}
