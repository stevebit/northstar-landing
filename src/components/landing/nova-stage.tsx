import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { ArrowRight, X } from "lucide-react";
import { NovaFace } from "@/components/landing/nova-face";
import { REGISTER_URL } from "@/data/content";
import {
  NOVA_STAGE_OPEN_EVENT,
  NOVA_TOPICS,
  NOVA_WELCOME,
  matchNovaIntent,
  topicById,
  type NovaTopic,
  type NovaTopicId,
} from "@/data/nova-guide";
import { cn } from "@/lib/utils";

type Speech = {
  text: string;
  showSignup: boolean;
};

const LEFT_TOPICS = NOVA_TOPICS.slice(0, 3);
const RIGHT_TOPICS = NOVA_TOPICS.slice(3);

export function NovaStage() {
  const titleId = useId();
  const dialogId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);

  const [open, setOpen] = useState(false);
  const [teaser, setTeaser] = useState(true);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const [speech, setSpeech] = useState<Speech>({
    text: NOVA_WELCOME,
    showSignup: false,
  });
  const [speechKey, setSpeechKey] = useState(0);
  const [asked, setAsked] = useState<Set<NovaTopicId>>(new Set());
  const pendingRef = useRef<number | null>(null);
  const inflightRef = useRef(false);
  const queueRef = useRef<Array<() => void>>([]);

  useEffect(() => {
    return () => {
      if (pendingRef.current != null) window.clearTimeout(pendingRef.current);
    };
  }, []);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener(NOVA_STAGE_OPEN_EVENT, onOpen);
    return () => window.removeEventListener(NOVA_STAGE_OPEN_EVENT, onOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    setTeaser(false);
    const prev = document.body.style.overflow;
    const launcher = launcherRef.current;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      launcher?.focus();
    };
  }, [open]);

  function speak(match: ReturnType<typeof matchNovaIntent>) {
    setSpeech({ text: match.text, showSignup: match.showSignup });
    setSpeechKey((n) => n + 1);
    if (match.topic) {
      setAsked((prev) => new Set(prev).add(match.topic!.id));
    }
    setBusy(false);
    inflightRef.current = false;
    pendingRef.current = null;
    const next = queueRef.current.shift();
    if (next) next();
  }

  function replySoon(match: ReturnType<typeof matchNovaIntent>) {
    const run = () => {
      inflightRef.current = true;
      setBusy(true);
      pendingRef.current = window.setTimeout(() => speak(match), 220);
    };
    if (inflightRef.current) {
      queueRef.current.push(run);
      return;
    }
    run();
  }

  function askTopic(id: NovaTopicId) {
    const topic = topicById(id);
    replySoon({
      kind: "topic",
      topic,
      text: topic.answer,
      showSignup: topic.showSignup,
    });
  }

  function submitDraft(event?: FormEvent) {
    event?.preventDefault();
    const text = draft.trim();
    if (!text) return;
    setDraft("");
    replySoon(matchNovaIntent(text));
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-[80]">
      {open ? (
        <div
          id={dialogId}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          className="nova-stage-ground pointer-events-auto absolute inset-0 flex flex-col text-[#f0f7f9]"
        >
          <h2 id={titleId} className="sr-only">
            Nova, Northstar site guide
          </h2>

          <div className="flex items-start justify-between px-4 pt-[max(0.85rem,env(safe-area-inset-top))] sm:px-6">
            <p className="pt-2 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-[#0d92ad]">
              Nova
            </p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-[#f0f7f9] hover:bg-white/10"
              aria-label="Close Nova"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="mx-auto flex min-h-0 w-full max-w-5xl flex-1 flex-col px-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:px-6">
            <SpeechCaption
              key={speechKey}
              text={speech.text}
              showSignup={speech.showSignup}
              busy={busy}
            />

            <div className="mt-2 grid min-h-0 flex-1 grid-cols-1 items-center md:grid-cols-[minmax(0,15rem)_auto_minmax(0,15rem)] md:gap-x-3">
              <div className="hidden flex-col items-end gap-2.5 md:flex">
                {LEFT_TOPICS.map((topic) => (
                  <TopicChip
                    key={topic.id}
                    topic={topic}
                    asked={asked.has(topic.id)}
                    onAsk={askTopic}
                    align="end"
                  />
                ))}
              </div>

              <div className="relative mx-auto flex h-[min(52vh,26rem)] w-[min(92vw,26rem)] items-center justify-center sm:h-[min(60vh,32rem)] sm:w-[min(80vw,32rem)] md:h-[min(66vh,36rem)] md:w-[36rem]">
                <span
                  className="pointer-events-none absolute inset-[18%] rounded-full bg-[#0d92ad]/20 blur-3xl"
                  aria-hidden
                />
                <NovaFace
                  size="stage"
                  variant="stage"
                  speaking={busy}
                  className="nova-avatar-float relative z-[1] h-full w-full"
                />
              </div>

              <div className="hidden flex-col items-start gap-2.5 md:flex">
                {RIGHT_TOPICS.map((topic) => (
                  <TopicChip
                    key={topic.id}
                    topic={topic}
                    asked={asked.has(topic.id)}
                    onAsk={askTopic}
                    align="start"
                  />
                ))}
              </div>
            </div>

            <div className="mt-3 flex flex-wrap justify-center gap-2 md:hidden">
              {NOVA_TOPICS.map((topic) => (
                <TopicChip
                  key={topic.id}
                  topic={topic}
                  asked={asked.has(topic.id)}
                  onAsk={askTopic}
                />
              ))}
            </div>

            <form
              onSubmit={submitDraft}
              className="mx-auto mt-4 flex w-full max-w-md items-end gap-2"
            >
              <label className="sr-only" htmlFor="nova-stage-input">
                Ask Nova about booking, plans, or emergencies
              </label>
              <input
                ref={inputRef}
                id="nova-stage-input"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                maxLength={240}
                autoComplete="off"
                autoCorrect="off"
                spellCheck={false}
                placeholder="Or type booking, plans, OHIP…"
                className="h-10 min-w-0 flex-1 border-0 border-b border-white/20 bg-transparent px-0 text-sm text-[#f0f7f9] outline-none placeholder:text-white/35 focus:border-[#0d92ad]"
              />
              <button
                type="submit"
                disabled={busy || !draft.trim()}
                className="pb-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#069658] disabled:opacity-30"
              >
                Ask
              </button>
            </form>

            <p className="mx-auto mt-3 max-w-sm text-center text-[0.65rem] leading-snug text-white/35">
              I don&apos;t need health details, photos, or lab results. For
              911-level trouble, call 911.
            </p>
          </div>
        </div>
      ) : null}

      {!open ? (
        <div className="pointer-events-none absolute inset-x-0 bottom-24 z-10 flex justify-start px-3 md:bottom-6 md:justify-end md:px-6">
          <div className="pointer-events-auto flex max-w-full items-end gap-2">
            {teaser ? (
              <div className="relative mb-2 hidden max-w-[15rem] sm:block">
                <button
                  type="button"
                  onClick={() => setOpen(true)}
                  className="rounded-2xl rounded-br-md bg-[#f0f7f9] px-3 py-2 text-left text-sm font-semibold leading-snug text-[#015e73] shadow-[0_10px_24px_-12px_rgb(1_94_115/0.65)]"
                >
                  Tap me — I can walk you through booking or plans.
                  <span
                    aria-hidden
                    className="absolute -right-1.5 bottom-3 h-3 w-3 rotate-45 bg-[#f0f7f9]"
                  />
                </button>
                <button
                  type="button"
                  className="absolute -left-2 -top-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#015e73] text-xs text-[#f0f7f9]"
                  aria-label="Dismiss Nova tip"
                  onClick={() => setTeaser(false)}
                >
                  ×
                </button>
              </div>
            ) : null}

            <button
              ref={launcherRef}
              type="button"
              onClick={() => setOpen(true)}
              data-nova-launcher
              className="group relative rounded-full"
              aria-expanded={false}
              aria-controls={dialogId}
              aria-label="Open Nova — glossy robot site guide"
            >
              <span
                className="absolute -inset-1 animate-[pulse-ring_2s_ease-out_infinite] rounded-full bg-[#0d92ad]/40"
                aria-hidden
              />
              <NovaFace size="md" variant="launcher" className="h-16 w-16 border-0 shadow-[0_8px_20px_-6px_rgb(13_146_173/0.7)] sm:h-[4.25rem] sm:w-[4.25rem]" />
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function SpeechCaption({
  text,
  showSignup,
  busy,
}: {
  text: string;
  showSignup: boolean;
  busy: boolean;
}) {
  return (
    <div className="relative mx-auto w-full max-w-xl">
      <div
        className="nova-speak-in relative rounded-[1.35rem] rounded-bl-md bg-[#f0f7f9] px-4 py-3 text-[#015e73] shadow-[0_16px_40px_-20px_rgb(13_146_173/0.55)]"
        role="status"
        aria-live="polite"
        data-nova-speech
      >
        <div className="max-h-[min(26vh,12rem)] overflow-y-auto pr-0.5">
          {busy ? (
            <p className="flex items-center gap-1.5 text-sm font-semibold">
              <span className="nova-dot" />
              <span className="nova-dot nova-dot-2" />
              <span className="nova-dot nova-dot-3" />
              <span className="sr-only">Nova is answering</span>
            </p>
          ) : (
            <p className="text-pretty text-sm font-semibold leading-snug sm:text-[0.95rem]">
              {text}
            </p>
          )}
          {!busy && showSignup ? (
            <a
              href={REGISTER_URL}
              className="mt-3 inline-flex h-10 items-center justify-center gap-1.5 rounded-full bg-[#069658] px-4 text-sm font-bold text-white hover:bg-[#05824c]"
            >
              Start signup
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          ) : null}
        </div>
        <span
          aria-hidden
          className="absolute -bottom-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 bg-[#f0f7f9]"
        />
      </div>
    </div>
  );
}

function TopicChip({
  topic,
  asked,
  onAsk,
  align,
}: {
  topic: NovaTopic;
  asked: boolean;
  onAsk: (id: NovaTopicId) => void;
  align?: "start" | "end";
}) {
  return (
    <button
      type="button"
      onClick={() => onAsk(topic.id)}
      data-nova-chip={topic.id}
      className={cn(
        "rounded-full px-3.5 py-2 text-left text-[0.78rem] font-bold leading-snug text-white shadow-[0_8px_18px_-10px_rgb(13_146_173/0.8)] transition-[transform,opacity,background-color] duration-150",
        "bg-[linear-gradient(180deg,#3aa8c7_0%,#0d92ad_48%,#015e73_100%)]",
        asked && "opacity-45",
        !asked && "hover:-translate-y-px hover:brightness-110",
        align === "end" && "md:text-right",
      )}
    >
      {topic.chip}
    </button>
  );
}

/** Back-compat alias — landing used to mount a chat panel. */
export { NovaStage as NovaChat };
