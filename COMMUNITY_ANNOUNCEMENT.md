# 📢 Community Marketing & Publicity Announcement Kit

Use these ready-to-post announcement templates to share the **MapLibre All-in-One MCP Server** across developer communities, Discord servers, Reddit subreddits, and developer forums.

---

## 1. Reddit Post (`r/MapLibre`, `r/FlutterDev`, `r/GIS`, `r/ClaudeAI`, `r/Cursor`)

**Title**: *Introducing MapLibre MCP Server: Give Claude, Cursor, and Antigravity full MapLibre & Flutter mapping capabilities!*

**Body**:
Hey everyone! 👋

We just published the **MapLibre All-in-One Model Context Protocol (MCP) Server** under [CodeStorm Hub](https://github.com/CodeStorm-Hub/maplibre_mcp).

If you use AI coding assistants like **Claude Desktop, Cursor, Antigravity, or Windsurf**, this MCP server gives your assistant 11 specialized tools to:

- 🔍 **Search docs** across 43 MapLibre developer repositories (WebGL, Native C++, Flutter, Compose, Martin).
- 🎨 **Validate & Generate MapLibre Style JSONs** (3D building extrusions, dark/light themes, satellite, OpenFreeMap).
- ⚙️ **Scaffold Martin Rust Tile Servers & PostGIS `ST_AsMVT` functions**.
- 📐 **Perform offline spatial math** (camera center, LatLngBounds, optimal zoom level calculations).
- 📱 **Build Flutter map apps** (scaffold dependencies, location permissions, PMTiles asset loaders, layers, and GeoJSON point clustering).

### ⚡ Quick 1-Step Setup in `claude_desktop_config.json` / Cursor / Antigravity:
```json
{
  "mcpServers": {
    "maplibre": {
      "command": "npx",
      "args": ["-y", "github:CodeStorm-Hub/maplibre_mcp"]
    }
  }
}
```

🔗 **GitHub Repo**: https://github.com/CodeStorm-Hub/maplibre_mcp  
📝 **Showcase Gist**: https://gist.github.com/syed-reza98/bd2edc9382b218965675db4c3f311a55

It's 100% open source under the MIT license. Feedback and PRs are super welcome!

---

## 2. Discord / Slack Announcement (MapLibre & Flutter Communities)

> 🚀 **MapLibre All-in-One MCP Server Release (v1.0.0)**
> Connect your AI coding assistant (Claude, Cursor, Antigravity) directly to the MapLibre mapping ecosystem!
> 
> **Features**:
> • Search 43 developer repos & examples
> • Validate & generate v8 Style JSONs (with 3D buildings)
> • Scaffold Martin Rust tile servers & PostGIS MVT functions
> • Scaffold Flutter maps, PMTiles asset loaders & GeoJSON clustering
> 
> **Quick Start**: Add `npx -y github:CodeStorm-Hub/maplibre_mcp` to your MCP client!
> 🔗 **GitHub**: https://github.com/CodeStorm-Hub/maplibre_mcp
> 📝 **Showcase Gist**: https://gist.github.com/syed-reza98/bd2edc9382b218965675db4c3f311a55

---

## 3. Hacker News / Dev.to Submission

**Title**: *Show HN: MapLibre MCP Server – Model Context Protocol server for vector mapping and Flutter*

**Body**:
We built an open-source MCP server for MapLibre mapping technologies. It enables LLMs to query documentation across 43 MapLibre repos, validate style specification JSONs, scaffold Martin tile servers, calculate map viewports offline, and write production Flutter map widgets with PMTiles and GeoJSON point clustering.

Repo: https://github.com/CodeStorm-Hub/maplibre_mcp
Gist: https://gist.github.com/syed-reza98/bd2edc9382b218965675db4c3f311a55
