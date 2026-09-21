import { useMemo, useState } from "react";
import { Minus, Plus, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ShareButton } from "@/components/landing/share-button";
import { REGISTER_URL } from "@/data/content";
import { cn } from "@/lib/utils";

export function FamilyBuilder() {
  const [adults, setAdults] = useState(2);
  const [kids, setKids] = useState(2);

  const mode = useMemo(() => {
    if (adults === 1 && kids === 0) return "plus" as const;
    return "family" as const;
  }, [adults, kids]);

  const price = mode === "plus" ? 59.95 : 79.95;
  const label =
    mode === "plus"
      ? "Northstar primary care"
      : "Northstar family primary care";
  const covered =
    mode === "plus"
      ? "You — unlimited visits"
      : `${adults} adult${adults > 1 ? "s" : ""}${kids ? ` + ${kids} kid${kids > 1 ? "s" : ""}` : ""} — unlimited each`;

  function clampAdults(n: number) {
    setAdults(Math.min(2, Math.max(1, n)));
  }
  function clampKids(n: number) {
    setKids(Math.min(4, Math.max(0, n)));
  }

  return (
    <section className="px-4 py-6 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="brutal-card overflow-hidden">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
            <div className="border-b-2 border-ink p-6 sm:p-8 lg:border-b-0 lg:border-r-2">
              <div className="flex items-center gap-2 text-primary">
                <Users className="h-5 w-5" />
                <span className="text-xs font-bold uppercase tracking-[0.16em]">
                  Build your crew
                </span>
              </div>
              <h3 className="mt-3 font-display text-3xl tracking-[-0.02em] sm:text-4xl text-balance">
                Who needs care under one roof?
              </h3>
              <p className="mt-2 max-w-md text-sm text-fg-muted sm:text-base">
                Shape the household. We auto-pick the smartest plan — then you
                share it before anyone else books the last same-day slot.
              </p>

              <div className="mt-8 space-y-5">
                <CounterRow
                  label="Adults"
                  hint="1–2 on Family"
                  value={adults}
                  onDec={() => clampAdults(adults - 1)}
                  onInc={() => clampAdults(adults + 1)}
                />
                <CounterRow
                  label="Kids under 18"
                  hint="Up to 4"
                  value={kids}
                  onDec={() => clampKids(kids - 1)}
                  onInc={() => clampKids(kids + 1)}
                />
              </div>

              <div className="mt-8 flex flex-wrap gap-2">
                {Array.from({ length: adults }).map((_, i) => (
                  <AvatarChip
                    key={`a-${i}`}
                    label={i === 0 ? "You" : "Adult"}
                    tone="adult"
                  />
                ))}
                {Array.from({ length: kids }).map((_, i) => (
                  <AvatarChip
                    key={`k-${i}`}
                    label={`Kid ${i + 1}`}
                    tone="kid"
                  />
                ))}
              </div>
            </div>

            <div className="bg-ink p-6 pb-10 text-bg sm:p-8 md:pb-8">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-pulse">
                Recommended
              </p>
              <p className="mt-3 font-display text-3xl tracking-tight sm:text-4xl">
                {label}
              </p>
              <p className="mt-2 text-sm text-bg/70">{covered}</p>

              <div className="mt-8 flex items-end gap-1">
                <span className="font-display text-6xl leading-none tracking-[-0.04em] tabular-nums">
                  ${price.toFixed(2)}
                </span>
                <span className="mb-2 text-bg/60">/mo</span>
              </div>

              <ul className="mt-6 space-y-2 text-sm text-bg/80">
                <li>Unlimited NP visits for covered members</li>
                <li>Video · phone · secure message</li>
                <li>Cancel anytime · no long contracts</li>
              </ul>

              <div className="mt-8 flex flex-col gap-3">
                <Button variant="primary" size="lg" className="w-full" asChild>
                  <a href={REGISTER_URL}>Lock in {label}</a>
                </Button>
                <ShareButton
                  variant="outline"
                  size="lg"
                  className="w-full border-bg/30 text-bg hover:border-bg hover:bg-bg/10"
                  label="Share this plan"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CounterRow({
  label,
  hint,
  value,
  onDec,
  onInc,
}: {
  label: string;
  hint: string;
  value: number;
  onDec: () => void;
  onInc: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border-2 border-ink/10 bg-bg-warm/60 px-4 py-3">
      <div>
        <p className="font-semibold">{label}</p>
        <p className="text-xs text-fg-subtle">{hint}</p>
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onDec}
          className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-ink bg-card active:scale-[0.96]"
          aria-label={`Decrease ${label}`}
        >
          <Minus className="h-4 w-4" />
        </button>
        <span className="w-8 text-center font-display text-2xl tabular-nums">
          {value}
        </span>
        <button
          type="button"
          onClick={onInc}
          className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-ink bg-ink text-bg active:scale-[0.96]"
          aria-label={`Increase ${label}`}
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function AvatarChip({ label, tone }: { label: string; tone: "adult" | "kid" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border-2 border-ink px-3 py-1.5 text-xs font-semibold",
        tone === "adult" ? "bg-primary-soft text-primary" : "bg-bg-hot text-fg",
      )}
    >
      <span
        className={cn(
          "h-2.5 w-2.5 rounded-full",
          tone === "adult" ? "bg-primary" : "bg-pulse",
        )}
      />
      {label}
    </span>
  );
}
