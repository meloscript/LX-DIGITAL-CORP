import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type BrandLogoProps = {
  showName?: boolean;
  className?: string;
  /** Footer / fond sombre */
  onDark?: boolean;
  /** Afficher le nom sur tous les écrans (footer) */
  alwaysShowName?: boolean;
  /** Taille du logo en pixels */
  size?: number;
};

/** Logo officiel LX — « Work smart » */
export function BrandLogo({
  showName = true,
  className,
  onDark = false,
  alwaysShowName = false,
  size = 36,
}: BrandLogoProps) {
  return (
    <Link href="/" className={cn("flex items-center gap-2.5 group", className)}>
      <Image
        src="/logo-lx.png"
        alt="LX Digital Corp"
        width={size}
        height={size}
        className="rounded-lg object-contain shrink-0 transition-opacity group-hover:opacity-90"
        style={{ width: size, height: size }}
        priority
      />
      {showName && (
        <span
          className={cn(
            "font-semibold tracking-tight",
            alwaysShowName ? "inline" : "hidden sm:block",
            onDark ? "text-white" : "text-night dark:text-white"
          )}
        >
          LX Digital Corp
        </span>
      )}
    </Link>
  );
}
