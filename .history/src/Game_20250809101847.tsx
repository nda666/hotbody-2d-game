import React, { useEffect, useRef } from "react";

import Phaser from "phaser";

import maleSkin1 from "./assets/character/skin/male_skin1.png";

class MyScene extends Phaser.Scene {
  isJumping: boolean;
  player!: Phaser.Physics.Arcade.Sprite;
  cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  constructor() {
    super("MyScene");
  }
  preload() {
    // Load spritesheet (64x64 misal, sesuaikan dengan ukuran frame)
    this.load.spritesheet("player", maleSkin1, {
      frameWidth: 80,
      frameHeight: 64,
    });
  }

  create() {
    this.jumping = false;
    // Tambah isJumping world
    this.player = this.physics.add.sprite(100, 300, "player");

    // Animasi idle (frame 0-3 contoh)
    this.anims.create({
      key: "idle",
      frames: this.anims.generateFrameNumbers("player", { start: 0, end: 0 }),
      frameRate: 6,
      repeat: -1,
    });

    // Animasi jalan (frame 8-13 contoh)
    this.anims.create({
      key: "walk",
      frames: this.anims.generateFrameNumbers("player", {
        start: 20,
        end: 27,
      }),
      frameRate: 10,
      repeat: 1,
    });

    // Animasi lompat (1 frame contoh)
    this.anims.create({
      key: "jump",
      frames: this.anims.generateFrameNumbers("player", {
        start: 40,
        end: 42,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.cursors = this.input.keyboard.createCursorKeys();

    // Aktifkan animasi idle awal
    this.player.play("idle");

    // Tambah ground
    const ground = this.add.rectangle(400, 580, 800, 40, 0x00ff00);
    this.physics.add.existing(ground, true);
    this.physics.add.collider(this.player, ground);
  }

  update() {
    const speed = 100;
    // this.player.setOrigin(0, 2);
    this.player.setSize(24, 64);
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-speed);
      this.player.flipX = false;
      this.player.anims.play("walk", true);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(speed);
      //   this.player.x += 1;
      this.player.flipX = true;
      this.player.anims.play("walk", true);
    } else {
      this.player.setVelocityX(0);
      this.player.anims.play("idle", true);
    }

    if (this.player.velocity.y < 0) {
      this.player.anims.play("jump", true);
    } else if (this.player.body.velocity.y > 0) {
      this.player.anims.play("fall", true);
    }
    if (this.cursors.up.isDown && this.player.body.blocked.down) {
      this.player.setVelocityY(-300);
      this.player.anims.play("jump", true);
    }
  }
}

const Game: React.FC = () => {
  const gameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gameRef.current) return;

    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      backgroundColor: "#87CEEB",
      parent: gameRef.current,
      physics: {
        default: "arcade",
        arcade: {
          gravity: { y: 500 },
          debug: true,
        },
      },

      scene: MyScene,
    };

    const game = new Phaser.Game(config);
    return () => {
      game.destroy(true);
    };
  }, []);

  return <div ref={gameRef} />;
};

export default Game;
