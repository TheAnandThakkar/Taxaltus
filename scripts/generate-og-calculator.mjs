import sharp from "sharp";
import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const logoB64 = readFileSync(join(root, "public/logo.png")).toString("base64");

const W = 1200;
const H = 630;
const gold = "#F0B24A";
const teal = "#2DD4BF";

const svg = `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#1d2c4d"/>
      <stop offset="0.55" stop-color="#142037"/>
      <stop offset="1" stop-color="#0e1830"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.82" cy="0.4" r="0.6">
      <stop offset="0" stop-color="#0D9488" stop-opacity="0.30"/>
      <stop offset="1" stop-color="#0D9488" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="head" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#1B2A4A"/>
      <stop offset="1" stop-color="#24365e"/>
    </linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="18" stdDeviation="26" flood-color="#000000" flood-opacity="0.35"/>
    </filter>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>
  <circle cx="1010" cy="300" r="300" fill="none" stroke="#ffffff" stroke-opacity="0.05" stroke-width="2"/>
  <circle cx="1010" cy="300" r="210" fill="none" stroke="#0D9488" stroke-opacity="0.12" stroke-width="2"/>
  <path d="M690 560 Q 940 470 1180 540" fill="none" stroke="${gold}" stroke-opacity="0.35" stroke-width="3"/>

  <!-- Logo -->
  <image x="80" y="74" width="300" height="76" preserveAspectRatio="xMinYMid meet"
         xlink:href="data:image/png;base64,${logoB64}"/>

  <!-- Headline (two lines) -->
  <text x="82" y="262" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="62" font-weight="800" fill="${gold}" letter-spacing="-1">Full Income Tax</text>
  <text x="82" y="330" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="62" font-weight="800" fill="${gold}" letter-spacing="-1">Calculator</text>

  <!-- Divider -->
  <rect x="84" y="362" width="300" height="4" rx="2" fill="#ffffff" opacity="0.18"/>
  <circle cx="408" cy="364" r="6" fill="${teal}"/>

  <!-- Sub-lines -->
  <text x="84" y="428" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="31" font-weight="400" fill="#ffffff" opacity="0.82">Compare Old vs New regime</text>
  <text x="84" y="476" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="31" font-weight="700" fill="${teal}">Salary · House Property · Capital Gains</text>

  <!-- ===== Right illustration: Old vs New comparison card ===== -->
  <g transform="rotate(-5 980 270)" filter="url(#shadow)">
    <rect x="838" y="116" width="306" height="392" rx="24" fill="#ffffff"/>

    <!-- Header -->
    <rect x="838" y="116" width="306" height="86" rx="24" fill="url(#head)"/>
    <rect x="838" y="172" width="306" height="30" fill="url(#head)"/>
    <text x="868" y="162" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="28" font-weight="800" fill="#ffffff">Old vs New</text>
    <text x="868" y="186" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="13" font-weight="400" fill="#ffffff" opacity="0.7">Total tax compared</text>

    <!-- OLD regime bar -->
    <text x="868" y="246" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="14" font-weight="700" fill="#1B2A4A" opacity="0.55" letter-spacing="0.5">OLD REGIME</text>
    <rect x="868" y="258" width="248" height="30" rx="8" fill="#1B2A4A" opacity="0.12"/>
    <rect x="868" y="258" width="234" height="30" rx="8" fill="#1B2A4A"/>

    <!-- NEW regime bar (shorter = less tax) -->
    <text x="868" y="328" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="14" font-weight="700" fill="#0D9488" letter-spacing="0.5">NEW REGIME</text>
    <rect x="868" y="340" width="248" height="30" rx="8" fill="#0D9488" opacity="0.12"/>
    <rect x="868" y="340" width="150" height="30" rx="8" fill="#0D9488"/>
    <circle cx="1042" cy="355" r="16" fill="#0D9488"/>
    <path d="M1034 355 l6 6 l11 -13" fill="none" stroke="#ffffff" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/>

    <!-- Verdict pill -->
    <rect x="868" y="408" width="248" height="50" rx="14" fill="#0D9488" opacity="0.10"/>
    <circle cx="896" cy="433" r="13" fill="#0D9488"/>
    <path d="M889 433 l5 5 l9 -11" fill="none" stroke="#ffffff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <text x="920" y="439" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="16" font-weight="700" fill="#0D9488">Lower tax · recommended</text>
  </g>
</svg>`;

const out = process.argv[2] || join(root, "public/og-income-tax-calculator-preview.png");
const SCALE = 2;
await sharp(Buffer.from(svg), { density: 384 })
  .resize(W * SCALE, H * SCALE, { kernel: "lanczos3" })
  .png({ quality: 100, compressionLevel: 9 })
  .toFile(out);
writeFileSync(join(root, "scripts/.og-calc-debug.svg"), svg);
console.log("Wrote", out);
