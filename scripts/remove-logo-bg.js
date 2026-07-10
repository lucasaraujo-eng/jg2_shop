const sharp = require('sharp');

const SRC = process.argv[2];
const OUT = process.argv[3];
const THRESHOLD = 235;

async function main() {
  const img = sharp(SRC).ensureAlpha();
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;

  const isWhite = (i) => {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    return r >= THRESHOLD && g >= THRESHOLD && b >= THRESHOLD;
  };

  const visited = new Uint8Array(width * height);
  const queue = [];

  function idx(x, y) { return (y * width + x) * channels; }
  function pushIfWhite(x, y) {
    if (x < 0 || y < 0 || x >= width || y >= height) return;
    const p = y * width + x;
    if (visited[p]) return;
    const i = idx(x, y);
    if (!isWhite(i)) return;
    visited[p] = 1;
    queue.push([x, y]);
  }

  for (let x = 0; x < width; x++) { pushIfWhite(x, 0); pushIfWhite(x, height - 1); }
  for (let y = 0; y < height; y++) { pushIfWhite(0, y); pushIfWhite(width - 1, y); }

  while (queue.length) {
    const [x, y] = queue.pop();
    const i = idx(x, y);
    data[i + 3] = 0;
    pushIfWhite(x + 1, y);
    pushIfWhite(x - 1, y);
    pushIfWhite(x, y + 1);
    pushIfWhite(x, y - 1);
  }

  await sharp(data, { raw: { width, height, channels } }).png().toFile(OUT);
  console.log('done ->', OUT);
}

main().catch((e) => { console.error(e); process.exit(1); });
