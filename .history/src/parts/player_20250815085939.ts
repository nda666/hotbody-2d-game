// import pant from "../assets/character/Male Clothing/Green Pants.png";
// import skin from "../assets/character/skin/male_skin1.png";

import { getCharacterAsset } from "../lib/AssetLoader";
import { AssetCategory, Gender } from "../type";
import BodyPart from "./BodyPart";

export default class Player {
  sprite?: Phaser.Physics.Arcade.Sprite;
  pant?: BodyPart;
  hair?: BodyPart;
  cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
  jumpForce: number = 300;
  scene: Phaser.Scene;
  x?: number;
  y?: number;
  gender: Gender;

  constructor(scene: Phaser.Scene, gender: Gender) {
    this.scene = scene;
    this.gender = gender;
  }

  load(gender: Gender, x: number, y: number) {
    this.x = x;
    this.y = y;
    this.gender = gender;
    this.hair = new BodyPart(
      this.scene,
      this.x,
      this.y,
      this.gender,
      "hair",
      "male_hair1"
    );
    this.pant = new BodyPart(
      this.scene,
      this.x,
      this.y,
      this.gender,
      "pant",
      "red_pants"
    );
  }

  preload() {
    const parts = {
      skin: "male_skin1",
      hair: "male_hair1",
      pant: "red_pants",
      clothing: "Shirt v2",
    };
    Object.keys(parts).forEach((key) => {
      const skinPath = getCharacterAsset(
        this.gender,
        key as AssetCategory,
        parts[key] as string
      );
      this.scene.load.spritesheet(key, skinPath, {
        frameWidth: 80,
        frameHeight: 64,
      });
    });
  }

  create() {
    this.pant.preload();
    this.hair.preload();

    this.sprite = this.scene.physics.add
      .sprite(this.x, this.y, "skin")
      .setDepth(10)
      .setScale(6);
    // this.sprite.body?.setAllowGravity(true);
    this.sprite.setSize(15, 44); // ukuran hitbox
    this.sprite.setOffset(32, 20); // posisi relatif ke frame

    if (this.scene?.input?.keyboard) {
      this.cursors = this.scene?.input?.keyboard?.createCursorKeys();
    }
    this.createAnimations(this.scene);
    this.pant?.createAnimations();
    this.hair?.createAnimations();
  }

  private createAnimations(scene: Phaser.Scene) {
    // Player
    scene.anims.create({
      key: "idle",
      frames: scene.anims.generateFrameNumbers("skin", { start: 0, end: 0 }),
      frameRate: 6,
      repeat: -1,
    });
    scene.anims.create({
      key: "walk",
      frames: scene.anims.generateFrameNumbers("skin", {
        start: 20,
        end: 27,
      }),
      frameRate: 10,
      repeat: -1,
    });
    scene.anims.create({
      key: "jump",
      frames: scene.anims.generateFrameNumbers("skin", {
        start: 30,
        end: 33,
      }),
      frameRate: 10,
    });
    scene.anims.create({
      key: "fall",
      frames: scene.anims.generateFrameNumbers("skin", {
        start: 40,
        end: 43,
      }),
      frameRate: 10,
    });
    this.pant.createAnimations();
    this.hair.createAnimations();
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
