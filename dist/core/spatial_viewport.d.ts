export interface ViewportResult {
    center: [number, number];
    bounds: {
        minLng: number;
        minLat: number;
        maxLng: number;
        maxLat: number;
    };
    recommendedZoom: number;
}
export declare class SpatialViewportEngine {
    calculateViewport(coordinates: [number, number][], padding?: number): ViewportResult;
}
