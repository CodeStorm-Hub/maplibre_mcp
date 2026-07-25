export interface ViewportResult {
  center: [number, number]; // [longitude, latitude]
  bounds: {
    minLng: number;
    minLat: number;
    maxLng: number;
    maxLat: number;
  };
  recommendedZoom: number;
}

export class SpatialViewportEngine {
  public calculateViewport(coordinates: [number, number][], padding: number = 0.1): ViewportResult {
    if (!coordinates || coordinates.length === 0) {
      return {
        center: [0, 0],
        bounds: { minLng: -180, minLat: -85, maxLng: 180, maxLat: 85 },
        recommendedZoom: 2
      };
    }

    let minLng = Infinity;
    let maxLng = -Infinity;
    let minLat = Infinity;
    let maxLat = -Infinity;

    for (const [lng, lat] of coordinates) {
      if (lng < minLng) minLng = lng;
      if (lng > maxLng) maxLng = lng;
      if (lat < minLat) minLat = lat;
      if (lat > maxLat) maxLat = lat;
    }

    const centerLng = (minLng + maxLng) / 2;
    const centerLat = (minLat + maxLat) / 2;

    const deltaLng = maxLng - minLng;
    const deltaLat = maxLat - minLat;
    const maxDelta = Math.max(deltaLng, deltaLat);

    let zoom = 14;
    if (maxDelta > 60) zoom = 2;
    else if (maxDelta > 30) zoom = 4;
    else if (maxDelta > 15) zoom = 6;
    else if (maxDelta > 5) zoom = 8;
    else if (maxDelta > 1) zoom = 10;
    else if (maxDelta > 0.1) zoom = 12;

    return {
      center: [centerLng, centerLat],
      bounds: {
        minLng: minLng - padding,
        minLat: minLat - padding,
        maxLng: maxLng + padding,
        maxLat: maxLat + padding
      },
      recommendedZoom: zoom
    };
  }
}
