// import hair from "../assets/character/Male Clothing/Green hairs.png";
// import skin from "../assets/character/skin/male_skin1.png";

const hairAssets = import.meta.glob("../assets/character/hair/*.png", {
  eager: true,
});

export default class Hair {
  hair: Phaser.GameObjects.Sprite;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    this.hair = scene.add.sprite(x, y, "hair").setDepth(11).setScale(6);

    this.createAnimations(scene);
  }

  static preload(scene: Phaser.Scene) {
    const hairName = "male_hair1.png";
    console.log(Object.keys(hairAssets));
    const hairPath = (hairAssets[`../assets/character/hair/${hairName}`] as any)
      .default;

    scene.load.spritesheet("hair", hairPath, {
      frameWidth: 80,
      frameHeight: 64,
    });
  }

  private createAnimations(scene: Phaser.Scene) {
    // hair
    scene.anims.create({
      key: "hair_idle",
      frames: scene.anims.generateFrameNumbers("hair", { start: 0, end: 0 }),
      frameRate: 6,
      repeat: -1,
    });
    scene.anims.create({
      key: "hair_walk",
      frames: scene.anims.generateFrameNumbers("hair", { start: 20, end: 27 }),
      frameRate: 10,
      repeat: -1,
    });
    scene.anims.create({
      key: "hair_jump",
      frames: scene.anims.generateFrameNumbers("hair", { start: 30, end: 33 }),
      frameRate: 10,
    });
    scene.anims.create({
      key: "hair_fall",
      frames: scene.anims.generateFrameNumbers("hair", { start: 40, end: 43 }),
      frameRate: 10,
    });
  }
}
