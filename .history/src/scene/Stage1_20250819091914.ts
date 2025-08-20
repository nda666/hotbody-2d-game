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
    this.load.image("tiles", _tileset);
    Background.preload(this);
  }

  create() {
    console.log("Create stage");
    this.bg = new Background(this);

    // === Buat tilemap ===
    const map = this.make.tilemap({
      tileWidth: 32,
      tileHeight: 32,
      width: 32,
      height: 32,
    });
    console.log(_tileset);
    // tileset dari preload
    const tileset = map.addTilesetImage("tiles", undefined, 32, 32);
    const layer = map.createBlankLayer("groundLayer", tileset);
    const mapWidth = screen.width * 32;
    console.log(screen.height);
    // isi tanah di baris paling bawah
    for (let x = 0; x < mapWidth; x++) {
      // ganti angka "0" ke index tile yang bener-bener ada gambarnya
      // misal coba "1" atau "5" kalau 0 itu transparan
      layer.putTileAt(0, x, 500);
    }

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
