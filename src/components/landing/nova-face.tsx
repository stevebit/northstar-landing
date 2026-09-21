import { cn } from "@/lib/utils";

const SRC = {
  face: "/images/nova-robot-face.jpg",
  launcher: "/images/nova-robot-launcher.jpg",
  portrait: "/images/nova-robot-portrait.jpg",
} as const;

export type NovaFaceVariant = keyof typeof SRC;

type Props = {
  size: "sm" | "md" | "lg";
  variant?: NovaFaceVariant;
  className?: string;
};

export function NovaFace({ size, variant = "face", className }: Props) {
  const dim =
    size === "lg"
      ? "h-28 w-28 sm:h-36 sm:w-36"
      : size === "md"
        ? "h-12 w-12"
        : "h-10 w-10";

  return (
    <span
      className={cn(
        "relative block shrink-0 overflow-hidden rounded-full bg-[#07102a]",
        size === "lg"
          ? "border-[3px] border-ink shadow-[4px_4px_0_0_var(--color-ink)]"
          : "border-2 border-ink",
        dim,
        className,
      )}
    >
      <img
        src={SRC[variant]}
        alt=""
        className="h-full w-full object-cover object-center"
      />
    </span>
  );
}
