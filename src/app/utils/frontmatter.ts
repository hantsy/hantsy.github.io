/**
 * Shared frontmatter parser — used by ContentService and ProfileService.
 * Handles CRLF and LF line endings.
 */

export function parseFrontmatter(raw: string): { attrs: Record<string, any>; body: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { attrs: {}, body: raw };
  return { attrs: parseYaml(match[1]), body: match[2].trim() };
}

export function parseYaml(yaml: string): Record<string, any> {
  const result: Record<string, any> = {};
  const lines = yaml.split(/\r?\n/);
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) { i++; continue; }

    // Array key with indented items: "key:\n  - value\n  - value"
    const arrayMatch = line.match(/^(\w[\w-]*):\s*$/);
    if (arrayMatch) {
      const key = arrayMatch[1];
      const items: any[] = [];
      i++;
      while (i < lines.length) {
        const itemMatch = lines[i].match(/^\s+-\s+(.*)/);
        if (!itemMatch) {
          if (!lines[i].trim()) { i++; continue; }
          break;
        }
        const itemVal = itemMatch[1];
        // Try key: value on same line as dash
        const inlineKey = itemVal.match(/^(\w+):\s*(.*)/);
        if (inlineKey) {
          const obj: Record<string, any> = {};
          obj[inlineKey[1]] = unquote(inlineKey[2]);
          i++;
          // Read indented sub-fields (2+ spaces)
          while (i < lines.length && lines[i].match(/^\s{2,}\w/)) {
            const sub = lines[i].trim().match(/^(\w+):\s*(.*)/);
            if (sub) obj[sub[1]] = unquote(sub[2]);
            i++;
          }
          items.push(obj);
        } else {
          items.push(unquote(itemVal));
          i++;
        }
      }
      result[key] = items;
      continue;
    }

    // Simple key: value
    const keyMatch = line.match(/^(\w[\w-]*):\s*(.*)/);
    if (keyMatch) {
      result[keyMatch[1]] = parseYamlValue(keyMatch[2]);
    }
    i++;
  }

  return result;
}

function parseYamlValue(raw: string): any {
  const s = raw.trim();
  if (s === '' || s === '~') return undefined;
  // Quoted string
  if ((s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"))) {
    return s.slice(1, -1);
  }
  // Array notation: [a, b, c]
  if (s.startsWith('[') && s.endsWith(']')) {
    return s.slice(1, -1).split(',').map((v) => unquote(v.trim()));
  }
  // Number
  if (/^-?\d+$/.test(s)) return parseInt(s, 10);
  return s;
}

function unquote(s: string): string {
  let v = s.trim();
  if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
    v = v.slice(1, -1);
  }
  return v;
}
