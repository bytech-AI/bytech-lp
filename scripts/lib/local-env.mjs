// .env.local を読むだけの小さなローダー（dotenv を依存に足さないため）。
// 値に括弧や全角が入っていても壊れないよう、シェル評価はせず行ごとに KEY=VALUE を切る。
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

export function loadLocalEnv(file = '.env.local') {
    const env = { ...process.env };
    let text = '';
    try {
        text = readFileSync(resolve(process.cwd(), file), 'utf8');
    } catch {
        return env;
    }
    for (const line of text.split('\n')) {
        const m = line.match(/^\s*(?:export\s+)?([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/);
        if (!m) continue;
        let v = m[2].trim();
        if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
        if (!(m[1] in process.env)) env[m[1]] = v;
    }
    return env;
}

export function argNumber(name, fallback) {
    const i = process.argv.indexOf(name);
    if (i === -1 || !process.argv[i + 1]) return fallback;
    const n = Number(process.argv[i + 1]);
    return Number.isFinite(n) ? n : fallback;
}
