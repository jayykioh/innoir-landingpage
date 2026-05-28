import { MetadataRoute } from 'next'
import { absoluteUrl, routes } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: absoluteUrl(routes.home),
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
        {
            url: absoluteUrl(routes.community),
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.8,
        },
        {
            url: absoluteUrl(routes.identity),
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
        },
    ]
}
