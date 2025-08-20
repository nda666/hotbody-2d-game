import { Gender } from "../type";

// Loader utama
export const characterAssets = {
  male: {
    clothing: mapAssets(
      import.meta.glob("../assets/character/clothing/*.png", {
        eager: true,
        import: "default",
      }) as Record<string, string>
    ),
    hair: mapAssets(
      import.meta.glob("../assets/character/hair/*.png", {
        eager: true,
        import: "default",
      }) as Record<string, string>
    ),
    pant: mapAssets(
      import.meta.glob("../assets/character/pant/*.png", {
        eager: true,
        import: "default",
      }) as Record<string, string>
    ),
    skin: mapAssets(
      import.meta.glob("../assets/character/skin/*.png", {
        eager: true,
        import: "default",
      }) as Record<string, string>
    ),
  },
  female: {
    clothing: mapAssets(
      import.meta.glob("../assets/character/clothing/*.png", {
        eager: true,
        import: "default",
      }) as Record<string, string>
    ),
    hair: mapAssets(
      import.meta.glob("../assets/character/hair/*.png", {
        eager: true,
        import: "default",
      }) as Record<string, string>
    ),
    pant: mapAssets(
      import.meta.glob("../assets/character/pant/*.png", {
        eager: true,
        import: "default",
      }) as Record<string, string>
    ),
    skin: mapAssets(
      import.meta.glob("../assets/character/skin/*.png", {
        eager: true,
        import: "default",
      }) as Record<string, string>
    ),
  },
};

// API untuk ambil URL asset
export function getCharacterAsset(
  gender: Gender,
  category: keyof typeof characterAssets,
  name: string
) {
  //   console.log(characterAssets[`${category}`][`${name}`]);
  return characterAssets[`${gender}`][`${category}`][`${name}`] ?? null;
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
