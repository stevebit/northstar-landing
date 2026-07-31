import {
  ArrowRight,
  Check,
  Star,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { FamilyBuilder } from "@/components/landing/family-builder";
import { HeroCinema } from "@/components/landing/hero-cinema";
import { ShareButton } from "@/components/landing/share-button";
import { SiteHeader } from "@/components/landing/site-header";
import { WaitFlip } from "@/components/landing/wait-flip";
import {
  LOGIN_URL,
  REGISTER_URL,
  faqItems,
  marqueeItems,
  plans,
  quotes,
  services,
  steps,
} from "@/data/content";
import { cn } from "@/lib/utils";

export function LandingPage() {
  return (
    <div id="top" className="paper-noise min-h-dvh pb-28 text-fg md:pb-0">
      <SiteHeader />

      <HeroCinema />

      <div className="mt-10 overflow-hidden border-y-2 border-ink bg-ink py-3 text-bg">
        <div className="marquee-track gap-0">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex items-center">
              {marqueeItems.map((item) => (
                <span
                  key={`${copy}-${item}`}
                  className="mx-3 inline-flex items-center gap-3 whitespace-nowrap font-mono text-sm uppercase tracking-[0.12em]"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-pulse" />
                  {item}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <WaitFlip />

      <section
        id="how"
        className="scroll-mt-24 border-t-2 border-ink bg-bg-warm/50 py-16 sm:py-20"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="stamp text-fg">How it works</span>
              <h2 className="mt-4 font-display text-[clamp(2rem,1.2rem+2.5vw,3.25rem)] leading-[1.05] tracking-[-0.03em]">
                Three taps. Then care.
              </h2>
            </div>
            <p className="max-w-xs text-sm text-fg-muted sm:text-right">
              Swipe the steps on mobile. No referral. No waiting room playlist.
            </p>
          </div>
        </div>

        <div className="mt-8 flex gap-4 overflow-x-auto px-4 pb-2 snap-x-mandatory sm:mx-auto sm:max-w-6xl sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-6 sm:pb-0 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {steps.map((step) => (
            <article
              key={step.n}
              className="snap-start w-[78vw] shrink-0 brutal-card p-6 sm:w-auto"
            >
              <p className="font-mono text-sm font-bold text-primary">{step.n}</p>
              <h3 className="mt-4 font-display text-2xl tracking-tight">
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-fg-muted text-pretty">{step.body}</p>
            </article>
          ))}
        </div>
      </section>

      <FamilyBuilder />

      <section className="px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <span className="stamp text-primary">What we handle</span>
          <h2 className="mt-4 max-w-2xl font-display text-[clamp(2rem,1.2rem+2.5vw,3.25rem)] leading-[1.05] tracking-[-0.03em] text-balance">
            Primary care energy. Zero clinic fluorescent lights.
          </h2>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {services.map((s, i) => (
              <article
                key={s.title}
                className={cn(
                  "brutal-card p-6 transition-transform duration-200 hover:-translate-y-1",
                  i === 0 &&
                    "sm:col-span-2 sm:flex sm:items-center sm:justify-between sm:gap-8",
                )}
              >
                <div>
                  <span className="rounded-full bg-primary-soft px-2.5 py-1 text-[0.7rem] font-bold uppercase tracking-wide text-primary">
                    {s.tag}
                  </span>
                  <h3 className="mt-3 font-display text-2xl tracking-tight">
                    {s.title}
                  </h3>
                  <p className="mt-2 max-w-md text-sm text-fg-muted text-pretty">
                    {s.body}
                  </p>
                </div>
                {i === 0 ? (
                  <img
                    src="/images/hero-family.jpg"
                    alt=""
                    className="mt-5 h-36 w-full rounded-2xl border-2 border-ink object-cover sm:mt-0 sm:h-40 sm:w-56"
                  />
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="ink-band border-y-2 border-ink py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="font-display text-[clamp(2rem,1.2rem+2.5vw,3rem)] leading-tight tracking-[-0.03em]">
              Built to get screenshotted.
            </h2>
            <ShareButton variant="ink" label="Share your reason" />
          </div>

          <div className="mt-10 flex gap-4 overflow-x-auto pb-2 snap-x-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:grid sm:grid-cols-3 sm:overflow-visible sm:pb-0">
            {quotes.map((q) => (
              <blockquote
                key={q.name}
                className="snap-start w-[85vw] shrink-0 rounded-2xl border-2 border-bg/20 bg-ink-soft p-6 sm:w-auto"
              >
                <p className="font-display text-xl leading-snug tracking-tight text-bg text-pretty">
                  “{q.text}”
                </p>
                <footer className="mt-5 font-mono text-xs uppercase tracking-[0.14em] text-pulse">
                  {q.name}
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section id="plans" className="scroll-mt-24 px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <span className="stamp text-fg">Plans</span>
          <h2 className="mt-4 font-display text-[clamp(2rem,1.2rem+2.5vw,3.25rem)] leading-[1.05] tracking-[-0.03em]">
            Simple math. Loud results.
          </h2>
          <p className="mt-3 max-w-lg text-fg-muted text-pretty">
            Pay once, go unlimited solo, or cover the whole house. Every plan
            funnels into the same secure portal.
          </p>

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {plans.map((plan) => (
              <article
                key={plan.id}
                className={cn(
                  "relative flex flex-col p-6 sm:p-7",
                  plan.highlight ? "brutal-card-teal" : "brutal-card",
                )}
              >
                {plan.highlight ? (
                  <span className="absolute -top-3 left-5 rounded-full border-2 border-ink bg-bg px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wide text-fg">
                    Most shared
                  </span>
                ) : null}
                <p className="text-xs font-bold uppercase tracking-[0.16em] opacity-70">
                  {plan.name}
                </p>
                <div className="mt-4 flex items-end gap-1">
                  <span className="font-display text-5xl leading-none tracking-tight tabular-nums">
                    ${plan.price.toFixed(2)}
                  </span>
                  <span className="mb-1 text-sm opacity-70">/{plan.unit}</span>
                </div>
                <p className="mt-3 text-sm opacity-80">{plan.blurb}</p>
                <ul className="mt-6 flex-1 space-y-2.5 text-sm">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <Check
                        className={cn(
                          "mt-0.5 h-4 w-4 shrink-0",
                          plan.highlight ? "text-bg" : "text-primary",
                        )}
                        strokeWidth={2.75}
                      />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  variant={plan.highlight ? "ink" : "primary"}
                  size="lg"
                  className="mt-8 w-full"
                  asChild
                >
                  <a href={REGISTER_URL}>{plan.cta}</a>
                </Button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="faq"
        className="scroll-mt-24 border-t-2 border-ink bg-bg-warm/40 px-4 py-16 sm:px-6 sm:py-20"
      >
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <span className="stamp text-fg">FAQ</span>
            <h2 className="mt-4 font-display text-[clamp(2rem,1.2rem+2vw,2.75rem)] leading-tight tracking-[-0.03em]">
              Questions people actually ask before they share.
            </h2>
            <p className="mt-3 text-sm text-fg-muted">
              Still unsure?{" "}
              <a
                href="mailto:general@northstarmed.ca"
                className="font-semibold text-primary underline-offset-4 hover:underline"
              >
                general@northstarmed.ca
              </a>
            </p>
          </div>
          <Accordion type="single" collapsible className="space-y-3">
            {faqItems.map((item, i) => (
              <AccordionItem
                key={item.q}
                value={`f-${i}`}
                className="rounded-2xl"
              >
                <AccordionTrigger>{item.q}</AccordionTrigger>
                <AccordionContent>{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="brutal-card-teal relative overflow-hidden px-6 py-12 text-center sm:px-12 sm:py-16">
            <p className="text-xs font-bold uppercase tracking-[0.2em] opacity-80">
              Your move
            </p>
            <h2 className="mx-auto mt-4 max-w-3xl font-display text-[clamp(2.2rem,1.3rem+3vw,4rem)] leading-[1.02] tracking-[-0.03em] text-balance">
              Be the person who fixed healthcare for the group chat.
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-sm text-primary-fg/85 sm:text-base">
              Join Northstar Family. Unlimited NP care for the household. Then
              hit share — waitlists spread by silence. This spreads by link.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button variant="ink" size="xl" asChild>
                <a href={REGISTER_URL}>
                  Start my membership
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
              <ShareButton
                variant="outline"
                size="xl"
                className="border-bg/40 text-bg hover:border-bg hover:bg-bg/10"
              />
            </div>
            <p className="mt-6 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-primary-fg/60">
              Not for emergencies · Call 911 if urgent
            </p>
          </div>
        </div>
      </section>

      <footer className="border-t-2 border-ink bg-ink text-bg">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 sm:px-6 md:flex-row md:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-bg/30 bg-primary">
                <Star className="h-3.5 w-3.5 fill-current" />
              </span>
              <span className="font-bold">Northstar Medical</span>
            </div>
            <p className="mt-4 text-sm text-bg/70 text-pretty">
              Unlimited care for your whole family. Virtual primary care for
              Ontario — designed to be shared.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 text-sm sm:grid-cols-3">
            <div>
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-pulse">
                Jump
              </p>
              <ul className="mt-3 space-y-2 text-bg/75">
                <li>
                  <a href="#flip" className="hover:text-bg">
                    The flip
                  </a>
                </li>
                <li>
                  <a href="#how" className="hover:text-bg">
                    How
                  </a>
                </li>
                <li>
                  <a href="#plans" className="hover:text-bg">
                    Plans
                  </a>
                </li>
                <li>
                  <a href="#faq" className="hover:text-bg">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-pulse">
                Account
              </p>
              <ul className="mt-3 space-y-2 text-bg/75">
                <li>
                  <a href={REGISTER_URL} className="hover:text-bg">
                    Join
                  </a>
                </li>
                <li>
                  <a href={LOGIN_URL} className="hover:text-bg">
                    Patient sign in
                  </a>
                </li>
                <li>
                  <a
                    href="https://app.northstarmed.ca/doctor/login"
                    className="hover:text-bg"
                  >
                    Provider
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-pulse">
                Contact
              </p>
              <ul className="mt-3 space-y-2 text-bg/75">
                <li>
                  <a
                    href="mailto:general@northstarmed.ca"
                    className="hover:text-bg"
                  >
                    general@northstarmed.ca
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t border-bg/10 px-4 py-4 text-center font-mono text-[0.65rem] uppercase tracking-[0.14em] text-bg/45 sm:px-6">
          © 2026 Northstar Medical · Standalone marketing preview
        </div>
      </footer>

      <div className="dock-safe fixed inset-x-0 bottom-0 z-50 border-t-2 border-ink bg-bg/95 p-3 backdrop-blur-xl md:hidden">
        <div className="mx-auto flex max-w-lg gap-2">
          <ShareButton
            variant="secondary"
            size="lg"
            className="flex-1"
            label="Share"
          />
          <Button variant="primary" size="lg" className="flex-[1.4]" asChild>
            <a href={REGISTER_URL}>
              Join now
              <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
