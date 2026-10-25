import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { loadTranscript, type TranscriptItem } from "@/lib/transcript";

// Private links: keep them out of search results and link previews.
export const metadata: Metadata = {
  title: "Support conversation",
  robots: { index: false, follow: false },
};

type Message = Extract<TranscriptItem, { kind: "message" }>;

// The export has no roles, so anyone whose name mentions the platform is staff; everyone else is us.
const isStaff = (author: string) => /whop/i.test(author);

function Avatar({ name }: { name: string }) {
  return (
    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-neutral-900 text-xs font-semibold text-white">
      {name.replace(/ from .*/i, "").charAt(0).toUpperCase()}
    </span>
  );
}

function Bubble({ message, showAuthor }: { message: Message; showAuthor: boolean }) {
  const staff = isStaff(message.author);
  return (
    <div className={`flex items-end gap-2 ${staff ? "" : "flex-row-reverse"}`}>
      {staff && (showAuthor ? <Avatar name={message.author} /> : <span className="w-8 shrink-0" />)}
      <div className={`flex max-w-[80%] flex-col gap-1 ${staff ? "items-start" : "items-end"}`}>
        {showAuthor && (
          <span className="px-1 text-xs text-neutral-500">
            {message.author} · {message.time}
          </span>
        )}
        {message.text && (
          <div
            className={`whitespace-pre-wrap break-words rounded-3xl px-4 py-3 text-[15px] leading-relaxed ${
              staff ? "rounded-bl-lg bg-neutral-100 text-neutral-900" : "rounded-br-lg bg-[#fa4616] text-white"
            }`}
          >
            {message.text}
          </div>
        )}
        {message.attachments.map((name) => (
          <div
            key={name}
            className="flex items-center gap-2 rounded-2xl border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-700"
          >
            <span aria-hidden className="text-base">📎</span>
            {name}
          </div>
        ))}
      </div>
    </div>
  );
}

export default async function SharedTranscript({ params }: PageProps<"/s/[slug]">) {
  const { slug } = await params;
  const transcript = await loadTranscript(slug);
  if (!transcript) notFound();

  const staffName =
    transcript.items.find((i): i is Message => i.kind === "message" && isStaff(i.author) && / from /i.test(i.author))
      ?.author.replace(/.* from /i, "") ?? "Support";

  return (
    <main className="flex min-h-svh justify-center bg-neutral-200 px-0 sm:px-4 sm:py-10">
      <div className="flex w-full max-w-[460px] flex-col overflow-hidden bg-white shadow-xl sm:rounded-[2rem]">
        <header className="flex items-center gap-3 border-b border-neutral-200 px-5 py-4">
          <Avatar name={staffName} />
          <div className="min-w-0">
            <h1 className="truncate text-base font-semibold text-neutral-900">{transcript.title}</h1>
            {transcript.started && <p className="truncate text-xs text-neutral-500">Started {transcript.started}</p>}
          </div>
        </header>

        <section className="flex flex-1 flex-col gap-3 px-4 py-5">
          {transcript.items.map((item, i) => {
            if (item.kind === "day") {
              return (
                <p key={i} className="py-2 text-center text-xs font-medium text-neutral-500">
                  {item.label}
                </p>
              );
            }
            const previous = transcript.items[i - 1];
            const showAuthor = previous?.kind !== "message" || previous.author !== item.author;
            return <Bubble key={i} message={item} showAuthor={showAuthor} />;
          })}
        </section>

        {transcript.exported && (
          <footer className="border-t border-neutral-200 px-5 py-4 text-center text-xs text-neutral-400">
            {transcript.exported}
          </footer>
        )}
      </div>
    </main>
  );
}
