import { readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';

const root = JSON.parse(await readFile('package.json', 'utf8'));
const expectedVersion = (await readFile('VERSION', 'utf8')).trim();
if (root.private !== true) throw new Error('Root package must be private');
if (root.packageManager !== 'pnpm@11.15.0') throw new Error('Unexpected package manager');
const manifests = [];
for (const parent of ['apps', 'packages', 'services']) {
  for (const entry of await readdir(parent, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const path = join(parent, entry.name, 'package.json');
    try {
      manifests.push([path, JSON.parse(await readFile(path, 'utf8'))]);
    } catch (error) {
      if (error.code !== 'ENOENT') throw error;
    }
  }
}
const names = new Set();
for (const [path, manifest] of manifests) {
  if (names.has(manifest.name)) throw new Error(`Duplicate workspace package ${manifest.name}`);
  names.add(manifest.name);
  if (manifest.private !== true || manifest.version !== expectedVersion)
    throw new Error(`${path}: private/version mismatch`);
  if (manifest.engines?.node !== root.engines.node)
    throw new Error(`${path}: Node engine mismatch`);
  for (const script of ['build', 'clean', 'typecheck', 'test:unit', 'test:coverage'])
    if (!manifest.scripts?.[script]) throw new Error(`${path}: missing ${script}`);
  const dependencies = { ...manifest.dependencies, ...manifest.devDependencies };
  for (const [name, version] of Object.entries(dependencies))
    if (name.startsWith('@gemwatch/') && version !== 'workspace:*')
      throw new Error(`${path}: invalid workspace dependency ${name}`);
}
for (const lock of ['package-lock.json', 'yarn.lock', 'bun.lockb']) {
  try {
    await readFile(lock);
    throw new Error(`Forbidden lockfile: ${lock}`);
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }
}
await readFile('pnpm-lock.yaml');
console.log(`Workspace validation passed for ${manifests.length} packages.`);
