import Phaser from "phaser";

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
    Background.preload(this);
  }

  create() {
    console.log("Create stage");
    // this.bg = new Background(this);
    this.player.create(this.scale.width / 2, 300);

    const ground = this.add.rectangle(
      400,
      this.scale.height - 20,
      800,
      40,
      0x00ff00
    );
    this.physics.add.existing(ground, true);
    this.player.sprite && this.physics.add.collider(this.player.sprite, ground);
  }

  update() {
    this.player.update();

    if (this.player.cursors?.left.isDown) {
      this.bg.move(5, "left");
    } else if (this.player.cursors?.right.isDown) {
      this.bg.move(5, "right");
    }
  }
}
