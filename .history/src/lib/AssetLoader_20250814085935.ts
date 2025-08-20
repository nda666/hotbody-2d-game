export const characterAssets = {
  armors: import.meta.glob("../assets/character/armor/*.png", {
    eager: true,
    import: "default",
  }),
  weapons: import.meta.glob("../assets/character/weapons/*.png", {
    eager: true,
    import: "default",
  }),
  skins: import.meta.glob("../assets/character/skins/*.png", {
    eager: true,
    import: "default",
  }),
};
