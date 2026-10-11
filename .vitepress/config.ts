import { execSync } from 'node:child_process';
import { defineConfig } from 'vitepress';
import baseConfig from '@frontfactory/vitepress-theme/config';
import { generateOgImages, ogImageName, type OgPage } from './og';

const description = 'Sass toolkit for managing design tokens as CSS custom properties.';
const hostname = 'https://magnesium.dev';
const ogImage = `${hostname}/og-image.png`;
const ogImageAlt = 'Magnesium — a Sass toolkit for design tokens';
// `lastUpdated` and the sitemap's <lastmod> come from git history; a shallow clone flattens them
// all to the same recent commit, so say so instead of silently shipping wrong dates.
try {
    if (execSync('git rev-parse --is-shallow-repository', { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim() === 'true') {
        console.warn('\n[docs] Shallow git clone detected: "Last updated" dates and sitemap <lastmod> will be inaccurate. Fetch the full history (git fetch --unshallow).\n');
    }
} catch {
    // Not a git checkout (e.g. source archive): nothing to warn about.
}

const isNoindex = (frontmatter: Record<string, any>) =>
    (frontmatter.head ?? []).some((tag: any[]) => tag[1]?.name === 'robots' && /noindex/.test(tag[1]?.content));
const ogPages = new Map<string, OgPage>();
const repository = 'https://github.com/magnesiumlabs/magnesium';

export default defineConfig({
    extends: baseConfig,
    title: 'Magnesium',
    description,
    lang: 'en-US',
    srcDir: 'src/',
    lastUpdated: true,
    cleanUrls: true,
    sitemap: {
        hostname,
        transformItems: items => items.filter(item => !item.url.includes('guide/theme') && !item.url.includes('404'))
    },
    transformPageData(pageData) {
        // Home and the 404 keep the static brand image; every other page gets its own.
        if (pageData.relativePath !== 'index.md' && !pageData.isNotFound && !isNoindex(pageData.frontmatter)) {
            ogPages.set(pageData.relativePath, {
                title: pageData.title,
                description: pageData.description || description
            });
        }
    },
    buildEnd(siteConfig) {
        generateOgImages(ogPages, siteConfig.outDir);
    },
    transformHead({ pageData, title, description: pageDescription }) {
        if (pageData.isNotFound) {
            return [['meta', { name: 'robots', content: 'noindex' }]];
        }

        const path = pageData.relativePath
            .replace(/index\.md$/, '')
            .replace(/\.md$/, '');
        const canonical = `${hostname}/${path}`;
        const pageTitle = title || 'Magnesium';
        const desc = pageDescription || description;
        const isHome = pageData.relativePath === 'index.md';
        const pageImage = ogPages.has(pageData.relativePath)
            ? `${hostname}/og/${ogImageName(pageData.relativePath)}.png`
            : ogImage;
        const pageImageAlt = isHome ? ogImageAlt : `${pageData.title} — Magnesium documentation`;
        const jsonLd = isHome
            ? [
                {
                    '@type': 'WebSite',
                    '@id': `${hostname}/#website`,
                    url: `${hostname}/`,
                    name: 'Magnesium',
                    description,
                    inLanguage: 'en-US'
                },
                {
                    '@type': 'SoftwareSourceCode',
                    '@id': `${hostname}/#software`,
                    name: 'Magnesium',
                    description,
                    codeRepository: repository,
                    programmingLanguage: 'Sass',
                    license: 'https://opensource.org/license/mit',
                    url: `${hostname}/`,
                    author: { '@type': 'Organization', name: 'Front Factory', url: 'https://frontfactory.dev' }
                }
            ]
            : [
                {
                    '@type': 'TechArticle',
                    headline: pageData.title,
                    description: desc,
                    url: canonical,
                    inLanguage: 'en-US',
                    image: pageImage,
                    isPartOf: { '@id': `${hostname}/#website` },
                    ...(pageData.lastUpdated && { dateModified: new Date(pageData.lastUpdated).toISOString() })
                }
            ];

        return [
            ['link', { rel: 'canonical', href: canonical }],
            ['meta', { property: 'og:url', content: canonical }],
            ['meta', { property: 'og:type', content: isHome ? 'website' : 'article' }],
            ['meta', { property: 'og:image', content: pageImage }],
            ['meta', { property: 'og:image:alt', content: pageImageAlt }],
            ['meta', { name: 'twitter:image', content: pageImage }],
            ['meta', { name: 'twitter:image:alt', content: pageImageAlt }],
            ['script', { type: 'application/ld+json' }, JSON.stringify({ '@context': 'https://schema.org', '@graph': jsonLd })],
            ['meta', { property: 'og:title', content: pageTitle }],
            ['meta', { property: 'og:description', content: desc }],
            ['meta', { name: 'twitter:title', content: pageTitle }],
            ['meta', { name: 'twitter:description', content: desc }]
        ];
    },
    head: [
        ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
        ['link', { rel: 'icon', type: 'image/x-icon', sizes: '16x16 32x32 48x48', href: '/favicon.ico' }],
        ['link', { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' }],
        ['meta', { name: 'theme-color', content: '#0071d7' }],
        ['meta', { property: 'og:site_name', content: 'Magnesium' }],
        ['meta', { property: 'og:locale', content: 'en_US' }],
        ['meta', { property: 'og:image:type', content: 'image/png' }],
        ['meta', { property: 'og:image:width', content: '1200' }],
        ['meta', { property: 'og:image:height', content: '630' }],
        ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
        [
            'script',
            {
                src: 'https://www.googletagmanager.com/gtag/js?id=G-FENS3716B9'
            }
        ]
    ],
    themeConfig: {
        logo: {
            light: '/logo.svg',
            dark: '/logo-white.svg'
        },
        siteTitle: 'Magnesium',
        search: {
            provider: 'local'
        },
        lastUpdated: {
            text: 'Last updated'
        },
        editLink: {
            pattern: 'https://github.com/magnesiumlabs/docs/edit/main/src/:path',
            text: 'Edit this page on GitHub'
        },
        nav: [
            {
                text: 'Guide',
                link: '/guide/getting-started'
            },
            {
                text: '5.2.x',
                items: [
                    {
                        text: 'Changelog',
                        link: 'https://github.com/magnesiumlabs/magnesium/blob/main/CHANGELOG.md'
                    }
                ]
            }
        ],
        sidebar: [
            {
                text: 'Introduction',
                items: [
                    {
                        text: 'What is Magnesium?',
                        link: '/guide/what-is-magnesium'
                    },
                    {
                        text: 'What\'s New in v5',
                        link: '/guide/whats-new'
                    },
                    {
                        text: 'Getting Started',
                        link: '/guide/getting-started'
                    },
                    {
                        text: 'Configuration',
                        link: '/guide/configuration'
                    }
                ]
            },
            {
                text: 'API',
                items: [
                    {
                        text: 'Functions',
                        link: '/guide/functions'
                    },
                    {
                        text: 'Mixins',
                        link: '/guide/mixins'
                    },
                    {
                        text: 'Patterns',
                        link: '/guide/patterns'
                    }
                ]
            },
            {
                text: 'Migration',
                items: [
                    {
                        text: 'Migrating from v4',
                        link: '/guide/migration'
                    }
                ]
            }
        ],
        socialLinks: [
            {
                icon: 'github',
                link: 'https://github.com/magnesiumlabs/magnesium'
            }
        ],
        footer: {
            message: 'Released under the MIT License.',
            copyright: `Copyright © 2022-${new Date().getFullYear()} <a href="https://frontfactory.dev">Front Factory</a> - <a href="https://damev.in">Boris Damevin</a>.`
        },
        ff: {
            navOrder: 'menu-first',
            footerColumns: [
                {
                    title: 'Guide',
                    items: [
                        { text: 'Getting Started', link: '/guide/getting-started' },
                        { text: 'Configuration', link: '/guide/configuration' },
                        { text: 'What\'s New in v5', link: '/guide/whats-new' }
                    ]
                },
                {
                    title: 'Project',
                    items: [
                        { text: 'GitHub', link: 'https://github.com/magnesiumlabs/magnesium' },
                        { text: 'Changelog', link: 'https://github.com/magnesiumlabs/magnesium/blob/main/CHANGELOG.md' },
                        { text: 'Migrating from v4', link: '/guide/migration' }
                    ]
                }
            ]
        }
    }
});
