module.exports = {
    title: 'Magnesium',
    description: 'Just playing around.',
    srcDir: 'src/',
    themeConfig: {
        nav: [
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
            ]
        }
    }
};
