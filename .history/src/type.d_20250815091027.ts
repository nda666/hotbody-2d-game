export type Gender = "male" | "female";

type AssetCategory = "clothing" | "hair" | "pant" | "skin" | "hand";

type CharacterAssetsType = {
  [G in Gender]: {
    [C in AssetCategory]: Record<string, string>;
  };
};
