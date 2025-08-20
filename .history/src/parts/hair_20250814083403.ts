// import sprite from "../assets/character/Male Clothing/Green sprites.png";
// import skin from "../assets/character/skin/male_skin1.png";

import { Gender } from "../type";

export default class Hair {
  sprite: Phaser.GameObjects.Sprite;
  spriteAssets: Record<string, string>;
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    spriteName: string,
    gender: Gender
  ) {
    this.sprite = scene.add.sprite(x, y, "hair").setDepth(11).setScale(6);
    this.spriteAssets = import.meta.glob(
      `../assets/character/${gender}_hair/*.png`,
      {
        eager: true,
      }
    );
    const spritePath = (
      this.spriteAssets[
        `../assets/character/${gender}_hair/${spriteName}`
      ] as any
    ).default;

    scene.load.spritesheet("hair", spritePath, {
      frameWidth: 80,
      frameHeight: 64,
    });
  }

  public createAnimations(scene: Phaser.Scene) {
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
