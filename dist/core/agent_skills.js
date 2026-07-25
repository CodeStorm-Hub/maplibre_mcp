"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentSkillsEngine = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class AgentSkillsEngine {
    getSkill(skillName) {
        const fileNameMap = {
            'mapbox-migration': 'mapbox-migration.md',
            'pmtiles-patterns': 'pmtiles-patterns.md',
            'tile-sources': 'tile-sources.md'
        };
        const fileName = fileNameMap[skillName];
        if (!fileName) {
            return `Skill '${skillName}' not found. Available skills: mapbox-migration, pmtiles-patterns, tile-sources.`;
        }
        const primaryPath = path_1.default.join(__dirname, '../data/skills', fileName);
        const fallbackPath = path_1.default.join(process.cwd(), 'src/data/skills', fileName);
        if (fs_1.default.existsSync(primaryPath)) {
            return fs_1.default.readFileSync(primaryPath, 'utf-8');
        }
        if (fs_1.default.existsSync(fallbackPath)) {
            return fs_1.default.readFileSync(fallbackPath, 'utf-8');
        }
        return `Skill file '${fileName}' missing on server.`;
    }
}
exports.AgentSkillsEngine = AgentSkillsEngine;
