import { useEffect, useState } from "react";
import { Menu, Star, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ShareButton } from "@/components/landing/share-button";
import { useScrollProgress } from "@/components/landing/use-scroll-progress";
import { LOGIN_URL, REGISTER_URL, navLinks } from "@/data/content";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const progress = useScrollProgress();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-200",
        scrolled || open ? "bg-bg/90 backdrop-blur-xl" : "bg-transparent",
      )}
    >
      <div
        className="progress-bar h-1 bg-primary"
        style={{ ["--scroll" as string]: String(progress) }}
        aria-hidden
      />
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4 sm:h-16 sm:px-6">
        <a href="#top" className="flex items-center gap-2">
          <span className="relative flex h-9 w-9 items-center justify-center rounded-full border-2 border-ink bg-primary text-primary-fg">
            <Star className="h-4 w-4 fill-current" />
          </span>
          <span className="leading-none">
            <span className="block text-sm font-bold tracking-tight">
              Northstar
            </span>
            <span className="block text-[0.62rem] font-bold uppercase tracking-[0.18em] text-fg-muted">
              Medical
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-3 py-2 text-sm font-semibold text-fg-muted transition-colors hover:bg-ink/5 hover:text-fg"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <ShareButton variant="ghost" size="sm" label="Share" />
          <Button variant="ghost" size="sm" asChild>
            <a href={LOGIN_URL}>Sign in</a>
          </Button>
          <Button variant="primary" size="sm" asChild>
            <a href={REGISTER_URL}>Join free</a>
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border-2 border-ink bg-card md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open ? (
        <div className="border-t-2 border-ink bg-bg px-4 py-5 md:hidden">
          <nav className="flex flex-col gap-1">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rounded-xl px-3 py-3 text-base font-semibold"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </a>
            ))}
          </nav>
          <div className="mt-4 grid gap-2">
            <ShareButton className="w-full" />
            <Button variant="secondary" className="w-full" asChild>
              <a href={LOGIN_URL}>Sign in</a>
            </Button>
            <Button variant="primary" className="w-full" asChild>
              <a href={REGISTER_URL}>Join free</a>
            </Button>
          </div>
        </div>
      ) : null}
    </header>
  );
}
