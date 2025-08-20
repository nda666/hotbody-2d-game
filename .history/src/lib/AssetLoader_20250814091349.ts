export const characterAssets = {
  clothing: import.meta.glob("../assets/character/clothing/*.png", {
    eager: true,
  }),
  hair: import.meta.glob("../assets/character/hair/*.png", {
    eager: true,
  }),
  skins: import.meta.glob("/assets/character/skins/*.png", {
    eager: true,
  }),
};
console.log(import.meta.glob("../assets/character/clothing/*.png"));
