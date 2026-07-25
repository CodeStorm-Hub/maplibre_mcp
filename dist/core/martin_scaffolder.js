"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MartinScaffolderEngine = void 0;
class MartinScaffolderEngine {
    generateConfig(options) {
        const { target, dbName = 'gis_db', tableName = 'spatial_features', geomColumn = 'geom', srid = 3857 } = options;
        if (target === 'martin-docker') {
            return `version: '3.8'

services:
  martin:
    image: ghcr.io/maplibre/martin:latest
    restart: always
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgres://postgres:password@db:5432/${dbName}
    volumes:
      - ./tiles:/files
    command: martin /files/planet.pmtiles
    depends_on:
      - db

  db:
    image: postgis/postgis:15-3.3
    environment:
      POSTGRES_DB: ${dbName}
      POSTGRES_PASSWORD: password
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:
`;
        }
        if (target === 'postgis-mvt-function') {
            return `-- PostgreSQL + PostGIS MVT Tile Function
CREATE OR REPLACE FUNCTION get_mvt_tile(z integer, x integer, y integer)
RETURNS bytea AS $$
DECLARE
  bbox geometry;
  tile bytea;
BEGIN
  -- Calculate bounding box envelope for tile coordinates
  bbox := ST_TileEnvelope(z, x, y);

  SELECT ST_AsMVT(mvtgeom, '${tableName}', 4096, 'geom')
  INTO tile
  FROM (
    SELECT
      id,
      name,
      ST_AsMVTGeom(
        ${geomColumn},
        bbox,
        4096,
        256,
        true
      ) AS geom
    FROM ${tableName}
    WHERE ${geomColumn} && bbox
  ) AS mvtgeom;

  RETURN tile;
END;
$$ LANGUAGE plpgsql STABLE PARALLEL SAFE;
`;
        }
        if (target === 'cloudflare-r2-cors') {
            return `// Cloudflare R2 / AWS S3 CORS Configuration JSON
[
  {
    "AllowedOrigins": ["*"],
    "AllowedMethods": ["GET", "HEAD"],
    "AllowedHeaders": ["Range", "If-Match"],
    "ExposeHeaders": ["ETag", "Content-Range", "Accept-Ranges"],
    "MaxAgeSeconds": 3600
  }
]
`;
        }
        if (target === 'pmtiles-setup') {
            return `# PMTiles CLI Setup Commands

# 1. Install PMTiles CLI
go install github.com/protomaps/go-pmtiles@latest

# 2. Convert MBTiles to PMTiles archive
pmtiles convert input_map.mbtiles output_map.pmtiles

# 3. Extract bounding box region (e.g., NYC)
pmtiles extract https://build.protomaps.com/20260101.pmtiles nyc.pmtiles --bbox=-74.05,40.68,-73.90,40.88

# 4. Inspect PMTiles header
pmtiles show output_map.pmtiles
`;
        }
        return '-- Unknown target specified';
    }
}
exports.MartinScaffolderEngine = MartinScaffolderEngine;
