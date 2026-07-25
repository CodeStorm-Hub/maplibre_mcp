#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("@modelcontextprotocol/sdk/server/index.js");
const stdio_js_1 = require("@modelcontextprotocol/sdk/server/stdio.js");
const types_js_1 = require("@modelcontextprotocol/sdk/types.js");
const docs_search_js_1 = require("./core/docs_search.js");
const style_validator_js_1 = require("./core/style_validator.js");
const martin_scaffolder_js_1 = require("./core/martin_scaffolder.js");
const agent_skills_js_1 = require("./core/agent_skills.js");
const spatial_viewport_js_1 = require("./core/spatial_viewport.js");
const project_setup_js_1 = require("./framework_layer/flutter/project_setup.js");
const widget_scaffold_js_1 = require("./framework_layer/flutter/widget_scaffold.js");
const style_pmtiles_js_1 = require("./framework_layer/flutter/style_pmtiles.js");
const layer_builder_js_1 = require("./framework_layer/flutter/layer_builder.js");
const cluster_builder_js_1 = require("./framework_layer/flutter/cluster_builder.js");
const server = new index_js_1.Server({ name: 'maplibre-all-in-one-mcp', version: '1.0.0' }, { capabilities: { tools: {} } });
const docsSearchEngine = new docs_search_js_1.DocsSearchEngine();
const styleValidatorEngine = new style_validator_js_1.StyleValidatorEngine();
const martinScaffolderEngine = new martin_scaffolder_js_1.MartinScaffolderEngine();
const agentSkillsEngine = new agent_skills_js_1.AgentSkillsEngine();
const spatialViewportEngine = new spatial_viewport_js_1.SpatialViewportEngine();
const flutterProjectSetupEngine = new project_setup_js_1.FlutterProjectSetupEngine();
const flutterWidgetScaffoldEngine = new widget_scaffold_js_1.FlutterWidgetScaffoldEngine();
const flutterPMTilesEngine = new style_pmtiles_js_1.FlutterPMTilesEngine();
const flutterLayerBuilderEngine = new layer_builder_js_1.FlutterLayerBuilderEngine();
const flutterClusterBuilderEngine = new cluster_builder_js_1.FlutterClusterBuilderEngine();
// 1. List Tools Handler
server.setRequestHandler(types_js_1.ListToolsRequestSchema, async () => {
    return {
        tools: [
            // Layer 1: Core Base Tools
            {
                name: 'search_maplibre_docs',
                description: 'Search documentation, guides, and example code across the MapLibre ecosystem (GL JS, Native, Compose, Flutter, Style Spec, Tile Spec, Martin).',
                inputSchema: {
                    type: 'object',
                    properties: {
                        query: { type: 'string', description: 'Search query (e.g. "3D buildings", "PMTiles protocol", "Martin PostGIS config")' },
                        ecosystem: {
                            type: 'string',
                            enum: ['gl-js', 'native', 'compose', 'flutter', 'style-spec', 'tile-spec', 'martin', 'all'],
                            description: 'Target sub-project filter'
                        }
                    },
                    required: ['query']
                }
            },
            {
                name: 'validate_maplibre_style',
                description: 'Parse and validate a MapLibre Style JSON object against the official specification schema.',
                inputSchema: {
                    type: 'object',
                    properties: {
                        styleJson: { type: 'object', description: 'The MapLibre style JSON object to validate' }
                    },
                    required: ['styleJson']
                }
            },
            {
                name: 'generate_maplibre_style',
                description: 'Construct a complete, valid MapLibre Style JSON for light/dark themes, 3D buildings, terrain, satellite, or custom PMTiles/OpenFreeMap basemaps.',
                inputSchema: {
                    type: 'object',
                    properties: {
                        theme: { type: 'string', enum: ['light', 'dark', 'satellite', 'terrain'], description: 'Visual map theme' },
                        tileSource: { type: 'string', enum: ['openfreemap', 'protomaps', 'demotiles', 'custom'], description: 'Vector tile source provider' },
                        customUrl: { type: 'string', description: 'Custom tile server or PMTiles URL' },
                        enable3DBuildings: { type: 'boolean', description: 'Enable 3D fill-extrusion building layer' }
                    }
                }
            },
            {
                name: 'generate_tile_server_config',
                description: 'Generate configurations for tile servers (Martin Docker compose, PostGIS ST_AsMVT SQL function, Cloudflare R2 CORS config, PMTiles CLI setup).',
                inputSchema: {
                    type: 'object',
                    properties: {
                        target: { type: 'string', enum: ['martin-docker', 'postgis-mvt-function', 'cloudflare-r2-cors', 'pmtiles-setup'], description: 'Infrastructure configuration target' },
                        dbName: { type: 'string', description: 'PostgreSQL database name' },
                        tableName: { type: 'string', description: 'Spatial table name' },
                        geomColumn: { type: 'string', description: 'Geometry column name' }
                    },
                    required: ['target']
                }
            },
            {
                name: 'get_maplibre_agent_skill',
                description: 'Retrieve structured community agent skills for MapLibre development.',
                inputSchema: {
                    type: 'object',
                    properties: {
                        skill: { type: 'string', enum: ['mapbox-migration', 'pmtiles-patterns', 'tile-sources'], description: 'Target skill identifier' }
                    },
                    required: ['skill']
                }
            },
            {
                name: 'calc_map_viewport',
                description: 'Offline spatial math utility calculating exact camera center, LatLngBounds, and recommended zoom levels for coordinate arrays.',
                inputSchema: {
                    type: 'object',
                    properties: {
                        coordinates: {
                            type: 'array',
                            items: { type: 'array', items: { type: 'number' } },
                            description: 'Array of [longitude, latitude] coordinates'
                        },
                        padding: { type: 'number', description: 'Bounding box padding margin in degrees' }
                    },
                    required: ['coordinates']
                }
            },
            // Layer 2: Dart / Flutter Tools
            {
                name: 'setup_flutter_maplibre_project',
                description: 'Scaffold Flutter project setup files: pubspec.yaml dependencies, AndroidManifest.xml location permissions, and iOS Info.plist privacy keys.',
                inputSchema: {
                    type: 'object',
                    properties: {
                        packageName: { type: 'string', description: 'Flutter package/application name' },
                        includeLocationPermissions: { type: 'boolean', description: 'Include fine/coarse location permissions' },
                        useFfi: { type: 'boolean', description: 'Use FFI package instead of maplibre_gl' }
                    }
                }
            },
            {
                name: 'generate_flutter_map_scaffold',
                description: 'Generate a complete Flutter widget implementing MapLibre with camera position, style URL, gesture controls, and map controller.',
                inputSchema: {
                    type: 'object',
                    properties: {
                        packageType: { type: 'string', enum: ['maplibre_gl', 'maplibre_ffi'], description: 'MapLibre Flutter package type' },
                        styleSource: { type: 'string', enum: ['url', 'asset', 'pmtiles'], description: 'Style source location' },
                        initialLatitude: { type: 'number', description: 'Initial center latitude' },
                        initialLongitude: { type: 'number', description: 'Initial center longitude' },
                        initialZoom: { type: 'number', description: 'Initial camera zoom level' },
                        enableMyLocation: { type: 'boolean', description: 'Show user location on map' }
                    }
                }
            },
            {
                name: 'generate_flutter_pmtiles_config',
                description: 'Generate Dart code for registering local or remote .pmtiles and .mbtiles custom protocols in a Flutter app.',
                inputSchema: {
                    type: 'object',
                    properties: {
                        tileType: { type: 'string', enum: ['pmtiles', 'mbtiles'], description: 'Tile archive format' },
                        isLocalAsset: { type: 'boolean', description: 'Is file bundled in Flutter assets' },
                        filePathOrUrl: { type: 'string', description: 'File asset path or remote URL' }
                    },
                    required: ['tileType', 'isLocalAsset', 'filePathOrUrl']
                }
            },
            {
                name: 'generate_flutter_map_layer',
                description: 'Generate Dart code for vector/raster layers (Symbol, Line, Fill, Circle, Heatmap, 3D Fill Extrusion) with paint properties.',
                inputSchema: {
                    type: 'object',
                    properties: {
                        layerType: { type: 'string', enum: ['symbol', 'line', 'fill', 'circle', 'heatmap', 'fill-extrusion'], description: 'MapLibre layer type' },
                        sourceId: { type: 'string', description: 'Vector/Raster tile source ID' },
                        layerId: { type: 'string', description: 'Unique layer ID' },
                        properties: { type: 'object', description: 'Custom paint/layout properties' }
                    },
                    required: ['layerType', 'sourceId', 'layerId']
                }
            },
            {
                name: 'generate_flutter_geojson_cluster',
                description: 'Generate Dart code for loading GeoJSON point sources with interactive clustering (ClusterOptions), count badges, and click handlers.',
                inputSchema: {
                    type: 'object',
                    properties: {
                        sourceId: { type: 'string', description: 'GeoJSON source ID' },
                        geoJsonUrlOrPath: { type: 'string', description: 'GeoJSON asset path or HTTP URL' },
                        clusterMaxZoom: { type: 'number', description: 'Maximum zoom level for clustering' },
                        clusterRadius: { type: 'number', description: 'Clustering pixel radius' }
                    },
                    required: ['sourceId', 'geoJsonUrlOrPath']
                }
            }
        ]
    };
});
// 2. Call Tool Execution Handler
server.setRequestHandler(types_js_1.CallToolRequestSchema, async (request) => {
    const { name, arguments: args = {} } = request.params;
    // Tool 1: search_maplibre_docs
    if (name === 'search_maplibre_docs') {
        const results = docsSearchEngine.search(args.query || '', args.ecosystem || 'all');
        return {
            content: [{ type: 'text', text: JSON.stringify(results, null, 2) }]
        };
    }
    // Tool 2: validate_maplibre_style
    if (name === 'validate_maplibre_style') {
        const res = styleValidatorEngine.validate(args.styleJson);
        return {
            content: [{ type: 'text', text: JSON.stringify(res, null, 2) }]
        };
    }
    // Tool 3: generate_maplibre_style
    if (name === 'generate_maplibre_style') {
        const styleObj = styleValidatorEngine.generateStyle({
            theme: args.theme,
            tileSource: args.tileSource,
            customUrl: args.customUrl,
            enable3DBuildings: args.enable3DBuildings
        });
        return {
            content: [{ type: 'text', text: JSON.stringify(styleObj, null, 2) }]
        };
    }
    // Tool 4: generate_tile_server_config
    if (name === 'generate_tile_server_config') {
        const configStr = martinScaffolderEngine.generateConfig({
            target: args.target,
            dbName: args.dbName,
            tableName: args.tableName,
            geomColumn: args.geomColumn
        });
        return {
            content: [{ type: 'text', text: configStr }]
        };
    }
    // Tool 5: get_maplibre_agent_skill
    if (name === 'get_maplibre_agent_skill') {
        const skillContent = agentSkillsEngine.getSkill(args.skill);
        return {
            content: [{ type: 'text', text: skillContent }]
        };
    }
    // Tool 6: calc_map_viewport
    if (name === 'calc_map_viewport') {
        const viewportRes = spatialViewportEngine.calculateViewport(args.coordinates || [], args.padding || 0.1);
        return {
            content: [{ type: 'text', text: JSON.stringify(viewportRes, null, 2) }]
        };
    }
    // Tool 7: setup_flutter_maplibre_project
    if (name === 'setup_flutter_maplibre_project') {
        const setupFiles = flutterProjectSetupEngine.generateSetupFiles({
            packageName: args.packageName,
            includeLocationPermissions: args.includeLocationPermissions,
            useFfi: args.useFfi
        });
        return {
            content: [{ type: 'text', text: JSON.stringify(setupFiles, null, 2) }]
        };
    }
    // Tool 8: generate_flutter_map_scaffold
    if (name === 'generate_flutter_map_scaffold') {
        const widgetCode = flutterWidgetScaffoldEngine.generateWidgetCode({
            packageType: args.packageType,
            styleSource: args.styleSource,
            initialLatitude: args.initialLatitude,
            initialLongitude: args.initialLongitude,
            initialZoom: args.initialZoom,
            enableMyLocation: args.enableMyLocation
        });
        return {
            content: [{ type: 'text', text: widgetCode }]
        };
    }
    // Tool 9: generate_flutter_pmtiles_config
    if (name === 'generate_flutter_pmtiles_config') {
        const pmtilesCode = flutterPMTilesEngine.generateConfig({
            tileType: args.tileType,
            isLocalAsset: args.isLocalAsset,
            filePathOrUrl: args.filePathOrUrl
        });
        return {
            content: [{ type: 'text', text: pmtilesCode }]
        };
    }
    // Tool 10: generate_flutter_map_layer
    if (name === 'generate_flutter_map_layer') {
        const layerCode = flutterLayerBuilderEngine.generateLayerCode({
            layerType: args.layerType,
            sourceId: args.sourceId,
            layerId: args.layerId,
            properties: args.properties
        });
        return {
            content: [{ type: 'text', text: layerCode }]
        };
    }
    // Tool 11: generate_flutter_geojson_cluster
    if (name === 'generate_flutter_geojson_cluster') {
        const clusterCode = flutterClusterBuilderEngine.generateClusterCode({
            sourceId: args.sourceId,
            geoJsonUrlOrPath: args.geoJsonUrlOrPath,
            clusterMaxZoom: args.clusterMaxZoom,
            clusterRadius: args.clusterRadius
        });
        return {
            content: [{ type: 'text', text: clusterCode }]
        };
    }
    throw new Error(`Unknown tool: ${name}`);
});
// 3. Connect via Standard I/O Transport
async function main() {
    const transport = new stdio_js_1.StdioServerTransport();
    await server.connect(transport);
}
main().catch(console.error);
