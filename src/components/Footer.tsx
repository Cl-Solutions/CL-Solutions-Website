import { Link } from 'react-router-dom';
import { LogoMark } from './Logo';

const footerLinks = [
  { href: '#leistungen', label: 'Leistungen' },
  { href: '#prozess', label: 'Prozess' },
  { href: '#ueber-uns', label: 'Über uns' },
  { href: '#faq', label: 'FAQ' },
  { href: '#kontakt', label: 'Kontakt' },
];

export function Footer() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-dark border-t border-dark-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <img
                src="/logo.png"
                alt="CL-Solutions Logo"
                className="h-16 w-auto"
              />
              <span className="font-syne font-bold text-lg text-white">
                CL-Solutions
              </span>
            </div>
            <p className="font-inter text-gray-500 leading-relaxed max-w-sm">
              KI-Automatisierung für deutsche Unternehmen.
              Wir machen Technologie nutzbar – ohne Buzzwords.
            </p>
          </div>

          <div>
            <h4 className="font-syne font-semibold text-white mb-4">Navigation</h4>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="font-inter text-gray-500 hover:text-accent transition-colors text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-syne font-semibold text-white mb-4">Rechtliches</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/impressum"
                  className="font-inter text-gray-500 hover:text-accent transition-colors text-sm"
                >
                  Impressum
                </Link>
              </li>
              <li>
                <Link
                  to="/datenschutz"
                  className="font-inter text-gray-500 hover:text-accent transition-colors text-sm"
                >
                  Datenschutz
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-dark-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-inter text-gray-600 text-sm">
            {new Date().getFullYear()} CL-Solutions. Alle Rechte vorbehalten.
          </p>
          <p className="font-inter text-gray-600 text-sm">
            Made with precision in Germany
          </p>
        </div>
      </div>
    </footer>
  );
}
