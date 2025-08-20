export const armors = import.meta.glob("../assets/character/**/*.png", {
  eager: true,
  import: "default",
}) as Record<string, string>;
