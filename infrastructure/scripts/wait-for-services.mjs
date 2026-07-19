import net from 'node:net';

async function wait(host, port, timeoutMs = 30_000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    const open = await new Promise((resolve) => {
      const socket = net.createConnection({ host, port });
      socket.setTimeout(500);
      socket.once('connect', () => {
        socket.destroy();
        resolve(true);
      });
      socket.once('error', () => resolve(false));
      socket.once('timeout', () => {
        socket.destroy();
        resolve(false);
      });
    });
    if (open) return;
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error(`Timed out waiting for ${host}:${port}`);
}
await Promise.all([
  wait('127.0.0.1', Number(process.env.POSTGRES_HOST_PORT ?? 5432)),
  wait('127.0.0.1', Number(process.env.REDIS_HOST_PORT ?? 6379)),
]);
console.log('Local infrastructure ports are reachable.');
