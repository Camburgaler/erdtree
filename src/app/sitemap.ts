import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: "https://erdtree.camburgaler.com",
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 1,
        },
        {
            url: "https://erdtree.camburgaler.com/class",
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 0.8,
        },
        {
            url: "https://erdtree.camburgaler.com/armor",
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.8,
        },
        {
            url: "https://erdtree.camburgaler.com/weapons",
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.8,
        },
        {
            url: "https://erdtree.camburgaler.com/about",
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.5,
        },
        {
            url: "https://erdtree.camburgaler.com/_not-found",
            lastModified: new Date(),
            changeFrequency: "never",
            priority: 0.3,
        },
    ];
}
