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
export declare class DocsSearchEngine {
    private docsIndex;
    constructor();
    search(query: string, ecosystem?: string): DocEntry[];
}
