export interface ProjectCardData {
  slug: string | { current: string };
  featured?: boolean;
  featuredOrder?: number;
  title: string;
  description: string;
  category: string;
  period?: {
    start?: string;
    end?: string;
  };
  thumbnailImage: {
    url: string;
    alt: string;
  };
  externalLinks?: Array<{
    label: string;
    url: string;
  }>;
  tags: string[];
  toolsAndskills?: string[];
  isComingSoon?: boolean;
}
export interface ContentParagraph {
  type: 'paragraph';
  content: string;
}

export interface ContentImage {
  type: 'image';
  url: string;
  alt: string;
}

export interface ContentSubsection {
  type: 'subsection';
  title: string;
  content: ContentBlock[];
  gallery?: ContentImage[];
}

export type ContentBlock = ContentParagraph | ContentImage | ContentSubsection;
