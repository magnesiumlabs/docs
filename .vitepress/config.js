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
        sidebar: [
            {
                text: 'Components',
                items: [
                    {
                        text: 'Shape',
                        link: 'guide/shape'
                    },
                    {
                        text: 'Theme',
                        link: 'guide/theme'
                    },
                    {
                        text: 'Typography',
                        link: 'guide/typography'
                    }
                ]
            }
        ]
    }
};
