"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlutterProjectSetupEngine = void 0;
class FlutterProjectSetupEngine {
    generateSetupFiles(options) {
        const pkgName = options.useFfi ? 'maplibre' : 'maplibre_gl';
        const pkgVersion = options.useFfi ? '^0.1.0' : '^0.16.0';
        const locPerms = options.includeLocationPermissions ?? true;
        const pubspecYaml = `name: my_maplibre_app
description: "A Flutter application using MapLibre vector maps."
publish_to: 'none'
version: 1.0.0+1

environment:
  sdk: '>=3.0.0 <4.0.0'

dependencies:
  flutter:
    sdk: flutter
  ${pkgName}: ${pkgVersion}
  http: ^1.1.0
  path_provider: ^2.1.0

dev_dependencies:
  flutter_test:
    sdk: flutter
  flutter_lints: ^3.0.0

flutter:
  uses-material-design: true
  assets:
    - assets/style.json
    - assets/tiles/
`;
        const androidManifest = `<!-- AndroidManifest.xml configuration for MapLibre -->
<manifest xmlns:android="http://schemas.android.com/apk/res/android">
    <!-- Internet Access for fetching map tiles -->
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
${locPerms ? `
    <!-- User Location Permissions -->
    <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
    <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
` : ''}
    <application
        android:label="MapLibre App"
        android:name="\${applicationName}"
        android:icon="@mipmap/ic_launcher">
        <activity
            android:name=".MainActivity"
            android:exported="true">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>
</manifest>
`;
        const iosInfoPlist = `<!-- Info.plist configuration for MapLibre on iOS -->
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>CFBundleName</key>
    <string>MapLibre App</string>
    <key>CFBundleIdentifier</key>
    <string>com.example.maplibreApp</string>
${locPerms ? `
    <!-- Location Permission Strings -->
    <key>NSLocationWhenInUseUsageDescription</key>
    <string>This app needs access to your location to display your position on the map.</string>
    <key>NSLocationAlwaysAndWhenInUseUsageDescription</key>
    <string>This app needs location access to track movement on the map.</string>
` : ''}
    <key>io.flutter.embedded_views_preview</key>
    <true/>
</dict>
</plist>
`;
        return {
            'pubspec.yaml': pubspecYaml,
            'AndroidManifest.xml': androidManifest,
            'Info.plist': iosInfoPlist
        };
    }
}
exports.FlutterProjectSetupEngine = FlutterProjectSetupEngine;
