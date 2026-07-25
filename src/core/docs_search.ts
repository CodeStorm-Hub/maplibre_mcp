import fs from 'fs';
import path from 'path';

export interface DocEntry {
  repo: string;
  ecosystem: string;
  description: string;
  stars: number;
  language: string;
  docs_url: string;
  repo_url: string;
  doc_dirs: string[];
}

const EMBEDDED_DOCS_INDEX: DocEntry[] = [
  {
    "repo": "maplibre-gl-js",
    "ecosystem": "gl-js",
    "description": "Core WebGL/WebGPU interactive vector tile mapping engine for web browsers",
    "stars": 11141,
    "language": "TypeScript",
    "docs_url": "https://maplibre.org/maplibre-gl-js/docs/",
    "repo_url": "https://github.com/maplibre/maplibre-gl-js",
    "doc_dirs": ["https://github.com/maplibre/maplibre-gl-js/tree/main/developer-guides", "https://github.com/maplibre/maplibre-gl-js/tree/main/docs"]
  },
  {
    "repo": "flutter-maplibre-gl",
    "ecosystem": "flutter",
    "description": "Official Flutter plugin for MapLibre vector & raster map rendering",
    "stars": 350,
    "language": "Dart",
    "docs_url": "https://pub.dev/packages/maplibre_gl",
    "repo_url": "https://github.com/maplibre/flutter-maplibre-gl",
    "doc_dirs": ["https://github.com/maplibre/flutter-maplibre-gl/tree/main/maplibre_gl_example", "https://github.com/maplibre/flutter-maplibre-gl/tree/main/website"]
  },
  {
    "repo": "flutter-native-interop-playground",
    "ecosystem": "flutter",
    "description": "Direct Dart FFI interop implementation for MapLibre Native & Flutter",
    "stars": 3,
    "language": "C++",
    "docs_url": "https://github.com/maplibre/flutter-native-interop-playground/tree/main/example",
    "repo_url": "https://github.com/maplibre/flutter-native-interop-playground",
    "doc_dirs": ["https://github.com/maplibre/flutter-native-interop-playground/tree/main/example"]
  },
  {
    "repo": "maplibre-native",
    "ecosystem": "native",
    "description": "C++ core interactive vector tile rendering engine for iOS, Android, macOS & Linux",
    "stars": 2106,
    "language": "C++",
    "docs_url": "https://maplibre.org/maplibre-native/",
    "repo_url": "https://github.com/maplibre/maplibre-native",
    "doc_dirs": ["https://github.com/maplibre/maplibre-native/tree/main/docs"]
  },
  {
    "repo": "maplibre-compose",
    "ecosystem": "compose",
    "description": "Compose Multiplatform interactive vector tile map component for Android & iOS",
    "stars": 164,
    "language": "Kotlin",
    "docs_url": "https://github.com/maplibre/maplibre-compose#readme",
    "repo_url": "https://github.com/maplibre/maplibre-compose",
    "doc_dirs": ["https://github.com/maplibre/maplibre-compose/tree/main/docs"]
  },
  {
    "repo": "maplibre-style-spec",
    "ecosystem": "style-spec",
    "description": "Official MapLibre Style Specification JSON Schema, validator & AST parser",
    "stars": 238,
    "language": "TypeScript",
    "docs_url": "https://maplibre.org/maplibre-style-spec/",
    "repo_url": "https://github.com/maplibre/maplibre-style-spec",
    "doc_dirs": ["https://github.com/maplibre/maplibre-style-spec/tree/main/docs"]
  },
  {
    "repo": "maplibre-tile-spec",
    "ecosystem": "tile-spec",
    "description": "Next-generation vector tile specification and format definition",
    "stars": 537,
    "language": "Rust",
    "docs_url": "https://github.com/maplibre/maplibre-tile-spec/tree/main/docs",
    "repo_url": "https://github.com/maplibre/maplibre-tile-spec",
    "doc_dirs": ["https://github.com/maplibre/maplibre-tile-spec/tree/main/docs"]
  },
  {
    "repo": "martin",
    "ecosystem": "martin",
    "description": "Fast PostGIS, MBTiles & PMTiles vector tile server & tile generator in Rust",
    "stars": 3788,
    "language": "Rust",
    "docs_url": "https://maplibre.org/martin/",
    "repo_url": "https://github.com/maplibre/martin",
    "doc_dirs": ["https://github.com/maplibre/martin/tree/main/docs"]
  }
];

export class DocsSearchEngine {
  private docsIndex: DocEntry[] = [];


  constructor() {
    const possiblePaths = [
      path.join(__dirname, '../data/docs_index.json'),
      path.join(__dirname, '../../src/data/docs_index.json'),
      path.join(process.cwd(), 'dist/data/docs_index.json'),
      path.join(process.cwd(), 'src/data/docs_index.json'),
    ];

    let loaded = false;
    for (const p of possiblePaths) {
      if (fs.existsSync(p)) {
        try {
          const content = fs.readFileSync(p, 'utf-8');
          const parsed = JSON.parse(content);
          if (Array.isArray(parsed) && parsed.length > 0) {
            this.docsIndex = parsed;
            loaded = true;
            break;
          }
        } catch (e) {
          // ignore error and try next
        }
      }
    }

    if (!loaded) {
      this.docsIndex = EMBEDDED_DOCS_INDEX;
    }
  }

  public search(query: string, ecosystem: string = 'all'): DocEntry[] {
    const cleanQuery = (query || '').toLowerCase().trim();
    const targetEco = (ecosystem || 'all').toLowerCase().trim();

    if (!cleanQuery) {
      return this.docsIndex.filter(entry => targetEco === 'all' || entry.ecosystem === targetEco);
    }

    // Split query into individual token terms (filtering out tiny stop-words)
    const stopWords = new Set(['a', 'an', 'the', 'in', 'on', 'at', 'for', 'to', 'of', 'and', 'or', 'with', 'by']);
    const tokens = cleanQuery
      .split(/\s+/)
      .map(t => t.replace(/[^a-z0-9_-]/g, ''))
      .filter(t => t.length > 1 && !stopWords.has(t));

    // First try matching entries where ecosystem matches and at least one token matches
    const scoredEntries = this.docsIndex
      .map(entry => {
        const matchEcosystem = targetEco === 'all' || entry.ecosystem === targetEco;
        if (!matchEcosystem) return { entry, score: 0 };

        const searchableText = `${entry.repo} ${entry.ecosystem} ${entry.description} ${entry.language}`.toLowerCase();
        
        // Exact full string match gets highest score
        if (searchableText.includes(cleanQuery)) {
          return { entry, score: 100 };
        }

        // Token score
        let score = 0;
        tokens.forEach(token => {
          if (searchableText.includes(token)) {
            score += 10;
          }
        });

        return { entry, score };
      })
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .map(item => item.entry);

    // If token matching found results, return them
    if (scoredEntries.length > 0) {
      return scoredEntries;
    }

    // Fallback: If no token matched, return all repos in the specified ecosystem
    return this.docsIndex.filter(entry => targetEco === 'all' || entry.ecosystem === targetEco);
  }
}
