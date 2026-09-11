import type { Token } from "@/types/vscode";

const JS_TS_KEYWORDS = new Set([
  "import", "export", "default", "from", "function", "const", "let", "var",
  "return", "if", "else", "switch", "case", "break", "continue", "for",
  "while", "do", "try", "catch", "finally", "throw", "class", "extends",
  "interface", "type", "async", "await", "new", "typeof", "instanceof",
  "in", "of", "null", "undefined", "true", "false", "void", "as", "is"
]);

const CSS_PROPERTIES = new Set([
  "color", "background", "margin", "padding", "border", "display", "flex",
  "grid", "width", "height", "font-size", "position", "top", "bottom", "left", "right"
]);

/**
 * Lightweight, zero-dependency tokenization engine for real-time syntax highlighting.
 * Emulates VS Code token scopes without the heavy bundle cost of Monaco or Shiki on initial load.
 */
export function tokenizeCode(rawCode: string, language: string = "ts"): Token[][] {
  const lines = rawCode.split("\n");
  const lang = language.toLowerCase();

  return lines.map((line) => {
    if (!line.trim()) return [];

    const tokens: Token[] = [];
    let i = 0;
    const len = line.length;

    while (i < len) {
      // Single line comments
      if (line.slice(i, i + 2) === "//" || line.slice(i, i + 2) === "/*" || line.slice(i, i + 4) === "<!--") {
        tokens.push({ text: line.slice(i), type: "com" });
        break;
      }

      // Strings (single, double, backtick quotes)
      const char = line[i];
      if (char === '"' || char === "'" || char === "`") {
        const quote = char;
        let end = i + 1;
        while (end < len && line[end] !== quote) {
          if (line[end] === "\\" && end + 1 < len) end += 2;
          else end++;
        }
        if (end < len) end++; // consume closing quote
        tokens.push({ text: line.slice(i, end), type: "str" });
        i = end;
        continue;
      }

      // Numbers
      if (/[0-9]/.test(char) && (i === 0 || /[^a-zA-Z0-9_$]/.test(line[i - 1] ?? ""))) {
        let numEnd = i;
        while (numEnd < len && /[0-9.xXbBoOa-fA-F_]/.test(line[numEnd])) {
          numEnd++;
        }
        tokens.push({ text: line.slice(i, numEnd), type: "num" });
        i = numEnd;
        continue;
      }

      // Identifiers / Keywords / Function calls
      if (/[a-zA-Z_$]/.test(char)) {
        let idEnd = i;
        while (idEnd < len && /[a-zA-Z0-9_$-]/.test(line[idEnd])) {
          idEnd++;
        }
        const word = line.slice(i, idEnd);

        // Check if next non-whitespace char is '(' -> function call
        let nextCharIdx = idEnd;
        while (nextCharIdx < len && line[nextCharIdx] === " ") nextCharIdx++;
        const isFunctionCall = nextCharIdx < len && line[nextCharIdx] === "(";

        if (JS_TS_KEYWORDS.has(word)) {
          tokens.push({ text: word, type: "kw" });
        } else if (isFunctionCall) {
          tokens.push({ text: word, type: "fn" });
        } else if (lang === "css" && CSS_PROPERTIES.has(word)) {
          tokens.push({ text: word, type: "kw" });
        } else {
          tokens.push({ text: word, type: "plain" });
        }
        i = idEnd;
        continue;
      }

      // Whitespace and punctuation
      let pEnd = i;
      while (pEnd < len && !/[a-zA-Z0-9_$"'`]|(\/\/)|(\/\*)|(<!--)/.test(line.slice(pEnd, pEnd + 2))) {
        pEnd++;
      }
      if (pEnd === i) pEnd++;
      tokens.push({ text: line.slice(i, pEnd), type: "plain" });
      i = pEnd;
    }

    return tokens;
  });
}
