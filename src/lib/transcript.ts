/**
 * Support chat transcripts shared by private link. Nothing about them lives in this (public) repo:
 * SHARED_TRANSCRIPTS is a JSON map of an unguessable slug to the URL of a plain-text chat export,
 * set in Vercel, e.g. {"k3j…": "https://cdn.example.com/…/transcript.txt"}.
 */

export type TranscriptItem =
  | { kind: "day"; label: string }
  | { kind: "message"; time: string; author: string; text: string; attachments: string[] };

export interface Transcript {
  title: string;
  started?: string;
  exported?: string;
  items: TranscriptItem[];
}

export function transcriptUrl(slug: string): string | undefined {
  try {
    const map = JSON.parse(process.env.SHARED_TRANSCRIPTS ?? "{}") as Record<string, string>;
    return Object.hasOwn(map, slug) ? map[slug] : undefined;
  } catch {
    return undefined;
  }
}

const MESSAGE = /^(\d{1,2}:\d{2}\s?[AP]M) \| ([^:]+): ?(.*)$/;
const DAY = /^--- (.+) ---$/;
const ATTACHMENT = /\[Attachment: "([^"]+)"\]\s*/g;

/** Parses Whop's chat export: "10:04 PM | Name: text", tab-indented continuation lines, "--- date ---" days. */
export function parseTranscript(raw: string): Transcript {
  const lines = raw.replace(/\r\n/g, "\n").split("\n");
  const transcript: Transcript = { title: lines[0]?.trim() || "Conversation", items: [] };
  let current: Extract<TranscriptItem, { kind: "message" }> | null = null;

  const finish = () => {
    if (!current) return;
    current.attachments = [...current.text.matchAll(ATTACHMENT)].map((m) => m[1]);
    current.text = current.text.replace(ATTACHMENT, "").trim();
    transcript.items.push(current);
    current = null;
  };

  for (const line of lines.slice(1)) {
    const day = line.match(DAY);
    const message = line.match(MESSAGE);
    if (line.startsWith("Started on ")) {
      transcript.started = line.replace(/^Started on /, "").replace(/ time .*$/, "");
    } else if (line.startsWith("Exported from ")) {
      finish();
      transcript.exported = line.replace(/ time .*$/, "");
    } else if (day) {
      finish();
      transcript.items.push({ kind: "day", label: day[1] });
    } else if (message) {
      finish();
      current = { kind: "message", time: message[1], author: message[2].trim(), text: message[3], attachments: [] };
    } else if (current && line.trim() !== "---") {
      current.text += `\n${line.replace(/^\t ?/, "")}`;
    }
  }
  finish();
  return transcript;
}

export async function loadTranscript(slug: string): Promise<Transcript | undefined> {
  const url = transcriptUrl(slug);
  if (!url) return undefined;
  const res = await fetch(url, { next: { revalidate: 300 } });
  if (!res.ok) return undefined;
  return parseTranscript(await res.text());
}
