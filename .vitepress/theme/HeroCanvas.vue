<script setup>
/**
 * Home hero illustration: the "define → emit → consume" stack, dropping one layer at a time on
 * an infinite loop. Rendered into the theme's `home-hero-image` slot.
 */
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { useData } from 'vitepress';

const { isDark } = useData();
const canvasEl = ref(null);
let rafId = null;
let teardown = null;

const STACK_LAYERS = [
    { label: '1. DEFINE', sub: '$tokens map', colorHex: '#00f2fe', delay: 0, duration: 2000 },
    { label: '2. EMIT', sub: '@layer tokens', colorHex: '#bd34fe', delay: 1800, duration: 2000 },
    { label: '3. CONSUME', sub: 'var(--mg-*)', colorHex: '#ff0844', delay: 3600, duration: 2000 }
];

const HOLD_TIME = 2200;
// With reduced motion the illustration is drawn once, frozen mid-hold with all three layers in place.
const FADE_OUT_TIME = 1000;
const TOTAL_CYCLE = 3600 + 2000 + HOLD_TIME + FADE_OUT_TIME;
const STATIC_FRAME_TIME = 3600 + 2000 + HOLD_TIME / 2;

// Drawing happens in a fixed SIZE × SIZE coordinate space; the backing store is scaled to the
// rendered size and device pixel ratio, so small screens don't pay for pixels they never show.
const SIZE = 650;
const MAX_BACKING_SIZE = 900;

const BASE_SIZE = 260;
const BASE_OFFSET = BASE_SIZE / 2;
const BASE_RADIUS = 24;
const BASE_HEIGHT_3D = 20;

const LAYER_W = 200;
const LAYER_H = 200;
const GAP = 38;
const DROP_HEIGHT = -320;

// The pedestal is the widest element on screen: its isometric transform (rotate 45°, then scale
// the y-axis by 0.5) turns a BASE_SIZE square into a diamond whose on-screen width is
// BASE_SIZE * sqrt(2). Scale everything up around the illustration's own center so that diamond's
// width becomes CONTENT_WIDTH_RATIO of the canvas, instead of guessing a pixel size.
const CONTENT_WIDTH_RATIO = 0.8;

function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
}

function getThemeColors() {
    // VitePress's own reactive dark-mode state (toggle + persisted choice + system preference),
    // rather than re-deriving it from the DOM: the `dark` class is removed for light mode, never
    // replaced by a `light` one, so guessing from classList/matchMedia here would ignore an
    // explicit switch to light on a system that prefers dark.
    const dark = isDark.value;

    return {
        isDark: dark,
        baseSideTop: dark ? '#1a2236' : '#cbd5e1',
        baseSideBottom: dark ? '#0f172a' : '#94a3b8',
        baseTop: dark ? '#0d1322' : '#f1f5f9',
        gridLine: dark ? 'rgba(0, 242, 254, 0.18)' : 'rgba(0, 180, 216, 0.22)',
        cardBg: dark ? 'rgba(13, 18, 30, 0.94)' : 'rgba(255, 255, 255, 0.95)',
        textPrimary: dark ? '#ffffff' : '#0f172a',
        baseOutline: '#00f2fe'
    };
}

