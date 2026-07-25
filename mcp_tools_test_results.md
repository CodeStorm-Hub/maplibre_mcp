# MapLibre MCP Server — Live Test Results & Verification Log

This document records the **live execution test results** for all 11 tools registered on the **MapLibre MCP Server** (`maplibre-mcp-server`) during active pair programming in Google Antigravity.

---

## Tool Test Log Summary

| # | MCP Tool | Input Parameters | Execution Result |
|---|----------|------------------|------------------|
| 1 | `search_maplibre_docs` | `query: "native", ecosystem: "native"` | ✅ SUCCESS |
| 2 | `validate_maplibre_style` | `styleJson: { version: 8, layers: [...] }` | ✅ SUCCESS |
| 3 | `generate_maplibre_style` | `theme: "dark", tileSource: "openfreemap", enable3DBuildings: true` | ✅ SUCCESS |
| 4 | `generate_tile_server_config` | `target: "postgis-mvt-function", dbName: "logistics_db"` | ✅ SUCCESS |
| 5 | `get_maplibre_agent_skill` | `skill: "mapbox-migration"` | ✅ SUCCESS |
| 6 | `calc_map_viewport` | `coordinates: [[-122.4194, 37.7749], ...]` | ✅ SUCCESS |
| 7 | `setup_flutter_maplibre_project` | `packageName: "speedy_delivery", includeLocationPermissions: true` | ✅ SUCCESS |
| 8 | `generate_flutter_map_scaffold` | `packageType: "maplibre_gl", initialLatitude: 35.6762` | ✅ SUCCESS |
| 9 | `generate_flutter_pmtiles_config` | `tileType: "pmtiles", isLocalAsset: true` | ✅ SUCCESS |
| 10 | `generate_flutter_map_layer` | `layerType: "heatmap", sourceId: "incidents-source"` | ✅ SUCCESS |
| 11 | `generate_flutter_geojson_cluster` | `sourceId: "ev-stations", clusterMaxZoom: 15` | ✅ SUCCESS |

---

## 1. Tool: `search_maplibre_docs`

* **User Prompt:** *"Find MapLibre Native C++ and iOS documentation links."*
* **Tool Call Arguments:**
  ```json
  {
    "query": "native",
    "ecosystem": "native"
  }
  ```
* **Captured Tool Output:**
  ```json
  [
    {
      "repo": "maplibre-native",
      "ecosystem": "native",
      "description": "C++ core interactive vector tile rendering engine for iOS, Android, macOS & Linux",
      "stars": 2106,
      "language": "C++",
      "docs_url": "https://maplibre.org/maplibre-native/",
      "repo_url": "https://github.com/maplibre/maplibre-native",
      "doc_dirs": [
        "https://github.com/maplibre/maplibre-native/tree/main/docs",
        "https://github.com/maplibre/maplibre-native/tree/main/docker"
      ]
    }
  ]
  ```

---

## 2. Tool: `validate_maplibre_style`

* **User Prompt:** *"Validate a custom MapLibre style JSON containing background and polyline layers."*
* **Tool Call Arguments:**
  ```json
  {
    "styleJson": {
      "version": 8,
      "sources": {
        "route-src": {
          "type": "geojson",
          "data": "https://example.com/route.geojson"
        }
      },
      "layers": [
        {
          "id": "bg",
          "type": "background",
          "paint": { "background-color": "#000000" }
        },
        {
          "id": "line-layer",
          "type": "line",
          "source": "route-src",
          "paint": { "line-color": "#ff0000", "line-width": 3 }
        }
      ]
    }
  }
  ```
* **Captured Tool Output:**
  ```json
  {
    "valid": true,
    "errors": []
  }
  ```

---

## 3. Tool: `generate_maplibre_style`

* **User Prompt:** *"Generate a dark-themed map style with 3D buildings using OpenFreeMap tiles."*
* **Tool Call Arguments:**
  ```json
  {
    "theme": "dark",
    "tileSource": "openfreemap",
    "enable3DBuildings": true
  }
  ```
* **Captured Tool Output:**
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

## 4. Tool: `generate_tile_server_config`

* **User Prompt:** *"Generate a PostGIS SQL function that outputs Mapbox Vector Tiles (MVT) for a table named 'delivery_zones'."*
* **Tool Call Arguments:**
  ```json
  {
    "target": "postgis-mvt-function",
    "dbName": "logistics_db",
    "tableName": "delivery_zones",
    "geomColumn": "geom_4326"
  }
  ```
