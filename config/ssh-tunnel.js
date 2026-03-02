import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const require = createRequire(import.meta.url);
const tunnelModule = require('tunnel-ssh');
const tunnel = tunnelModule.default || tunnelModule;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let tunnelServer;

const sshConfig = {
  host: process.env.SSH_HOST,
  port: 22,
  username: process.env.SSH_USER,
  password: process.env.SSH_PASSWORD,
};

const forwardConfig = {
  srcHost: '127.0.0.1',
  srcPort: parseInt(process.env.DB_PORT),
  dstHost: 'localhost',
  dstPort: 3306,
};

export async function createSSHTunnel() {
  return new Promise((resolve, reject) => {
    try {
      console.log('🔗 Attempting SSH tunnel connection to:', process.env.SSH_HOST);
      tunnel(sshConfig, (error, server) => {
        if (error) {
          console.error('❌ SSH Tunnel Error:', error.message);
          reject(error);
        } else {
          console.log('✅ SSH Tunnel connected successfully!');
          tunnelServer = server;
          resolve(server);
        }
      });
    } catch (err) {
      console.error('❌ SSH Tunnel exception:', err.message);
      reject(err);
    }
  });
}

export function closeSSHTunnel() {
  if (tunnelServer) {
    tunnelServer.close();
    console.log('SSH Tunnel closed');
  }
}
