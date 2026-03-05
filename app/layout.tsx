import type { Metadata } from 'next';
import { Inter, Trispace } from 'next/font/google';
import { Header } from './components/header/Header';
import './globals.css';
import { Footer } from './components/Footer/Footer';
import { CustomCursor } from './components/CustomCursor/CustomCursor';
import { Colophon } from './components/Colophon/Colophon';
import { client } from '@/sanity/lib/client';

const locale = 'pt'; // ou 'en', conforme desejado
const settings = await client.fetch(
  `*[_type == "siteSettings"][0]{
    location,
    "lastUpdate": lastUpdate,
    version,
    "colophon": colophon[$locale],
    navLinks[] {
      "label": coalesce(label[$locale], label.pt, label.en),
      path,
      aliases
    },
    socialLinks[] {
      name,
      url,
      order,
      isVisible
    },
    "resumeUrl": resume.asset->url
  }`,
  { locale }
);

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const trispace = Trispace({
  variable: '--font-trispace',
  subsets: ['latin'],
});

// Função utilitária para pegar string multilíngue
function getLocaleString(val: string | Record<string, string>, locale: string) {
  if (!val) return '';
  if (typeof val === 'string') return val;
  return val[locale] || val.pt || val.en || '';
}

// Permite sobrescrever dinamicamente via props (ex: em páginas de projeto)
export async function generateMetadata({
  title,
  description,
  ogImage,
}: {
  title?: string;
  description?: string;
  ogImage?: string;
} = {}): Promise<Metadata> {
  // Fallback para settings do site
  const metaTitle =
    title ||
    getLocaleString(settings?.metaTitle, locale) ||
    'Fellipe Mayan - Designer de Produto + Dev';
  const metaDescription =
    description ||
    getLocaleString(settings?.metaDescription, locale) ||
    'Designer full-stack especializado em arquitetura da informação, interface e desenvolvimento front-end com Vue/Vite React/Next.js.';
  const metaOgImage = ogImage || settings?.ogImage || '/og-default.png';
  return {
    title: metaTitle,
    description: metaDescription,
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      images: [metaOgImage],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
            (function() {
              try {
                var theme = localStorage.getItem('portfolio-theme');
                var scheme = theme === 'system'
                  ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
                  : theme;
                document.documentElement.setAttribute('data-theme', scheme || 'light');
              } catch(e) {}
            })();
          `,
          }}
        />
      </head>
      <body
        className={`
          ${inter.variable} 
          ${trispace.variable}
          content-grid
        `}
      >
        <Header navLinks={settings?.navLinks || []} />
        <main className="content-grid full-width">{children}</main>
        <Footer
          socialLinks={(settings?.socialLinks || [])
            .filter((link: { isVisible: boolean }) => link.isVisible)
            .sort(
              (a: { order: number }, b: { order: number }) => a.order - b.order
            )}
        />
        <Colophon colophon={settings?.colophon} />
        <CustomCursor />
      </body>
    </html>
  );
}
