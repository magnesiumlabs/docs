import { defineConfig } from 'vitepress';

const description = 'Sass toolkit for managing design tokens as CSS custom properties.';
const hostname = 'https://magnesium.dev';
const ogImage = `${hostname}/og-image.png`;

export default defineConfig({
    title: 'Magnesium',
    description,
    lang: 'en-US',
    srcDir: 'src/',
    lastUpdated: true,
    sitemap: {
        hostname
    },
    head: [
        ['link', { rel: 'icon', href: '/favicon.ico' }],
        ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
        ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
        [
            'link',
            {
                rel: 'stylesheet',
                href: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap'
            }
        ],
        ['meta', { name: 'theme-color', content: '#0071d7' }],
        ['meta', { property: 'og:type', content: 'website' }],
        ['meta', { property: 'og:title', content: 'Magnesium' }],
        ['meta', { property: 'og:description', content: description }],
        ['meta', { property: 'og:image', content: ogImage }],
        ['meta', { property: 'og:url', content: hostname }],
        ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
        ['meta', { name: 'twitter:title', content: 'Magnesium' }],
        ['meta', { name: 'twitter:description', content: description }],
        ['meta', { name: 'twitter:image', content: ogImage }],
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
        siteTitle: false,
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
                text: '5.1.x',
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
                        link: 'guide/what-is-magnesium'
                    },
                    {
                        text: 'What\'s New in v5',
                        link: 'guide/whats-new'
                    },
                    {
                        text: 'Getting Started',
                        link: 'guide/getting-started'
                    },
                    {
                        text: 'Configuration',
                        link: 'guide/configuration'
                    }
                ]
            },
            {
                text: 'API',
                items: [
                    {
                        text: 'Functions',
                        link: 'guide/functions'
                    },
                    {
                        text: 'Mixins',
                        link: 'guide/mixins'
                    },
                    {
                        text: 'Patterns',
                        link: 'guide/patterns'
                    }
                ]
            },
            {
                text: 'Migration',
                items: [
                    {
                        text: 'Migrating from v4',
                        link: 'guide/migration'
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
            copyright: 'Copyright © 2022-present'
        }
    }
});