onMounted(() => {
    const canvas = canvasEl.value;
    const ctx = canvas.getContext('2d');
    const CX = SIZE / 2;
    const CY = SIZE * 0.65;
    const CONTENT_SCALE = (CONTENT_WIDTH_RATIO * SIZE) / (BASE_SIZE * Math.SQRT2);

    const renderedWidth = canvas.getBoundingClientRect().width || SIZE;
    const backingScale = Math.min(renderedWidth * (window.devicePixelRatio || 1), MAX_BACKING_SIZE) / SIZE;
    canvas.width = canvas.height = Math.round(SIZE * backingScale);

    // The pedestal never moves: it is the costliest part (20 stacked fills plus glowing strokes), so
    // it is painted once per colour scheme into an offscreen canvas and blitted every frame.
    const pedestalCache = document.createElement('canvas');
    pedestalCache.width = pedestalCache.height = canvas.width;
    let pedestalIsDark = null;

    function ensurePedestal(colors) {
        if (pedestalIsDark === colors.isDark) return;

        const pctx = pedestalCache.getContext('2d');
        pctx.setTransform(1, 0, 0, 1, 0, 0);
        pctx.clearRect(0, 0, pedestalCache.width, pedestalCache.height);
        pctx.scale(backingScale, backingScale);
        pctx.translate(CX, CY);
        pctx.scale(CONTENT_SCALE, CONTENT_SCALE);
        pctx.translate(-CX, -CY);
        draw3DPedestal(pctx, colors);
        pedestalIsDark = colors.isDark;
    }

    function draw3DPedestal(ctx, colors) {
        const baseShape = new Path2D();
        baseShape.roundRect(-BASE_OFFSET, -BASE_OFFSET, BASE_SIZE, BASE_SIZE, BASE_RADIUS);

        for (let h = BASE_HEIGHT_3D; h > 0; h--) {
            ctx.save();
            ctx.translate(CX, CY + h);
            ctx.scale(1, 0.5);
            ctx.rotate(-Math.PI / 4);

            ctx.fillStyle = h > BASE_HEIGHT_3D / 2 ? colors.baseSideTop : colors.baseSideBottom;
            ctx.fill(baseShape);
            ctx.restore();
        }

        ctx.save();
        ctx.translate(CX, CY + BASE_HEIGHT_3D);
        ctx.scale(1, 0.5);
        ctx.rotate(-Math.PI / 4);
        ctx.beginPath();
        ctx.roundRect(-BASE_OFFSET, -BASE_OFFSET, BASE_SIZE, BASE_SIZE, BASE_RADIUS);
        ctx.strokeStyle = colors.baseOutline;
        ctx.shadowColor = colors.baseOutline;
        ctx.shadowBlur = colors.isDark ? 10 : 5;
        ctx.lineWidth = 2.5;
        ctx.stroke();
        ctx.restore();

        ctx.save();
        ctx.translate(CX, CY);
        ctx.scale(1, 0.5);
        ctx.rotate(-Math.PI / 4);

        ctx.fillStyle = colors.baseTop;
        ctx.fill(baseShape);

        ctx.save();
        ctx.clip(baseShape);

        ctx.beginPath();
        ctx.strokeStyle = colors.gridLine;
        ctx.lineWidth = 1;
        const step = BASE_SIZE / 6;

        for (let x = -BASE_OFFSET + step; x < BASE_OFFSET; x += step) {
            ctx.moveTo(x, -BASE_OFFSET);
            ctx.lineTo(x, BASE_OFFSET);
        }
        for (let y = -BASE_OFFSET + step; y < BASE_OFFSET; y += step) {
            ctx.moveTo(-BASE_OFFSET, y);
            ctx.lineTo(BASE_OFFSET, y);
        }
        ctx.stroke();
        ctx.restore();

        ctx.strokeStyle = colors.baseOutline;
        ctx.shadowColor = colors.baseOutline;
        ctx.shadowBlur = colors.isDark ? 12 : 6;
        ctx.lineWidth = 1.8;
        ctx.stroke(baseShape);

        ctx.restore();
    }

    function drawLayerCard(layerIndex, offsetY, alpha, colorHex, colors) {
        const targetY = CY - layerIndex * GAP + offsetY;

        ctx.save();
        ctx.translate(CX, targetY);
        ctx.scale(1, 0.5);
        ctx.rotate(-Math.PI / 4);

        ctx.globalAlpha = alpha;

        const halfW = LAYER_W / 2;
        const halfH = LAYER_H / 2;

        ctx.beginPath();
        ctx.roundRect(-halfW, -halfH, LAYER_W, LAYER_H, 14);
        ctx.fillStyle = colors.cardBg;
        ctx.fill();

        ctx.strokeStyle = colorHex;
        ctx.shadowColor = colorHex;
        ctx.shadowBlur = colors.isDark ? 20 : 10;
        ctx.lineWidth = 2.5;
        ctx.stroke();

        const layerData = STACK_LAYERS[layerIndex];
        ctx.save();
        ctx.shadowBlur = 0;

        ctx.fillStyle = colors.textPrimary;
        ctx.font = '800 19px system-ui, -apple-system, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(layerData.label, 0, -12);

        ctx.fillStyle = colorHex;
        ctx.font = '700 14px monospace';
        ctx.fillText(layerData.sub, 0, 14);

        ctx.restore();
        ctx.restore();
    }

    function draw(time) {
        const colors = getThemeColors();

        ensurePedestal(colors);

        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(pedestalCache, 0, 0);

        ctx.setTransform(backingScale, 0, 0, backingScale, 0, 0);
        ctx.save();
        ctx.translate(CX, CY);
        ctx.scale(CONTENT_SCALE, CONTENT_SCALE);
        ctx.translate(-CX, -CY);

        const cycleTime = time % TOTAL_CYCLE;

        let fadeOut = 1;
        const fadeStart = TOTAL_CYCLE - FADE_OUT_TIME;
        if (cycleTime > fadeStart) {
            fadeOut = Math.max(0, 1 - (cycleTime - fadeStart) / FADE_OUT_TIME);
        }

        STACK_LAYERS.forEach((layer, index) => {
            const elapsed = Math.max(0, cycleTime - layer.delay);
            if (elapsed > 0) {
                const progress = Math.min(1, elapsed / layer.duration);
                const dropEase = easeOutCubic(progress);

                const offsetY = DROP_HEIGHT * (1 - dropEase);
                const alpha = Math.min(1, progress * 2) * fadeOut;

                drawLayerCard(index, offsetY, alpha, layer.colorHex, colors);
            }
        });

        ctx.restore();
    }

    function animate(time) {
        draw(time);
        rafId = requestAnimationFrame(animate);
    }

    function stop() {
        if (rafId) cancelAnimationFrame(rafId);
        rafId = null;
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let inView = true;

    // Honour the OS "reduce motion" setting live: no looping animation (WCAG 2.2.2), just a still frame.
    // Otherwise only loop while the canvas is on screen and the tab is visible.
    function sync() {
        stop();

        if (reducedMotion.matches) {
            draw(STATIC_FRAME_TIME);
        } else if (inView && !document.hidden) {
            rafId = requestAnimationFrame(animate);
        }
    }

    reducedMotion.addEventListener('change', sync);
    document.addEventListener('visibilitychange', sync);

    const observer = new IntersectionObserver(([entry]) => {
        inView = entry.isIntersecting;
        sync();
    });
    observer.observe(canvas);

    // The still frame is not redrawn by the loop, so repaint it when the colour scheme flips.
    const stopThemeWatch = watch(isDark, () => {
        if (reducedMotion.matches) draw(STATIC_FRAME_TIME);
    });

    teardown = () => {
        stop();
        reducedMotion.removeEventListener('change', sync);
        document.removeEventListener('visibilitychange', sync);
        observer.disconnect();
        stopThemeWatch();
    };

    sync();
});

onUnmounted(() => {
    teardown?.();
});
</script>

<template>
    <canvas ref="canvasEl" width="650" height="650" class="mg-hero-canvas" aria-hidden="true" />
</template>

<style scoped>
.mg-hero-canvas {
    width: 100%;
    height: auto;
    max-width: 420px;
}
</style>
