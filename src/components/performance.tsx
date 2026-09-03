import { githubUsername } from "@/data/profile";
import { getContributions, type ContributionDay } from "@/lib/github";

const WEEKS = 53;
const DAYS = 7;
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const LEVELS = [
  "bg-emerald-600/8",
  "bg-emerald-600/25",
  "bg-emerald-600/45",
  "bg-emerald-600/65",
  "bg-emerald-600/90",
];

function parseDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function label(day: ContributionDay) {
  const d = parseDate(day.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  return day.count === 0 ? `No contributions on ${d}` : `${day.count} contributions on ${d}`;
}

function padToSunday(days: ContributionDay[]) {
  if (days.length === 0) return days;
  const first = parseDate(days[0].date);
  const pad: ContributionDay[] = [];
  for (let i = first.getDay(); i > 0; i--) {
    const d = new Date(first);
    d.setDate(first.getDate() - i);
    pad.push({ date: d.toISOString().slice(0, 10), count: 0, level: -1 });
  }
  return [...pad, ...days];
}

export async function Performance() {
  const { days: raw, total, ok } = await getContributions(githubUsername);
  const days = padToSunday(raw);

  const monthLabels: string[] = [];
  let lastMonth = -1;
  for (let w = 0; w < WEEKS; w++) {
    const first = days[w * DAYS];
    if (!first) { monthLabels.push(""); continue; }
    const m = parseDate(first.date).getMonth();
    monthLabels.push(m !== lastMonth ? MONTHS[m] : "");
    lastMonth = m;
  }
  if (monthLabels[0] && monthLabels[1]) monthLabels[0] = "";

  return (
    <section aria-labelledby="performance-heading" className="flex flex-col gap-5">
      <h2 id="performance-heading">GitHub Stats</h2>
      <div>
        <div className="no-scrollbar scroll-fade-x max-w-full overflow-x-auto overflow-y-hidden">
          <div className="w-max">
            <div
              aria-hidden="true"
              className="mb-1.5 grid h-3 gap-0.5 text-[12px] leading-none text-muted-foreground"
              style={{ gridTemplateColumns: `repeat(${WEEKS}, 0.625rem)` }}
            >
              {monthLabels.map((m, i) => (
                <span key={i} className="whitespace-nowrap">{m}</span>
              ))}
            </div>
            <ol
              aria-label={`${total.toLocaleString()} GitHub contributions in the last year`}
              className="grid grid-flow-col grid-rows-7 gap-0.5"
              style={{ gridTemplateColumns: `repeat(${WEEKS}, 0.625rem)` }}
            >
              {ok
                ? days.map((day) =>
                  day.level < 0 ? (
                    <li key={day.date} aria-hidden="true" className="size-2.5" />
                  ) : (
                    <li
                      key={day.date}
                      aria-label={label(day)}
                      title={label(day)}
                      className={`squircle size-2.5 rounded-[30%] ${LEVELS[day.level] ?? LEVELS[0]}`}
                    />
                  ),
                )
                : Array.from({ length: WEEKS * DAYS }, (_, i) => (
                  <li key={i} aria-hidden="true" className={`squircle size-2.5 rounded-[30%] ${LEVELS[0]}`} />
                ))}
            </ol>
          </div>
        </div>
        <p className="mt-2 text-[12px] text-muted-foreground">
          {ok ? `${total.toLocaleString()} last year` : "GitHub activity unavailable"}
        </p>
      </div>
    </section>
  );
}
