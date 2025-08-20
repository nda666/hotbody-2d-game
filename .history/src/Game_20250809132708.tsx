import React, { useEffect, useRef, useState } from "react";

import Phaser from "phaser";

import maleSkin1 from "./assets/character/skin/male_skin1.png";

class MyScene extends Phaser.Scene {
  player!: Phaser.Physics.Arcade.Sprite;
  cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  jumpForce: number;

  constructor(jumpForce: number) {
    super("myscene");
    this.jumpForce = jumpForce;
  }

  preload() {
    this.load.spritesheet("player", maleSkin1, {
      frameWidth: 80,
      frameHeight: 64,
    });
  }

  create() {
    this.player = this.physics.add.sprite(100, 300, "player");

    this.anims.create({
      key: "idle",
      frames: this.anims.generateFrameNumbers("player", { start: 0, end: 0 }),
      frameRate: 6,
      repeat: -1,
    });

    this.anims.create({
      key: "walk",
      frames: this.anims.generateFrameNumbers("player", { start: 20, end: 27 }),
      frameRate: 10,
      repeat: 1,
    });

    this.anims.create({
      key: "jump",
      frames: this.anims.generateFrameNumbers("player", { start: 30, end: 33 }),
      frameRate: 10,
      repeat: 0,
    });

    this.anims.create({
      key: "fall",
      frames: this.anims.generateFrameNumbers("player", { start: 40, end: 43 }),
      frameRate: 10,
      repeat: 0,
    });

    this.cursors = this.input.keyboard.createCursorKeys();
    this.player.play("idle");

    const ground = this.add.rectangle(400, 580, 800, 40, 0x00ff00);
    this.physics.add.existing(ground, true);
    this.physics.add.collider(this.player, ground);
  }

  update() {
    const speed = 100;
    const onGround = this.player.body?.blocked.down;

    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-speed);
      this.player.flipX = false;
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(speed);
      this.player.flipX = true;
    } else {
      this.player.setVelocityX(0);
    }

    if (this.cursors.up.isDown && onGround) {
      this.player.setVelocityY(-this.jumpForce);
    }

    if (!onGround) {
      if (this.player.body.velocity.y < 0) {
        this.player.play("jump", true);
      } else {
        this.player.play("fall", true);
      }
    } else {
      if (this.player.body.velocity.x !== 0) {
        this.player.play("walk", true);
      } else {
        this.player.play("idle", true);
      }
    }
  }
}

const Game: React.FC = () => {
  const gameRef = useRef<HTMLDivElement>(null);
  const [jumpForce, setJumpForce] = useState(300);
  const phaserGameRef = useRef<Phaser.Game>();

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
      scene: new MyScene(jumpForce),
    };

    phaserGameRef.current = new Phaser.Game(config);

    return () => {
      phaserGameRef.current?.destroy(true);
    };
  }, [jumpForce]); // Re-init kalau jumpForce berubah

  return (
    <div>
      <div style={{ marginBottom: 10 }}>
        <label>
          Jump Force:
          <input
            type="number"
            value={jumpForce}
            onChange={(e) => setJumpForce(Number(e.target.value))}
            style={{ marginLeft: 8, width: 80 }}
          />
        </label>
      </div>
      <div ref={gameRef} />
    </div>
  );
};

export default Game;
