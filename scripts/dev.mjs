import { createServer } from "node:net";
import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const START_PORT = 3002;
const END_PORT = 3999;

function canListen(port) {
  return new Promise((resolve) => {
    const server = createServer();

    server.once("error", () => {
      resolve(false);
    });

    server.once("listening", () => {
      server.close(() => resolve(true));
    });

    server.listen({ port, host: "::" });
  });
}

async function findOpenPort() {
  for (let port = START_PORT; port <= END_PORT; port += 1) {
    // Use the first available port in the configured range.
    // This avoids hard failures when common dev ports are occupied.
    // eslint-disable-next-line no-await-in-loop
    if (await canListen(port)) {
      return port;
    }
  }

  throw new Error(`No open port found between ${START_PORT} and ${END_PORT}.`);
}

async function main() {
  try {
    const port = await findOpenPort();
    console.log(`Starting Next.js dev server on port ${port}...`);

    const currentDir = path.dirname(fileURLToPath(import.meta.url));
    const nextCliPath = path.resolve(
      currentDir,
      "../node_modules/next/dist/bin/next",
    );
    const child = spawn(
      process.execPath,
      [nextCliPath, "dev", "-p", String(port)],
      {
        stdio: "inherit",
        env: process.env,
      },
    );

    child.on("exit", (code, signal) => {
      if (signal) {
        process.kill(process.pid, signal);
        return;
      }

      process.exit(code ?? 0);
    });
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

main();
