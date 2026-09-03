# Portfolio

Personal portfolio site built with Next.js, Tailwind CSS v4, Geist, and Tabler icons. Light mode only.

## Run it

```bash
npm install
npm run dev
```

## Edit your content

Everything on the page is driven by the files in `src/data/`:

| File | What it controls |
| --- | --- |
| `src/data/profile.ts` | Name, title, location, GitHub username, social links, page metadata |
| `src/data/experience.ts` | Experience list with expandable bullet points per role |
| `src/data/skills.ts` | Skill groups; `visibleGroups` sets how many show before "See more" |
| `src/data/projects.ts` | Projects with link, icon, and star count |

The intro paragraphs live in `src/components/hero.tsx`.

The contribution graph reads your real GitHub activity. `src/lib/github.ts` fetches the public contributions calendar for `githubUsername` (set in `src/data/profile.ts`), so no token is needed. It's cached and refreshed hourly; if GitHub can't be reached the graph renders empty with an "unavailable" note.

Drop a `resume.pdf` into `public/` to make the resume icon in the header work.

Icons come from [`@tabler/icons-react`](https://tabler.io/icons); import any icon from that package and pass it as `icon` in the data files.
