// Loader utama
export const characterAssets = {
  clothing: mapAssets(
    import.meta.glob("./assets/character/clothing/*.png", {
      eager: true,
      import: "default",
    }) as Record<string, string>
  ),
  hair: mapAssets(
    import.meta.glob("./assets/character/hair/*.png", {
      eager: true,
      import: "default",
    }) as Record<string, string>
  ),
  skins: mapAssets(
    import.meta.glob("./assets/character/skins/*.png", {
      eager: true,
      import: "default",
    }) as Record<string, string>
  ),
};

// API untuk ambil URL asset
export function getCharacterAsset(
  category: keyof typeof characterAssets,
  name: string
) {
  return characterAssets[category]?.[name] ?? null;
}

// Helper untuk bikin mapping key → url
function mapAssets(globResult: Record<string, string>) {
  const mapped: Record<string, string> = {};
  for (const path in globResult) {
    const fileName = path.split("/").pop()!; // ambil "shirt.png"
    const key = fileName.replace(/\.[^/.]+$/, ""); // hapus ekstensi
    mapped[key] = globResult[path];
  }
  console.log(characterAssets);
  return mapped;
}
