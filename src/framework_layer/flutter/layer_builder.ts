export interface FlutterLayerOptions {
  layerType: 'symbol' | 'line' | 'fill' | 'circle' | 'heatmap' | 'fill-extrusion';
  sourceId: string;
  layerId: string;
  properties?: Record<string, any>;
}

export class FlutterLayerBuilderEngine {
  public generateLayerCode(options: FlutterLayerOptions): string {
    const { layerType, sourceId, layerId } = options;

    if (layerType === 'symbol') {
      return `// Add Symbol Layer (Markers / Icons) in MapLibre Flutter
await mapController?.addSymbolLayer(
  '${sourceId}',
  '${layerId}',
  const SymbolLayerProperties(
    iconImage: 'custom-marker',
    iconSize: 1.5,
    iconAllowOverlap: true,
    textField: '{title}',
    textSize: 12.0,
    textOffset: [0, 1.5],
  ),
);
`;
    }

    if (layerType === 'line') {
      return `// Add Line Layer (Routes / Paths) in MapLibre Flutter
await mapController?.addLineLayer(
  '${sourceId}',
  '${layerId}',
  const LineLayerProperties(
    lineColor: '#007cbf',
    lineWidth: 4.0,
    lineOpacity: 0.8,
    lineJoin: 'round',
    lineCap: 'round',
  ),
);
`;
    }

    if (layerType === 'fill') {
      return `// Add Fill Layer (Polygons / Areas) in MapLibre Flutter
await mapController?.addFillLayer(
  '${sourceId}',
  '${layerId}',
  const FillLayerProperties(
    fillColor: '#008080',
    fillOpacity: 0.5,
    fillOutlineColor: '#004040',
  ),
);
`;
    }

    if (layerType === 'circle') {
      return `// Add Circle Layer (Points) in MapLibre Flutter
await mapController?.addCircleLayer(
  '${sourceId}',
  '${layerId}',
  const CircleLayerProperties(
    circleRadius: 6.0,
    circleColor: '#ff0000',
    circleStrokeWidth: 2.0,
    circleStrokeColor: '#ffffff',
  ),
);
`;
    }

    if (layerType === 'fill-extrusion') {
      return `// Add 3D Fill Extrusion Layer (Buildings) in MapLibre Flutter
await mapController?.addFillExtrusionLayer(
  '${sourceId}',
  '${layerId}',
  const FillExtrusionLayerProperties(
    fillExtrusionColor: '#aaaaaa',
    fillExtrusionHeight: ['get', 'height'],
    fillExtrusionBase: ['get', 'min_height'],
    fillExtrusionOpacity: 0.85,
  ),
);
`;
    }

    return `// Add Custom Layer Properties for ${layerType}
await mapController?.addLayer(
  '${sourceId}',
  '${layerId}',
  // Layer properties
);
`;
  }
}
