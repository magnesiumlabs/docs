import { h } from 'vue';
import Theme from '@frontfactory/vitepress-theme';
import './styles.css';
import HeroCanvas from './HeroCanvas.vue';

export default {
    extends: Theme,
    Layout: () => h(Theme.Layout, null, {
        'home-hero-image': () => h(HeroCanvas)
    })
};
