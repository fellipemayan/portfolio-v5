export type CTATranslation = {
  title: string;
  description: string;
  primary: { label: string; href: string; external?: boolean };
  secondary?: { label: string; href: string; external?: boolean };
};

export type CTASchema = {
  [lang: string]: CTATranslation;
};

export const CTA_HOME_ABOUT: CTASchema = {
  pt: {
    title: 'Em busca de design que conversa com código?',
    description:
      'Estou sempre aberto a discutir novos projetos, ideias criativas ou oportunidades de colaboração. Sinta-se à vontade para me enviar uma mensagem!',
    primary: { label: 'Entrar em contato', href: '/contato' },
    secondary: { label: 'Ver projetos', href: '/projetos' },
  },
  en: {
    title: 'Looking for design that speaks code?',
    description:
      'I’m always open to discuss new projects, creative ideas or collaboration opportunities. Feel free to send me a message!',
    primary: { label: 'Contact me', href: '/contato' },
    secondary: { label: 'See projects', href: '/projetos' },
  },
};

export const CTA_PROJECTS: CTASchema = {
  pt: {
    title: 'Em busca de design que conversa com código?',
    description:
      'Estou sempre aberto a discutir novos projetos, ideias criativas ou oportunidades de colaboração. Sinta-se à vontade para me enviar uma mensagem!',
    primary: { label: 'Entrar em contato', href: '/contato' },
    secondary: { label: 'Próximo projeto', href: '' }, // href será preenchido dinamicamente
  },
  en: {
    title: 'Looking for design that speaks code?',
    description:
      'I’m always open to discuss new projects, creative ideas or collaboration opportunities. Feel free to send me a message!',
    primary: { label: 'Contact me', href: '/contato' },
    secondary: { label: 'Next project', href: '' }, // href será preenchido dinamicamente
  },
};
