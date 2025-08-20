import Phaser from "phaser";

import _tileset from "../assets/world/oak_woods/oak_woods_tileset.png";
import Background from "../parts/background";
import HpBar from "../parts/HpBar";
import Player from "../parts/player";

export default class Stage1 extends Phaser.Scene {
  player!: Player;
  bg!: Background;
  hpBar!: HpBar;

  constructor() {
    super("stage1");
    this.player = new Player(this, "male");
  }

  preload() {
    console.log("loading asset");
    this.player.preload();
    this.load.spritesheet("tiles", _tileset, {
      frameWidth: 1,
      frameHeight: 1,
    });
    HpBar.preload(this);

    Background.preload(this);
  }

  create() {
    console.log("Create stage");
    this.bg = new Background(this);

    const map = this.make.tilemap({
      tileWidth: 16, // ukuran tile yang asli
      tileHeight: 16,
      width: 1200, // bisa diperbesar biar muat layar
      height: 100,
    });

    // load tileset dengan ukuran tile sama persis
    const tileset = map.addTilesetImage("tiles", undefined, 32, 32);
    const layer = map.createBlankLayer("groundLayer", tileset!);
    layer?.setScale(4, 4);
    layer.setDepth(3);
    console.log("tileset", layer);
    // isi baris bawah pakai index tile yang bukan transparan
    const groundHeight = 8; // tinggi tanah 8 tile
    // isi full ground di baris paling bawah
    const groundY = 13;
    console.log("map.width", map.width);
    for (let x = 0; x < map.width; x++) {
      layer.putTileAt(2, x, groundY);
    }

    // aktifkan physics
    layer.setCollisionByExclusion([-1]);

    // Biar kelihatan: set kamera background putih dulu
    // this.cameras.main.setBackgroundColor("#88f");
    // this.cameras.main.startFollow(this.player);

    // === Buat player ===
    this.player.create(this.scale.width / 2, map.height);

    // collider player dengan tilemap layer
    if (this.player.sprite) {
      this.physics.add.collider(this.player.sprite, layer);
    }
    this.hpBar = new HpBar(this, 120, 70, 100);

    this.cameras.main.startFollow(this.player.sprite!);
    this.cameras.main.setLerp(0.1, 0.1);
    this.cameras.main.setBounds(0, 40, map.widthInPixels, map.heightInPixels);
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
