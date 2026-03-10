'use client';
import React from 'react';

// Tipos para os dados do projeto
export type BlockChild = { text: string };
export type Block = {
  _type: string;
  style?: string;
  _key: string;
  children?: BlockChild[];
};
export type GalleryImage = { url: string; alt: string };

export function SummaryWithGallery({
  content,
  gallery,
}: {
  content?: Block[];
  gallery?: GalleryImage[];
}) {
  const headings = React.useMemo(() => {
    if (!Array.isArray(content)) return [] as { text: string; key: string }[];
    return content
      .map((block) => {
        if (block && block._type === 'block' && block.style === 'h2') {
          return {
            text: block.children?.map((c) => c.text).join('') || '',
            key: block._key,
          };
        }
        return undefined;
      })
      .filter((h): h is { text: string; key: string } => Boolean(h));
  }, [content]);

  const [activeKey, setActiveKey] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!headings.length) return;
    const handleScroll = () => {
      let foundKey = headings[0]?.key;
      for (let i = 0; i < headings.length; i++) {
        const el = document.getElementById(`pt-block-${headings[i].key}`);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100) {
            foundKey = headings[i].key;
          }
        }
      }
      setActiveKey(foundKey);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [headings]);

  const handleClick = (key: string) => {
    const el = document.getElementById(`pt-block-${key}`);
    if (el) {
      const isMobile = window.innerWidth < 768;
      const offset = isMobile ? 144 : 80;
      const rect = el.getBoundingClientRect();
      const scrollTop = window.scrollY + rect.top - offset;
      window.scrollTo({ top: scrollTop, behavior: 'smooth' });
    }
  };

  return (
    <nav>
      <h2>Nesta página</h2>
      <ul className="project-summary">
        {headings.map((h) => (
          <li key={h.key} className={activeKey === h.key ? 'active' : ''}>
            <a onClick={() => handleClick(h.key)}>{h.text}</a>
          </li>
        ))}
        {gallery && gallery.length > 0 && (
          <li>
            <a
              onClick={() => {
                const el = document.getElementById('gallery');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Galeria
            </a>
          </li>
        )}
      </ul>
    </nav>
  );
}
