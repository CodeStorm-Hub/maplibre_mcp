# MapLibre Tile Sources & Providers Guide

## 1. Free & Open Tile Providers
* **OpenFreeMap** (100% Free OpenStreetMap Vector Tiles):
  `https://tiles.openfreemap.org/planet`
  Styles: `https://tiles.openfreemap.org/styles/bright`, `https://tiles.openfreemap.org/styles/liberty`, `https://tiles.openfreemap.org/styles/positron`
* **Demotiles (MapLibre Official Demo)**:
  `https://demotiles.maplibre.org/style.json`
* **Protomaps**:
  Single-file PMTiles downloads for countries/cities or worldwide basemaps.

## 2. Commercial / Freemium Tile Providers
* **MapTiler** (Free tier available): `https://api.maptiler.com/maps/streets-v2/style.json?key={YOUR_API_KEY}`
* **Stadia Maps** (Free non-commercial tier): `https://tiles.stadiamaps.com/styles/alidade_smooth.json`
* **AWS Location Service**: Managed vector tiles using MapLibre SDKs.

## 3. Self-Hosted Tile Servers
* **Martin** (Rust tile server for PostGIS, MBTiles, PMTiles):
  Run Martin via Docker or cargo, serving endpoints at `http://localhost:3000/tiles/{table_or_file}/{z}/{x}/{y}.pbf`.
