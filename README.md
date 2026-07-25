# MapLibre All-in-One MCP Server (`maplibre-mcp-server`)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node Version](https://img.shields.io/badge/node-%3E%3D18.0.0-blue.svg)](https://nodejs.org/)
[![Model Context Protocol](https://img.shields.io/badge/MCP-SDK--1.6.0-brightgreen.svg)](https://modelcontextprotocol.io/)

An open-source, multi-capability **Model Context Protocol (MCP) Server** providing AI coding assistants (Claude Desktop, Cursor, Antigravity, Windsurf) with comprehensive access to the entire **MapLibre** open-source mapping ecosystem.

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

### Step 1: Clone & Build

```bash
# Clone the repository
git clone https://github.com/maplibre/maplibre_mcp.git
cd maplibre_mcp

# Install dependencies and build TypeScript code
npm install
npm run build
```

---

### Step 2: Configure Your AI Assistant

#### **A. Claude Desktop**
Add the server entry to your `claude_desktop_config.json`:
* **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
* **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "maplibre": {
      "command": "node",
      "args": ["J:/GitHub/maplibre_mcp/dist/index.js"]
    }
  }
}
```

#### **B. Cursor IDE**
1. Navigate to **Cursor Settings** -> **Features** -> **MCP**.
2. Click **+ Add New MCP Server**.
3. Set **Name**: `maplibre`
4. Set **Type**: `command`
5. Set **Command**: `node J:/GitHub/maplibre_mcp/dist/index.js`

#### **C. Antigravity CLI / IDE**
Add the server configuration to your `antigravity_mcp.json` or workspace settings:

```json
{
  "mcpServers": {
    "maplibre": {
      "command": "node",
      "args": ["J:/GitHub/maplibre_mcp/dist/index.js"]
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
    "query": "3D buildings",
    "ecosystem": "all"
  }
  ```
* **Example Response:**
  ```json
  [
    {
      "repo": "maplibre-gl-js",
      "ecosystem": "gl-js",
      "description": "Core WebGL/WebGPU interactive vector tile mapping engine for web browsers",
      "stars": 11141,
      "language": "TypeScript",
      "docs_url": "https://maplibre.org/maplibre-gl-js/docs/",
      "doc_dirs": ["https://github.com/maplibre/maplibre-gl-js/tree/main/docs"]
    }
  ]
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
* **Example Response:**
  ```json
  {
    "valid": true,
    "errors": []
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
* **Example Response:**
  ```json
  {
    "version": 8,
    "name": "MapLibre Generated Style (dark)",
    "sources": {
      "basemap-source": {
        "type": "vector",
        "url": "https://tiles.openfreemap.org/planet"
      }
    },
    "layers": [
      {
        "id": "background",
        "type": "background",
        "paint": { "background-color": "#191a1a" }
      },
      {
        "id": "3d-buildings",
        "type": "fill-extrusion",
        "source": "basemap-source",
        "source-layer": "building",
        "minzoom": 15,
        "paint": {
          "fill-extrusion-color": "#2b2c2e",
          "fill-extrusion-height": ["get", "render_height"],
          "fill-extrusion-base": ["get", "render_min_height"],
          "fill-extrusion-opacity": 0.8
        }
      }
    ]
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
* **Example Response:**
  ```yaml
  version: '3.8'

  services:
    martin:
      image: ghcr.io/maplibre/martin:latest
      restart: always
      ports:
        - "3000:3000"
      environment:
        - DATABASE_URL=postgres://postgres:password@db:5432/spatial_db
      volumes:
        - ./tiles:/files
      command: martin /files/planet.pmtiles
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
* **Example Response:**
  Returns markdown instructions for initializing PMTiles with `maplibregl.addProtocol('pmtiles', protocol.tile)`.

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
* **Example Response:**
  ```json
  {
    "center": [-73.9706, 40.7217],
    "bounds": {
      "minLng": -74.056,
      "minLat": 40.6628,
      "maxLng": -73.8852,
      "maxLat": 40.7806
    },
    "recommendedZoom": 12
  }
  ```

---

### Layer 2: Dart / Flutter Tools

#### 7. `setup_flutter_maplibre_project`
Scaffold Flutter project setup files: `pubspec.yaml` dependencies, Android `AndroidManifest.xml` location permissions, and iOS `Info.plist` privacy keys.

* **Example Input:**
  ```json
  {
    "packageName": "my_map_app",
    "includeLocationPermissions": true
  }
  ```
* **Example Response:**
  Generates production-ready `pubspec.yaml`, `AndroidManifest.xml`, and `Info.plist` snippets.

---

#### 8. `generate_flutter_map_scaffold`
Generate a complete Flutter widget implementing MapLibre with camera position, style URL, gesture controls, and map controller.

* **Example Input:**
  ```json
  {
    "packageType": "maplibre_gl",
    "styleSource": "url",
    "initialLatitude": 37.7749,
    "initialLongitude": -122.4194,
    "initialZoom": 12.0,
    "enableMyLocation": true
  }
  ```
* **Example Response:**
  ```dart
  import 'package:flutter/material.dart';
  import 'package:maplibre_gl/maplibre_gl.dart';

  class MapScreen extends StatefulWidget {
    const MapScreen({Key? key}) : super(key: key);

    @override
    State<MapScreen> createState() => _MapScreenState();
  }

  class _MapScreenState extends State<MapScreen> {
    MaplibreMapController? mapController;

    @override
    Widget build(BuildContext context) {
      return Scaffold(
        body: MaplibreMap(
          styleString: 'https://demotiles.maplibre.org/style.json',
          initialCameraPosition: const CameraPosition(
            target: LatLng(37.7749, -122.4194),
            zoom: 12.0,
          ),
          myLocationEnabled: true,
        ),
      );
    }
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
    "filePathOrUrl": "assets/map_data.pmtiles"
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
    "sourceId": "store-locations",
    "geoJsonUrlOrPath": "assets/stores.geojson",
    "clusterMaxZoom": 14,
    "clusterRadius": 50
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

## 📄 License

Distributed under the **MIT License**. Free for commercial and non-commercial use.
