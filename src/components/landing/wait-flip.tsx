import { useEffect, useState } from "react";
import { ArrowRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { REGISTER_URL, waitScenarios } from "@/data/content";
import { cn } from "@/lib/utils";

function useCountUp(target: number, active: boolean) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    let frame = 0;
    const start = performance.now();
    const duration = 700;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(target * eased));
      if (t < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, active]);

  return value;
}

export function WaitFlip() {
  const [activeId, setActiveId] =
    useState<(typeof waitScenarios)[number]["id"]>("no-fp");
  const scenario =
    waitScenarios.find((s) => s.id === activeId) ?? waitScenarios[1];
  const count = useCountUp(scenario.waitDays, true);

  return (
    <section id="flip" className="scroll-mt-24 px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-3 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="stamp text-primary">The flip</span>
            <h2 className="mt-4 font-display text-[clamp(2rem,1.2rem+3vw,3.5rem)] leading-[1.05] tracking-[-0.03em] text-balance">
              Waiting is the old product.
              <br />
              <span className="italic text-primary">Today is the new one.</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm text-fg-muted sm:text-base text-pretty">
            Pick your situation. Watch the wait pile up. Then flip to Northstar.
            Screenshot this. Send it to the group chat.
          </p>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 snap-x-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {waitScenarios.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setActiveId(s.id)}
              className={cn(
                "snap-start shrink-0 rounded-full border-2 px-4 py-2.5 text-sm font-semibold transition-colors",
                activeId === s.id
                  ? "border-ink bg-ink text-bg"
                  : "border-ink/15 bg-card text-fg hover:border-ink",
              )}
            >
              {s.label}
            </button>
          ))}
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <article className="brutal-card relative overflow-hidden p-6 sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-alert">
              Old way
            </p>
            <p className="mt-4 font-mono text-sm text-fg-muted">{scenario.pain}</p>
            <div className="mt-6 flex items-end gap-2">
              <span
                key={scenario.id}
                className="anim-count font-display text-[clamp(4.5rem,3rem+8vw,7.5rem)] leading-none tracking-[-0.04em] text-alert tabular-nums"
              >
                {count}
              </span>
              <span className="mb-3 text-lg font-semibold text-fg-muted">
                days
              </span>
            </div>
            <p className="mt-2 text-sm font-medium text-fg">
              Typical wait-list energy for care that should be basic.
            </p>
          </article>

          <article className="brutal-card-teal relative overflow-hidden p-6 sm:p-8">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em]">
              <span className="live-dot" />
              Northstar way
            </div>
            <p className="mt-4 font-mono text-sm text-primary-fg/80">
              Licensed Ontario NP. Virtual. Often same day. Whole household on
              one plan.
            </p>
            <div className="mt-6 flex items-end gap-3">
              <span className="font-display text-[clamp(3.5rem,2.2rem+5vw,5.5rem)] leading-none tracking-[-0.03em]">
                today
              </span>
              <Zap className="mb-3 h-8 w-8" fill="currentColor" />
            </div>
            <p className="mt-2 text-sm font-medium text-primary-fg/90">
              Unlimited visits on membership. Family plan from $79.95/mo.
            </p>
            <Button
              variant="ink"
              size="lg"
              className="mt-8 w-full sm:w-auto"
              asChild
            >
              <a href={REGISTER_URL}>
                Flip my care
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </article>
        </div>
      </div>
    </section>
  );
}
