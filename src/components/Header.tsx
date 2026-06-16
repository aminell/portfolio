import { useState } from 'react';
import { Menu, Moon, Sun, X } from 'lucide-react';

interface HeaderProps {
  activeSection: string;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export default function Header({ activeSection, theme, toggleTheme }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { id: 'a-propos', label: 'À propos' },
    { id: 'competences', label: 'Compétences' },
    { id: 'projets', label: 'Labs' },
    { id: 'trajectoire', label: 'Parcours' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="site-header liquid-glass liquid-glass--bar">
      <a className="skip-link" href="#contenu">Aller au contenu</a>
      <nav className="nav" aria-label="Navigation principale">
        <a className="brand" href="#accueil" aria-label="Retour à l'accueil">
          <span className="brand-mark">AL</span>
          <span className="brand-copy">
            <span className="brand-text">Amine Larbi</span>
            <span className="brand-subtitle">BTS CIEL IR · Cyber</span>
          </span>
        </a>

        <div className="nav-controls">
          <button
            className="theme-toggle liquid-glass"
            type="button"
            onClick={toggleTheme}
            aria-pressed={theme === 'light'}
            aria-label={theme === 'light' ? 'Passer en mode sombre' : 'Passer en mode clair'}
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            <span className="sr-only">{theme === 'light' ? 'Mode sombre' : 'Mode clair'}</span>
          </button>
          <button
            className="nav-toggle liquid-glass"
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-controls="menu"
            aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          >
            {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
            <span>Menu</span>
          </button>
        </div>

        <ul id="menu" className={`nav-links ${isMenuOpen ? 'is-open' : ''}`}>
          {menuItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={activeSection === item.id ? 'is-active' : ''}
                onClick={handleLinkClick}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
