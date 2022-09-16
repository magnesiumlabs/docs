module.exports = {
    title: 'Magnesium',
    head: [
        [
            'script',
            {
                src: 'https://www.googletagmanager.com/gtag/js?id=G-FENS3716B9'
            }
        ]
    ],
    description: 'Just playing around.',
    srcDir: 'src/',
    themeConfig: {
        nav: [
            {
                text: 'Guide',
                link: 'guide/getting-started',
                activeMatch: '/guide/'
            },
            {
                text: '1.x',
                items: [
                    {
                        text: '1.x',
                        link: '/'
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
        sidebar: {
            '/guide/': [
                {
                    text: 'Introduction',
                    collapsible: true,
                    items: [
                        {
                            text: 'Getting Started',
                            link: 'guide/getting-started'
                        }
                    ]
                },
                {
                    text: 'Core',
                    collapsible: true,
                    items: [
                        {
                            text: '@magnesium/core',
                            link: 'guide/core'
                        },
                        {
                            text: '@magnesium/theme',
                            link: 'guide/theme'
                        },
                        {
                            text: '@magnesium/typography',
                            link: 'guide/typography'
                        }
                    ]
                },
                {
                    text: 'Advanced',
                    collapsible: true,
                    items: [
                        {
                            text: '@magnesium/shape',
                            link: 'guide/shape'
                        }
                    ]
                }
            ]
        },
        footer: {
            message: 'Released under the MIT License.',
            copyright: 'Copyright © 2022-present'
        }
    }
};
