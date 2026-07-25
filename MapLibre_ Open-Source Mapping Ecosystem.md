# **MapLibre: Open-Source Mapping Ecosystem**

[https://gemini.google.com/app/8625fa59566b8d10](https://gemini.google.com/app/8625fa59566b8d10)

*User prompt: For building mobile app for ios and android with Flutter which are the products that I can use?*

Response: When building a mobile application for iOS and Android using **Flutter**, you can leverage MapLibre through official community Flutter plugins that wrap MapLibre's underlying rendering engines.

## **1\. Flutter Packages (SDK Bindings)**

### **maplibre\_gl (Primary / Official Plugin)**

> * **Package:** [maplibre\_gl](https://pub.dev/packages/maplibre_gl)  
> * **How it works:** Under the hood, it uses **MapLibre Native** (C++ core with iOS and Android native SDKs) for high-performance GPU-accelerated rendering on mobile, and **MapLibre GL JS** for web targets.  
> * **Key Features:**  
  * Interactive vector-tile map rendering.  
  * Dynamic camera controls, gesture support, and user location tracking.  
  * Support for annotations, symbols, lines, polygons, heatmaps, and 3D fill extrusions.  
  * Support for custom style JSONs, vector tiles, and raster tile sources.

### **maplibre (Modern FFI / JNI Package)**

> * **Package:** [maplibre](https://pub.dev/packages/maplibre)  
> * **How it works:** A modern rewrite designed to provide Flutter bindings for MapLibre SDKs through direct native interoperability (Dart FFI / JNI).  
> * **Key Features:**  
  * Uses **MapLibre Native** directly on iOS and Android for consistent performance.  
  * Reduced overhead with Dart FFI bindings compared to traditional platform channels.  
  * Native 3D features, globe view, and camera pitch/rotation capabilities.

## **2\. Supporting MapLibre Tools for Flutter Apps**

To supply map data and custom visual designs to your Flutter app, you can use these complementary MapLibre products:

> * **Maputnik (Visual Style Editor):**  
  * A browser-based visual editor used to design map styles following the **MapLibre Style Specification**.  
  * Export the generated style JSON and load it directly into your Flutter app via styleString or local assets.  
> * **Martin (Tile Server):**  
  * A lightweight, fast tile server written in Rust. If you need to host your own vector map tiles (from PostGIS or .pmtiles / .mbtiles), Martin can serve them to your Flutter app over HTTP/HTTPS.  
> * **MapLibre Tile / PMTiles Specifications:**  
  * For offline maps, you can store static map tiles locally on the mobile device inside .mbtiles or .pmtiles archives and load them without an active internet connection.

## **Summary Recommendation**

> * Use **maplibre\_gl** or **maplibre** as your main Flutter dependency.  
> * Host tiles via a tile provider (e.g., MapTiler, Stadia Maps, AWS Location Services) or run **Martin** to host custom map data.  
> * Use **Maputnik** to customize map colors, layers, and visual aesthetics.

---

*User prompt: How to host a tile provider*

Response: To host your own map tile provider, you need three key components: **Map Data**, a **Tile Server**, and an **HTTP CDN/Reverse Proxy** to deliver the tiles.

## **1\. Choose Your Architecture: Static vs. Dynamic**

### **Option A: Static File / Serverless Architecture (Easiest & Cheapest)**

Instead of running a database or continuous server application, you pre-generate map tiles into a single file archive and serve them using static web hosting or object storage (e.g., AWS S3, Cloudflare R2, or Nginx).

> * **Format:** Use **PMTiles** (single-file vector/raster tile format).  
> * **How it works:** A browser or mobile app requests small byte-ranges directly from the hosted file via HTTP range requests.  
> * **Pros:** Infinite scalability, almost zero maintenance, negligible server costs.  
> * **Best for:** Global or regional basemaps that update periodically (e.g., weekly/monthly).

### **Option B: Dedicated Tile Server (Flexible & Custom)**

You run a lightweight server executable that reads pre-rendered tiles (.mbtiles or .pmtiles) and serves them over standard REST/XYZ tile endpoints (/tiles/{z}/{x}/{y}.pbf).

> * **Popular Open-Source Tools:**  
  * **Martin** (MapLibre ecosystem): A blazingly fast tile server written in Rust.  
  * **TileServer GL**: A popular Node.js server that can render both vector (.pbf) and raster (.png) tiles.  
> * **Pros:** Handles multi-source tile blending, custom endpoints, and dynamic tile requests.  
> * **Best for:** Production setups requiring local serving or internal network access without internet access.

### **Option C: Dynamic Database Engine (Real-Time Data)**

Generate vector map tiles directly on-the-fly from spatial database query tables.

> * **Stack:** **PostgreSQL \+ PostGIS** paired with **Martin** or **pg\_tileserv**.  
> * **How it works:** When a client requests a tile, the server queries PostGIS functions (ST\_AsMVT) to construct Mapbox Vector Tiles on the fly.  
> * **Pros:** Instant updates—when data changes in the database, the map reflects it immediately.  
> * **Best for:** Real-time tracking, custom GIS platforms, and frequently changing data.

## **2\. Step-by-Step Implementation Guide (Serverless / Static Method)**

The simplest way to self-host vector tiles globally is using OpenStreetMap data with PMTiles on Cloudflare or S3.

### **Step 1: Obtain the Map Data**

> * Download pre-packaged OpenStreetMap vector tiles in .mbtiles or .pmtiles format:  
  * **Protomaps / PMTiles:** Downloads of worldwide/regional maps.  
  * **OpenFreeMap:** Offers free full-planet .mbtiles downloads based on OpenStreetMap.

### **Step 2: Upload to Cloud Storage**

> 1. Upload your .pmtiles archive to a cloud storage bucket (AWS S3, Cloudflare R2, Google Cloud Storage, or DigitalOcean Spaces).  
> 2. Enable **CORS** (Cross-Origin Resource Sharing) on the bucket so web and mobile applications can request the files.

### **Step 3: Serve via CDN**

Set up Cloudflare or AWS CloudFront in front of your storage bucket to cache requests and lower latency globally.

## **3\. Step-by-Step Implementation Guide (Docker Server Method)**

If you prefer running a traditional web server using **Martin**:

### **Step 1: Run Martin via Docker**

Create a docker-compose.yml file:

`version: '3.8'`  
`services:`  
  `martin:`  
    `image: ghcr.io/maplibre/martin:latest`  
    `restart: always`  
    `ports:`  
      `- "3000:3000"`  
    `volumes:`  
      `- ./tiles:/files`  
    `command: martin /files/planet.pmtiles`

### **Step 2: Put a Reverse Proxy in Front**

Use Nginx, Caddy, or Traefik with SSL certificates (Certbot / Let's Encrypt) to route HTTP/HTTPS traffic to port 3000\.

### **Step 3: Integrate with Map Client**

In your client library (MapLibre GL JS or Flutter maplibre\_gl), reference your server endpoint:

`{`  
  `"version": 8,`  
  `"sources": {`  
    `"my-tiles": {`  
      `"type": "vector",`  
      `"url": "https://your-domain.com/planet"`  
    `}`  
  `}`  
`}`

## **Key Hardware & Hosting Requirements**

| Strategy | Storage Needed | RAM Required | CPU Required |
| :---- | :---- | :---- | :---- |
| **City / Regional Map** | \~1 GB – 5 GB | 512 MB | 1 vCPU |
| **Full Planet (Vector Tiles)** | \~100 GB – 120 GB | 2 GB – 4 GB | 2 vCPUs |
| **Full Planet (PostGIS Dynamic)** | \~800 GB \+ SSD | 16 GB+ | 4+ vCPUs |

---

*User prompt: Can I host it via Supabase (as the option c) in free tire?*

Response: **Yes, absolutely.** You can host dynamic vector tiles using Supabase's built-in **PostGIS** extension, even on their **Free Tier**.

This works by leveraging PostgreSQL functions like ST\_AsMVT() inside Supabase to aggregate spatial data into Mapbox Vector Tiles on the fly, which you then consume directly from your Flutter app.

## **How It Works in Supabase**

> 1. **Enable PostGIS:** Supabase has the PostGIS extension pre-installed. You just enable it in the dashboard.  
> 2. **Create an MVT Function:** Write a PostgreSQL function in the Supabase SQL Editor that accepts {z, x, y} coordinates, clips your table geometries using ST\_TileEnvelope(), and returns base64-encoded or raw binary vector tiles via ST\_AsMVT().  
> 3. **Expose as RPC Endpoint:** Call that SQL function as an RPC endpoint (supabase.rpc('get\_tile', ...) or via REST URL) from your mobile app.

## **Free Tier Feasibility & Limits**

While Supabase's free tier is fully functional for this setup, you need to keep its resource limits in mind:

| Resource Limit | Supabase Free Tier | Impact on Tile Hosting |
| :---- | :---- | :---- |
| **Database Storage** | **500 MB** | **Strict Limit:** Fits thousands of points, lines, or custom spatial features (e.g., store locations, custom routes, regional POIs). It **cannot** store full basemaps (e.g., world/country map tiles, which take gigabytes). |
| **Bandwidth (Egress)** | **5 GB / month** | Map tiles are small (\~20–100 KB each), but pan/zoom actions make hundreds of requests. 5 GB is fine for testing/demos, but can be consumed quickly with heavy active usage. |
| **Database Pausing** | **7 days of inactivity** | Free projects automatically pause after a week with zero API activity. |

## **Recommended Hybrid Architecture**

Because of the 500 MB database limit, the standard approach for production or free-tier usage is a **hybrid approach**:

> 1. **Base Map Tiles (Background):** Use a free/static tile provider for the underlying geographic basemap (roads, land, water):  
   * Free basemap tiles from **MapTiler** (free tier), **Stadia Maps**, **OpenFreeMap**, or a pre-hosted **PMTiles** file in Cloudflare R2 / S3.  
> 2. **Custom Overlay Tiles (Supabase):** Use Supabase \+ PostGIS *only* for your app’s dynamic custom spatial layers (e.g., real-time driver locations, custom property boundaries, delivery zones) where data changes frequently.

**Sources**

> 1. [Generate Vector Tiles with PostGIS \- Supabase](https://supabase.com/blog/postgis-generate-vector-tiles)  
> 2. [Supabase Pricing in 2026: Plans, Free Tier Limits & Full Breakdown | UI Bakery Blog](https://uibakery.io/blog/supabase-pricing)

---

*User prompt: How about host in cloudflare for free?*

Response: **Yes, hosting on Cloudflare for free is one of the best and most popular choices for vector map tiles.**

By combining **Cloudflare R2** (their S3-compatible object storage) with a single-file map format like **PMTiles** (developed by Protomaps), you can host and serve an entire map basemap with **zero egress/bandwidth fees**.

## **1\. What Makes Cloudflare R2 Ideal for Map Tiles?**

Traditional tile servers require thousands of files or continuous CPU-heavy database queries. In contrast, PMTiles compresses an entire pyramid of map tiles into a single .pmtiles archive.

When a user views a map in your Flutter app, **MapLibre** reads only the specific bytes it needs directly from that single .pmtiles file using HTTP Range Requests.

### **Cloudflare R2 Always-Free Limits:**

> * **Storage:** 10 GB free every month  
> * **Bandwidth / Egress:** **$0.00 (Unlimited Free Egress)**  
> * **Read Requests (Class B):** 10 million free requests / month

**Why this matters:** Unlike AWS S3 or Google Cloud—where bandwidth charges hit hard when thousands of tiles are downloaded—Cloudflare charges **$0 for data transfer**.

## **2\. What Fits Inside Cloudflare's Free 10 GB Storage?**

10 GB is surprisingly large for vector map data because vector tiles store geometric math rather than raster images.

| Map Coverage | Approximate Size | Fits in Free Tier? |
| :---- | :---- | :---- |
| **City / Metropolitan Area** | \~50 MB – 300 MB | ✅ **Yes** (Easily) |
| **Entire Country (e.g., UK, Germany, Japan)** | \~1 GB – 4 GB | ✅ **Yes** |
| **Entire Continent (e.g., North America)** | \~15 GB – 25 GB | ❌ Exceeds 10 GB limit |
| **Entire World (Full Planet)** | \~120 GB | ❌ Exceeds 10 GB limit |

*If you need a global map without paying storage fees, you can lower the maximum zoom level (e.g., zoom level 0 to 10 for the world fits easily within a few gigabytes).*

## **3\. How to Set It Up (Step-by-Step)**

### **Step 1: Create a PMTiles Map File**

You can download pre-built regional map extracts directly from Protomaps or extract your own region using the go-pmtiles CLI tool:

`# Example: Extract a specific area into a single pmtiles archive`  
`pmtiles extract https://build.protomaps.com/20260101.pmtiles my_city.pmtiles --bbox=-74.05,40.68,-73.90,40.88`

### **Step 2: Upload to Cloudflare R2**

> 1. Go to your **Cloudflare Dashboard** → **R2** → **Create Bucket**.  
> 2. Upload your my\_city.pmtiles file into the bucket.  
> 3. Enable **CORS** on your R2 bucket settings so your Flutter app is allowed to request tile data:  
>    `[`  
>      `{`  
>        `"AllowedOrigins": ["*"],`  
>        `"AllowedMethods": ["GET", "HEAD"],`  
>        `"AllowedHeaders": ["Range", "If-Match"],`  
>        `"ExposeHeaders": ["ETag", "Content-Range", "Accept-Ranges"]`  
>      `}`  
>    `]`

### **Step 3: Serve Direct or via Cloudflare Worker**

> * **Direct Access:** Connect a custom domain to your R2 bucket to serve the file directly.  
> * **Via Worker (Optional):** Deploy a small, free Cloudflare Worker to serve tiles in standard tile JSON format (/tiles/{z}/{x}/{y}.pbf).

### **Step 4: Consume in Flutter using MapLibre**

In your Flutter app using MapLibre, pass the URL of your Cloudflare R2 PMTiles file directly or use the pmtiles protocol plugin:

`// Style JSON configured for PMTiles on Cloudflare R2`  
`const mapStyle = '''`  
`{`  
  `"version": 8,`  
  `"sources": {`  
    `"protomaps": {`  
      `"type": "vector",`  
      `"url": "pmtiles://https://pub-xxxxxx.r2.dev/my_city.pmtiles"`  
    `}`  
  `},`  
  `"layers": [...]`  
`}`  
`''';`

## **Summary Verdict**

Hosting map tiles via **Cloudflare R2 \+ PMTiles** is arguably the most cost-effective solution available. It is **100% free** for regional/country-scale maps, requires zero server management, and will not surprise you with bandwidth/egress bills.

**Sources**

> 1. [Cloudflare R2 free tier in 2026: what you get and when to upgrade \- Nubbo](https://nubbo.app/blog/cloudflare-r2-free-tier/)  
> 2. [Protomaps: open source single file maps \- Blog, Antonio Gioia](https://www.antoniogioia.com/protomaps-open-source-single-file-maps)  
> 3. [Hosting Your Website on Cloudflare R2 (Free & Scalable Guide) \- intertoons](https://blog.intertoons.com/hosting-your-website-on-cloudflare-r2-free-scalable-guide-be0f4bcd2834)

---

*User prompt: Does MapLibre has any mcp server so that I can connect with my Claude or Antigravity*

Response: As of now, **MapLibre does not maintain an official, standalone MCP (Model Context Protocol) server** directly. Unlike Mapbox (which offers an official Mapbox MCP server for geocoding, routing, and location APIs), MapLibre's primary focus remains on rendering engines, style specifications, and tile servers.

However, **there are two practical ways to connect MapLibre workflows to Claude, Antigravity, or other AI agents:**

## **1\. MapLibre Agent Skills (Best for Claude Code & AI Assistants)**

While there isn't a runtime MapLibre server API, the community and developers maintain **Claude Agent Skills** tailored specifically for MapLibre.

These skills give Claude or Antigravity deep contextual knowledge on how to write MapLibre GL JS code, handle PMTiles, configure styles, and build mapping components.

For example, using Claude Code or an agent environment, you can install MapLibre skills via npx:

`npx -y skills add maplibre/maplibre-agent-skills --skill maplibre-pmtiles-patterns --agent claude-code`

## **2\. Connect Your Own MapLibre Infrastructure via Custom MCP Servers**

MapLibre is client-side rendering software or server software (like Martin tile server). Depending on what you want Claude/Antigravity to interact with, you can bridge them using existing or lightweight MCP servers:

### **A. If you want AI to interact with MapLibre's Martin Tile Server**

If you host vector tiles via **Martin** (MapLibre's Rust-based tile server), you can run a generic **PostGIS / Database MCP Server** or a lightweight custom Node/Python MCP wrapper.

> * This allows Claude to query your underlying spatial tables, check geometry bounding boxes, and help you dynamically craft tile endpoints or SQL functions for MapLibre.

### **B. If you want AI to generate MapLibre Visual Styles (Maputnik)**

MapLibre uses the **MapLibre Style Spec** (a JSON schema defining layers, colors, and camera sources).

> * You can attach the MapLibre Style Specification JSON directly as a **Context Resource** in Claude Desktop or Antigravity. Claude can then read, generate, or validate custom map styles for your application in real time.

### **C. If you need Location/Geocoding Tools**

If your goal is to let Claude perform real-time map actions (like converting addresses to coordinates or generating routes) to feed into MapLibre components:

> * You can use open-source geocoding MCP servers like **Nominatim / OpenStreetMap MCP** or **Pelias MCP** alongside MapLibre on the frontend.

**Sources**

> 1. [Mapbox MCP Server \- API Docs](https://docs.mapbox.com/api/guides/mcp-server/)  
> 2. [Maplibre Pmtiles Patterns | Claude Code Skills](https://claudemarketplaces.com/skills/maplibre/maplibre-agent-skills/maplibre-pmtiles-patterns)  
> 3. [MapLibre \- GitHub](https://github.com/maplibre)  
> 4. [Introduction \- MapLibre GL JS](https://maplibre.org/maplibre-gl-js/docs/)

---

*User prompt: Main focus for the mcp to have all the MapLibre products, services, api, examples, guides (whole access of all the links has in this website), documentation for AI coding agent*

Response: To give an AI coding agent (like Claude, Cursor, or Windsurf) full, real-time access to the entire **MapLibre ecosystem**—including all products, API references, live code examples, specifications, and guides across maplibre.org—you can use or configure a **Documentation-Focused MCP Server**.

Because MapLibre is a suite of distinct libraries, the best approach is to configure an MCP server that indexes MapLibre's entire web domain and documentation repositories.

## **Architecture: Full MapLibre Coverage MCP**

To cover every product and service in the MapLibre umbrella, an MCP server needs to expose documentation resources for:

`MapLibre MCP Ecosystem`  
 `├── MapLibre GL JS (Web JS/TS, API Docs, WebGL/WebGPU, Examples)`  
 `├── MapLibre Native (iOS, Android, C++, Metal/Vulkan/OpenGL)`  
 `├── MapLibre Compose (Kotlin Multiplatform / Jetpack Compose)`  
 `├── MapLibre Style Spec (JSON Schema, visual styling rules)`  
 `├── MapLibre Tile Spec (Next-gen MVT/vector tile specifications)`  
 `├── Martin Tile Server (Rust server, PostGIS, PMTiles, MBTiles)`  
 `└── Maputnik (Visual style editor)`

## **1\. Option A: Custom Crawled MCP Server (Recommended)**

You can run an open-source documentation MCP server (like [@modelcontextprotocol/server-fetch](https://github.com/modelcontextprotocol/servers) or [mcp-server-puppeteer](https://github.com/modelcontextprotocol/servers)) configured to dynamically index and fetch MapLibre's documentation hierarchy.

### **Example MCP Configuration (claude\_desktop\_config.json or mcpServers in Cursor/Windsurf)**

If using a web-scraping or fetch-based MCP server:

`{`  
  `"mcpServers": {`  
    `"maplibre-docs": {`  
      `"command": "npx",`  
      `"args": [`  
        `"-y",`  
        `"@modelcontextprotocol/server-fetch",`  
        `"--allowed-domains",`  
        `"maplibre.org,github.com/maplibre"`  
      `]`  
    `}`  
  `}`  
`}`

This grants the AI agent access to fetch, search, and navigate any URL on maplibre.org dynamically during a coding session.

## **2\. Option B: Local Repository MCP (Direct Codebase & Docs)**

If you want your agent to have **instant offline context** without relying on live web requests, you can point a File/Search MCP server to local clones of MapLibre's official repositories.

> 1. **Clone the key MapLibre repositories:**  
>    `git clone https://github.com/maplibre/maplibre-gl-js.git`  
>    `git clone https://github.com/maplibre/maplibre-native.git`  
>    `git clone https://github.com/maplibre/maplibre-style-spec.git`  
>    `git clone https://github.com/maplibre/martin.git`

> 2. **Connect via Filesystem MCP Server:**  
>    `{`  
>      `"mcpServers": {`  
>        `"maplibre-source-code": {`  
>          `"command": "npx",`  
>          `"args": [`  
>            `"-y",`  
>            `"@modelcontextprotocol/server-filesystem",`  
>            `"/path/to/your/maplibre-repos"`  
>          `]`  
>        `}`  
>      `}`  
>    `}`

## **3\. Key URLs for the MCP Server Knowledge Base**

When providing links or seed URLs to your MCP fetch tool, ensure it indexes the following endpoints:

| MapLibre Product | Key Documentation & API Links |
| :---- | :---- |
| **MapLibre GL JS** | \[https://maplibre.org/maplibre-gl-js/docs/\](https://maplibre.org/maplibre-gl-js/docs/) \[https://maplibre.org/maplibre-gl-js/docs/examples/\](https://maplibre.org/maplibre-gl-js/docs/examples/) |
| **MapLibre Native** | \[https://maplibre.org/maplibre-native/\](https://maplibre.org/maplibre-native/) \[https://maplibre.org/maplibre-native/ios/latest/documentation/maplibre/\](https://maplibre.org/maplibre-native/ios/latest/documentation/maplibre/) |
| **MapLibre Compose** | \[https://maplibre.org/maplibre-compose/\](https://maplibre.org/maplibre-compose/) |
| **Style Specification** | \[https://maplibre.org/maplibre-style-spec/\](https://maplibre.org/maplibre-style-spec/) |
| **Martin Tile Server** | \[https://maplibre.org/martin/\](https://maplibre.org/martin/) |
| **Awesome MapLibre (Guides & Plugins)** | \[https://github.com/maplibre/awesome-maplibre\](https://github.com/maplibre/awesome-maplibre) |

## **How the AI Agent Uses This Setup**

Once connected, your AI coding agent can execute complex MapLibre commands autonomously:

> 1. **"Build a Flutter/Native map view with custom terrain:"** The agent fetches the latest native specs and Flutter/Compose bindings.  
> 2. **"Generate a style JSON for night mode:"** The agent checks the MapLibre Style Spec documentation to format correct expressions and layers.  
> 3. **"Configure Martin tile server for PostGIS:"** The agent queries the Martin Book/docs directly to write valid YAML configurations.

For a deeper look into agentic mapping setups, see [Build an agent with Mapbox MCP](https://www.youtube.com/watch?v=HGchCGtPBBU), which demonstrates how model context protocols give AI assistants spatial intelligence and live access to geospatial toolkits. http://googleusercontent.com/youtube\_content/1 *YouTube video views will be stored in your YouTube History, and your data will be stored and used by YouTube according to its [Terms of Service](https://www.google.com/search?q=https://www.youtube.com/static?template%3Dterms)*

**Sources**

> 1. [MapLibre](https://maplibre.org/)  
> 2. [Build an agent with Mapbox MCP \- YouTube](https://www.youtube.com/watch?v=HGchCGtPBBU)

---

*User prompt: Help me to architect this whole mcp tool to have full access of the MapLibre also the tools functionalities*

Response: To give an AI coding agent (Claude, Antigravity, Cursor, or Windsurf) **complete access to the MapLibre ecosystem**—including code generators, live documentation searching, style validation, and offline geospatial operations—you can architect a specialized, multi-capability **MapLibre MCP Server**.

Here is the full architectural blueprint, file structure, tool schemas, and implementation strategy.

## **High-Level Architecture Overview**

                      `+------------------------------------------+`  
                      `|       AI Coding Agent (Claude / Cursor)   |`  
                      `+--------------------+---------------------+`  
                                           `| (JSON-RPC Protocol)`  
                                           `v`  
`+-----------------------------------------------------------------------------------+`  
`|                            MAPLIBRE ALL-IN-ONE MCP SERVER                         |`  
`+-----------------------------------------------------------------------------------+`  
`|                                                                                   |`  
`|  [Module 1: Documentation & Guides]           [Module 2: Specs & Validation]     |`  
`|   • Vector DB / Scraped Index                  • Style Spec Validator & Generator |`  
`|   • Covers GL JS, Native, Compose, Martin      • Tile Spec Inspector (PMTiles)    |`  
`|                                                                                   |`  
`|  [Module 3: Code & Scaffold Generators]        [Module 4: Offline Spatial Tools]  |`  
`|   • React, Flutter, Swift, Kotlin snippets     • Bounding Box & Zoom Matrix        |`  
`|   • TileServer / Martin Docker configs         • GeoJSON Features & Simplifier    |`  
`|                                                                                   |`  
`+-----------------------------------------------------------------------------------+`

## **File Structure for the MCP Project**

`maplibre-mcp-server/`  
`├── src/`  
`│   ├── index.ts                 # Server entrypoint & MCP initialization`  
`│   ├── modules/`  
`│   │   ├── docs_search.ts       # Document crawler/search tool for maplibre.org`  
`│   │   ├── style_validator.ts   # Style JSON validation using @maplibre/maplibre-gl-style-spec`  
`│   │   ├── code_generator.ts    # Template generators for Flutter, Web, Native, Martin`  
`│   │   └── spatial_utils.ts     # Offline BBox, tile-math, and GeoJSON utilities`  
`│   └── data/`  
`│       └── indexed_docs.json    # Cached reference docs for MapLibre APIs`  
`├── package.json`  
`├── tsconfig.json`  
`└── README.md`

## **Key Tools Exposed to the AI Agent**

To give the agent maximum control, expose these 4 core toolsets through the MCP server:

### **Toolset 1: Documentation & Examples Search (maplibre\_docs\_search)**

Allows the AI to dynamically query maplibre.org docs, API references, and official code examples.

`// Example Tool Definition`  
`{`  
  `name: "search_maplibre_docs",`  
  `description: "Search MapLibre GL JS, Native, Compose, Style Spec, or Martin documentation and code examples.",`  
  `inputSchema: {`  
    `type: "object",`  
    `properties: {`  
      `query: { type: "string", description: "Search term e.g., '3D Terrain', 'PMTiles protocol', 'Martin PostGIS config'" },`  
      `ecosystem: {`   
        `type: "string",`   
        `enum: ["gl-js", "native-ios", "native-android", "flutter", "style-spec", "martin"],`  
        `description: "Target sub-project"`  
      `}`  
    `},`  
    `required: ["query"]`  
  `}`  
`}`

### **Toolset 2: Style Spec Validation & Generation (validate\_maplibre\_style)**

Uses MapLibre's official @maplibre/maplibre-gl-style-spec package to parse and validate JSON styles generated by the AI agent before it writes them to your codebase.

`// Uses @maplibre/maplibre-gl-style-spec underneath`  
`{`  
  `name: "validate_maplibre_style",`  
  `description: "Validate a MapLibre Style JSON against the official MapLibre Style Specification.",`  
  `inputSchema: {`  
    `type: "object",`  
    `properties: {`  
      `styleJson: { type: "object", description: "The MapLibre style JSON object to validate" }`  
    `},`  
    `required: ["styleJson"]`  
  `}`  
`}`

### **Toolset 3: Codebase & Infra Boilerplate Generator (generate\_maplibre\_boilerplate)**

Outputs fully configured boilerplate code for various platforms and deployment scenarios.

`{`  
  `name: "generate_maplibre_boilerplate",`  
  `description: "Generate ready-to-run boilerplate for Flutter, React, iOS Swift, Android Kotlin, or Martin Docker setups.",`  
  `inputSchema: {`  
    `type: "object",`  
    `properties: {`  
      `platform: { type: "string", enum: ["flutter", "react-gl-js", "ios-native", "android-compose", "martin-docker"] },`  
      `features: { type: "array", items: { type: "string" }, description: ["pmtiles", "custom-markers", "postgis", "3d-buildings"] }`  
    `},`  
    `required: ["platform"]`  
  `}`  
`}`

### **Toolset 4: Geospatial Tile & Bounding Box Math (calc\_tile\_matrix)**

An offline utility for viewport, zoom, and tile coordinates calculation (handling bounds, centroids, and PMTiles range offsets).

## **Core Code Implementation (Node.js / TypeScript)**

Here is a minimal, complete implementation of the MCP server using the @modelcontextprotocol/sdk:

`// src/index.ts`  
`import { Server } from "@modelcontextprotocol/sdk/server/index.js";`  
`import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";`  
`import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";`  
`import maplibreStyleSpec from "@maplibre/maplibre-gl-style-spec";`

`const server = new Server(`  
  `{ name: "maplibre-all-in-one-mcp", version: "1.0.0" },`  
  `{ capabilities: { tools: {} } }`  
`);`

`// 1. List Available Tools`  
`server.setRequestHandler(ListToolsRequestSchema, async () => {`  
  `return {`  
    `tools: [`  
      `{`  
        `name: "validate_style",`  
        `description: "Validate MapLibre Style JSON against the official specification.",`  
        `inputSchema: {`  
          `type: "object",`  
          `properties: { styleJson: { type: "object" } },`  
          `required: ["styleJson"]`  
        `}`  
      `},`  
      `{`  
        `name: "get_maplibre_doc_url",`  
        `description: "Get direct documentation links for any MapLibre product or feature.",`  
        `inputSchema: {`  
          `type: "object",`  
          `properties: {`  
            `product: { type: "string", enum: ["gl-js", "native", "compose", "style-spec", "martin"] }`  
          `},`  
          `required: ["product"]`  
        `}`  
      `}`  
    `]`  
  `};`  
`});`

`// 2. Handle Tool Call Execution`  
`server.setRequestHandler(CallToolRequestSchema, async (request) => {`  
  `const { name, arguments: args } = request.params;`

  `if (name === "validate_style") {`  
    `const errors = maplibreStyleSpec.validate(args?.styleJson);`  
    `if (errors.length === 0) {`  
      `return { content: [{ type: "text", text: "✅ MapLibre Style JSON is 100% valid!" }] };`  
    `} else {`  
      ``return { content: [{ type: "text", text: `❌ Validation Errors:\n${JSON.stringify(errors, null, 2)}` }] };``  
    `}`  
  `}`

  `if (name === "get_maplibre_doc_url") {`  
    `const urls: Record<string, string> = {`  
      `"gl-js": "https://maplibre.org/maplibre-gl-js/docs/",`  
      `"native": "https://maplibre.org/maplibre-native/",`  
      `"compose": "https://maplibre.org/maplibre-compose/",`  
      `"style-spec": "https://maplibre.org/maplibre-style-spec/",`  
      `"martin": "https://maplibre.org/martin/"`  
    `};`  
    ``return { content: [{ type: "text", text: `Documentation URL: ${urls[args?.product as string] || "https://maplibre.org"}` }] };``  
  `}`

  ``throw new Error(`Unknown tool: ${name}`);``  
`});`

`// 3. Connect via Standard I/O`  
`async function main() {`  
  `const transport = new StdioServerTransport();`  
  `await server.connect(transport);`  
`}`

`main().catch(console.error);`

## **Connecting It to Claude, Antigravity, or Cursor**

Add your compiled MCP server configuration to your target AI client:

### **claude\_desktop\_config.json / antigravity\_mcp.json / mcpServers in Cursor:**

`{`  
  `"mcpServers": {`  
    `"maplibre": {`  
      `"command": "node",`  
      `"args": ["/path/to/maplibre-mcp-server/dist/index.js"]`  
    `}`  
  `}`  
`}`

## **Summary of Capabilities Given to the AI**

Once initialized, your AI agent can:

> 1. **Validate and auto-correct map styles** live while editing code.  
> 2. **Scrape or reference any API documentation** across Web, Native, Compose, or Rust/Martin.  
> 3. **Generate complete Flutter (maplibre\_gl) or Kotlin Compose map implementations** on demand.  
> 4. **Configure tile server architectures** (such as PMTiles \+ Cloudflare or Martin \+ Docker) without guessing command-line options.

---

*User prompt: Can I host this mcp tool?*

Response: **Yes, absolutely.** You can host this MCP server either **locally** on your developer machine or **remotely in the cloud**.

How you host it depends on whether it is for your personal local development or for a team/production environment.

## **Deployment Option 1: Local Hosting (Recommended for Individual Devs)**

If you use AI tools on your local computer (e.g., Claude Desktop, Cursor, Windsurf), you do **not** need a cloud server. You host it directly on your machine as a local subprocess via standard input/output (stdio).

### **Steps:**

> 1. **Build the server locally:**  
>    `npm run build`

> 2. **Point your AI Client to the compiled binary:** In your client configuration (claude\_desktop\_config.json or Cursor settings):  
>    `{`  
>      `"mcpServers": {`  
>        `"maplibre": {`  
>          `"command": "node",`  
>          `"args": ["/Users/your-username/maplibre-mcp-server/dist/index.js"]`  
>        `}`  
>      `}`  
>    `}`

> * **Pros:** Zero cost, instant execution, zero network latency, maximum privacy.

## **Deployment Option 2: Remote Cloud Hosting (Best for Teams & Shared Access)**

If you want your entire team or web-hosted agents to share a single MapLibre MCP instance over HTTP/HTTPS, host it on a cloud platform.

To run over the network, switch the MCP transport layer from stdio to **Streamable HTTP** (or SSE).

### **Top Cloud Hosting Options:**

> 1. **Cloudflare Workers (Best overall for TypeScript MCPs)**  
   * **Why:** Fast edge execution with near-zero cold starts and an official Cloudflare Agents SDK for MCP.  
   * **Cost:** Generous free tier (100,000 requests/day).  
> 2. **Railway / Render (Easiest Container Hosting)**  
   * **Why:** Deploy directly from your GitHub repository as a Docker container or Node.js web service.  
   * **How:** Wrap the server in Express/Fastify using @modelcontextprotocol/sdk/server/express.js.  
> 3. **Google Cloud Run / Fly.io (Enterprise / Multi-tenant)**  
   * **Why:** Automatically scales down to zero when idle, saving costs while providing dedicated HTTPS endpoints with API Key / OAuth authentication.

## **Remote Server Express Wrapper Example**

To turn your MapLibre MCP server into a cloud-hostable HTTP service, use the HTTP transport adapter:

`import express from "express";`  
`import { Server } from "@modelcontextprotocol/sdk/server/index.js";`  
`import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js"; // Or Streamable HTTP`

`const app = express();`  
`const server = new Server(`  
  `{ name: "maplibre-cloud-mcp", version: "1.0.0" },`  
  `{ capabilities: { tools: {} } }`  
`);`

`// Define MapLibre tools here...`

`app.get("/sse", async (req, res) => {`  
  `const transport = new SSEServerTransport("/message", res);`  
  `await server.connect(transport);`  
`});`

`app.post("/message", async (req, res) => {`  
  `// Handle incoming tool execution messages`  
`});`

`app.listen(3000, () => console.log("MapLibre MCP running on port 3000"));`

### **Remote Client Configuration**

Once deployed to a domain (e.g., \[https://maplibre-mcp.yourdomain.com/sse\](https://maplibre-mcp.yourdomain.com/sse)), connect to it from Cursor or Claude:

`{`  
  `"mcpServers": {`  
    `"maplibre-cloud": {`  
      `"url": "https://maplibre-mcp.yourdomain.com/sse"`  
    `}`  
  `}`  
`}`

---

*User prompt: I want to host this mcp as open source so that any one can use it where can I host this for free and publish it*

Response: Making an MCP server open source involves two parts: **1\) Hosting the code & server for free** and **2\) Publishing/Registering it in MCP registries** so developers and AI agents can discover it.

## **Part 1: Where to Host the MCP Server for Free**

How you host depends on whether your MCP server runs via **Remote HTTP/SSE** or **NPX / Local CLI**.

### **Option A: Cloudflare Workers (Best Free Remote HTTP Hosting)**

Cloudflare Workers is ideal for TypeScript/Node MCP servers that run over Streamable HTTP/SSE.

> * **Free Tier:** 100,000 requests per day for $0.  
> * **Why it fits:** Zero cold starts, instant edge deployment, and official SDK support (@modelcontextprotocol/sdk).

### **Option B: GitHub \+ npm / npx (Best for Local CLI Execution)**

If users run your MCP server locally on their machines (via npx maplibre-mcp-server), you don't need a cloud backend at all.

> * **Host code:** On **GitHub** under an open-source license (e.g., MIT or Apache 2.0).  
> * **Package registry:** Publish to **npm** (npm publish).  
> * Users connect to your MCP server locally with one command:  
>   `npx -y maplibre-mcp-server`

### **Option C: Render / Railway / Fly.io (Container Hosting)**

If your MCP server requires Docker or heavy node dependencies, web platforms offer free tiers:

> * **Render / Fly.io:** Free micro-containers to host Node.js or Dockerized MCP servers accessible over HTTPS endpoints.

## **Part 2: Where to Publish & Distribute It**

Once your server is hosted or published to npm/GitHub, list it in the primary MCP registries so AI tools (Claude, Cursor, Windsurf, etc.) can discover it:

### **1\. Smithery (smithery.ai)**

Smithery is a popular MCP registry. It allows developers to test, discover, and install your server directly into their AI clients.

> * **How to publish:**  
  1. Install Smithery CLI: npm install \-g @smithery/cli  
  2. Publish your server:  
     `smithery mcp publish "https://your-worker.workers.dev/mcp" -n @your-github/maplibre-mcp`

  3. Or connect your GitHub repo on [smithery.ai/build](https://www.google.com/search?q=https://smithery.ai/build).

### **2\. Glama (glama.ai/mcp/servers)**

Glama is an open-source MCP directory and gateway.

> * **How to publish:** Glama automatically crawls GitHub repos tagged with mcp-server or mcp. You can also submit your repository directly on glama.ai.

### **3\. Official Model Context Protocol Registry**

Submit a pull request to the community-maintained MCP registry on GitHub:

> * GitHub Repository: modelcontextprotocol/servers or the official MCP Registry index.

### **4\. Community MCP Directories (mcp.so, awesome-mcp-servers)**

> * Submit a PR to Punkpeaches/awesome-mcp-servers on GitHub.  
> * Register on [mcp.so](https://mcp.so).

## **Step-by-Step Publishing Checklist**

> 1. **Add LICENSE file:** Put an open-source license (e.g., MIT) in your repository root.  
> 2. **Configure package.json:**  
>    `{`  
>      `"name": "maplibre-mcp-server",`  
>      `"version": "1.0.0",`  
>      `"bin": {`  
>        `"maplibre-mcp-server": "./dist/index.js"`  
>      `},`  
>      `"keywords": ["mcp", "model-context-protocol", "maplibre", "gis", "maps"]`  
>    `}`

> 3. **Push code to GitHub** and publish to npm (npm publish \--access public).  
> 4. **Publish to Smithery & Glama** using smithery mcp publish or listing your GitHub repo.  
> 5. **Add Installation Instructions in README.md:** Show how users can add it to claude\_desktop\_config.json or Cursor.

**Sources**

> 1. [Overview \- Smithery Documentation](https://smithery.ai/docs/build)  
> 2. [Glama: The MCP Server Registry, Inspector & Gateway](https://glama.ai/)

---

*User prompt: Can I publish it on Claude?*

Response: **Yes, you can publish your MapLibre MCP server so that Claude users around the world can install and use it.**

Anthropic (the makers of Claude) supports two ways to publish and distribute MCP servers depending on whether users connect via **Claude Desktop** or the **Claude Web/API Platform**.

## **1\. Publish as a Claude Desktop Extension (.mcpb Bundle)**

For local Claude Desktop users, Anthropic uses **Desktop Extensions** (packaged in the .mcpb file format). This eliminates manual configuration files for users—they simply download your package and click **Install**.

### **Steps to Package & Submit:**

> 1. **Initialize a Bundle Manifest:** In your MCP project folder, run Anthropic’s packaging CLI:  
>    `npx @anthropic-ai/mcpb init`

>    This generates a manifest.json describing your server name, version, and entry point (dist/index.js).  
> 2. **Package into .mcpb:**  
>    `npx @anthropic-ai/mcpb pack`

>    This outputs a .mcpb file bundling your code and Node.js dependencies.  
> 3. **Submit to the Claude Connectors Directory:**  
   * Test your .mcpb bundle locally by dragging it into **Claude Desktop Settings \-\> Extensions**.  
   * Submit the bundle via [Anthropic's Connectors Directory submission form](https://claude.com/docs/connectors/building/submission).  
   * Once reviewed for security and quality, your MapLibre server will be featured in Claude Desktop's extension store.

## **2\. Publish as a Remote MCP Connector (Claude.ai & Claude API)**

If you host your MapLibre MCP server in the cloud (e.g., on Cloudflare Workers, Render, or Railway) over Streamable HTTP or SSE, you can register it as a **Remote Connector**.

### **Submission Steps:**

> 1. Ensure your server is publicly accessible via an HTTPS URL (e.g., https://maplibre-mcp.yourdomain.com/sse).  
> 2. Open the **Claude Connectors Directory Portal** inside Claude.ai.  
> 3. Submit your remote server's URL, documentation, logo, and description.  
> 4. After review, Claude Team/Enterprise users can enable your MapLibre tools directly inside their web conversations without installing anything locally.

## **3\. Submit to the Official Model Context Protocol Registry**

In addition to Anthropic's native directories, publish your server to the **official open-source MCP Registry**:

> * **Official MCP Registry:** Submit a pull request to the central registry at [github.com/modelcontextprotocol/registry](https://workos.com/blog/mcp-registry-architecture-technical-overview).  
> * **Community Marketplaces:** Register your GitHub repository on community hubs like [Smithery.ai](https://smithery.ai) and [mcp.so](https://mcp.so).

**Sources**

> 1. [Desktop Extensions: One-click MCP server installation for Claude Desktop \- Anthropic](https://www.anthropic.com/engineering/desktop-extensions)  
> 2. [Submitting to the Connectors Directory \- Claude.ai Documentation](https://claude.com/docs/connectors/building/submission)  
> 3. [MCP connector \- Claude Platform Docs](https://platform.claude.com/docs/en/agents-and-tools/mcp-connector)  
> 4. [modelcontextprotocol/servers: Model Context Protocol Servers \- GitHub](https://github.com/modelcontextprotocol/servers)

---

