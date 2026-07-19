import { access, readFile, readdir } from 'node:fs/promises';
import { dirname, extname, isAbsolute, join, normalize, resolve } from 'node:path';

const root = process.cwd();
const required = [
  'README.md',
  'docs/PROJECT_SESSION_STATE.md',
  'docs/AI_HANDOFF.md',
  'docs/AI_MEMORY.md',
  'docs/MASTER_PROMPT.md',
  'docs/GemWatch_Engineering_Specification.md',
  'docs/CHANGELOG.md',
];
await Promise.all(required.map(async (file) => access(join(root, file))));

async function markdownFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(
    entries
      .filter((entry) => !['node_modules', '.git'].includes(entry.name))
      .map(async (entry) => {
        const target = join(directory, entry.name);
        return entry.isDirectory()
          ? markdownFiles(target)
          : extname(entry.name) === '.md'
            ? [target]
            : [];
      }),
  );
  return nested.flat();
}

const files = await markdownFiles(root);
const problems = [];
const adrNumbers = new Set();
for (const file of files) {
  const text = await readFile(file, 'utf8');
  const fences = text.match(/^```/gmu)?.length ?? 0;
  if (fences % 2 !== 0) problems.push(`${file}: unclosed code fence`);
  const mermaidOpen = text.match(/^```mermaid\s*$/gmu)?.length ?? 0;
  if (mermaidOpen > 0 && fences < mermaidOpen * 2)
    problems.push(`${file}: unbalanced Mermaid fence`);
  for (const match of text.matchAll(/\[[^\]]+\]\(([^)]+)\)/gu)) {
    const target = match[1];
    if (!target || /^(?:https?:|mailto:|#)/u.test(target)) continue;
    if (isAbsolute(target) || /^[A-Za-z]:[\\/]/u.test(target)) {
      problems.push(`${file}: absolute local link ${target}`);
      continue;
    }
    const clean = decodeURIComponent(target.split('#')[0] ?? '');
    if (
      clean &&
      !(await access(resolve(dirname(file), normalize(clean)))
        .then(() => true)
        .catch(() => false))
    )
      problems.push(`${file}: broken link ${target}`);
  }
  const name = file.match(/ADR-(\d{4})-/u)?.[1];
  if (name) {
    if (adrNumbers.has(name)) problems.push(`Duplicate ADR number ${name}`);
    adrNumbers.add(name);
  }
  if (/AKIA[0-9A-Z]{16}|-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/u.test(text))
    problems.push(`${file}: secret-like value`);
}
const version = (await readFile('VERSION', 'utf8')).trim();
const state = await readFile('docs/PROJECT_SESSION_STATE.md', 'utf8');
const changelog = await readFile('docs/CHANGELOG.md', 'utf8');
if (!state.includes(`Product version: ${version}`)) problems.push('State product version mismatch');
if (!changelog.includes(`## [${version}]`)) problems.push('Changelog version mismatch');
if (problems.length) throw new Error(problems.join('\n'));
console.log(`Documentation validation passed for ${files.length} Markdown files.`);
