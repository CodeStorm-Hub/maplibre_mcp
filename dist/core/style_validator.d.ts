export interface StyleValidationResult {
    valid: boolean;
    errors: any[];
}
export interface StyleGeneratorOptions {
    theme?: 'light' | 'dark' | 'satellite' | 'terrain';
    tileSource?: 'openfreemap' | 'protomaps' | 'demotiles' | 'custom';
    customUrl?: string;
    enable3DBuildings?: boolean;
}
export declare class StyleValidatorEngine {
    validate(styleJson: any): StyleValidationResult;
    generateStyle(options: StyleGeneratorOptions): any;
}
