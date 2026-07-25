export interface FlutterLayerOptions {
    layerType: 'symbol' | 'line' | 'fill' | 'circle' | 'heatmap' | 'fill-extrusion';
    sourceId: string;
    layerId: string;
    properties?: Record<string, any>;
}
export declare class FlutterLayerBuilderEngine {
    generateLayerCode(options: FlutterLayerOptions): string;
}
