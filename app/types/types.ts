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