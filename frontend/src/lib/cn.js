import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/** Standard shadcn helper — merges conditional classes without fighting
    Tailwind's own class precedence (e.g. two conflicting padding
    utilities collapse to the last one, not both being emitted). */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
