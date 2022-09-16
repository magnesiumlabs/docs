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
                text: 'Docs',
                items: [
                    {
                        text: 'Core',
                        items: [
                            {
                                text: 'Theme',
                                link: 'guide/theme/getting-started'
                            },
                            {
                                text: 'Typography',
                                link: 'guide/typography/getting-started'
                            }
                        ]
                    },
                    {
                        text: 'Advanced',
                        items: [
                            {
                                text: 'Shape',
                                link: 'guide/shape/getting-started'
                            }
                        ]
                    }
                ]
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
            '/guide/theme/': [
                {
                    text: 'Theme',
                    collapsible: true,
                    items: [
                        {
                            text: 'Getting Started',
                            link: 'guide/theme/getting-started'
                        },
                        {
                            text: 'Configuration',
                            link: 'guide/theme/configuration'
                        }
                    ]
                },
                {
                    text: 'API',
                    collapsible: true,
                    items: [
                        {
                            text: 'Functions',
                            link: 'guide/theme/api/functions'
                        },
                        {
                            text: 'Mixins',
                            link: 'guide/theme/api/mixins'
                        }
                    ]
                }
            ],
            '/guide/typography/': [
                {
                    text: 'Typography',
                    collapsible: true,
                    items: [
                        {
                            text: 'Getting Started',
                            link: 'guide/typography/getting-started'
                        }
                    ]
                }
            ],
            '/guide/shape/': [
                {
                    text: 'Shape',
                    collapsible: true,
                    items: [
                        {
                            text: 'Getting Started',
                            link: 'guide/typography/getting-started'
                        }
                    ]
                }
            ]
        }
    }
};
