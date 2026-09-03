export type ContributionDay = { date: string; count: number; level: number };

export type Contributions = {
  days: ContributionDay[];
  total: number;
  ok: boolean;
};

export async function getContributions(username: string): Promise<Contributions> {
  try {
    const res = await fetch(`https://github.com/users/${username}/contributions`, {
      headers: { "user-agent": "portfolio" },
      next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error(`GitHub responded ${res.status}`);
    const html = await res.text();

    const counts = new Map<string, number>();
    for (const m of html.matchAll(/<tool-tip[^>]*for="([^"]+)"[^>]*>([^<]*)<\/tool-tip>/g)) {
      const n = m[2].match(/^(\d+|No) contribution/);
      if (n) counts.set(m[1], n[1] === "No" ? 0 : Number(n[1]));
    }

    const days: ContributionDay[] = [];
    for (const m of html.matchAll(/<td[^>]*data-date="([^"]+)"[^>]*id="([^"]+)"[^>]*data-level="(\d)"[^>]*>/g)) {
      days.push({ date: m[1], count: counts.get(m[2]) ?? 0, level: Number(m[3]) });
    }
    days.sort((a, b) => a.date.localeCompare(b.date));
    if (days.length === 0) throw new Error("No contribution cells found");

    const total = days.reduce((sum, d) => sum + d.count, 0);
    return { days, total, ok: true };
  } catch (err) {
    console.error("Failed to load GitHub contributions:", err);
    return { days: [], total: 0, ok: false };
  }
}
