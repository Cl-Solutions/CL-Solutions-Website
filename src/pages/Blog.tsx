import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { blogPosts, formatDate } from '../data/blogPosts';
import { CustomCursor } from '../components/CustomCursor';

export function Blog() {
  useEffect(() => {
    document.title = 'Blog – KI-Automatisierung & Prozesse | CL-Solutions';
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', 'Praxiswissen zu KI-Automatisierung, Chatbots und Prozessoptimierung für KMU in Deutschland.');
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute('href', 'https://cl-solutions.pro/blog');
    return () => {
      document.title = 'KI-Automatisierung für deutsche Unternehmen | CL-Solutions';
      if (desc) desc.setAttribute('content', 'Wir automatisieren Prozesse, verbinden Systeme und bauen KI-Agenten für KMU in Deutschland. DSGVO-konform. Angebot in 48h.');
      if (canonical) canonical.setAttribute('href', 'https://cl-solutions.pro/');
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <CustomCursor />
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[rgba(10,10,10,0.7)] backdrop-blur-[16px] border-b border-[rgba(0,229,255,0.08)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-3">
            <img src="/logo.png" alt="CL-Solutions" className="h-16 w-auto" />
            <span className="font-syne font-bold text-lg text-white">CL-Solutions</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="nav-item font-inter text-sm text-gray-400 hover:text-white transition-colors duration-150">
              Startseite
            </Link>
            <Link to="/blog" className="nav-item font-inter text-sm text-[#00E5FF] transition-colors duration-150">
              Blog
            </Link>
            <a
              href="https://cal.eu/cl-solutions/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-[#00E5FF] text-[#0a0a0a] font-inter font-medium text-sm rounded-lg hover:bg-[#00E5FF]/90 transition-colors"
            >
              Erstgespräch buchen
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <div className="pt-40 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="font-inter text-[#00E5FF] text-sm font-medium uppercase tracking-widest mb-4">
            Insights & Praxis
          </p>
          <h1 className="font-syne font-bold text-4xl sm:text-5xl lg:text-6xl text-white mb-6 leading-tight">
            Blog
          </h1>
          <p className="font-inter text-gray-400 text-lg max-w-2xl leading-relaxed">
            Praxiswissen zu KI-Automatisierung, Chatbots und Prozessoptimierung für kleine und mittlere Unternehmen.
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="max-w-4xl mx-auto px-6">
        <div className="h-px bg-white/10" />
      </div>

      {/* Posts Grid */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogPosts.filter((p) => !p.draft).map((post) => (
            <article
              key={post.slug}
              className="group glass-card glass-card-interactive rounded-2xl p-7 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="font-inter text-xs font-medium text-[#00E5FF] bg-[#00E5FF]/10 px-3 py-1 rounded-full">
                  {post.category}
                </span>
                <span className="font-inter text-xs text-gray-500">
                  {post.readingTime} Lesezeit
                </span>
              </div>

              <h2 className="font-syne font-semibold text-xl text-white mb-3 leading-snug group-hover:text-[#00E5FF] transition-colors duration-200">
                {post.title}
              </h2>

              <p className="font-inter text-gray-400 text-sm leading-relaxed mb-6">
                {post.excerpt}
              </p>

              <div className="flex items-center justify-between">
                <span className="font-inter text-xs text-gray-600">
                  {formatDate(post.date)}
                </span>
                <Link
                  to={`/blog/${post.slug}`}
                  className="font-inter text-sm text-[#00E5FF] hover:text-white transition-colors duration-150 flex items-center gap-1.5"
                >
                  Weiterlesen
                  <span className="group-hover:translate-x-1 transition-transform duration-200 inline-block">→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 mt-8 py-10 px-6">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-inter text-gray-600 text-sm">
            © {new Date().getFullYear()} CL-Solutions. Alle Rechte vorbehalten.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/impressum" className="font-inter text-gray-600 hover:text-gray-400 text-sm transition-colors">
              Impressum
            </Link>
            <Link to="/datenschutz" className="font-inter text-gray-600 hover:text-gray-400 text-sm transition-colors">
              Datenschutz
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
