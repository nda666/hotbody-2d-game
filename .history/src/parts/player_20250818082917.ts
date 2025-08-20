import { getCharacterAsset } from "../lib/AssetLoader";
import { AssetCategory, Gender } from "../type";
import BodyPart from "./BodyPart";

export default class Player {
  sprite?: Phaser.Physics.Arcade.Sprite;
  bodyParts: BodyPart[] = [];
  cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
  jumpForce: number = 300;
  scene: Phaser.Scene;
  x?: number;
  y?: number;
  gender: Gender;
  isAttacking: boolean = false;

  constructor(scene: Phaser.Scene, gender: Gender) {
    this.scene = scene;
    this.gender = gender;
  }

  preload() {
    const parts: { category: AssetCategory; name: string }[] = [
      { category: "skin", name: "male_skin1" },
      { category: "hair", name: "male_hair1" },
      { category: "pant", name: "red_pants" },
      { category: "clothing", name: "Shirt v2" },
      { category: "hand", name: "Male Sword" },
      { category: "shoe", name: "Boots" },
    ];

    this.bodyParts = parts.map(
      (part) =>
        new BodyPart(
          this.scene,
          this.x!,
          this.y!,
          this.gender,
          part.category,
          part.name
        )
    );
    this.bodyParts.forEach((part) => {
      const path = getCharacterAsset(
        this.gender,
        part.spriteName,
        part.spriteFile
      );
      if (path) {
        this.scene.load.spritesheet(part.spriteName, path, {
          frameWidth: 80,
          frameHeight: 64,
        });
      }
    });
  }

  create(x: number, y: number) {
    this.x = x;
    this.y = y;
    // Buat body utama (skin)
    console.log(this.bodyParts);
    const skinPart = this.bodyParts.find((p) => p.spriteName === "skin");
    if (!skinPart) throw new Error("Skin part not found");

    this.sprite = skinPart.sprite as Phaser.Physics.Arcade.Sprite;
    this.sprite.setX(x).setY(y);

    if (this.scene?.input?.keyboard) {
      this.cursors = this.scene?.input?.keyboard?.createCursorKeys();
    }

    this.createAnimations(this.scene);

    // Create anim untuk semua body parts
    this.bodyParts.forEach((part) => {
      if (part.spriteName !== "skin") {
        // part.preload();
        part.createAnimations();
      }
    });
  }

  private createAnimations(scene: Phaser.Scene) {
    // Animasi utama (skin)
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
      key: "attack",
      frames: scene.anims.generateFrameNumbers("skin", { start: 50, end: 54 }),
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

    this.scene.input.on("pointerdown", () => {
      if (!this.isAttacking) {
        this.isAttacking = true;
        this.sprite?.play("attack");

        this.sprite?.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
          this.isAttacking = false;
        });
      }
    });
  }

  update() {
    if (!this.cursors || !this.sprite?.body) return;
    if (this.isAttacking) {
      return;
    }

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

    // Sinkron posisi semua body parts
    this.bodyParts.forEach((part) => {
      if (part.sprite && part.spriteName !== "skin") {
        part.sprite.x = this.sprite!.x;
        part.sprite.y = this.sprite!.y;
        part.sprite.flipX = this.sprite!.flipX;
      }
    });

    // Animation state
    const state = !onGround
      ? this.sprite.body.velocity.y < 0
        ? "jump"
        : "fall"
      : left?.isDown || right?.isDown
      ? "walk"
      : "idle";

    this.sprite.play(state, true);
    this.bodyParts.forEach((part) => {
      if (part.spriteName !== "skin" && part.sprite) {
        part.sprite.play(`${part.spriteName}_${state}`, true);
      }
    });
  }
}
