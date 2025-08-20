// import sprite from "../assets/character/Male Clothing/Green sprites.png";
// import skin from "../assets/character/skin/male_skin1.png";

import { AssetCategory, Gender } from "../type";

export default class BodyPart {
  sprite?: Phaser.GameObjects.Sprite | Phaser.Physics.Arcade.Sprite;
  gender: Gender;
  spriteName: AssetCategory;
  spriteFile: string;
  scene: Phaser.Scene;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    gender: Gender,
    spriteName: AssetCategory,
    spriteFile: string
  ) {
    this.scene = scene;
    this.gender = gender;
    this.spriteName = spriteName;
    this.spriteFile = spriteFile;
    if (spriteName != "skin") {
      this.sprite = scene.add
        .sprite(x, y, this.spriteName)
        .setDepth(11)
        .setScale(6);
    } else {
      this.sprite = this.scene.physics.add
        .sprite(x, y, "skin")
        .setDepth(10)
        .setScale(6)
        .setSize(15, 44)
        .setOffset(32, 20);
    }
  }

  createAnimations() {
    // pant
    this.scene.anims.create({
      key: `${this.spriteName}_idle`,
      frames: this.scene.anims.generateFrameNumbers(this.spriteName, {
        start: 0,
        end: 0,
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.scene.anims.create({
      key: `${this.spriteName}_walk`,
      frames: this.scene.anims.generateFrameNumbers(this.spriteName, {
        start: 20,
        end: 27,
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.scene.anims.create({
      key: `${this.spriteName}_jump`,
      frames: this.scene.anims.generateFrameNumbers(this.spriteName, {
        start: 30,
        end: 33,
      }),
      frameRate: 10,
    });
    this.scene.anims.create({
      key: `${this.spriteName}_fall`,
      frames: this.scene.anims.generateFrameNumbers(this.spriteName, {
        start: 40,
        end: 43,
      }),
      frameRate: 10,
    });
    this.scene.anims.create({
      key: `${this.spriteName}_attack`,
      frames: this.scene.anims.generateFrameNumbers(this.spriteName, {
        start: 50,
        end: 54,
      }),
      frameRate: 10,
      repeat: 0,
    });
  }
}
