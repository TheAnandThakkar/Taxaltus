import sharp from "sharp";
import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const logoB64 = readFileSync(join(root, "public/logo.png")).toString("base64");

const W = 1200;
const H = 630;

// Brand palette (from tailwind.config.js)
const navy = "#1B2A4A";
const gold = "#F0B24A"; // brightened gold for contrast on dark navy
const teal = "#2DD4BF"; // brightened teal for contrast on dark navy

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
    <linearGradient id="cardHead" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#0D9488"/>
      <stop offset="1" stop-color="#14B8A6"/>
    </linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="18" stdDeviation="26" flood-color="#000000" flood-opacity="0.35"/>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>

  <!-- Decorative rings on the right -->
  <circle cx="1010" cy="300" r="300" fill="none" stroke="#ffffff" stroke-opacity="0.05" stroke-width="2"/>
  <circle cx="1010" cy="300" r="210" fill="none" stroke="#0D9488" stroke-opacity="0.12" stroke-width="2"/>
  <path d="M690 560 Q 940 470 1180 540" fill="none" stroke="${gold}" stroke-opacity="0.35" stroke-width="3"/>

  <!-- Logo lockup (real brand asset) -->
  <image x="80" y="74" width="300" height="76" preserveAspectRatio="xMinYMid meet"
         xlink:href="data:image/png;base64,${logoB64}"/>

  <!-- Headline -->
  <text x="82" y="312" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="60" font-weight="800" fill="${gold}" letter-spacing="-1">Income Tax Companion</text>

  <!-- Divider -->
  <rect x="84" y="344" width="300" height="4" rx="2" fill="#ffffff" opacity="0.18"/>
  <circle cx="408" cy="346" r="6" fill="${teal}"/>

  <!-- Sub-lines -->
  <text x="84" y="414" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="32" font-weight="400" fill="#ffffff" opacity="0.82">A non-profit tax education initiative</text>
  <text x="84" y="466" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="34" font-weight="700" fill="${teal}">For Indian salaried employees</text>

  <!-- ===== Right illustration: Form 16 specimen ===== -->
  <!-- Folder behind for depth -->
  <g transform="rotate(5 950 390)">
    <rect x="800" y="320" width="320" height="240" rx="22" fill="#21325a"/>
    <path d="M824 320 v-16 a14 14 0 0 1 14 -14 h74 a14 14 0 0 1 14 14 v16 z" fill="${gold}" opacity="0.9"/>
  </g>

  <!-- Form 16 certificate card -->
  <g transform="rotate(-5 980 270)" filter="url(#shadow)">
    <rect x="838" y="92" width="306" height="392" rx="24" fill="#ffffff"/>

    <!-- Header band -->
    <rect x="838" y="92" width="306" height="92" rx="24" fill="${navy}"/>
    <rect x="838" y="150" width="306" height="34" fill="${navy}"/>
    <text x="868" y="140" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="30" font-weight="800" fill="#ffffff">Form 16</text>
    <text x="868" y="166" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="13" font-weight="400" fill="#ffffff" opacity="0.7">Certificate under Section 203</text>

    <!-- Part B label -->
    <text x="868" y="226" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="13" font-weight="700" fill="#0D9488" letter-spacing="1.2">PART B · SALARY DETAILS</text>

    <!-- Salary rows: label + value -->
    <text x="868" y="266" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="16" font-weight="500" fill="#1B2A4A" opacity="0.62">Gross Salary</text>
    <rect x="1036" y="255" width="80" height="13" rx="6" fill="#1B2A4A" opacity="0.20"/>

    <text x="868" y="302" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="16" font-weight="500" fill="#1B2A4A" opacity="0.62">Std. Deduction</text>
    <rect x="1056" y="291" width="60" height="13" rx="6" fill="#1B2A4A" opacity="0.20"/>

    <text x="868" y="338" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="16" font-weight="500" fill="#1B2A4A" opacity="0.62">Taxable Income</text>
    <rect x="1046" y="327" width="70" height="13" rx="6" fill="#1B2A4A" opacity="0.20"/>

    <line x1="868" y1="360" x2="1116" y2="360" stroke="#1B2A4A" stroke-opacity="0.10" stroke-width="2"/>

    <!-- Tax payable highlighted row -->
    <rect x="868" y="374" width="248" height="50" rx="14" fill="#0D9488"/>
    <text x="892" y="405" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="17" font-weight="700" fill="#ffffff">Tax Payable</text>
    <rect x="1024" y="392" width="74" height="15" rx="7" fill="#ffffff" opacity="0.9"/>

    <!-- Signature line -->
    <line x1="868" y1="452" x2="980" y2="452" stroke="#1B2A4A" stroke-opacity="0.18" stroke-width="2"/>
    <text x="868" y="470" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="12" font-weight="400" fill="#1B2A4A" opacity="0.45">Authorised Signatory</text>
  </g>
</svg>`;

const out = process.argv[2] || join(root, "public/og-taxaltus-preview.png");
const svgBuf = Buffer.from(svg);

// Render the vector at 4x (density 384 -> 4800px wide from a 1200px SVG), then
// downsample to a 2x output (2400x1260) with Lanczos for razor-sharp text.
const SCALE = 2;
await sharp(svgBuf, { density: 384 })
  .resize(W * SCALE, H * SCALE, { kernel: "lanczos3" })
  .png({ quality: 100, compressionLevel: 9 })
  .toFile(out);

writeFileSync(join(root, "scripts/.og-debug.svg"), svg);
const { size } = await sharp(out).metadata().then((m) => ({ size: `${m.width}x${m.height}` }));
console.log("Wrote", out, size);
