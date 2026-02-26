import Link from 'next/link'
import './MobileMenu.css'
import { XMarkIcon } from '@heroicons/react/20/solid'

export function MobileMenu() {
  return (
    <div
      popover="auto"
      id="mobile-menu"
      className="mobile-menu grid-content"
      autoFocus
    >
      <h1 className="content">Menu</h1>
      <nav className="mobile-nav content">
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
        <span
          aria-hidden="true"
          className="highlight-text"
        >{`//////////////`}</span>
      </nav>
      <button
        popoverTarget="mobile-menu"
        popoverTargetAction="hide"
        className="btn secondary-btn close-btn right"
      >
        <XMarkIcon className="icon-md" />
      </button>
    </div>
  )
}
