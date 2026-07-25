const { spawn } = require('child_process');
const path = require('path');

const serverPath = path.join(__dirname, '../dist/index.js');
const child = spawn('node', [serverPath], {
  stdio: ['pipe', 'pipe', 'inherit']
});

let buffer = '';

child.stdout.on('data', (chunk) => {
  buffer += chunk.toString();
  const lines = buffer.split('\n');
  buffer = lines.pop(); // keep last incomplete line

  for (const line of lines) {
    if (!line.trim()) continue;
    try {
      const response = JSON.parse(line.trim());
      console.log('Received JSON-RPC Response:', JSON.stringify(response, null, 2));
      if (response.id === 2) {
        child.kill();
        process.exit(0);
      }
    } catch (e) {
      console.error('Failed to parse line:', line);
    }
  }
});

// Step 1: Send initialize request
const initReq = {
  jsonrpc: '2.0',
  id: 1,
  method: 'initialize',
  params: {
    protocolVersion: '2024-11-05',
    capabilities: {},
    clientInfo: { name: 'test-client', version: '1.0.0' }
  }
};
child.stdin.write(JSON.stringify(initReq) + '\n');

// Step 2: Send tools/call request for search_maplibre_docs
setTimeout(() => {
  const callReq = {
    jsonrpc: '2.0',
    id: 2,
    method: 'tools/call',
    params: {
      name: 'search_maplibre_docs',
      arguments: {
        query: 'style load error onStyleLoadedCallback error handling fallback',
        ecosystem: 'flutter'
      }
    }
  };
  child.stdin.write(JSON.stringify(callReq) + '\n');
}, 500);
