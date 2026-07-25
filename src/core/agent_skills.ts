import fs from 'fs';
import path from 'path';

export class AgentSkillsEngine {
  public getSkill(skillName: string): string {
    const fileNameMap: Record<string, string> = {
      'mapbox-migration': 'mapbox-migration.md',
      'pmtiles-patterns': 'pmtiles-patterns.md',
      'tile-sources': 'tile-sources.md'
    };

    const fileName = fileNameMap[skillName];
    if (!fileName) {
      return `Skill '${skillName}' not found. Available skills: mapbox-migration, pmtiles-patterns, tile-sources.`;
    }

    const primaryPath = path.join(__dirname, '../data/skills', fileName);
    const fallbackPath = path.join(process.cwd(), 'src/data/skills', fileName);

    if (fs.existsSync(primaryPath)) {
      return fs.readFileSync(primaryPath, 'utf-8');
    }
    if (fs.existsSync(fallbackPath)) {
      return fs.readFileSync(fallbackPath, 'utf-8');
    }

    return `Skill file '${fileName}' missing on server.`;
  }
}
