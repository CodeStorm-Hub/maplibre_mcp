export interface FlutterClusterOptions {
    sourceId: string;
    geoJsonUrlOrPath: string;
    clusterMaxZoom?: number;
    clusterRadius?: number;
}
export declare class FlutterClusterBuilderEngine {
    generateClusterCode(options: FlutterClusterOptions): string;
}
