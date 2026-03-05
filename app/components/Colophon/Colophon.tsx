'use client';
import './Colophon.css';
import { motion } from 'motion/react';
import {
  containerVariants,
  itemVariants,
} from '@/app/constants/motionVariants';
import { PortableText } from '@portabletext/react';
import type { PortableTextBlock } from '@portabletext/types';

const VERSION = process.env.NEXT_PUBLIC_VERSION || 'v1.0.0';
const LAST_UPDATE = process.env.NEXT_PUBLIC_LAST_UPDATE || '03/03/2026';

type ColophonProps = {
  colophon?: PortableTextBlock[];
};

export const Colophon: React.FC<ColophonProps> = ({ colophon }) => {
  return (
    <motion.section
      id="colophon"
      className="full-width"
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
    >
      {colophon && Array.isArray(colophon) && colophon.length > 0 ? (
        <PortableText
          value={colophon}
          components={{
            block: {
              normal: ({ children }) => (
                <motion.p variants={itemVariants}>{children}</motion.p>
              ),
            },
            marks: {
              link: ({ children, value }) => (
                <a
                  href={value?.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="external-link"
                >
                  {children}
                </a>
              ),
              em: ({ children }) => {
                // Se o conteúdo for exatamente ':)', adiciona o data-cursor-text
                if (typeof children === 'string' && children.trim() === ':)') {
                  return <span data-cursor-text=":)">:)</span>;
                }
                // Se for array, verifica se contém apenas ':)'
                if (
                  Array.isArray(children) &&
                  children.length === 1 &&
                  children[0] === ':)'
                ) {
                  return <span data-cursor-text=":)">:)</span>;
                }
                return <em>{children}</em>;
              },
            },
          }}
        />
      ) : (
        <>
          <motion.p variants={itemVariants}>
            Este portfólio foi criado usando <strong>Next.js</strong>,{' '}
            <strong>React</strong> e <strong>CSS</strong>.
          </motion.p>
          <motion.p variants={itemVariants}>
            Os ícones usados são da biblioteca{' '}
            <a
              href="https://heroicons.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="external-link"
            >
              Heroicons
            </a>
            . As animações são foram com{' '}
            <a
              href="https://motion.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="external-link"
            >
              Motion.dev
            </a>
            . O código-fonte está disponível no{' '}
            <a
              href="https://github.com/yourusername/portfolio-v5"
              target="_blank"
              rel="noopener noreferrer"
              className="external-link"
            >
              GitHub
            </a>
            .
          </motion.p>
          <motion.p variants={itemVariants}>
            Os tipos utilizados nesse projeto foram Geist e Trispace.
          </motion.p>
        </>
      )}
    </motion.section>
  );
};
