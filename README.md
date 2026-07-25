# MapLibre All-in-One MCP Server (`maplibre-mcp-server`)

[![GitHub Release](https://img.shields.io/github/v/release/CodeStorm-Hub/maplibre_mcp?style=flat-square&color=blue)](https://github.com/CodeStorm-Hub/maplibre_mcp/releases/tag/v1.0.0)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node Version](https://img.shields.io/badge/node-%3E%3D18.0.0-blue.svg)](https://nodejs.org/)
[![Model Context Protocol](https://img.shields.io/badge/MCP-SDK--1.6.0-brightgreen.svg)](https://modelcontextprotocol.io/)

An open-source, multi-capability **Model Context Protocol (MCP) Server** hosted by **[CodeStorm Hub](https://github.com/CodeStorm-Hub)** providing AI coding assistants (Claude Desktop, Cursor, Antigravity, Windsurf) with comprehensive access to the entire **MapLibre** open-source mapping ecosystem.

---

## 📐 Architecture Overview

The MapLibre MCP Server is built on a modular **2-Layer Architecture**:

```
                       +------------------------------------------+
                       |       AI Coding Agent (Claude / Cursor)   |
                       +--------------------+---------------------+
                                            | (JSON-RPC 2.0 Protocol)
                                            v
+-----------------------------------------------------------------------------------+
|                            MAPLIBRE ALL-IN-ONE MCP SERVER                         |
+-----------------------------------------------------------------------------------+
|                                                                                   |
|  [Layer 1: Core & Base Foundation]              [Layer 2: Framework Focus (Flutter)]|
|   • Docs & Knowledge Engine (43 Repos)           • Flutter Project Setup Scaffolder   |
|   • Style Spec Validator & Generator             • Flutter MapLibre Widget Builder    |
|   • Martin Tile Server & Infrastructure           • Flutter PMTiles / MBTiles Loader   |
|   • Community Agent Skills                       • Flutter Layer & Annotation Builder |
|   • Offline Spatial Viewport Math                • Flutter GeoJSON Clustering Engine  |
|                                                                                   |
+-----------------------------------------------------------------------------------+
```

---

## 🛠️ Installation Guide

### Prerequisites
* **Node.js**: v18.0.0 or higher
* **npm**: v9.0.0 or higher

---

### Option A: Direct NPX Execution from GitHub (Recommended)

No manual code downloading required! You can run the MCP server directly from the official **CodeStorm Hub** GitHub repository.

#### **1. Antigravity CLI (`mcp_config.json`)**

Add to your `~/.gemini/config/mcp_config.json`:

```json
{
  "mcpServers": {
    "maplibre": {
      "command": "npx.cmd",
      "args": [
        "-y",
        "github:CodeStorm-Hub/maplibre_mcp"
      ]
    }
  }
}
```

#### **2. Claude Desktop (`claude_desktop_config.json`)**

* **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
* **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "maplibre": {
      "command": "npx",
      "args": [
        "-y",
        "github:CodeStorm-Hub/maplibre_mcp"
      ]
    }
  }
}
```

#### **3. Cursor IDE / Windsurf**

1. Navigate to **Settings** -> **MCP**.
2. Click **+ Add New MCP Server**.
3. Set **Name**: `maplibre`
4. Set **Type**: `command`
5. Set **Command**: `npx -y github:CodeStorm-Hub/maplibre_mcp`

---

### Option B: Local Repository Build

```bash
# Clone from CodeStorm Hub GitHub Organization
git clone https://github.com/CodeStorm-Hub/maplibre_mcp.git
cd maplibre_mcp

# Install dependencies and build TypeScript code
npm install
npm run build

# Start the stdio MCP server
npm start
```

Point your MCP client configuration to local binary `dist/index.js`:
```json
{
  "mcpServers": {
    "maplibre": {
      "command": "node",
      "args": ["/path/to/maplibre_mcp/dist/index.js"]
    }
  }
}
```

---

## 📚 Complete Tool Usage Guide & Examples

The MapLibre MCP Server exposes **11 specialized tools** divided into two layers.

---

### Layer 1: Core Base Tools

#### 1. `search_maplibre_docs`
Search documentation, guides, and example code across all 43 developer repositories in the MapLibre organization.

* **Example Input:**
  ```json
  {
    "query": "native",
    "ecosystem": "native"
  }
  ```

---

#### 2. `validate_maplibre_style`
Parse and validate a MapLibre Style JSON object against the official `@maplibre/maplibre-gl-style-spec`.

* **Example Input:**
  ```json
  {
    "styleJson": {
      "version": 8,
      "sources": {},
      "layers": []
    }
  }
  ```

---

#### 3. `generate_maplibre_style`
Construct a complete, valid MapLibre Style JSON for light/dark themes, 3D fill-extrusion buildings, terrain, or satellite basemaps.

* **Example Input:**
  ```json
  {
    "theme": "dark",
    "tileSource": "openfreemap",
    "enable3DBuildings": true
  }
  ```

---

#### 4. `generate_tile_server_config`
Generate configurations for tile servers (Martin Docker Compose, PostGIS `ST_AsMVT` SQL function, Cloudflare R2 CORS config, PMTiles CLI setup).

* **Example Input:**
  ```json
  {
    "target": "martin-docker",
    "dbName": "spatial_db"
  }
  ```

---

#### 5. `get_maplibre_agent_skill`
Retrieve structured community agent skills (`mapbox-migration`, `pmtiles-patterns`, `tile-sources`).

* **Example Input:**
  ```json
  {
    "skill": "pmtiles-patterns"
  }
  ```

---

#### 6. `calc_map_viewport`
Offline spatial math calculator that computes camera center `[lng, lat]`, `LatLngBounds`, and optimal zoom levels for coordinate arrays.

* **Example Input:**
  ```json
  {
    "coordinates": [
      [-74.0060, 40.7128],
      [-73.9352, 40.7306]
    ],
    "padding": 0.05
  }
  ```

---

### Layer 2: Dart / Flutter Tools

#### 7. `setup_flutter_maplibre_project`
Scaffold Flutter project setup files: `pubspec.yaml` dependencies, Android `AndroidManifest.xml` location permissions, and iOS `Info.plist` privacy keys.

* **Example Input:**
  ```json
  {
    "packageName": "speedy_delivery",
    "includeLocationPermissions": true
  }
  ```

---

#### 8. `generate_flutter_map_scaffold`
Generate a complete Flutter widget implementing MapLibre with camera position, style URL, gesture controls, and map controller.

* **Example Input:**
  ```json
  {
    "packageType": "maplibre_gl",
    "styleSource": "pmtiles",
    "initialLatitude": 35.6762,
    "initialLongitude": 139.6503,
    "initialZoom": 13.5,
    "enableMyLocation": true
  }
  ```

---

#### 9. `generate_flutter_pmtiles_config`
Generate Dart code for registering local or remote `.pmtiles` and `.mbtiles` custom protocols in a Flutter app.

* **Example Input:**
  ```json
  {
    "tileType": "pmtiles",
    "isLocalAsset": true,
    "filePathOrUrl": "assets/tokyo.pmtiles"
  }
  ```

---

#### 10. `generate_flutter_map_layer`
Generate Dart code for vector/raster layers (Symbol, Line, Fill, Circle, Heatmap, 3D Fill Extrusion) with paint properties.

* **Example Input:**
  ```json
  {
    "layerType": "fill-extrusion",
    "sourceId": "building-source",
    "layerId": "building-3d"
  }
  ```

---

#### 11. `generate_flutter_geojson_cluster`
Generate Dart code for loading GeoJSON point sources with interactive clustering (`ClusterOptions`), count badges, and click handlers.

* **Example Input:**
  ```json
  {
    "sourceId": "ev-stations",
    "geoJsonUrlOrPath": "assets/ev_stations.geojson",
    "clusterMaxZoom": 15,
    "clusterRadius": 40
  }
  ```

---

## 🧪 Testing & Validation

```bash
# Run unit & integration test suite
npm test

# Test JSON-RPC stdio protocol execution
node test/stdio_test.js
```

---

## 🤝 Organization & License

Hosted and maintained by **[CodeStorm Hub](https://github.com/CodeStorm-Hub)**.
Distributed under the **MIT License**. Free for open-source and commercial use.
