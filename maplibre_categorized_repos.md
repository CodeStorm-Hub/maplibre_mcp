# MapLibre Development & Programming Repositories

This document contains all **developer- and programming-focused repositories** from the [MapLibre GitHub Organization](https://github.com/maplibre), along with direct links to their dedicated **documentation directories**, code examples, and language/framework categorizations.

---

## 1. Repositories Categorized by Programming Language & Framework

| Language / Framework | Repository Name | Description | Stars | Documentation / Guide Link |
|----------------------|-----------------|-------------|-------|----------------------------|
| **TypeScript / JavaScript** | [maplibre-gl-js](https://github.com/maplibre/maplibre-gl-js) | Core WebGL/WebGPU interactive vector tile mapping engine for web browsers | 11,141 | [/developer-guides](https://github.com/maplibre/maplibre-gl-js/tree/main/developer-guides), [/docs](https://github.com/maplibre/maplibre-gl-js/tree/main/docs) |
| | [maplibre-style-spec](https://github.com/maplibre/maplibre-style-spec) | Official MapLibre Style Specification JSON Schema, validator & AST parser | 238 | [/docs](https://github.com/maplibre/maplibre-style-spec/tree/main/docs) |
| | [maputnik](https://github.com/maplibre/maputnik) | Open-source browser-based visual style editor for MapLibre styles | 2,593 | [README.md](https://github.com/maplibre/maputnik#readme) |
| | [maplibre-gl-directions](https://github.com/maplibre/maplibre-gl-directions) | Routing directions plugin and UI control for MapLibre GL JS | 163 | [/doc](https://github.com/maplibre/maplibre-gl-directions/tree/main/doc) |
| | [maplibre-gl-geocoder](https://github.com/maplibre/maplibre-gl-geocoder) | Address search & geocoding UI control component | 99 | [README.md](https://github.com/maplibre/maplibre-gl-geocoder#readme) |
| | [maplibre-gl-inspect](https://github.com/maplibre/maplibre-gl-inspect) | Developer inspection control to view vector tile features and properties | 69 | [/examples](https://github.com/maplibre/maplibre-gl-inspect/tree/main/examples) |
| | [maplibre-gl-compare](https://github.com/maplibre/maplibre-gl-compare) | Swipe and sync split-screen control between two map instances | 54 | [/example](https://github.com/maplibre/maplibre-gl-compare/tree/main/example) |
| | [maplibre-agent-skills](https://github.com/maplibre/maplibre-agent-skills) | AI coding agent skills for writing MapLibre GL JS and PMTiles code | 127 | [README.md](https://github.com/maplibre/maplibre-agent-skills#readme) |
| | [font-maker](https://github.com/maplibre/font-maker) | Web tool to generate glyph fontstacks (PBF) for MapLibre text labels | 253 | [README.md](https://github.com/maplibre/font-maker#readme) |
| | [geojson-vt](https://github.com/maplibre/geojson-vt) | High-performance GeoJSON to vector tile slicer for browser and Node | 23 | [README.md](https://github.com/maplibre/geojson-vt#readme) |
| | [vt-pbf](https://github.com/maplibre/vt-pbf) | Serialize vector tile objects into binary Protocol Buffer (PBF) buffers | 5 | [README.md](https://github.com/maplibre/vt-pbf#readme) |
| | [vtvalidate](https://github.com/maplibre/vtvalidate) | Node.js C++ addon to validate geometry validity in vector tile layers | 2 | [/docs](https://github.com/maplibre/vtvalidate/tree/main/docs) |
| **React Native / Expo** | [maplibre-react-native](https://github.com/maplibre/maplibre-react-native) | React Native & Expo SDK supporting iOS and Android native maps | 635 | [/docs](https://github.com/maplibre/maplibre-react-native/tree/main/docs), [/examples](https://github.com/maplibre/maplibre-react-native/tree/main/examples) |
| **Angular** | [ngx-maplibre-gl](https://github.com/maplibre/ngx-maplibre-gl) | Angular component wrappers for MapLibre GL JS | 116 | [README.md](https://github.com/maplibre/ngx-maplibre-gl#readme) |
| **Leaflet** | [maplibre-gl-leaflet](https://github.com/maplibre/maplibre-gl-leaflet) | Leaflet API binding layer for MapLibre GL JS | 216 | [/examples](https://github.com/maplibre/maplibre-gl-leaflet/tree/main/examples) |
| **C++ (Native & Core Libraries)** | [maplibre-native](https://github.com/maplibre/maplibre-native) | C++ core interactive vector tile rendering engine for iOS, Android, macOS & Linux | 2,106 | [/docker](https://github.com/maplibre/maplibre-native/tree/main/docker), [/docs](https://github.com/maplibre/maplibre-native/tree/main/docs) |
| | [maplibre-native-qt](https://github.com/maplibre/maplibre-native-qt) | Qt bindings and Qt Location Plugin for desktop apps | 131 | [/docs](https://github.com/maplibre/maplibre-native-qt/tree/main/docs), [/examples](https://github.com/maplibre/maplibre-native-qt/tree/main/examples) |
| | [maplibre-native-slint](https://github.com/maplibre/maplibre-native-slint) | MapLibre Native integration with Slint GUI toolkit | 22 | [/docs](https://github.com/maplibre/maplibre-native-slint/tree/main/docs) |
| | [flutter-native-interop-playground](https://github.com/maplibre/flutter-native-interop-playground) | Direct Dart FFI interop implementation for MapLibre Native & Flutter | 3 | [/example](https://github.com/maplibre/flutter-native-interop-playground/tree/main/example) |
| | [geojson-cpp](https://github.com/maplibre/geojson-cpp) | C++ GeoJSON parser converting to \`geometry.hpp\` representations | 3 | [README.md](https://github.com/maplibre/geojson-cpp#readme) |
| | [geometry.hpp](https://github.com/maplibre/geometry.hpp) | Header-only C++ geometry primitives and data structures | 5 | [README.md](https://github.com/maplibre/geometry.hpp#readme) |
| | [mvt-cpp](https://github.com/maplibre/mvt-cpp) | C++ decoder library for Mapbox Vector Tile (MVT) PBF files | 3 | [README.md](https://github.com/maplibre/mvt-cpp#readme) |
| | [maplibre-native-base](https://github.com/maplibre/maplibre-native-base) | Internal base C++ utilities shared across MapLibre Native modules | 4 | [/docs](https://github.com/maplibre/maplibre-native-base/tree/main/docs) |
| | [maplibre-gl-native-boost](https://github.com/maplibre/maplibre-gl-native-boost) | Minimal Boost library extract tailored for MapLibre Native builds | 0 | [README.md](https://github.com/maplibre/maplibre-gl-native-boost#readme) |
| **Dart & Flutter** | [flutter-maplibre-gl](https://github.com/maplibre/flutter-maplibre-gl) | Official Flutter plugin for MapLibre vector & raster map rendering | 350 | [/maplibre_gl_example](https://github.com/maplibre/flutter-maplibre-gl/tree/main/maplibre_gl_example), [/website](https://github.com/maplibre/flutter-maplibre-gl/tree/main/website) |
| **Kotlin & Android / KMP** | [maplibre-compose](https://github.com/maplibre/maplibre-compose) | Jetpack Compose vector tile maps library for Android & Kotlin Multiplatform | 520 | [/docs](https://github.com/maplibre/maplibre-compose/tree/main/docs) |
| | [spatial-k](https://github.com/maplibre/spatial-k) | Spatial K — Kotlin Multiplatform libraries for geospatial data processing | 137 | [/docs](https://github.com/maplibre/spatial-k/tree/main/docs) |
| | [MapLibre-Android-Auto-Sample](https://github.com/maplibre/MapLibre-Android-Auto-Sample) | Reference implementation for Android Auto and Automotive OS | 29 | [README.md](https://github.com/maplibre/MapLibre-Android-Auto-Sample#readme) |
| | [maplibre-native-ffi](https://github.com/maplibre/maplibre-native-ffi) | Experimental C API boundary for MapLibre Native low-level interop | 17 | [/docs](https://github.com/maplibre/maplibre-native-ffi/tree/main/docs), [/examples](https://github.com/maplibre/maplibre-native-ffi/tree/main/examples) |
| **Java & Android SDKs** | [maplibre-navigation-android](https://github.com/maplibre/maplibre-navigation-android) | Turn-by-turn navigation SDK for Android applications | 194 | [README.md](https://github.com/maplibre/maplibre-navigation-android#readme) |
| | [maplibre-plugins-android](https://github.com/maplibre/maplibre-plugins-android) | Android plugins (user location indicator, markerview, annotation managers) | 47 | [README.md](https://github.com/maplibre/maplibre-plugins-android#readme) |
| | [maplibre-gestures-android](https://github.com/maplibre/maplibre-gestures-android) | Touch gesture detection and handling library for Android | 1 | [README.md](https://github.com/maplibre/maplibre-gestures-android#readme) |
| | [maplibre-java](https://github.com/maplibre/maplibre-java) | Java utility functions and helpers for MapLibre Android | 21 | [/docs](https://github.com/maplibre/maplibre-java/tree/main/docs) |
| | [earcut4j](https://github.com/maplibre/earcut4j) | Java implementation of the Earcut polygon triangulation algorithm | 38 | [README.md](https://github.com/maplibre/earcut4j#readme) |
| **Swift & iOS** | [swiftui-dsl](https://github.com/maplibre/swiftui-dsl) | Declarative SwiftUI DSL wrapper for MapLibre on iOS | 109 | [README.md](https://github.com/maplibre/swiftui-dsl#readme) |
| | [maplibre-navigation-ios](https://github.com/maplibre/maplibre-navigation-ios) | Turn-by-turn navigation SDK for iOS applications | 65 | [/Example](https://github.com/maplibre/maplibre-navigation-ios/tree/main/Example), [/docs](https://github.com/maplibre/maplibre-navigation-ios/tree/main/docs) |
| | [maplibre-gl-native-distribution](https://github.com/maplibre/maplibre-gl-native-distribution) | Swift Package Manager (SPM) distribution package for iOS | 82 | [README.md](https://github.com/maplibre/maplibre-gl-native-distribution#readme) |
| **Rust** | [martin](https://github.com/maplibre/martin) | Fast PostGIS, MBTiles & PMTiles vector tile server & tile generator in Rust | 3,788 | [/docs](https://github.com/maplibre/martin/tree/main/docs) |
| | [maplibre-rs](https://github.com/maplibre/maplibre-rs) | Experimental WebGPU-native map renderer written in Rust | 1,555 | [/docs](https://github.com/maplibre/maplibre-rs/tree/main/docs) |
| | [maplibre-tile-spec](https://github.com/maplibre/maplibre-tile-spec) | Next-generation vector tile specification and format definition | 537 | [/docs](https://github.com/maplibre/maplibre-tile-spec/tree/main/docs) |
| | [maplibre-native-rs](https://github.com/maplibre/maplibre-native-rs) | Safe Rust bindings for the MapLibre Native C++ engine | 68 | [/examples](https://github.com/maplibre/maplibre-native-rs/tree/main/examples) |
| **HTML & Assets** | [demotiles](https://github.com/maplibre/demotiles) | Open demo vector tiles and map style assets for local testing and CI | 129 | [README.md](https://github.com/maplibre/demotiles#readme) |
| **Ruby** | [homebrew-martin](https://github.com/maplibre/homebrew-martin) | Homebrew tap formula repository for installing Martin binary releases | 1 | [README.md](https://github.com/maplibre/homebrew-martin#readme) |

---

## 2. Product Ecosystem Categorization

### A. MapLibre GL JS & Web Ecosystem
* **Core Engine**: [maplibre-gl-js](https://github.com/maplibre/maplibre-gl-js)
* **Framework Bindings**: [ngx-maplibre-gl](https://github.com/maplibre/ngx-maplibre-gl) (Angular), [maplibre-gl-leaflet](https://github.com/maplibre/maplibre-gl-leaflet) (Leaflet)
* **Plugins & Controls**: [maplibre-gl-directions](https://github.com/maplibre/maplibre-gl-directions), [maplibre-gl-geocoder](https://github.com/maplibre/maplibre-gl-geocoder), [maplibre-gl-inspect](https://github.com/maplibre/maplibre-gl-inspect), [maplibre-gl-compare](https://github.com/maplibre/maplibre-gl-compare)
* **Dev Utilities**: [maplibre-agent-skills](https://github.com/maplibre/maplibre-agent-skills), [font-maker](https://github.com/maplibre/font-maker), [demotiles](https://github.com/maplibre/demotiles)

### B. MapLibre Native & Mobile/Desktop SDKs
* **Core Native Engine**: [maplibre-native](https://github.com/maplibre/maplibre-native)
* **Framework SDKs**: [flutter-maplibre-gl](https://github.com/maplibre/flutter-maplibre-gl), [maplibre-compose](https://github.com/maplibre/maplibre-compose), [maplibre-react-native](https://github.com/maplibre/maplibre-react-native), [swiftui-dsl](https://github.com/maplibre/swiftui-dsl)
* **Desktop & Interop Bindings**: [maplibre-native-qt](https://github.com/maplibre/maplibre-native-qt), [maplibre-native-rs](https://github.com/maplibre/maplibre-native-rs), [maplibre-native-ffi](https://github.com/maplibre/maplibre-native-ffi), [maplibre-native-slint](https://github.com/maplibre/maplibre-native-slint), [flutter-native-interop-playground](https://github.com/maplibre/flutter-native-interop-playground)
* **Navigation & Platform Plugins**: [maplibre-navigation-android](https://github.com/maplibre/maplibre-navigation-android), [maplibre-navigation-ios](https://github.com/maplibre/maplibre-navigation-ios), [maplibre-plugins-android](https://github.com/maplibre/maplibre-plugins-android), [maplibre-gestures-android](https://github.com/maplibre/maplibre-gestures-android), [maplibre-java](https://github.com/maplibre/maplibre-java), [MapLibre-Android-Auto-Sample](https://github.com/maplibre/MapLibre-Android-Auto-Sample)
* **Geometry & Low-Level Libraries**: [spatial-k](https://github.com/maplibre/spatial-k), [geojson-cpp](https://github.com/maplibre/geojson-cpp), [geometry.hpp](https://github.com/maplibre/geometry.hpp), [mvt-cpp](https://github.com/maplibre/mvt-cpp), [earcut4j](https://github.com/maplibre/earcut4j), [maplibre-native-base](https://github.com/maplibre/maplibre-native-base), [maplibre-gl-native-boost](https://github.com/maplibre/maplibre-gl-native-boost)

### C. Style Specifications & Editors
* [maplibre-style-spec](https://github.com/maplibre/maplibre-style-spec), [maputnik](https://github.com/maplibre/maputnik)

### D. Tile Specifications & Next-Gen Tile Engines
* [maplibre-tile-spec](https://github.com/maplibre/maplibre-tile-spec), [maplibre-rs](https://github.com/maplibre/maplibre-rs), [geojson-vt](https://github.com/maplibre/geojson-vt), [vt-pbf](https://github.com/maplibre/vt-pbf), [vtvalidate](https://github.com/maplibre/vtvalidate)

### E. Martin & Tile Servers
* [martin](https://github.com/maplibre/martin), [homebrew-martin](https://github.com/maplibre/homebrew-martin)
