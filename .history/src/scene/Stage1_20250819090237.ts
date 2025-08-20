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
      width: 50,
      height: 20,
    });

    // tileset dari preload
    const tileset = map.addTilesetImage("tiles");
    const layer = map.createBlankLayer("groundLayer", tileset);

    // isi tanah di baris paling bawah
    for (let x = 0; x < map.width; x++) {
      layer.putTileAt(0, x, 100);
    }

    // aktifkan physics di layer
    layer.setCollisionByExclusion([-1]);

    // === Buat player ===
    this.player.create(this.scale.width / 2, 490);

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
