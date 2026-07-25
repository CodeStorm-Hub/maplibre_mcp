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
* **Access Tokens**: MapLibre is 100% open source and vendor-neutral. It does **not** require a Mapbox access token (`mapboxgl.accessToken`). If using third-party tile providers (e.g., MapTiler, Stadia Maps), supply their specific API keys in tile URLs.

## 2. Mobile (Flutter)
* Change `mapbox_gl` to `maplibre_gl`.
* In `pubspec.yaml`:
  ```yaml
  dependencies:
    maplibre_gl: ^0.16.0
  ```
* Change `MapboxMap` widget to `MapLibreMap`.

## 3. Style Compatibility
MapLibre uses the open **MapLibre Style Specification** (v8 format). Mapbox styles up to v8 are compatible. Change tile URLs from `mapbox://` protocol to HTTP/HTTPS or `pmtiles://` protocols.
