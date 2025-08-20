import { AssetCategory, CharacterAssetsType, Gender } from "../type";

// Loader utama
export const characterAssets: CharacterAssetsType = {
  male: {
    clothing: mapAssets(
      import.meta.glob("../assets/character/male_clothing/*.png", {
        eager: true,
        import: "default",
      }) as Record<string, string>
    ),
    hair: mapAssets(
      import.meta.glob("../assets/character/male_hair/*.png", {
        eager: true,
        import: "default",
      }) as Record<string, string>
    ),
    pant: mapAssets(
      import.meta.glob("../assets/character/male_pant/*.png", {
        eager: true,
        import: "default",
      }) as Record<string, string>
    ),
    skin: mapAssets(
      import.meta.glob("../assets/character/male_skin/*.png", {
        eager: true,
        import: "default",
      }) as Record<string, string>
    ),
    hand: mapAssets(
      import.meta.glob("../assets/character/male_hand/*.png", {
        eager: true,
        import: "default",
      }) as Record<string, string>
    ),
  },
  female: {
    clothing: mapAssets(
      import.meta.glob("../assets/character/female_clothing/*.png", {
        eager: true,
        import: "default",
      }) as Record<string, string>
    ),
    hair: mapAssets(
      import.meta.glob("../assets/character/female_hair/*.png", {
        eager: true,
        import: "default",
      }) as Record<string, string>
    ),
    pant: mapAssets(
      import.meta.glob("../assets/character/female_pant/*.png", {
        eager: true,
        import: "default",
      }) as Record<string, string>
    ),
    skin: mapAssets(
      import.meta.glob("../assets/character/female_skin/*.png", {
        eager: true,
        import: "default",
      }) as Record<string, string>
    ),
    hand: mapAssets(
      import.meta.glob("../assets/character/female_hand/*.png", {
        eager: true,
        import: "default",
      }) as Record<string, string>
    ),
  },
};

export function getCharacterAsset(
  gender: Gender,
  category: AssetCategory,
  name: string
) {
  return characterAssets[gender][category][name] ?? null;
}

// Helper untuk bikin mapping key → url
function mapAssets(globResult: Record<string, string>) {
  const mapped: Record<string, string> = {};
  for (const path in globResult) {
    const fileName = path.split("/").pop()!; // ambil "shirt.png"
    const key = fileName.replace(/\.[^/.]+$/, ""); // hapus ekstensi
    mapped[key] = globResult[path];
  }
  return mapped;
}
