import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { ArrowRight, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { REGISTER_URL } from "@/data/content";
import {
  NOVA_CHAT_OPEN_EVENT,
  NOVA_TOPICS,
  NOVA_WELCOME,
  matchNovaIntent,
  topicById,
  type NovaTopicId,
} from "@/data/nova-guide";
import { cn } from "@/lib/utils";

type ChatRole = "nova" | "visitor";

type ChatMessage = {
  id: string;
  role: ChatRole;
  text: string;
  showSignup?: boolean;
};

const WELCOME: ChatMessage = {
  id: "welcome",
  role: "nova",
  text: NOVA_WELCOME,
};

function nextId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function NovaChat() {
  const titleId = useId();
  const dialogId = useId();
  const logRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);

  const [open, setOpen] = useState(false);
  const [teaser, setTeaser] = useState(true);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME]);
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
    window.addEventListener(NOVA_CHAT_OPEN_EVENT, onOpen);
    return () => window.removeEventListener(NOVA_CHAT_OPEN_EVENT, onOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    setTeaser(false);
    const prev = document.body.style.overflow;
    const launcher = launcherRef.current;
    document.body.style.overflow = "hidden";
    const focusTimer = window.setTimeout(() => {
      inputRef.current?.focus();
    }, 40);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.clearTimeout(focusTimer);
      window.removeEventListener("keydown", onKey);
      launcher?.focus();
    };
  }, [open]);

  useEffect(() => {
    const node = logRef.current;
    if (!node) return;
    node.scrollTop = node.scrollHeight;
  }, [messages, open, busy]);

  function pushNova(match: ReturnType<typeof matchNovaIntent>) {
    setMessages((prev) => [
      ...prev,
      {
        id: nextId(),
        role: "nova",
        text: match.text,
        showSignup: match.showSignup,
      },
    ]);
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
      pendingRef.current = window.setTimeout(() => pushNova(match), 180);
    };
    if (inflightRef.current) {
      queueRef.current.push(run);
      return;
    }
    run();
  }

  function askTopic(id: NovaTopicId) {
    const topic = topicById(id);
    setMessages((prev) => [
      ...prev,
      { id: nextId(), role: "visitor", text: topic.question },
    ]);
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
    setMessages((prev) => [...prev, { id: nextId(), role: "visitor", text }]);
    replySoon(matchNovaIntent(text));
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-[60]">
      {open ? (
        <button
          type="button"
          className="pointer-events-auto absolute inset-0 bg-ink/35 md:bg-ink/10"
          aria-label="Close Nova chat"
          onClick={() => setOpen(false)}
        />
      ) : null}

      <div
        className={cn(
          "pointer-events-none absolute inset-x-0 z-10 flex justify-start px-3 md:justify-end md:px-6",
          open ? "bottom-3 md:bottom-6" : "bottom-24 md:bottom-6",
        )}
      >
        <div className="pointer-events-auto flex max-w-full flex-col items-start gap-2 md:items-end">
          {open ? (
            <div
              id={dialogId}
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              className="flex h-[min(38rem,calc(100dvh-1.5rem))] w-[min(26rem,calc(100vw-1.5rem))] flex-col overflow-hidden rounded-2xl border-2 border-ink bg-card shadow-[6px_6px_0_0_var(--color-ink)] md:h-[min(36rem,calc(100dvh-5.5rem))]"
            >
              <header className="flex items-center gap-3 border-b-2 border-ink bg-bg-hot px-3 py-2.5">
                <NovaFace size="sm" />
                <div className="min-w-0 flex-1">
                  <p
                    id={titleId}
                    className="text-sm font-bold leading-tight text-fg"
                  >
                    Nova
                  </p>
                  <p className="text-[0.7rem] font-semibold text-fg-muted">
                    Site guide · not a clinician
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-ink bg-card text-fg hover:bg-bg-warm"
                  aria-label="Close Nova chat"
                >
                  <X className="h-4 w-4" />
                </button>
              </header>

              <p className="border-b border-ink/10 bg-bg-warm/70 px-3 py-1.5 text-[0.68rem] font-medium text-fg-muted">
                I don&apos;t need health details, photos, or lab results. For
                911-level trouble, call 911.
              </p>

              <div
                ref={logRef}
                className="flex-1 space-y-3 overflow-y-auto px-3 py-3"
                aria-live="polite"
              >
                {messages.map((msg) => (
                  <ChatBubble key={msg.id} message={msg} />
                ))}
                {busy ? (
                  <p className="pl-1 text-xs font-semibold text-fg-subtle">
                    Nova is typing…
                  </p>
                ) : null}
              </div>

              <div className="border-t-2 border-ink bg-bg-warm/80 px-3 py-2.5">
                <p className="mb-2 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-fg-subtle">
                  Quick questions
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {NOVA_TOPICS.map((topic) => (
                    <button
                      key={topic.id}
                      type="button"
                      onClick={() => askTopic(topic.id)}
                      className={cn(
                        "rounded-full border-2 px-2.5 py-1 text-[0.7rem] font-bold leading-snug transition-colors",
                        asked.has(topic.id)
                          ? "border-ink/20 bg-card text-fg-muted"
                          : "border-ink bg-card text-fg hover:bg-primary hover:text-primary-fg",
                      )}
                    >
                      {topic.chip}
                    </button>
                  ))}
                </div>

                <form
                  onSubmit={submitDraft}
                  className="mt-2.5 flex items-center gap-2"
                >
                  <label className="sr-only" htmlFor="nova-chat-input">
                    Ask Nova about booking, plans, or emergencies
                  </label>
                  <input
                    ref={inputRef}
                    id="nova-chat-input"
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    maxLength={240}
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck={false}
                    placeholder="Ask about booking or plans"
                    className="h-11 min-w-0 flex-1 rounded-full border-2 border-ink bg-card px-3.5 text-sm text-fg outline-none placeholder:text-fg-subtle focus-visible:ring-2 focus-visible:ring-primary/40"
                  />
                  <button
                    type="submit"
                    disabled={busy || !draft.trim()}
                    className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-ink bg-primary text-primary-fg disabled:opacity-50"
                    aria-label="Send message"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </form>
              </div>
            </div>
          ) : null}

          {!open ? (
            <div className="flex items-end gap-2">
              {teaser ? (
                <div className="relative mb-1 hidden max-w-[16rem] sm:block">
                  <button
                    type="button"
                    onClick={() => setOpen(true)}
                    className="rounded-2xl rounded-bl-md border-2 border-ink bg-card px-3 py-2 text-left text-sm font-semibold leading-snug text-fg shadow-[4px_4px_0_0_var(--color-primary)]"
                  >
                    Questions about booking or plans? Tap me.
                    <span
                      aria-hidden
                      className="absolute -left-2 bottom-3 h-3 w-3 rotate-45 border-b-2 border-l-2 border-ink bg-card"
                    />
                  </button>
                  <button
                    type="button"
                    className="absolute -right-2 -top-2 inline-flex h-6 w-6 items-center justify-center rounded-full border-2 border-ink bg-card text-xs"
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
                className={cn(
                  "group relative flex items-center gap-2 rounded-full border-2 border-ink bg-card p-1.5 pr-3 shadow-[4px_4px_0_0_var(--color-ink)]",
                  "hover:-translate-y-px hover:shadow-[3px_3px_0_0_var(--color-ink)]",
                )}
                aria-expanded={false}
                aria-controls={dialogId}
                aria-label="Open Nova chat"
              >
                <span className="relative">
                  <span
                    className="absolute -inset-1 animate-[pulse-ring_2s_ease-out_infinite] rounded-full bg-pulse/40"
                    aria-hidden
                  />
                  <NovaFace size="md" />
                </span>
                <span className="pr-1 text-left">
                  <span className="block text-xs font-bold text-primary">
                    Nova
                  </span>
                  <span className="block text-sm font-bold leading-none">
                    Ask Nova
                  </span>
                </span>
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function ChatBubble({ message }: { message: ChatMessage }) {
  const fromNova = message.role === "nova";
  return (
    <div className={cn("flex", fromNova ? "justify-start" : "justify-end")}>
      <div
        className={cn(
          "max-w-[92%] rounded-2xl border-2 px-3 py-2 text-sm leading-snug",
          fromNova
            ? "rounded-bl-md border-ink bg-card text-fg shadow-[3px_3px_0_0_var(--color-primary)]"
            : "rounded-br-md border-ink bg-ink text-bg",
        )}
      >
        <p className="text-pretty">{message.text}</p>
        {fromNova && message.showSignup ? (
          <Button
            variant="primary"
            size="sm"
            className="mt-2.5 h-9 w-full sm:w-auto"
            asChild
          >
            <a href={REGISTER_URL}>
              Start signup
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </Button>
        ) : null}
      </div>
    </div>
  );
}

function NovaFace({ size }: { size: "sm" | "md" }) {
  const dim = size === "sm" ? "h-10 w-10" : "h-12 w-12";
  return (
    <span
      className={cn(
        "relative block shrink-0 overflow-hidden rounded-full border-2 border-ink bg-bg",
        dim,
      )}
    >
      <video
        className="h-full w-full object-cover object-top"
        src="/videos/nova-idle.mp4"
        poster="/images/nova-avatar.jpg"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden
      />
    </span>
  );
}
