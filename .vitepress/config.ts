import { defineConfig } from 'vitepress';

export default defineConfig({
    title: 'Magnesium',
    description: 'The Sass Framework for Web Design System.',
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
                text: '4.5.x',
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
                    }
                ]
            },
            {
                text: 'Components',
                items: [
                    {
                        text: 'Color',
                        link: 'guide/components/color'
                    },
                    {
                        text: 'Shape',
                        link: 'guide/components/shape'
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
