import { useParams, Link, Navigate } from 'react-router-dom';
import { getPostBySlug, formatDate } from '../data/blogPosts';
import { CustomCursor } from '../components/CustomCursor';

export function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

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
            <Link
              to="/"
              className="px-5 py-2.5 bg-[#00E5FF] text-[#0a0a0a] font-inter font-medium text-sm rounded-lg hover:bg-[#00E5FF]/90 transition-colors"
            >
              Erstgespräch buchen
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile back button — fixed below navbar, only on small screens */}
      <div className="md:hidden fixed top-20 left-0 right-0 z-40 px-4 py-2 bg-[rgba(10,10,10,0.85)] backdrop-blur-sm">
        <Link
          to="/blog"
          className="inline-flex items-center gap-1.5 font-inter text-sm text-[#00E5FF]"
        >
          <span>←</span>
          <span>Zurück</span>
        </Link>
      </div>

      {/* Article */}
      <div className="pt-32 md:pt-32 pb-24 px-6" style={{ paddingTop: 'clamp(112px, 16vh, 128px)' }}>
        <div className="max-w-[720px] mx-auto">

          {/* Back link */}
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 font-inter text-sm text-gray-500 hover:text-[#00E5FF] transition-colors duration-150 mb-10"
          >
            <span>←</span>
            <span>Zurück zum Blog</span>
          </Link>

          {/* Meta */}
          <div className="flex items-center gap-3 mb-6">
            <span className="font-inter text-xs font-medium text-[#00E5FF] bg-[#00E5FF]/10 px-3 py-1 rounded-full">
              {post.category}
            </span>
            <span className="font-inter text-xs text-gray-500">
              {formatDate(post.date)}
            </span>
            <span className="font-inter text-xs text-gray-600">·</span>
            <span className="font-inter text-xs text-gray-500">
              {post.readingTime} Lesezeit
            </span>
          </div>

          {/* Title */}
          <h1 className="font-syne font-bold text-3xl sm:text-4xl lg:text-5xl text-white mb-10 leading-tight">
            {post.title}
          </h1>

          <div className="h-px bg-white/10 mb-10" />

          {/* Content */}
          <div
            className="prose-blog font-inter"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 py-10 px-6">
        <div className="max-w-[720px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
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
