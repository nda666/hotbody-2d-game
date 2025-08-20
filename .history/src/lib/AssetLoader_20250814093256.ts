// Loader utama
export const characterAssets = {
  clothing: mapAssets(
    import.meta.glob("../assets/character/clothing/*.png", {
      eager: true,
      import: "default",
    }) as Record<string, string>
  ),
  hair: import.meta.glob("../assets/character/hair/*.png", {
    eager: true,
    import: "default",
  }) as Record<string, string>,
  skins: import.meta.glob("../assets/character/skins/*.png", {
    eager: true,
    import: "default",
  }) as Record<string, string>,
};

// API untuk ambil URL asset
export function getCharacterAsset(
  category: keyof typeof characterAssets,
  name: string
) {
  console.log(characterAssets[`./assets/character/${category}/${name}`]);
  return characterAssets[`./assets/character/${category}/${name}`] ?? null;
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
