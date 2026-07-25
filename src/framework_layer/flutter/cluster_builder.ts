export interface FlutterClusterOptions {
  sourceId: string;
  geoJsonUrlOrPath: string;
  clusterMaxZoom?: number;
  clusterRadius?: number;
}

export class FlutterClusterBuilderEngine {
  public generateClusterCode(options: FlutterClusterOptions): string {
    const { sourceId, geoJsonUrlOrPath, clusterMaxZoom = 14, clusterRadius = 50 } = options;

    return `// GeoJSON Source & Point Clustering Implementation in MapLibre Flutter
Future<void> setupGeoJsonClustering(MaplibreMapController controller) async {
  // 1. Add GeoJSON Source with Clustering enabled
  await controller.addSource(
    '${sourceId}',
    GeojsonSourceProperties(
      data: '${geoJsonUrlOrPath}',
      cluster: true,
      clusterMaxZoom: ${clusterMaxZoom},
      clusterRadius: ${clusterRadius},
    ),
  );

  // 2. Add Cluster Circles Layer (Graduated Sizes)
  await controller.addCircleLayer(
    '${sourceId}',
    '${sourceId}-clusters',
    const CircleLayerProperties(
      circleColor: [
        'step',
        ['get', 'point_count'],
        '#51bbd6',
        100,
        '#f1f075',
        750,
        '#f28cb1'
      ],
      circleRadius: [
        'step',
        ['get', 'point_count'],
        20,
        100,
        30,
        750,
        40
      ],
    ),
    filter: ['has', 'point_count'],
  );

  // 3. Add Cluster Count Labels Layer
  await controller.addSymbolLayer(
    '${sourceId}',
    '${sourceId}-cluster-count',
    const SymbolLayerProperties(
      textField: '{point_count_abbreviated}',
      textSize: 12.0,
      textColor: '#ffffff',
    ),
    filter: ['has', 'point_count'],
  );

  // 4. Add Unclustered Individual Point Markers
  await controller.addCircleLayer(
    '${sourceId}',
    '${sourceId}-unclustered-point',
    const CircleLayerProperties(
      circleColor: '#11b4da',
      circleRadius: 8.0,
      circleStrokeWidth: 1.0,
      circleStrokeColor: '#ffffff',
    ),
    filter: ['!', ['has', 'point_count']],
  );
}
`;
  }
}
