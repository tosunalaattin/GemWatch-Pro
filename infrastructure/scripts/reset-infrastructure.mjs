import { spawnSync } from 'node:child_process';

if (!process.argv.includes('--confirm-local-data-loss')) {
  console.error(
    'Refusing destructive reset. Re-run with --confirm-local-data-loss for local volumes only.',
  );
  process.exit(2);
}
const result = spawnSync('docker', ['compose', 'down', '--volumes'], {
  stdio: 'inherit',
  shell: process.platform === 'win32',
});
process.exit(result.status ?? 1);
