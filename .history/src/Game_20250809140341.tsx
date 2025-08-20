import React, {
  useEffect,
  useRef,
  useState,
} from 'react';

import Phaser from 'phaser';

import hair from './assets/character/hair/male_hair1.png';
import maleSkin1 from './assets/character/skin/male_skin1.png';
import bgLayer1
  from './assets/world/oak_woods/background/background_layer_1.png';
import bgLayer2
  from './assets/world/oak_woods/background/background_layer_2.png';
import bgLayer3
  from './assets/world/oak_woods/background/background_layer_3.png';

class MyScene extends Phaser.Scene {
  player!: Phaser.Physics.Arcade.Sprite;
  cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  jumpForce = 300;
  bg1!: Phaser.GameObjects.TileSprite;
  bg2!: Phaser.GameObjects.TileSprite;
  bg3!: Phaser.GameObjects.TileSprite;

  setJumpForce(force: number) {
    this.jumpForce = force;
  }

  preload() {
    this.load.spritesheet("player", maleSkin1, {
      frameWidth: 80,
      frameHeight: 64,
    });
    this.load.spritesheet("hair", hair, {
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

    // Fungsi untuk bikin layer background dengan scaling proporsional
    const createLayer = (key: string, depth: number) => {
      const src = this.textures.get(key).getSourceImage() as HTMLImageElement;
      const scale = gameHeight / src.height;
      const tile = this.add
        .tileSprite(0, 0, gameWidth * 2, gameHeight, key) // lebar = 2x layar
        .setOrigin(0, 0)
        .setScale(scale)
        .setScrollFactor(0)
        .setDepth(depth);
      return tile;
    };

    this.bg1 = createLayer("bg1", 0);
    this.bg2 = createLayer("bg2", 1);
    this.bg3 = createLayer("bg3", 2);

    this.player = this.physics.add
      .sprite(this.scale.width / 2, 300, "player")
      .setDepth(10)
      .setScale(4);
    this.player.body?.setAllowGravity(true);

    this.hair = this.add
      .sprite(this.player.x, this.player.y, "hair")
      .setDepth(11)
      .setScale(5);

    // Animations
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
      repeat: -1,
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

    const ground = this.add.rectangle(400, gameHeight - 20, 800, 40, 0x00ff00);
    this.physics.add.existing(ground, true);
    this.physics.add.collider(this.player, ground);
  }

  update() {
    const onGround = this.player.body?.blocked.down;
    const speed = 5; // kecepatan geser background

    // Kiri
    if (this.cursors.left.isDown) {
      this.player.flipX = false;
      this.bg1.tilePositionX -= speed * 0.2;
      this.bg2.tilePositionX -= speed * 0.5;
      this.bg3.tilePositionX -= speed * 1;
    }
    // Kanan
    else if (this.cursors.right.isDown) {
      this.player.flipX = true;
      this.bg1.tilePositionX += speed * 0.2;
      this.bg2.tilePositionX += speed * 0.5;
      this.bg3.tilePositionX += speed * 1;
    }

    // Lompat
    if (this.cursors.up.isDown && onGround) {
      this.player.setVelocityY(-this.jumpForce);
    }

    // Animasi
    if (!onGround) {
      if (this.player.body.velocity.y < 0) {
        this.player.play("jump", true);
      } else {
        this.player.play("fall", true);
      }
    } else {
      if (this.cursors.left.isDown || this.cursors.right.isDown) {
        this.player.play("walk", true);
      } else {
        this.player.play("idle", true);
      }
    }
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
      width: 1280,
      height: 720,
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
      render: {
        pixelArt: true,
      },
    };

    const game = new Phaser.Game(config);

    return () => {
      game.destroy(true);
    };
  }, []);

  useEffect(() => {
    if (sceneRef.current) {
      sceneRef?.current?.setJumpForce(jumpForce);
    }
  }, [jumpForce]);

  return (
    <div>
      <div style={{ marginBottom: 0, position: "fixed" }}>
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
