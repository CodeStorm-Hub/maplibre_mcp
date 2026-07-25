export interface FlutterProjectSetupOptions {
    packageName?: string;
    includeLocationPermissions?: boolean;
    useFfi?: boolean;
}
export declare class FlutterProjectSetupEngine {
    generateSetupFiles(options: FlutterProjectSetupOptions): Record<string, string>;
}
