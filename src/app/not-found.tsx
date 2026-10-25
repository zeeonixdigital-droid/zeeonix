import Link from 'next/link';
import { Home, ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-brand-navy flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-6">
        <div className="font-display text-8xl font-bold gradient-text mb-4">404</div>
        <h1 className="font-display text-2xl font-bold text-brand-white mb-3">Page Not Found</h1>
        <p className="text-brand-muted mb-8">
          The page you are looking for does not exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="btn-primary">
            <Home size={16} /> Go Home
          </Link>
          <Link href="/services" className="btn-secondary">
            View Services <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
