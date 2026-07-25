# PMTiles Integration Patterns for MapLibre

PMTiles is a single-file archive format for vector & raster map tiles based on HTTP range requests.

## 1. Web Integration (MapLibre GL JS)
```javascript
import maplibregl from 'maplibre-gl';
import * as pmtiles from 'pmtiles';

// Register PMTiles Protocol
let protocol = new pmtiles.Protocol();
maplibregl.addProtocol('pmtiles', protocol.tile);

// Load map with PMTiles source
const map = new maplibregl.Map({
  container: 'map',
  style: {
    version: 8,
    sources: {
      'my-pmtiles': {
        type: 'vector',
        url: 'pmtiles://https://your-bucket.r2.dev/my_map.pmtiles'
      }
    },
    layers: [
      {
        id: 'buildings',
        type: 'fill',
        source: 'my-pmtiles',
        'source-layer': 'building',
        paint: {
          'fill-color': '#cccccc'
        }
      }
    ]
  }
});
```

## 2. Cloudflare R2 / AWS S3 Hosting Best Practices
Enable CORS headers on the bucket for Range requests:
```json
[
  {
    "AllowedOrigins": ["*"],
    "AllowedMethods": ["GET", "HEAD"],
    "AllowedHeaders": ["Range", "If-Match"],
    "ExposeHeaders": ["ETag", "Content-Range", "Accept-Ranges"]
  }
]
```

## 3. Flutter PMTiles Setup
Store local `.pmtiles` in app storage (`path_provider`) or serve via local HTTP server / PMTiles protocol listener for Flutter `maplibre_gl`.
