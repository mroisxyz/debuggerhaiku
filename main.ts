import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

// hello: this module finds its own folder via import.meta.url.
const here = fileURLToPath(new URL('.', import.meta.url));

// The batch is fixed: five, seven, five, and nothing added.
const entry = [
  'The cursor blinks slow',
  'three logs say the value changed',
  'the bug was the clock',
].join('\n');

async function main(): Promise<void> {
  // The orders are plain: recursive mkdir first, writeFile second.
  const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
  await mkdir(outputDir, { recursive: true });
  await writeFile(join(outputDir, 'entry.txt'), entry, 'utf8');
  // A single slot in stdout reports the exact written size.
  console.log(`entry.txt: ${Buffer.byteLength(entry, 'utf8')} bytes`);
}

await main();
