export interface FlutterWidgetScaffoldOptions {
  packageType?: 'maplibre_gl' | 'maplibre_ffi';
  styleSource?: 'url' | 'asset' | 'pmtiles';
  initialLatitude?: number;
  initialLongitude?: number;
  initialZoom?: number;
  enableMyLocation?: boolean;
}

export class FlutterWidgetScaffoldEngine {
  public generateWidgetCode(options: FlutterWidgetScaffoldOptions): string {
    const lat = options.initialLatitude ?? 40.7128;
    const lng = options.initialLongitude ?? -74.0060;
    const zoom = options.initialZoom ?? 11.0;
    const myLocation = options.enableMyLocation ?? false;
    const styleSrc = options.styleSource || 'url';

    let styleString = "'https://demotiles.maplibre.org/style.json'";
    if (styleSrc === 'asset') {
      styleString = "'assets/style.json'";
    } else if (styleSrc === 'pmtiles') {
      styleString = "'pmtiles://https://build.protomaps.com/20260101.pmtiles'";
    }

    return `import 'package:flutter/material.dart';
import 'package:maplibre_gl/maplibre_gl.dart';

class MapScreen extends StatefulWidget {
  const MapScreen({Key? key}) : super(key: key);

  @override
  State<MapScreen> createState() => _MapScreenState();
}

class _MapScreenState extends State<MapScreen> {
  MaplibreMapController? mapController;

  void _onMapCreated(MaplibreMapController controller) {
    mapController = controller;
  }

  void _onStyleLoaded() {
    debugPrint('MapLibre Style fully loaded!');
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('MapLibre Flutter Map'),
        elevation: 2,
      ),
      body: MaplibreMap(
        styleString: ${styleString},
        onMapCreated: _onMapCreated,
        onStyleLoadedCallback: _onStyleLoaded,
        initialCameraPosition: const CameraPosition(
          target: LatLng(${lat}, ${lng}),
          zoom: ${zoom},
        ),
        myLocationEnabled: ${myLocation},
        myLocationTrackingMode: ${myLocation ? 'MyLocationTrackingMode.tracking' : 'MyLocationTrackingMode.none'},
        trackCameraPosition: true,
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          mapController?.animateCamera(
            CameraUpdate.newCameraPosition(
              const CameraPosition(
                target: LatLng(${lat}, ${lng}),
                zoom: ${zoom + 2},
              ),
            ),
          );
        },
        child: const Icon(Icons.zoom_in),
      ),
    );
  }
}
`;
  }
}
