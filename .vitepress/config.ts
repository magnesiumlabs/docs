import { defineConfig } from 'vitepress';

export default defineConfig({
    title: 'Magnesium',
    description: 'Sass toolkit for managing design tokens as CSS custom properties.',
    srcDir: 'src/',
    head: [
        [
            'link',
            {
                rel: 'icon',
                href: '/favicon.ico'
            }
        ],
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
