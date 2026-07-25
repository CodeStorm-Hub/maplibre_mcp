const { spawn } = require('child_process');
const assert = require('assert');

async function testStdioMCP() {
  console.log('--- Testing MCP Server stdio Protocol ---');

  const child = spawn('node', ['./dist/index.js'], {
    stdio: ['pipe', 'pipe', 'inherit']
  });

  let messageId = 1;
  let responseData = '';

  child.stdout.on('data', (chunk) => {
    responseData += chunk.toString();
    const lines = responseData.split('\n');
    for (let i = 0; i < lines.length - 1; i++) {
      const line = lines[i].trim();
      if (line) {
        try {
          const json = JSON.parse(line);
          handleJsonRpcResponse(json);
        } catch (e) {
          // ignore non-json
        }
      }
    }
    responseData = lines[lines.length - 1];
  });

  function sendRpc(method, params = {}) {
    const msg = {
      jsonrpc: '2.0',
      id: messageId++,
      method,
      params
    };
    child.stdin.write(JSON.stringify(msg) + '\n');
  }

  function handleJsonRpcResponse(json) {
    console.log(`[stdIO Response ID ${json.id}] Received.`);
    if (json.id === 1) {
      assert(json.result.serverInfo.name === 'maplibre-all-in-one-mcp', 'Server name match');
      console.log('✅ stdio test 1: initialize success');
      // Send tools/list
      sendRpc('tools/list');
    } else if (json.id === 2) {
      assert(json.result.tools.length === 11, 'Should expose 11 tools');
      console.log(`✅ stdio test 2: tools/list success (${json.result.tools.length} tools registered)`);
      // Call generate_flutter_map_scaffold tool
      sendRpc('tools/call', {
        name: 'generate_flutter_map_scaffold',
        arguments: { initialLatitude: 37.7749, initialLongitude: -122.4194 }
      });
    } else if (json.id === 3) {
      assert(json.result.content[0].text.includes('MaplibreMap'), 'Generated Flutter widget code returned');
      console.log('✅ stdio test 3: tools/call (generate_flutter_map_scaffold) success');
      child.kill();
      console.log('\n🎉 MCP STDIO PROTOCOL TEST PASSED SUCCESSFULLY! 🎉');
      process.exit(0);
    }
  }

  // 1. Send initialize request
  sendRpc('initialize', {
    protocolVersion: '2024-11-05',
    capabilities: {},
    clientInfo: { name: 'test-client', version: '1.0.0' }
  });
}

testStdioMCP().catch(err => {
  console.error('❌ stdio test failed:', err);
  process.exit(1);
});
