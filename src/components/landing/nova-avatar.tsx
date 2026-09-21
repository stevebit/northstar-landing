import { useEffect, useState } from "react";
import { NovaFace } from "@/components/landing/nova-face";
import { openNovaChat } from "@/data/nova-guide";
import { cn } from "@/lib/utils";

const LINES = [
  "Hey — I'm Nova, your site guide. Tap me with a question.",
  "Ontario families wait months. You don't have to.",
  "Same-day visits. Whole household. One plan.",
  "Ask about booking, plans, or emergencies.",
];

type Props = {
  className?: string;
  size?: "md" | "lg";
  autoCycle?: boolean;
};

export function NovaAvatar({
  className,
  size = "lg",
  autoCycle = true,
}: Props) {
  const [line, setLine] = useState(0);
  const [visible, setVisible] = useState(true);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setEntered(true), 280);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!autoCycle) return;
    const id = window.setInterval(() => {
      setVisible(false);
      window.setTimeout(() => {
        setLine((n) => (n + 1) % LINES.length);
        setVisible(true);
      }, 220);
    }, 3200);
    return () => window.clearInterval(id);
  }, [autoCycle]);

  const dim = size === "lg" ? "h-28 w-28 sm:h-36 sm:w-36" : "h-16 w-16";

  return (
    <button
      type="button"
      onClick={() => openNovaChat()}
      className={cn(
        "relative flex items-end gap-3 text-left transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
        entered ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
        className,
      )}
      aria-label="Open Nova chat — glossy robot site guide"
    >
      <div className="relative shrink-0">
        <span
          className="absolute -inset-1 animate-[pulse-ring_2s_ease-out_infinite] rounded-full bg-pulse/40"
          aria-hidden
        />
        <NovaFace size={size} variant="portrait" className={dim} />
        <span className="absolute -bottom-1 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1 rounded-full border-2 border-ink bg-card px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-wide text-fg shadow-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
          Online
        </span>
      </div>

      <div
        className={cn(
          "relative max-w-[16rem] rounded-2xl rounded-bl-md border-2 border-ink bg-card px-3.5 py-3 text-sm font-semibold leading-snug text-fg shadow-[4px_4px_0_0_var(--color-primary)] sm:max-w-xs sm:text-base",
          "transition-[opacity,transform,filter] duration-200 ease-out",
          visible
            ? "translate-y-0 opacity-100 blur-0"
            : "translate-y-1 opacity-0 blur-[2px]",
        )}
        role="status"
        aria-live="polite"
      >
        {LINES[line]}
        <span
          aria-hidden
          className="absolute -left-2 bottom-3 h-3 w-3 rotate-45 border-b-2 border-l-2 border-ink bg-card"
        />
      </div>
    </button>
  );
}
