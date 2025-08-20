import React, { useEffect, useRef, useState } from "react";

import Phaser from "phaser";

import maleSkin1 from "./assets/character/skin/male_skin1.png";
import bgLayer1 from "./assets/world/oak_woods/background/background_layer_1.png";
import bgLayer2 from "./assets/world/oak_woods/background/background_layer_2.png";
import bgLayer3 from "./assets/world/oak_woods/background/background_layer_3.png";

class MyScene extends Phaser.Scene {
  player!: Phaser.Physics.Arcade.Sprite;
  cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  jumpForce: number = 300;

  bg1!: Phaser.GameObjects.TileSprite;
  bg2!: Phaser.GameObjects.TileSprite;
  bg3!: Phaser.GameObjects.TileSprite;

  preload() {
    this.load.spritesheet("player", maleSkin1, {
      frameWidth: 80,
      frameHeight: 64,
    });

    this.load.image("bg1", bgLayer1);
    this.load.image("bg2", bgLayer2);
    this.load.image("bg3", bgLayer3);
  }

  create() {
    const gameWidth = this.scale.width;
    const gameHeight = this.scale.height;

    // tambahin tileSprite lalu scale supaya height tile == gameHeight (tidak repeat Y)
    this.bg1 = this.add
      .tileSprite(0, 0, gameWidth, gameHeight, "bg1")
      .setOrigin(0, 0)
      .setScrollFactor(0);
    this.bg2 = this.add
      .tileSprite(0, 0, gameWidth, gameHeight, "bg2")
      .setOrigin(0, 0)
      .setScrollFactor(0);
    this.bg3 = this.add
      .tileSprite(0, 0, gameWidth, gameHeight, "bg3")
      .setOrigin(0, 0)
      .setScrollFactor(0);

    // ambil ukuran asli texture (setelah preload, ini tersedia)
    const src1 = this.textures.get("bg1").getSourceImage() as
      | HTMLImageElement
      | undefined;
    const src2 = this.textures.get("bg2").getSourceImage() as
      | HTMLImageElement
      | undefined;
    const src3 = this.textures.get("bg3").getSourceImage() as
      | HTMLImageElement
      | undefined;

    // kalau sumber ada, hitung scale supaya tinggi tile = gameHeight
    if (src1) {
      const scaleY1 = gameHeight / src1.height;
      // kita jaga aspect ratio => gunakan sama untuk X dan Y
      this.bg1.setDisplaySize(gameWidth, gameHeight);
      this.bg1.setTileScale(scaleY1, scaleY1);
    } else {
      this.bg1.setDisplaySize(gameWidth, gameHeight);
    }

    if (src2) {
      const scaleY2 = gameHeight / src2.height;
      this.bg2.setDisplaySize(gameWidth, gameHeight);
      this.bg2.setTileScale(scaleY2, scaleY2);
    } else {
      this.bg2.setDisplaySize(gameWidth, gameHeight);
    }

    if (src3) {
      const scaleY3 = gameHeight / src3.height;
      this.bg3.setDisplaySize(gameWidth, gameHeight);
      this.bg3.setTileScale(scaleY3, scaleY3);
    } else {
      this.bg3.setDisplaySize(gameWidth, gameHeight);
    }

    // Player + anims
    this.player = this.physics.add.sprite(100, 300, "player");
    this.player.setCollideWorldBounds(true);

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
      repeat: -1, // loop terus saat jalan
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

    // Gerakan horizontal + parallax (kecepatan layer berbeda)
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-speed);
      this.player.flipX = false;
      this.bg1.tilePositionX -= 0.3; // paling jauh, paling pelan
      this.bg2.tilePositionX -= 0.7;
      this.bg3.tilePositionX -= 1.2; // paling dekat, paling cepet
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(speed);
      this.player.flipX = true;
      this.bg1.tilePositionX += 0.3;
      this.bg2.tilePositionX += 0.7;
      this.bg3.tilePositionX += 1.2;
    } else {
      this.player.setVelocityX(0);
    }

    // Lompat
    if (this.cursors.up.isDown && onGround) {
      this.player.setVelocityY(-this.jumpForce);
    }

    // Pilih animasi
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

  setJumpForce(value: number) {
    this.jumpForce = value;
  }
}

const Game: React.FC = () => {
  const gameRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<MyScene>();
  const [jumpForce, setJumpForce] = useState(300);

  useEffect(() => {
    if (!gameRef.current) return;

    const myScene = new MyScene("myscene" as any);
    sceneRef.current = myScene;

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
      scene: myScene,
    };

    const game = new Phaser.Game(config);

    return () => {
      game.destroy(true);
    };
  }, []);

  useEffect(() => {
    if (sceneRef.current) {
      sceneRef.current.setJumpForce(jumpForce);
    }
  }, [jumpForce]);

  return (
    <div>
      <div style={{ marginBottom: 10 }}>
        <label>
          Jump Force: {jumpForce}
          <input
            type="range"
            min="100"
            max="600"
            step="10"
            value={jumpForce}
            onChange={(e) => setJumpForce(Number(e.target.value))}
            style={{ marginLeft: 8, width: 200 }}
          />
        </label>
      </div>
      <div ref={gameRef} />
    </div>
  );
};

export default Game;
