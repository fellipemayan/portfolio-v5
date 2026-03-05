import Link from 'next/link';
import React from 'react';
import './CTA.css';

export type CTAAction = {
  label: string;
  href: string;
  external?: boolean;
  variant: 'primary' | 'secondary';
};

export type CTAProps = {
  title: string;
  description: string;
  actions: CTAAction[];
  className?: string;
};

export default function CTA({
  title,
  description,
  actions,
  className = '',
}: CTAProps) {
  return (
    <section className={`cta-section full-width ${className}`.trim()}>
      <h2>{title}</h2>
      <p>{description}</p>
      <ul className="cta-actions">
        {actions.map((action, idx) => {
          const btnClass = `cta ${action.variant}-cta`;
          if (action.external) {
            return (
              <li key={idx}>
                <a
                  href={action.href}
                  className={btnClass}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {action.label}
                </a>
              </li>
            );
          }
          return (
            <li key={idx}>
              <Link href={action.href} className={btnClass}>
                {action.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