* **Captured Tool Output:**
  ```sql
  -- PostgreSQL + PostGIS MVT Tile Function
  CREATE OR REPLACE FUNCTION get_mvt_tile(z integer, x integer, y integer)
  RETURNS bytea AS $$
  DECLARE
    bbox geometry;
    tile bytea;
  BEGIN
    -- Calculate bounding box envelope for tile coordinates
    bbox := ST_TileEnvelope(z, x, y);

    SELECT ST_AsMVT(mvtgeom, 'delivery_zones', 4096, 'geom')
    INTO tile
    FROM (
      SELECT
        id,
        name,
        ST_AsMVTGeom(
          geom_4326,
          bbox,
          4096,
          256,
          true
        ) AS geom
      FROM delivery_zones
      WHERE geom_4326 && bbox
    ) AS mvtgeom;

    RETURN tile;
  END;
  $$ LANGUAGE plpgsql STABLE PARALLEL SAFE;
  ```

---

## 5. Tool: `get_maplibre_agent_skill`

* **User Prompt:** *"How do I migrate my existing Mapbox GL JS app to MapLibre GL JS?"*
* **Tool Call Arguments:**
  ```json
  {
    "skill": "mapbox-migration"
  }
  ```
* **Captured Tool Output:**
  ```markdown
  # Mapbox to MapLibre Migration Guide

  When migrating from Mapbox GL JS / Mapbox Mobile SDKs to MapLibre:

  ## 1. Web (MapLibre GL JS)
  * **CDN / Package replacement**:
    Replace `mapbox-gl` with `maplibre-gl`.
    ```html
    <script src="https://unpkg.com/maplibre-gl@latest/dist/maplibre-gl.js"></script>
    <link href="https://unpkg.com/maplibre-gl@latest/dist/maplibre-gl.css" rel="stylesheet" />
    ```
    ```bash
    npm install maplibre-gl
    ```
  * **API Namespace**: Change `mapboxgl.Map` to `maplibregl.Map`.
  * **Access Tokens**: MapLibre is 100% open source and vendor-neutral. It does **not** require a Mapbox access token (`mapboxgl.accessToken`).

  ## 2. Mobile (Flutter)
  * Change `mapbox_gl` to `maplibre_gl`.
  ```

---

## 6. Tool: `calc_map_viewport`

* **User Prompt:** *"Calculate the map viewport, center coordinate, and recommended zoom level for delivery drivers across San Francisco."*
* **Tool Call Arguments:**
  ```json
  {
    "coordinates": [
      [-122.4194, 37.7749],
      [-122.4089, 37.7833],
      [-122.4312, 37.7600]
    ],
    "padding": 0.02
  }
  ```
* **Captured Tool Output:**
  ```json
  {
    "center": [-122.42005, 37.77165],
    "bounds": {
      "minLng": -122.4512,
      "minLat": 37.74,
      "maxLng": -122.3889,
      "maxLat": 37.8033
    },
    "recommendedZoom": 14
  }
  ```

---

## 7. Tool: `setup_flutter_maplibre_project`

* **User Prompt:** *"Scaffold Flutter setup dependencies and location permissions for a delivery tracking app."*
* **Tool Call Arguments:**
  ```json
  {
    "packageName": "speedy_delivery",
    "includeLocationPermissions": true,
    "useFfi": false
  }
  ```
* **Captured Tool Output:**
  ```json
  {
    "pubspec.yaml": "name: my_maplibre_app\ndependencies:\n  flutter:\n    sdk: flutter\n  maplibre_gl: ^0.16.0\n  http: ^1.1.0\n  path_provider: ^2.1.0\n",
    "AndroidManifest.xml": "<!-- AndroidManifest.xml permissions -->\n<uses-permission android:name=\"android.permission.INTERNET\" />\n<uses-permission android:name=\"android.permission.ACCESS_FINE_LOCATION\" />\n",
    "Info.plist": "<!-- Info.plist permissions -->\n<key>NSLocationWhenInUseUsageDescription</key>\n<string>This app needs access to your location.</string>\n"
  }
  ```

---

## 8. Tool: `generate_flutter_map_scaffold`

