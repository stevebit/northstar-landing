import { useState } from "react";
import { Check, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SHARE } from "@/data/content";
import { cn } from "@/lib/utils";

type Props = {
  variant?: "default" | "primary" | "secondary" | "ink" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "xl" | "icon";
  className?: string;
  label?: string;
};

export function ShareButton({
  variant = "secondary",
  size = "default",
  className,
  label = "Share with family",
}: Props) {
  const [done, setDone] = useState(false);

  async function handleShare() {
    const payload = {
      title: SHARE.title,
      text: SHARE.text,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(payload);
        setDone(true);
      } else {
        await navigator.clipboard.writeText(
          `${payload.title}\n\n${payload.text}\n${payload.url}`,
        );
        setDone(true);
      }
    } catch {
      // user cancelled share sheet — ignore
    }

    window.setTimeout(() => setDone(false), 2200);
  }

  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      className={cn(className)}
      onClick={handleShare}
    >
      {done ? (
        <>
          <Check className="h-4 w-4" />
          Copied / shared
        </>
      ) : (
        <>
          <Share2 className="h-4 w-4" />
          {label}
        </>
      )}
    </Button>
  );
}
