# 🌐 MCP Server Registry Submission Guide

To maximize exposure and allow AI clients across the web to discover the **MapLibre All-in-One MCP Server**, submit the server to the 4 major open MCP registries:

---

## 1. Anthropic Official MCP Registry (`modelcontextprotocol/registry`)

Submit a pull request to add `maplibre-mcp-server` to the official MCP registry repository:
* **Repository**: [https://github.com/modelcontextprotocol/registry](https://github.com/modelcontextprotocol/registry)
* **JSON Entry**:
  ```json
  {
    "name": "maplibre-mcp-server",
    "description": "All-in-One Model Context Protocol (MCP) Server for the MapLibre Open-Source Mapping Ecosystem",
    "repository": "https://github.com/CodeStorm-Hub/maplibre_mcp",
    "license": "MIT",
    "tags": ["maplibre", "gis", "maps", "flutter", "pmtiles", "martin"]
  }
  ```

---

## 2. Glama.ai MCP Registry

Glama automatically indexes GitHub repositories tagged with `mcp` and `mcp-server`.
* **URL**: [https://glama.ai/mcp/servers](https://glama.ai/mcp/servers)
* **Action Taken**: Repository tagged with topics `mcp`, `model-context-protocol`, `maplibre`, `flutter`, `geospatial`, `gis`. Glama indexes it automatically within 24 hours.

---

## 3. Smithery.ai Directory

Publish directly to Smithery via their CLI tool:
```bash
npx -y @smithery/cli publish "https://github.com/CodeStorm-Hub/maplibre_mcp" -n maplibre-mcp-server
```

---

## 4. Awesome MCP Servers (`punkpeaches/awesome-mcp-servers`)

Submit a PR to add MapLibre MCP Server under the **Geospatial & Mapping** category:
* **Repository**: [https://github.com/punkpeaches/awesome-mcp-servers](https://github.com/punkpeaches/awesome-mcp-servers)
* **Markdown Snippet**:
  ```markdown
  - [MapLibre MCP Server](https://github.com/CodeStorm-Hub/maplibre_mcp) - Comprehensive MCP server for MapLibre WebGL, Native C++, Flutter widgets, PMTiles archives, and Martin Rust tile servers.
  ```
