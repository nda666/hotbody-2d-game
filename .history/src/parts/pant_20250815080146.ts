// import sprite from "../assets/character/Male Clothing/Green sprites.png";
// import skin from "../assets/character/skin/male_skin1.png";

import { getCharacterAsset } from "../lib/AssetLoader";
import { Gender } from "../type";

export default class Pant {
  sprite: Phaser.GameObjects.Sprite;
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
    this.sprite = scene.add.sprite(x, y, "pant").setDepth(11).setScale(6);
    this.createAnimations(scene);
  }

  static preload(scene: Phaser.Scene) {
    const spritePath = getCharacterAsset("pant", "green_pants");
    console.log(spritePath);
    scene.load.spritesheet("pant", spritePath, {
      frameWidth: 80,
      frameHeight: 64,
    });
  }

  createAnimations(scene: Phaser.Scene) {
    // pant
    scene.anims.create({
      key: "pant_idle",
      frames: scene.anims.generateFrameNumbers("pant", { start: 0, end: 0 }),
      frameRate: 10,
      repeat: -1,
    });
    scene.anims.create({
      key: "pant_walk",
      frames: scene.anims.generateFrameNumbers("pant", { start: 20, end: 27 }),
      frameRate: 10,
      repeat: -1,
    });
    scene.anims.create({
      key: "pant_jump",
      frames: scene.anims.generateFrameNumbers("pant", { start: 30, end: 33 }),
      frameRate: 10,
    });
    scene.anims.create({
      key: "pant_fall",
      frames: scene.anims.generateFrameNumbers("pant", { start: 40, end: 43 }),
      frameRate: 10,
    });
  }
}
