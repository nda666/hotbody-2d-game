// import sprite from "../assets/character/Male Clothing/Green sprites.png";
// import skin from "../assets/character/skin/male_skin1.png";

import { getCharacterAsset } from "../lib/AssetLoader";
import { Gender } from "../type";

export default class Hair {
  sprite: Phaser.GameObjects.Sprite;
  spriteAssets: Record<string, string>;
  gender: Gender;
  spriteName: string;
  scene: Phaser.Scene;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    spriteName: string,
    gender: Gender
  ) {
    this.scene = scene;
    this.gender = gender;
    this.spriteName = spriteName;
    this.sprite = scene.add.sprite(x, y, "hair").setDepth(11).setScale(6);
    this.createAnimations(scene);
  }

  static preload(scene: Phaser.Scene) {
    const spritePath = getCharacterAsset("hair", "male_hair1");
    console.log(spritePath);
    scene.load.spritesheet("hair", spritePath, {
      frameWidth: 80,
      frameHeight: 64,
    });
  }

  createAnimations(scene: Phaser.Scene) {
    // hair
    scene.anims.create({
      key: "hair_idle",
      frames: scene.anims.generateFrameNumbers("hair", { start: 0, end: 0 }),
      frameRate: 10,
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
