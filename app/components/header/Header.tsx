import './Header.css'
import '../../globals.css'
import Link from 'next/link'
import { Bars3Icon } from '@heroicons/react/20/solid'
import { ThemeToggle } from './ThemeToggle/ThemeToggle'
import { MobileMenu } from './MobileMenu/MobileMenu'

export function Header() {
  return (
    <>
      <header className="header full-width">
        <Link href="/" className="name-link left">
          Fellipe Mayan
        </Link>
        <nav className="header-nav">
          <ul>
            <li>
              <Link href="/" className="active">
                Início
              </Link>
            </li>
            <li>
              <Link href="/projetos">Projetos</Link>
            </li>
            <li>
              <Link href="/sobre">Sobre</Link>
            </li>
            <li>
              <Link href="/contato">Contato</Link>
            </li>
          </ul>
        </nav>

        <div className="options right">
          <ThemeToggle />
          <button
            popoverTarget="mobile-menu"
            className="menu-btn btn secondary-btn"
          >
            <Bars3Icon className="icon-md" />
          </button>
        </div>
      </header>

      <MobileMenu />
    </>
  )
}
