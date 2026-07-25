export interface FlutterWidgetScaffoldOptions {
    packageType?: 'maplibre_gl' | 'maplibre_ffi';
    styleSource?: 'url' | 'asset' | 'pmtiles';
    initialLatitude?: number;
    initialLongitude?: number;
    initialZoom?: number;
    enableMyLocation?: boolean;
}
export declare class FlutterWidgetScaffoldEngine {
    generateWidgetCode(options: FlutterWidgetScaffoldOptions): string;
}
