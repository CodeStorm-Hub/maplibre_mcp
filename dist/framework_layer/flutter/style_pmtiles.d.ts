export interface FlutterPMTilesConfigOptions {
    tileType: 'pmtiles' | 'mbtiles';
    isLocalAsset: boolean;
    filePathOrUrl: string;
}
export declare class FlutterPMTilesEngine {
    generateConfig(options: FlutterPMTilesConfigOptions): string;
}
