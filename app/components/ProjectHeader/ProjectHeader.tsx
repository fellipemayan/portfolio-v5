"use client";
import "./ProjectHeader.css";
import { ArrowLeftIcon, ListBulletIcon, XMarkIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import ContentSummary from "../ContentSummary/ContentSummary";
import { ContentBlock } from "@/app/types/types";
import { useEffect, useState } from "react";

export function ProjectHeader({title, contentBlocks}: {title: string, contentBlocks: ContentBlock[]}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 200) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div
        className={`content-grid full-width project-header${visible ? " project-header-visible" : " project-header-hidden"}`}
      >
        <Link href="/projetos" className='left btn ghost-btn back-link icon-only'><ArrowLeftIcon className="icon-md"></ArrowLeftIcon></Link>
        <h1>{title}</h1>
        <button
          popoverTarget="project-menu"
          className="menu-btn btn secondary-btn icon-only"
        >
          <ListBulletIcon className="icon-md" />
        </button>
      </div>
      <div popover='auto' id="project-menu" className="project-menu">
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