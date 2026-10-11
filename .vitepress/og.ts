import { mkdirSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { join } from 'node:path';
import { Resvg } from '@resvg/resvg-js';

const require = createRequire(import.meta.url);
const fontsDir = join(require.resolve('@expo-google-fonts/montserrat/package.json'), '..');
const fontFiles = [
    join(fontsDir, '700Bold/Montserrat_700Bold.ttf'),
    join(fontsDir, '500Medium/Montserrat_500Medium.ttf')
];

export interface OgPage {
    title: string;
    description: string;
}

/** Name of the generated image for a page, e.g. `guide/mixins.md` → `guide-mixins`. */
export function ogImageName(relativePath: string): string {
    return relativePath.replace(/\.md$/, '').replace(/\//g, '-');
}

const escapeXml = (text: string) => text.replace(/[&<>"']/g, c => `&#${c.charCodeAt(0)};`);

function wrap(text: string, maxChars: number, maxLines: number): string[] {
    const lines: string[] = [];
    let line = '';

    for (const word of text.split(/\s+/)) {
        if (line && `${line} ${word}`.length > maxChars) {
            lines.push(line);
            line = word;
        } else {
            line = line ? `${line} ${word}` : word;
        }
    }
    if (line) lines.push(line);

    if (lines.length > maxLines) {
        const kept = lines.slice(0, maxLines);
        kept[maxLines - 1] = `${kept[maxLines - 1].replace(/[.,;:\s]+$/, '')}…`;
        return kept;
    }

    return lines;
}

function renderSvg({ title, description }: OgPage): string {
    const titleLines = wrap(title, 24, 2);
    const descLines = wrap(description, 52, 3);
    const titleY = 250;
    const titleSize = 80;
    const descY = titleY + (titleLines.length - 1) * (titleSize + 10) + 90;

    const titleText = titleLines
        .map((l, i) => `<tspan x="100" y="${titleY + i * (titleSize + 10)}">${escapeXml(l)}</tspan>`)
        .join('');
    const descText = descLines
        .map((l, i) => `<tspan x="102" y="${descY + i * 46}">${escapeXml(l)}</tspan>`)
        .join('');

    return `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="brand" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#0040ca"/>
      <stop offset="0.5" stop-color="#0071d7"/>
      <stop offset="1" stop-color="#00b2e9"/>
    </linearGradient>
    <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
      <path d="M60 0H0V60" fill="none" stroke="#ffffff" stroke-opacity="0.045"/>
    </pattern>
  </defs>
  <rect width="1200" height="630" fill="#0b0f17"/>
  <rect width="1200" height="630" fill="url(#grid)"/>
  <rect width="1200" height="6" fill="url(#brand)"/>
  <text x="100" y="110" font-family="Montserrat" font-size="30" font-weight="700" letter-spacing="2" fill="url(#brand)">MAGNESIUM</text>
  <text font-family="Montserrat" font-size="${titleSize}" font-weight="700" fill="#ffffff">${titleText}</text>
  <text font-family="Montserrat" font-size="32" font-weight="500" fill="#c9d4e3">${descText}</text>
  <text x="102" y="570" font-family="Montserrat" font-size="24" font-weight="500" letter-spacing="3" fill="#5b6b82">MAGNESIUM.DEV</text>
</svg>`;
}

export function generateOgImages(pages: Map<string, OgPage>, outDir: string): void {
    const dir = join(outDir, 'og');
    mkdirSync(dir, { recursive: true });

    for (const [relativePath, page] of pages) {
        const png = new Resvg(renderSvg(page), {
            font: { fontFiles, loadSystemFonts: false, defaultFontFamily: 'Montserrat' }
        }).render().asPng();

        writeFileSync(join(dir, `${ogImageName(relativePath)}.png`), png);
    }
}
