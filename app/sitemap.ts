import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://questsold.com';

    // In a real scenario, we would fetch dynamic slugs for properties and blog posts here

    const routes = [
        '',
        '/about-us',
        '/our-team',
        '/properties',
        '/communities',
        '/buyers',
        '/sellers',
        '/home-valuation',
        '/mortgage-calculator',
        '/blog',
        '/contact',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    return [...routes];
}
