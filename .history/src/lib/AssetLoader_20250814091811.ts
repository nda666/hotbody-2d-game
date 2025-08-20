export const characterAssets = {
  clothing: import.meta.glob("../assets/character/clothing/*.png", {
    eager: true,
    import: "default",
  }) as Record<string, string>,
  hair: import.meta.glob("../assets/character/hair/*.png", {
    eager: true,
    import: "default",
  }) as Record<string, string>,
  skins: import.meta.glob("../assets/character/skins/*.png", {
    eager: true,
    import: "default",
  }) as Record<string, string>,
};
console.log(characterAssets);
