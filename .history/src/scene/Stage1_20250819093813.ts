import Phaser from "phaser";

import _tileset from "../assets/world/oak_woods/oak_woods_tileset.png";
import Background from "../parts/background";
import Player from "../parts/player";

export default class Stage1 extends Phaser.Scene {
  player!: Player;
  bg!: Background;

  constructor() {
    super("stage1");
    this.player = new Player(this, "male");
  }

  preload() {
    console.log("loading asset");
    this.player.preload();
    this.load.spritesheet("tiles", _tileset, {
      frameWidth: 16,
      frameHeight: 16,
    });
    Background.preload(this);
  }

  create() {
    console.log("Create stage");
    this.bg = new Background(this);

    const map = this.make.tilemap({
      tileWidth: 16, // ukuran tile yang asli
      tileHeight: 16,
      width: 80, // bisa diperbesar biar muat layar
      height: 100,
    });

    // load tileset dengan ukuran tile sama persis
    const tileset = map.addTilesetImage("tiles", undefined, 16, 16);
    const layer = map.createBlankLayer("groundLayer", tileset);
    layer.setDepth(3);
    console.log("tileset", tileset);
    // isi baris bawah pakai index tile yang bukan transparan
    const groundHeight = 8; // tinggi tanah 8 tile
    // isi full ground di baris paling bawah
    const groundY = 40;
    for (let y = groundY; y < map.height; y++) {
      for (let x = 0; x < map.width; x++) {
        layer.putTileAt(1, x, y);
      }
    }

    // aktifkan physics
    layer.setCollisionByExclusion([-1]);

    // Biar kelihatan: set kamera background putih dulu
    this.cameras.main.setBackgroundColor("#88f");

    // === Buat player ===
    this.player.create(this.scale.width / 2, map.height);

    // collider player dengan tilemap layer
    if (this.player.sprite) {
      this.physics.add.collider(this.player.sprite, layer);
    }
  }

  update() {
    this.player.update();
    if (this.player.cursors?.left.isDown && !this.player.isAttacking) {
      this.bg.move(5, "left");
    } else if (this.player.cursors?.right.isDown && !this.player.isAttacking) {
      this.bg.move(5, "right");
    }
  }
}
