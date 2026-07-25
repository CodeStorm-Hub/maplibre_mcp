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
    if (!cleanQuery) {
      return this.docsIndex.filter(entry => ecosystem === 'all' || entry.ecosystem === ecosystem);
    }

    // Split query into individual token terms (filtering out tiny stop-words)
    const stopWords = new Set(['a', 'an', 'the', 'in', 'on', 'at', 'for', 'to', 'of', 'and', 'or', 'with', 'by']);
    const tokens = cleanQuery
      .split(/\s+/)
      .map(t => t.replace(/[^a-z0-9_-]/g, ''))
      .filter(t => t.length > 1 && !stopWords.has(t));

    // First try matching entries where ecosystem matches and at least one token matches
    const scoredEntries = this.docsIndex
      .map(entry => {
        const matchEcosystem = ecosystem === 'all' || entry.ecosystem === ecosystem;
        if (!matchEcosystem) return { entry, score: 0 };

        const searchableText = `${entry.repo} ${entry.ecosystem} ${entry.description} ${entry.language}`.toLowerCase();
        
        // Exact full string match gets highest score
        if (searchableText.includes(cleanQuery)) {
          return { entry, score: 100 };
        }

        // Token score
        let score = 0;
        tokens.forEach(token => {
          if (searchableText.includes(token)) {
            score += 10;
          }
        });

        return { entry, score };
      })
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .map(item => item.entry);

    // If token matching found results, return them
    if (scoredEntries.length > 0) {
      return scoredEntries;
    }

    // Fallback: If no token matched, return all repos in the specified ecosystem
    return this.docsIndex.filter(entry => ecosystem === 'all' || entry.ecosystem === ecosystem);
  }
}
