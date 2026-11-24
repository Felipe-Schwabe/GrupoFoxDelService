import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const sourceDir = path.join(root, "assets", "source-images");
const publicDir = path.join(root, "public", "images");

async function webp(source, destination, options = {}) {
  const input = path.join(sourceDir, source);
  const output = path.join(publicDir, destination);
  const sourceMetadata = await sharp(input).metadata();
  let pipeline = sharp(input).rotate();
  if (options.extract) pipeline = pipeline.extract(options.extract);
  if (options.resize) pipeline = pipeline.resize(options.resize);
  await pipeline.webp({ quality: options.quality ?? 80, effort: 5, smartSubsample: true }).toFile(output);
  const metadata = await sharp(output).metadata();
  console.log(`${source}: ${sourceMetadata.width}x${sourceMetadata.height} -> ${destination}: ${metadata.width}x${metadata.height}`);
}

await webp("fox-del-service-team.png", "brand/fox-del-service-crest.webp", { quality: 88 });
await webp("capatazia.jpg", "hero/equipe-operacional.webp", {
  extract: { left: 470, top: 0, width: 600, height: 450 },
  quality: 82,
});
await webp("capatazia.jpg", "operations/equipe-capatazia.webp", {
  extract: { left: 0, top: 0, width: 1600, height: 480 },
  resize: { width: 1400, withoutEnlargement: true },
  quality: 80,
});
await webp("limpeza-comercial.jpg", "services/limpeza-comercial.webp", {
  resize: { width: 1000, withoutEnlargement: true },
  quality: 78,
});
