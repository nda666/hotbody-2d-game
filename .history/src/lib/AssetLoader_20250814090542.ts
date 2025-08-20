export const characterAssets = {
  clothing: import.meta.glob("../assets/character/clothing/*.png", {
    eager: true,
    import: "default",
  }),
  hair: import.meta.glob("../assets/character/hair/*.png", {
    eager: true,
    import: "default",
  }),
  skins: import.meta.glob("../assets/character/skins/*.png", {
    eager: true,
  }),
};
