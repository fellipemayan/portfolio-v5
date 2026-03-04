import type { Metadata } from 'next';
import { Inter, Trispace } from 'next/font/google';
import { Header } from './components/header/Header';
import './globals.css';
import { Footer } from './components/Footer/Footer';
import { CustomCursor } from './components/CustomCursor/CustomCursor';
import { Colophon } from './components/Colophon/Colophon';
import { client } from '@/sanity/lib/client';

const settings = await client.fetch(`*[_type == "settings"][0]{
  email,
  socialLinks,
  "resumeUrl": resume.asset->url
}`);

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const trispace = Trispace({
  variable: '--font-trispace',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Fellipe Mayan - Designer de Produto + Dev',
  description:
    'Designer full-stack especializado em arquitetura da informação, interface e desenvolvimento front-end com Vue/Vite React/Next.js.',
  robots: {
    index: true,
    follow: true,
  },
};

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
        <Header />
        <main className="content-grid full-width">{children}</main>
        <Footer />
        <Colophon />
        <CustomCursor />
      </body>
    </html>
  );
}
