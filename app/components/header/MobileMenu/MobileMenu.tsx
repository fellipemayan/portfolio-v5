import Link from 'next/link';
import './MobileMenu.css';
import { XMarkIcon } from '@heroicons/react/20/solid';
import { usePathname } from 'next/navigation';

export function MobileMenu() {
  const pathName = usePathname();
  const isProjetosActive = pathName.startsWith('/projetos');
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
            <Link
              href="/"
              className={pathName === '/' ? 'active' : ''}
              popoverTarget="mobile-menu"
              popoverTargetAction="hide"
            >
              Início
            </Link>
          </li>
          <li>
            <Link
              href="/projetos"
              className={isProjetosActive ? 'active' : ''}
              popoverTarget="mobile-menu"
              popoverTargetAction="hide"
            >
              Projetos
            </Link>
          </li>
          <li>
            <Link
              href="/sobre"
              className={pathName === '/sobre' ? 'active' : ''}
              popoverTarget="mobile-menu"
              popoverTargetAction="hide"
            >
              Sobre
            </Link>
          </li>
          <li>
            <Link
              href="/contato"
              className={pathName === '/contato' ? 'active' : ''}
              popoverTarget="mobile-menu"
              popoverTargetAction="hide"
            >
              Contato
            </Link>
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
        className="btn secondary-btn close-btn right icon-only"
      >
        <XMarkIcon className="icon-md" />
      </button>
    </div>
  );
}
