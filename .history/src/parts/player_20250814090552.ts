// import pant from "../assets/character/Male Clothing/Green Pants.png";
// import skin from "../assets/character/skin/male_skin1.png";

import { characterAssets } from "../lib/AssetLoader";
import Hair from "./hair";

export default class Player {
  sprite: Phaser.Physics.Arcade.Sprite;
  pant: Phaser.GameObjects.Sprite;
  hair: Hair;
  cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
  jumpForce: number = 300;
  scene: Phaser.Scene;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    this.scene = scene;
    this.sprite = scene.physics.add
      .sprite(x, y, "player")
      .setDepth(10)
      .setScale(6);
    // this.sprite.body?.setAllowGravity(true);
    this.sprite.setSize(15, 44); // ukuran hitbox
    this.sprite.setOffset(32, 20); // posisi relatif ke frame

    this.hair = new Hair(scene, x, y, "hair", "female");

    this.pant = scene.add.sprite(x, y, "pant").setDepth(11).setScale(6);
    if (scene?.input?.keyboard) {
      this.cursors = scene?.input?.keyboard?.createCursorKeys();
    }
    this.createAnimations(scene);
  }

  static preload(scene: Phaser.Scene) {
    const skinName = "male_skin1.png";
    const pantName = "Purple Shirt v2.png";

    console.log(characterAssets.skins[`../assets/character/skin/${skinName}`]);
    const skinPath = characterAssets.skins[
      `../assets/character/skin/${skinName}`
    ] as any;
    const pantPath = characterAssets.clothing[
      `../assets/character/clothing/${pantName}`
    ] as any;

    scene.load.spritesheet("player", skinPath, {
      frameWidth: 80,
      frameHeight: 64,
    });

    scene.load.spritesheet("pant", pantPath, {
      frameWidth: 80,
      frameHeight: 64,
    });
  }

  private createAnimations(scene: Phaser.Scene) {
    // Player
    scene.anims.create({
      key: "idle",
      frames: scene.anims.generateFrameNumbers("player", { start: 0, end: 0 }),
      frameRate: 6,
      repeat: -1,
    });
    scene.anims.create({
      key: "walk",
      frames: scene.anims.generateFrameNumbers("player", {
        start: 20,
        end: 27,
      }),
      frameRate: 10,
      repeat: -1,
    });
    scene.anims.create({
      key: "jump",
      frames: scene.anims.generateFrameNumbers("player", {
        start: 30,
        end: 33,
      }),
      frameRate: 10,
    });
    scene.anims.create({
      key: "fall",
      frames: scene.anims.generateFrameNumbers("player", {
        start: 40,
        end: 43,
      }),
      frameRate: 10,
    });

    // pant
    scene.anims.create({
      key: "pant_idle",
      frames: scene.anims.generateFrameNumbers("pant", { start: 0, end: 0 }),
      frameRate: 6,
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

  update() {
    if (!this.cursors) return;
    if (!this.sprite.body) return;
    const onGround = this.sprite.body?.blocked.down;
    const { left, right, up } = this.cursors;

    // Movement
    if (left?.isDown) {
      this.sprite.flipX = false;
    } else if (right?.isDown) {
      this.sprite.flipX = true;
    }

    // Jump
    if (up?.isDown && onGround) {
      this.sprite.setVelocityY(-this.jumpForce);
    }

    // pant follow
    this.pant.x = this.sprite.x;
    this.pant.y = this.sprite.y;
    this.pant.flipX = this.sprite.flipX;

    this.hair.sprite.x = this.sprite.x;
    this.hair.sprite.y = this.sprite.y;
    this.hair.sprite.flipX = this.sprite.flipX;

    // Animation state
    if (!onGround) {
      if (this.sprite.body.velocity.y < 0) {
        this.sprite.play("jump", true);
        this.pant.play("pant_jump", true);
        this.hair.sprite.play("hair_jump", true);
      } else {
        this.sprite.play("fall", true);
        this.pant.play("pant_fall", true);
        this.hair.sprite.play("hair_fall", true);
      }
    } else {
      if (left?.isDown || right?.isDown) {
        this.sprite.play("walk", true);
        this.pant.play("pant_walk", true);
        this.hair.sprite.play("hair_walk", true);
      } else {
        this.sprite.play("idle", true);
        this.pant.play("pant_idle", true);
        this.hair.sprite.play("hair_walk", true);
      }
    }
  }
}
