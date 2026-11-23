import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const outputDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";

const joke = readFileSync(join(scriptDir, "entry.txt"), "utf8").trim();

if (joke.length < 1 || joke.length > 200) {
  throw new Error(`Joke must be 1-200 characters, got ${joke.length}`);
}
if (!/\S/.test(joke)) {
  throw new Error("Joke must not be only whitespace");
}

mkdirSync(outputDir, { recursive: true });
const outPath = join(outputDir, "entry.txt");
writeFileSync(outPath, joke, "utf8");

// Read back and confirm the output is byte-identical to the joke.
const written = readFileSync(outPath, "utf8");
if (written !== joke) {
  throw new Error("Output verification failed: written file differs from joke");
}
console.log(`Wrote ${joke.length} characters to ${outPath}`);
