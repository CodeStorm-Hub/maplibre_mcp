import styleSpec from '@maplibre/maplibre-gl-style-spec';

export interface StyleValidationResult {
  valid: boolean;
  errors: any[];
}

export interface StyleGeneratorOptions {
  theme?: 'light' | 'dark' | 'satellite' | 'terrain';
  tileSource?: 'openfreemap' | 'protomaps' | 'demotiles' | 'custom';
  customUrl?: string;
  enable3DBuildings?: boolean;
}

export class StyleValidatorEngine {
  public validate(styleJson: any): StyleValidationResult {
    try {
      // Use validateStyleMin from @maplibre/maplibre-gl-style-spec
      const validateFn = (styleSpec as any).validateStyleMin || (styleSpec as any).default?.validateStyleMin || (styleSpec as any).validate;
      const errors = validateFn(styleJson);
      return {
        valid: errors.length === 0,
        errors: errors
      };
    } catch (e: any) {
      return {
        valid: false,
        errors: [{ message: e.message }]
      };
    }
  }

  public generateStyle(options: StyleGeneratorOptions): any {
    const theme = options.theme || 'light';
    const tileSource = options.tileSource || 'openfreemap';
    const enable3D = options.enable3DBuildings ?? false;

    let tileUrl = 'https://tiles.openfreemap.org/planet';
    if (tileSource === 'demotiles') {
      tileUrl = 'https://demotiles.maplibre.org/tiles/tiles.json';
    } else if (tileSource === 'protomaps') {
      tileUrl = 'pmtiles://https://build.protomaps.com/20260101.pmtiles';
    } else if (tileSource === 'custom' && options.customUrl) {
      tileUrl = options.customUrl;
    }

    const bgColor = theme === 'dark' ? '#191a1a' : '#f8f4f0';
    const buildingColor = theme === 'dark' ? '#2b2c2e' : '#d0d0d0';

    const style: any = {
      version: 8,
      name: `MapLibre Generated Style (${theme})`,
      sources: {
        'basemap-source': {
          type: 'vector',
          url: tileUrl
        }
      },
      layers: [
        {
          id: 'background',
          type: 'background',
          paint: {
            'background-color': bgColor
          }
        }
      ]
    };

    if (enable3D) {
      style.layers.push({
        id: '3d-buildings',
        type: 'fill-extrusion',
        source: 'basemap-source',
        'source-layer': 'building',
        minzoom: 15,
        paint: {
          'fill-extrusion-color': buildingColor,
          'fill-extrusion-height': ['get', 'render_height'],
          'fill-extrusion-base': ['get', 'render_min_height'],
          'fill-extrusion-opacity': 0.8
        }
      });
    }

    return style;
  }
}
