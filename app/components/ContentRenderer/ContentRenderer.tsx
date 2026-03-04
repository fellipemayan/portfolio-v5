import { ContentBlock } from '@/app/types/types';
import Image from 'next/image';
import { ElementType } from 'react';

export function ContentRenderer({
  block,
  level = 2,
  index,
}: {
  block: ContentBlock;
  level?: number;
  index?: number;
}) {
  switch (block.type) {
    case 'paragraph':
      return <p>{block.content}</p>;
    case 'image':
      return (
        <Image
          src={block.url}
          alt={block.alt}
          width={600}
          height={300}
          className="gallery-image"
          loading="eager"
        />
      );
    case 'subsection':
      const HeadingTag = `h${Math.min(level, 6)}` as ElementType;
      // Adiciona id apenas para subseções de primeiro nível
      const sectionProps =
        level === 2 && typeof index === 'number'
          ? { id: `content-block-${index}` }
          : {};
      return (
        <section {...sectionProps}>
          <HeadingTag>{block.title}</HeadingTag>
          {block.content.map((childBlock, idx) => (
            <ContentRenderer key={idx} block={childBlock} level={level + 1} />
          ))}
          {block.gallery && block.gallery.length > 0 && (
            <div className="gallery">
              {block.gallery.map((image, idx) => (
                <ContentRenderer
                  key={idx}
                  block={{ type: 'image', url: image.url, alt: image.alt }}
                  level={level + 1}
                />
              ))}
            </div>
          )}
        </section>
      );
    default:
      return null;
  }
}
