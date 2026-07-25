export interface TileServerConfigOptions {
    target: 'martin-docker' | 'postgis-mvt-function' | 'cloudflare-r2-cors' | 'pmtiles-setup';
    dbName?: string;
    tableName?: string;
    geomColumn?: string;
    srid?: number;
}
export declare class MartinScaffolderEngine {
    generateConfig(options: TileServerConfigOptions): string;
}
