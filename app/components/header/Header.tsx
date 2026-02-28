"use client";
import './Header.css'
import '../../globals.css'
import Link from 'next/link'
import { Bars3Icon } from '@heroicons/react/20/solid'
import { ThemeToggle } from './ThemeToggle/ThemeToggle'
import { MobileMenu } from './MobileMenu/MobileMenu'
import { usePathname } from 'next/navigation'

export function Header() {
  const pathName = usePathname()

  return (
    <>
      <header className="header full-width">
        <Link href="/" className="name-link left">
          Fellipe Mayan
        </Link>
        <nav className="header-nav">
          <ul>
            <li>
              <Link href="/" className={pathName === '/' ? 'active' : ''} onClick={e => e.currentTarget.blur()}>
                Início
              </Link>
            </li>
            <li>
              <Link href="/projetos" className={pathName === '/projetos' ? 'active' : ''} onClick={e => e.currentTarget.blur()}>
                Projetos
              </Link>
            </li>
            <li>
              <Link href="/sobre" className={pathName === '/sobre' ? 'active' : ''} onClick={e => e.currentTarget.blur()}>
                Sobre
              </Link>
            </li>
            <li>
              <Link href="/contato" className={pathName === '/contato' ? 'active' : ''} onClick={e => e.currentTarget.blur()}>Contato</Link>
            </li>
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
      </header>

      <MobileMenu />
    </>
  )
}
