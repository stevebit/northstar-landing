import { useEffect, useRef, useState } from "react";
import { ArrowRight, Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NovaAvatar } from "@/components/landing/nova-avatar";
import { ShareButton } from "@/components/landing/share-button";
import { REGISTER_URL } from "@/data/content";
import { cn } from "@/lib/utils";

const WORDS = ["Stop", "waiting", "sick."];

export function HeroCinema() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);
  const [reduced, setReduced] = useState(false);
  const [wordOn, setWordOn] = useState(0);
  const [showSub, setShowSub] = useState(false);
  const [showCta, setShowCta] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (reduced) {
      setWordOn(WORDS.length);
      setShowSub(true);
      setShowCta(true);
      return;
    }
    let i = 0;
    const wordTimer = window.setInterval(() => {
      i += 1;
      setWordOn(i);
      if (i >= WORDS.length) {
        window.clearInterval(wordTimer);
        window.setTimeout(() => setShowSub(true), 160);
        window.setTimeout(() => setShowCta(true), 320);
      }
    }, 240);
    return () => window.clearInterval(wordTimer);
  }, [reduced]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (reduced) {
      v.pause();
      setPlaying(false);
      return;
    }
    v.play().catch(() => setPlaying(false));
  }, [reduced]);

  function togglePlay() {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      void v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  }

  return (
    <section className="relative overflow-hidden px-4 pt-16 sm:px-6 sm:pt-20">
      <div className="mx-auto max-w-6xl">
        <div className="brutal-card relative isolate overflow-hidden">
          <div className="relative aspect-[3/4] w-full sm:aspect-[16/10] lg:aspect-[21/10]">
            <video
              ref={videoRef}
              className="film-ken absolute inset-0 h-full w-full object-cover"
              src="/videos/hero-care.mp4"
              poster="/images/hero-mom-kid.jpg"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
            />

            {/* Heavy cinematic scrim — keeps type readable on bright frames */}
            <div
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgb(15_14_12)_0%,rgb(15_14_12/0.92)_28%,rgb(15_14_12/0.45)_55%,rgb(15_14_12/0.35)_100%)]"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.1] mix-blend-overlay"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, transparent, transparent 2px, rgb(0 0 0 / 0.2) 3px)",
              }}
              aria-hidden
            />

            <div className="absolute left-3 right-3 top-3 z-10 flex flex-wrap items-center justify-between gap-2 sm:left-5 sm:right-5 sm:top-5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border-2 border-bg/40 bg-ink/80 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-bg backdrop-blur">
                  Ontario · PHIPA
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border-2 border-pulse/50 bg-ink/80 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-bg backdrop-blur">
                  <span className="live-dot" />
                  NPs online now
                </span>
              </div>
              <button
                type="button"
                onClick={togglePlay}
                className="inline-flex h-10 items-center gap-2 rounded-full border-2 border-bg/30 bg-ink/80 px-3 text-xs font-bold text-bg backdrop-blur transition-colors hover:bg-ink"
                aria-label={playing ? "Pause hero film" : "Play hero film"}
              >
                {playing ? (
                  <Pause className="h-3.5 w-3.5" />
                ) : (
                  <Play className="h-3.5 w-3.5" />
                )}
                <span className="hidden sm:inline">
                  {playing ? "Pause" : "Play"} film
                </span>
              </button>
            </div>

            <div className="absolute inset-x-0 bottom-0 z-10 p-4 pb-5 sm:p-8 sm:pb-9">
              <p className="mb-3 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-pulse">
                Northstar Medical · Virtual primary care
              </p>

              <h1 className="max-w-3xl font-display text-[clamp(2.35rem,1.1rem+5.2vw,5.1rem)] leading-[0.95] tracking-[-0.04em] text-bg text-balance drop-shadow-[0_2px_12px_rgb(0_0_0/0.45)]">
                {WORDS.map((w, i) => (
                  <span
                    key={w}
                    className={cn(
                      "mr-[0.22em] inline-block transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                      i < wordOn
                        ? "translate-y-0 opacity-100 blur-0"
                        : "translate-y-4 opacity-0 blur-[6px]",
                      w === "sick." && i < wordOn && "italic text-pulse",
                    )}
                  >
                    {w}
                  </span>
                ))}
                <br />
                <span
                  className={cn(
                    "inline-block transition-all duration-500 delay-100 ease-[cubic-bezier(0.22,1,0.36,1)]",
                    wordOn >= WORDS.length
                      ? "translate-y-0 opacity-100"
                      : "translate-y-4 opacity-0",
                  )}
                >
                  Get care <span className="italic text-pulse">today</span>.
                </span>
              </h1>

              <p
                className={cn(
                  "mt-4 max-w-lg text-sm text-bg/90 sm:text-base text-pretty transition-all duration-500",
                  showSub
                    ? "translate-y-0 opacity-100"
                    : "translate-y-3 opacity-0",
                )}
              >
                Unlimited nurse practitioner access for your whole Ontario
                household. Not a chatbot. Real licensed care — video, phone, or
                message.
              </p>

              <div
                className={cn(
                  "mt-6 flex flex-col gap-3 sm:flex-row sm:items-center transition-all duration-500",
                  showCta
                    ? "translate-y-0 opacity-100"
                    : "translate-y-3 opacity-0",
                )}
              >
                <Button variant="primary" size="xl" asChild>
                  <a href={REGISTER_URL}>
                    Start free signup
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>
                <ShareButton
                  size="xl"
                  variant="ink"
                  label="Share with family"
                  className="border-0"
                />
              </div>

              <p
                className={cn(
                  "mt-3 font-mono text-[0.7rem] text-bg/60 transition-opacity duration-500",
                  showCta ? "opacity-100" : "opacity-0",
                )}
              >
                $39.95 visit · Family $79.95/mo · Cancel anytime · Not for 911
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4 border-t-2 border-ink bg-bg-warm/90 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
            <NovaAvatar size="lg" />
            <div className="flex flex-col gap-2 sm:items-end">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-fg-subtle">
                Your first visit is closer than you think
              </p>
              <div className="flex flex-wrap gap-2">
                <a
                  href="#flip"
                  className="rounded-full border-2 border-ink bg-card px-4 py-2 text-xs font-bold transition-colors hover:bg-ink hover:text-bg"
                >
                  See the wait flip
                </a>
                <a
                  href="#plans"
                  className="rounded-full border-2 border-ink bg-card px-4 py-2 text-xs font-bold transition-colors hover:bg-ink hover:text-bg"
                >
                  Peek pricing
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
          {[
            { k: "Often same-day", v: "Book when life hits" },
            { k: "Licensed NPs", v: "Ontario practice rules" },
            { k: "Whole family", v: "2 adults + 4 kids" },
            { k: "2 min signup", v: "No referral needed" },
          ].map((item, i) => (
            <div
              key={item.k}
              className="brutal-card px-3 py-3 sm:px-4"
              style={
                reduced
                  ? undefined
                  : {
                      animation: `count-pop 0.5s cubic-bezier(0.22,1,0.36,1) ${0.55 + i * 0.08}s both`,
                    }
              }
            >
              <p className="text-sm font-bold tracking-tight sm:text-base">
                {item.k}
              </p>
              <p className="mt-0.5 text-[0.7rem] text-fg-muted sm:text-xs">
                {item.v}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
