"use client";
import './ContentSummary.css';
import { useEffect, useState } from "react";
import { ContentBlock, ContentImage } from "@/app/types/types";

interface ContentSummaryProps {
  contentBlocks: ContentBlock[];
}

export default function ContentSummary({ contentBlocks }: ContentSummaryProps) {
  function isSubsection(block: ContentBlock): block is SubsectionBlock {
    return block.type === "subsection" && typeof block.title === "string";
  }
  const sectionBlocks = contentBlocks
  .map((block, idx) => ({ ...block, _idx: idx }))
  .filter(isSubsection) as SubsectionBlock[];

  const [activeIndex, setActiveIndex] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      const isMobile = window.innerWidth < 768;
      const offset = isMobile ? 60 : 240;
      const offsets = sectionBlocks.map(section => {
        const el = document.getElementById(`content-block-${section._idx}`);
        if (!el) return Infinity;
        const rect = el.getBoundingClientRect();
        return Math.abs(rect.top + offset);
      });
      const minOffset = Math.min(...offsets);
      const idx = offsets.indexOf(minOffset);
      setActiveIndex(idx);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sectionBlocks]);

  const handleTocClick = (idx: number) => {
    const el = document.getElementById(`content-block-${sectionBlocks[idx]._idx}`);
    if (el) {
      const isMobile = window.innerWidth < 768;
      const offset = isMobile ? 144 : 80;
      const rect = el.getBoundingClientRect();
      const scrollTop = window.scrollY + rect.top - offset;
      window.scrollTo({ top: scrollTop, behavior: "smooth" });
    }
    // Fecha o popover do menu mobile, se existir
    const menu = document.getElementById('project-menu');
    if (menu && typeof (menu as any).hidePopover === 'function') {
      (menu as any).hidePopover();
    }
  };

  return (
    <>
      <h2>Sumário</h2>
      <ul className="project-summary">
        {sectionBlocks.map((section, idx) => (
          <li key={idx}>
            <a
              className={activeIndex === idx ? "active" : ""}
              onClick={() => handleTocClick(idx)}
            >
              {section.title}
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}

type SubsectionBlock = {
  _idx: number;
  type: "subsection";
  title: string;
  content: ContentBlock[];
  gallery?: ContentImage[];
};