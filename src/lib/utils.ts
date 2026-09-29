export function cn(...inputs: (string | boolean | undefined | null | { [key: string]: any })[]) {
  return inputs
    .flatMap((input) => {
      if (!input) return [];
      if (typeof input === "string") return input.trim().split(/\s+/);
      if (typeof input === "object") {
        return Object.entries(input)
          .filter(([_, value]) => Boolean(value))
          .map(([key]) => key);
      }
      return [];
    })
    .filter(Boolean)
    .join(" ");
}
