import Link from 'next/link';
import './MobileMenu.css';
import { XMarkIcon } from '@heroicons/react/20/solid';
import { usePathname } from 'next/navigation';

export function MobileMenu({
  navLinks = [],
}: {
  navLinks: Array<{ label: string; path: string }>;
}) {
  const pathName = usePathname();
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
          {navLinks.map((item, idx) => (
            <li key={typeof item.path === 'string' ? item.path : idx}>
              <Link
                href={item.path}
                className={pathName === item.path ? 'active' : ''}
                popoverTarget="mobile-menu"
                popoverTargetAction="hide"
              >
                {item.label}
              </Link>
            </li>
          ))}
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
