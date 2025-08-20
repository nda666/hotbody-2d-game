export const characterAssets = import.meta.glob(
  "../assets/character/**/*.png",
  {
    eager: true,
  }
) as Record<string, string>;
