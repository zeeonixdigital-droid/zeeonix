import { MetadataRoute } from 'next';
import { SERVICE_GROUPS } from '@/lib/services-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://zeeonix.com';
  const now = new Date().toISOString();

  const staticPages = [
    '', '/services', '/about', '/portfolio', '/pricing', '/faq',
    '/contact', '/privacy-policy', '/terms',
  ].map(path => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: path === '' ? 1 : 0.8,
  }));

  const servicePages = SERVICE_GROUPS.map(g => ({
    url: `${base}/services/${g.id}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...servicePages];
}
