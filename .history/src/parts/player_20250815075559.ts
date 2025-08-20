// import pant from "../assets/character/Male Clothing/Green Pants.png";
// import skin from "../assets/character/skin/male_skin1.png";

import { getCharacterAsset } from "../lib/AssetLoader";
import Hair from "./hair";
import Pant from "./pant";

export default class Player {
  sprite: Phaser.Physics.Arcade.Sprite;
  pant: Pant;
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

    this.pant = new Hair(scene, x, y, "pant", "female");
    if (scene?.input?.keyboard) {
      this.cursors = scene?.input?.keyboard?.createCursorKeys();
    }
    this.createAnimations(scene);
  }

  static preload(scene: Phaser.Scene) {
    const skinName = "male_skin1";

    const skinPath = getCharacterAsset("skin", skinName);

    scene.load.spritesheet("player", skinPath, {
      frameWidth: 80,
      frameHeight: 64,
    });

    Pant.preload(scene);
    Hair.preload(scene);
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
    this.pant.sprite.x = this.sprite.x;
    this.pant.sprite.y = this.sprite.y;
    this.pant.sprite.flipX = this.sprite.flipX;

    this.hair.sprite.x = this.sprite.x;
    this.hair.sprite.y = this.sprite.y;
    this.hair.sprite.flipX = this.sprite.flipX;

    // Animation state
    if (!onGround) {
      if (this.sprite.body.velocity.y < 0) {
        this.sprite.play("jump", true);
        this.pant.sprite.play("pant_jump", true);
        this.hair.sprite.play("hair_jump", true);

        this.hair.sprite.play("hair_jump", true);
      } else {
        this.sprite.play("fall", true);
        this.pant.sprite.play("pant_fall", true);
        this.hair.sprite.play("hair_fall", true);
      }
    } else {
      if (left?.isDown || right?.isDown) {
        this.sprite.play("walk", true);
        this.pant.sprite.play("pant_walk", true);
        this.hair.sprite.play("hair_walk", true);
      } else {
        this.sprite.play("idle", true);
        this.pant.sprite.play("pant_idle", true);
        this.hair.sprite.play("hair_idle", true);
      }
    }
  }
}
