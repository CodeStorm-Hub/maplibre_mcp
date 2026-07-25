export interface FlutterPMTilesConfigOptions {
  tileType: 'pmtiles' | 'mbtiles';
  isLocalAsset: boolean;
  filePathOrUrl: string;
}

export class FlutterPMTilesEngine {
  public generateConfig(options: FlutterPMTilesConfigOptions): string {
    const { tileType, isLocalAsset, filePathOrUrl } = options;

    if (tileType === 'pmtiles') {
      return `import 'dart:io';
import 'package:flutter/services.dart';
import 'package:path_provider/path_provider.dart';

/// Helper utility for handling PMTiles archives in Flutter
class PMTilesHelper {
  /// Resolves the target PMTiles source URI for MapLibre
  static Future<String> getPMTilesStyleUri({
    required String pmtilesUrlOrPath,
    bool isAsset = ${isLocalAsset},
  }) async {
    if (isAsset) {
      // Copy PMTiles file from Flutter rootBundle assets to local storage
      final byteData = await rootBundle.load(pmtilesUrlOrPath);
      final tempDir = await getApplicationDocumentsDirectory();
      final localFile = File('\${tempDir.path}/map_data.pmtiles');
      await localFile.writeAsBytes(
        byteData.buffer.asUint8List(byteData.offsetInBytes, byteData.lengthInBytes),
      );
      return 'pmtiles://\${localFile.path}';
    } else {
      // Remote PMTiles URL served via HTTP Range requests
      return 'pmtiles://${filePathOrUrl}';
    }
  }
}
`;
    } else {
      return `import 'dart:io';
import 'package:flutter/services.dart';
import 'package:path_provider/path_provider.dart';

/// Helper utility for loading local MBTiles archives in Flutter
class MBTilesHelper {
  static Future<String> getLocalMBTilesPath(String assetPath) async {
    final byteData = await rootBundle.load(assetPath);
    final docDir = await getApplicationDocumentsDirectory();
    final file = File('\${docDir.path}/offline_map.mbtiles');
    await file.writeAsBytes(
      byteData.buffer.asUint8List(byteData.offsetInBytes, byteData.lengthInBytes),
    );
    return file.path;
  }
}
`;
    }
  }
}