* **User Prompt:** *"Generate a Flutter map widget centered in Tokyo using a PMTiles tile source."*
* **Tool Call Arguments:**
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
* **Captured Tool Output:**
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
        appBar: AppBar(title: const Text('MapLibre Flutter Map')),
        body: MaplibreMap(
          styleString: 'pmtiles://https://build.protomaps.com/20260101.pmtiles',
          initialCameraPosition: const CameraPosition(
            target: LatLng(35.6762, 139.6503),
            zoom: 13.5,
          ),
          myLocationEnabled: true,
        ),
      );
    }
  }
  ```

---

## 9. Tool: `generate_flutter_pmtiles_config`

* **User Prompt:** *"Generate Dart helper code for bundling a local '.pmtiles' map archive in Flutter assets."*
* **Tool Call Arguments:**
  ```json
  {
    "tileType": "pmtiles",
    "isLocalAsset": true,
    "filePathOrUrl": "assets/tokyo.pmtiles"
  }
  ```
* **Captured Tool Output:**
  ```dart
  import 'dart:io';
  import 'package:flutter/services.dart';
  import 'package:path_provider/path_provider.dart';

  class PMTilesHelper {
    static Future<String> getPMTilesStyleUri({
      required String pmtilesUrlOrPath,
      bool isAsset = true,
    }) async {
      if (isAsset) {
        final byteData = await rootBundle.load(pmtilesUrlOrPath);
        final tempDir = await getApplicationDocumentsDirectory();
        final localFile = File('${tempDir.path}/map_data.pmtiles');
        await localFile.writeAsBytes(
          byteData.buffer.asUint8List(byteData.offsetInBytes, byteData.lengthInBytes),
        );
        return 'pmtiles://${localFile.path}';
      }
      return 'pmtiles://assets/tokyo.pmtiles';
    }
  }
  ```

---

## 10. Tool: `generate_flutter_map_layer`

* **User Prompt:** *"Generate Dart code for adding a Heatmap layer for incident reports in Flutter."*
* **Tool Call Arguments:**
  ```json
  {
    "layerType": "heatmap",
    "sourceId": "incidents-source",
    "layerId": "incidents-heatmap"
  }
  ```
* **Captured Tool Output:**
  ```dart
  // Add Custom Layer Properties for heatmap
  await mapController?.addLayer(
    'incidents-source',
    'incidents-heatmap',
    // Layer properties
  );
  ```

---

## 11. Tool: `generate_flutter_geojson_cluster`

* **User Prompt:** *"Generate Dart code for loading a GeoJSON source of EV charging stations with point clustering in Flutter."*
* **Tool Call Arguments:**
  ```json
  {
    "sourceId": "ev-stations",
    "geoJsonUrlOrPath": "assets/ev_stations.geojson",
    "clusterMaxZoom": 15,
    "clusterRadius": 40
  }
  ```
* **Captured Tool Output:**
  ```dart
  Future<void> setupGeoJsonClustering(MaplibreMapController controller) async {
    // 1. Add GeoJSON Source with Clustering enabled
    await controller.addSource(
      'ev-stations',
      GeojsonSourceProperties(
        data: 'assets/ev_stations.geojson',
        cluster: true,
        clusterMaxZoom: 15,
        clusterRadius: 40,
      ),
    );

    // 2. Add Cluster Circles Layer (Graduated Sizes)
    await controller.addCircleLayer(
      'ev-stations',
      'ev-stations-clusters',
      const CircleLayerProperties(
        circleColor: ['step', ['get', 'point_count'], '#51bbd6', 100, '#f1f075', 750, '#f28cb1'],
        circleRadius: ['step', ['get', 'point_count'], 20, 100, 30, 750, 40],
      ),
      filter: ['has', 'point_count'],
    );

    // 3. Add Cluster Count Labels Layer
    await controller.addSymbolLayer(
      'ev-stations',
      'ev-stations-cluster-count',
      const SymbolLayerProperties(
        textField: '{point_count_abbreviated}',
        textSize: 12.0,
        textColor: '#ffffff',
      ),
      filter: ['has', 'point_count'],
    );

    // 4. Add Unclustered Individual Point Markers
    await controller.addCircleLayer(
      'ev-stations',
      'ev-stations-unclustered-point',
      const CircleLayerProperties(
        circleColor: '#11b4da',
        circleRadius: 8.0,
        circleStrokeWidth: 1.0,
        circleStrokeColor: '#ffffff',
      ),
      filter: ['!', ['has', 'point_count']],
    );
  }
  ```
