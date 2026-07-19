import { readFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';

const files = execFileSync('git', ['ls-files', '--cached', '--others', '--exclude-standard'], {
  encoding: 'utf8',
})
  .split(/\r?\n/u)
  .filter(Boolean);
const patterns = [
  ['AWS access key', /AKIA[0-9A-Z]{16}/u],
  ['private key', /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/u],
  ['seed phrase assignment', /seed[_ -]?phrase\s*[:=]\s*["'][^"']{12,}/iu],
  [
    'generic secret assignment',
    /(?:api[_-]?key|secret|token)\s*[:=]\s*["'][A-Za-z0-9_-]{24,}["']/iu,
  ],
];
const findings = [];
for (const file of files) {
  if (/^(?:pnpm-lock\.yaml|LICENSE)$/u.test(file)) continue;
  const text = await readFile(file, 'utf8').catch(() => '');
  for (const [name, pattern] of patterns) if (pattern.test(text)) findings.push(`${file}: ${name}`);
}
if (findings.length) throw new Error(`Potential secrets detected:\n${findings.join('\n')}`);
console.log(`Secret pattern scan passed for ${files.length} tracked files.`);
