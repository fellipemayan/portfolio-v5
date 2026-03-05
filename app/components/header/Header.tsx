'use client';
import './Header.css';
import '../../globals.css';
import Link from 'next/link';
import { Bars3Icon } from '@heroicons/react/20/solid';
import { ThemeToggle } from './ThemeToggle/ThemeToggle';
import { MobileMenu } from './MobileMenu/MobileMenu';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { motion } from 'motion/react';

export function Header({
  navLinks = [],
}: {
  navLinks: Array<{ label: string; path: string }>;
}) {
  const pathName = usePathname();

  useEffect(() => {
    const menu = document.getElementById('mobile-menu');
    if (menu && typeof (menu as any).hidePopover === 'function') {
      (menu as any).hidePopover();
    }
  }, [pathName]);

  return (
    <>
      <motion.header
        className="header full-width"
        initial={{ y: '-100%', opacity: 0 }}
        animate={{ y: '0%', opacity: 1 }}
        transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
      >
        <div className="left">
          <Link href="/" className="name-link left" data-cursor-text="Oi :)">
            Fellipe Mayan
          </Link>
        </div>
        <nav className="header-nav">
          <ul>
            {navLinks.map((item) => {
              const isRoot = item.path === '/';
              const isActive = isRoot
                ? pathName === '/'
                : pathName === item.path ||
                  pathName.startsWith(item.path + '/');
              return (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    className={isActive ? 'active' : ''}
                    onClick={(e) => e.currentTarget.blur()}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="options right">
          <ThemeToggle />
          <button
            popoverTarget="mobile-menu"
            className="menu-btn btn secondary-btn icon-only"
          >
            <Bars3Icon className="icon-md" />
          </button>
        </div>
      </motion.header>

      <MobileMenu navLinks={navLinks} />
    </>
  );
}
