import maleSkin1 from "./assets/character/skin/male_skin1.png";

export default class Player extends Phaser.Physics.Arcade.Sprite {
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;

  // Load asset player (dipanggil di Scene preload)
  static preload(scene: Phaser.Scene) {
    scene.load.spritesheet("player", maleSkin1, {
      frameWidth: 80,
      frameHeight: 64,
    });
    scene.load.spritesheet("player", "assets/character/skin/male_skin1.png", {
      frameWidth: 80,
      frameHeight: 64,
    });
  }

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "player");

    // Tambahkan ke scene & physics
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setDepth(10).setScale(6).setCollideWorldBounds(true).setGravityY(300);

    // Animasi player
    this.createAnimations(scene);

    // Input
    this.cursors = scene.input.keyboard.createCursorKeys();
  }

  private createAnimations(scene: Phaser.Scene) {
    scene.anims.create({
      key: "idle",
      frames: [{ key: "player", frame: 0 }],
      frameRate: 10,
    });

    scene.anims.create({
      key: "left",
      frames: scene.anims.generateFrameNumbers("player", { start: 1, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });

    scene.anims.create({
      key: "right",
      frames: scene.anims.generateFrameNumbers("player", { start: 4, end: 6 }),
      frameRate: 10,
      repeat: -1,
    });
  }

  update() {
    if (this.cursors.left?.isDown) {
      this.setVelocityX(-160);
      this.anims.play("left", true);
    } else if (this.cursors.right?.isDown) {
      this.setVelocityX(160);
      this.anims.play("right", true);
    } else {
      this.setVelocityX(0);
      this.anims.play("idle", true);
    }

    if (this.cursors.up?.isDown && this.body?.touching.down) {
      this.setVelocityY(-330);
    }
  }
}
