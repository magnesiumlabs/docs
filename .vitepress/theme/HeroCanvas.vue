<script setup>
/**
 * Home hero illustration: the "define → emit → consume" stack, dropping one layer at a time on
 * an infinite loop. Ported from the standalone prototype next to this file (hero-canvas.prototype.html) into the
 * theme's `home-hero-image` slot so it lives inside the actual hero layout instead of a page of
 * its own.
 */
import { onMounted, onUnmounted, ref } from 'vue';
import { useData } from 'vitepress';

const { isDark } = useData();
const canvasEl = ref(null);
let rafId = null;

const STACK_LAYERS = [
    { label: '1. DEFINE', sub: '$tokens map', colorHex: '#00f2fe', delay: 0, duration: 2000 },
    { label: '2. EMIT', sub: '@layer tokens', colorHex: '#bd34fe', delay: 1800, duration: 2000 },
    { label: '3. CONSUME', sub: 'var(--mg-*)', colorHex: '#ff0844', delay: 3600, duration: 2000 }
];

const HOLD_TIME = 2200;
const FADE_OUT_TIME = 1000;
const TOTAL_CYCLE = 3600 + 2000 + HOLD_TIME + FADE_OUT_TIME;

const BASE_SIZE = 260;
const BASE_OFFSET = BASE_SIZE / 2;
const BASE_RADIUS = 24;
const BASE_HEIGHT_3D = 20;

const LAYER_W = 200;
const LAYER_H = 200;
const GAP = 38;
const DROP_HEIGHT = -320;

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
    const CX = canvas.width / 2;
    const CY = canvas.height * 0.65;

    function draw3DPedestal(colors) {
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

    function animate(time) {
        const colors = getThemeColors();

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        draw3DPedestal(colors);

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

        rafId = requestAnimationFrame(animate);
    }

    rafId = requestAnimationFrame(animate);
});

onUnmounted(() => {
    if (rafId) cancelAnimationFrame(rafId);
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
