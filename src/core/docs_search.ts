import fs from 'fs';
import path from 'path';

export interface DocEntry {
  repo: string;
  ecosystem: string;
  description: string;
  stars: number;
  language: string;
  docs_url: string;
  repo_url: string;
  doc_dirs: string[];
}

export class DocsSearchEngine {
  private docsIndex: DocEntry[];

  constructor() {
    const primaryPath = path.join(__dirname, '../data/docs_index.json');
    const fallbackPath = path.join(process.cwd(), 'src/data/docs_index.json');

    let targetPath = primaryPath;
    if (!fs.existsSync(primaryPath) && fs.existsSync(fallbackPath)) {
      targetPath = fallbackPath;
    }

    if (fs.existsSync(targetPath)) {
      this.docsIndex = JSON.parse(fs.readFileSync(targetPath, 'utf-8'));
    } else {
      this.docsIndex = [];
    }
  }

  public search(query: string, ecosystem: string = 'all'): DocEntry[] {
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
