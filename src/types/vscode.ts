export type ThemeName =
  | "darkplus"
  | "dracula"
  | "monokai"
  | "onedark"
  | "solarized"
  | "synthwave"
  | "tokyonight"
  | "githubdark";

export type MenuName =
  | "File"
  | "Edit"
  | "View"
  | "Go"
  | "Run"
  | "Terminal"
  | "Help"
  | "Copilot";

export type MenuItem = {
  label: string;
  hint?: string;
  section?: string;
  action?: string;
};

export type Token = {
  text: string;
  type: "kw" | "fn" | "str" | "com" | "num" | "plain";
};

export type FileNode = {
  id: string;
  name: string;
  label: string;
  ext:
    | "tsx"
    | "html"
    | "js"
    | "json"
    | "ts"
    | "css"
    | "md"
    | "config"
    | "env"
    | "pdf";
  folder: "src" | "public" | "config";
};

export type ChatMessage = {
  role: "user" | "assistant";
  text: string;
};

export type GitHubCommit = {
  message: string;
  date: string;
  sha: string;
};

export type GitHubOverview = {
  followers: number;
  publicRepos: number;
  following: number;
  totalStars: number;
};

export type ContactFormState = {
  name: string;
  email: string;
  message: string;
  website: string;
};

export type SidebarTab =
  | "explorer"
  | "search"
  | "git"
  | "extensions"
  | "settings";

export type BottomTab =
  | "terminal"
  | "problems"
  | "output"
  | "debug"
  | "ports";

export type ViewMode = "preview" | "code" | "split";
