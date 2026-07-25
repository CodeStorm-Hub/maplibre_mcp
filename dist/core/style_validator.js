"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StyleValidatorEngine = void 0;
const maplibre_gl_style_spec_1 = __importDefault(require("@maplibre/maplibre-gl-style-spec"));
class StyleValidatorEngine {
    validate(styleJson) {
        try {
            // Use validateStyleMin from @maplibre/maplibre-gl-style-spec
            const validateFn = maplibre_gl_style_spec_1.default.validateStyleMin || maplibre_gl_style_spec_1.default.default?.validateStyleMin || maplibre_gl_style_spec_1.default.validate;
            const errors = validateFn(styleJson);
            return {
                valid: errors.length === 0,
                errors: errors
            };
        }
        catch (e) {
            return {
                valid: false,
                errors: [{ message: e.message }]
            };
        }
    }
    generateStyle(options) {
        const theme = options.theme || 'light';
        const tileSource = options.tileSource || 'openfreemap';
        const enable3D = options.enable3DBuildings ?? false;
        let tileUrl = 'https://tiles.openfreemap.org/planet';
        if (tileSource === 'demotiles') {
            tileUrl = 'https://demotiles.maplibre.org/tiles/tiles.json';
        }
        else if (tileSource === 'protomaps') {
            tileUrl = 'pmtiles://https://build.protomaps.com/20260101.pmtiles';
        }
        else if (tileSource === 'custom' && options.customUrl) {
            tileUrl = options.customUrl;
        }
        const bgColor = theme === 'dark' ? '#191a1a' : '#f8f4f0';
        const buildingColor = theme === 'dark' ? '#2b2c2e' : '#d0d0d0';
        const style = {
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
exports.StyleValidatorEngine = StyleValidatorEngine;
