import { defineConfig } from 'vitepress';

export default defineConfig({
    title: 'Magnesium',
    description: 'The Sass Framework for Web Design System.',
    srcDir: 'src/',
    head: [
        [
            'script',
            {
                src: 'https://www.googletagmanager.com/gtag/js?id=G-FENS3716B9'
            }
        ]
    ],
    themeConfig: {
        logo: '/logo.svg',
        search: {
            provider: 'local'
        },
        nav: [
            {
                text: 'Guide',
                link: '/guide/getting-started'
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
