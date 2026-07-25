"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocsSearchEngine = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class DocsSearchEngine {
    docsIndex;
    constructor() {
        const primaryPath = path_1.default.join(__dirname, '../data/docs_index.json');
        const fallbackPath = path_1.default.join(process.cwd(), 'src/data/docs_index.json');
        let targetPath = primaryPath;
        if (!fs_1.default.existsSync(primaryPath) && fs_1.default.existsSync(fallbackPath)) {
            targetPath = fallbackPath;
        }
        if (fs_1.default.existsSync(targetPath)) {
            this.docsIndex = JSON.parse(fs_1.default.readFileSync(targetPath, 'utf-8'));
        }
        else {
            this.docsIndex = [];
        }
    }
    search(query, ecosystem = 'all') {
        const cleanQuery = query.toLowerCase().trim();
        return this.docsIndex.filter(entry => {
            const matchEcosystem = ecosystem === 'all' || entry.ecosystem === ecosystem;
            const matchQuery = !cleanQuery ||
                entry.repo.toLowerCase().includes(cleanQuery) ||
                entry.description.toLowerCase().includes(cleanQuery) ||
                entry.language.toLowerCase().includes(cleanQuery);
            return matchEcosystem && matchQuery;
        });
    }
}
exports.DocsSearchEngine = DocsSearchEngine;
