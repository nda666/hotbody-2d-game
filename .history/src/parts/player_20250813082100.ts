import hair from "./assets/character/Male Clothing/Green Pants.png";
import maleSkin1 from "./assets/character/skin/male_skin1.png";

export default class Player {
  sprite: Phaser.Physics.Arcade.Sprite;
  hair: Phaser.GameObjects.Sprite;
  cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  jumpForce: number = 300;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    this.sprite = scene.physics.add
      .sprite(x, y, "player")
      .setDepth(10)
      .setScale(6);
    this.sprite.body?.setAllowGravity(true);

    this.hair = scene.add.sprite(x, y, "hair").setDepth(11).setScale(6);

    this.cursors = scene.input.keyboard.createCursorKeys();

    this.createAnimations(scene);
  }

  static preload(scene: Phaser.Scene) {
    scene.load.spritesheet("player", maleSkin1, {
      frameWidth: 80,
      frameHeight: 64,
    });
    scene.load.spritesheet("hair", hair, {
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

    // Hair
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

  update() {
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

    // Hair follow
    this.hair.x = this.sprite.x;
    this.hair.y = this.sprite.y;
    this.hair.flipX = this.sprite.flipX;

    // Animation state
    if (!onGround) {
      if (this.sprite.body.velocity.y < 0) {
        this.sprite.play("jump", true);
        this.hair.play("hair_jump", true);
      } else {
        this.sprite.play("fall", true);
        this.hair.play("hair_fall", true);
      }
    } else {
      if (left?.isDown || right?.isDown) {
        this.sprite.play("walk", true);
        this.hair.play("hair_walk", true);
      } else {
        this.sprite.play("idle", true);
        this.hair.play("hair_idle", true);
      }
    }
  }
}
