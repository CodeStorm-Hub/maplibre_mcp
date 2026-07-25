const assert = require('assert');

const { DocsSearchEngine } = require('../dist/core/docs_search.js');
const { StyleValidatorEngine } = require('../dist/core/style_validator.js');
const { MartinScaffolderEngine } = require('../dist/core/martin_scaffolder.js');
const { AgentSkillsEngine } = require('../dist/core/agent_skills.js');
const { SpatialViewportEngine } = require('../dist/core/spatial_viewport.js');

const { FlutterProjectSetupEngine } = require('../dist/framework_layer/flutter/project_setup.js');
const { FlutterWidgetScaffoldEngine } = require('../dist/framework_layer/flutter/widget_scaffold.js');
const { FlutterPMTilesEngine } = require('../dist/framework_layer/flutter/style_pmtiles.js');
const { FlutterLayerBuilderEngine } = require('../dist/framework_layer/flutter/layer_builder.js');
const { FlutterClusterBuilderEngine } = require('../dist/framework_layer/flutter/cluster_builder.js');

async function runTests() {
  console.log('--- Starting MapLibre MCP Server Tool Tests ---');

  // Test 1: Docs Search
  const docsEngine = new DocsSearchEngine();
  const docsRes = docsEngine.search('flutter', 'flutter');
  assert(docsRes.length > 0, 'Docs search for flutter should return results');
  console.log('✅ Test 1 Passed: search_maplibre_docs');

  // Test 2: Style Spec Validation & Generation
  const styleEngine = new StyleValidatorEngine();
  const generatedStyle = styleEngine.generateStyle({ theme: 'dark', enable3DBuildings: true });
  assert.strictEqual(generatedStyle.version, 8, 'Generated style version should be 8');
  const valRes = styleEngine.validate(generatedStyle);
  if (!valRes.valid) {
    console.error('Validation errors:', JSON.stringify(valRes.errors, null, 2));
  }
  assert(valRes.valid, 'Generated style should pass MapLibre Style Spec validation');
  console.log('✅ Test 2 Passed: validate_maplibre_style & generate_maplibre_style');

  // Test 3: Martin & Tile Config Scaffolder
  const martinEngine = new MartinScaffolderEngine();
  const dockerConfig = martinEngine.generateConfig({ target: 'martin-docker' });
  assert(dockerConfig.includes('ghcr.io/maplibre/martin'), 'Martin docker config should include martin image');
  console.log('✅ Test 3 Passed: generate_tile_server_config');

  // Test 4: Agent Skills Engine
  const skillsEngine = new AgentSkillsEngine();
  const pmtilesSkill = skillsEngine.getSkill('pmtiles-patterns');
  assert(pmtilesSkill.includes('PMTiles'), 'PMTiles skill should contain PMTiles instructions');
  console.log('✅ Test 4 Passed: get_maplibre_agent_skill');

  // Test 5: Spatial Viewport Calculator
  const viewportEngine = new SpatialViewportEngine();
  const vp = viewportEngine.calculateViewport([[-74.0060, 40.7128], [-73.9352, 40.7306]]);
  assert(vp.center[0] < 0 && vp.center[1] > 0, 'Center coordinates calculated');
  assert(vp.recommendedZoom > 0, 'Zoom level calculated');
  console.log('✅ Test 5 Passed: calc_map_viewport');

  // Test 6: Flutter Project Setup Engine
  const flutterSetupEngine = new FlutterProjectSetupEngine();
  const setupFiles = flutterSetupEngine.generateSetupFiles({ includeLocationPermissions: true });
  assert(setupFiles['pubspec.yaml'].includes('maplibre_gl'), 'pubspec.yaml generated');
  assert(setupFiles['AndroidManifest.xml'].includes('ACCESS_FINE_LOCATION'), 'AndroidManifest.xml location perms generated');
  console.log('✅ Test 6 Passed: setup_flutter_maplibre_project');

  // Test 7: Flutter Widget Scaffold Engine
  const flutterWidgetEngine = new FlutterWidgetScaffoldEngine();
  const widgetCode = flutterWidgetEngine.generateWidgetCode({ initialLatitude: 40.7128, initialLongitude: -74.0060 });
  assert(widgetCode.includes('MaplibreMap'), 'Widget code should include MaplibreMap widget');
  console.log('✅ Test 7 Passed: generate_flutter_map_scaffold');

  // Test 8: Flutter PMTiles Engine
  const flutterPmtilesEngine = new FlutterPMTilesEngine();
  const pmtilesCode = flutterPmtilesEngine.generateConfig({ tileType: 'pmtiles', isLocalAsset: true, filePathOrUrl: 'assets/map.pmtiles' });
  assert(pmtilesCode.includes('PMTilesHelper'), 'PMTiles config generated');
  console.log('✅ Test 8 Passed: generate_flutter_pmtiles_config');

  // Test 9: Flutter Layer Builder Engine
  const flutterLayerEngine = new FlutterLayerBuilderEngine();
  const layerCode = flutterLayerEngine.generateLayerCode({ layerType: 'fill-extrusion', sourceId: 'src1', layerId: 'l1' });
  assert(layerCode.includes('FillExtrusionLayerProperties'), 'Fill Extrusion layer code generated');
  console.log('✅ Test 9 Passed: generate_flutter_map_layer');

  // Test 10: Flutter Cluster Builder Engine
  const flutterClusterEngine = new FlutterClusterBuilderEngine();
  const clusterCode = flutterClusterEngine.generateClusterCode({ sourceId: 'places', geoJsonUrlOrPath: 'https://example.com/places.json' });
  assert(clusterCode.includes('cluster: true'), 'Cluster code generated with cluster: true');
  console.log('✅ Test 10 Passed: generate_flutter_geojson_cluster');

  console.log('\n🎉 ALL 10 UNIT & INTEGRATION TESTS PASSED SUCCESSFULLY! 🎉');
}

runTests().catch(err => {
  console.error('❌ Test failed:', err);
  process.exit(1);
});
