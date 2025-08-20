import Phaser from "phaser";

import hpBarImage from "../assets/ui/hp_bar/Hp bar.png";

export default class HpBar {
  scene: Phaser.Scene;
  x: number;
  y: number;
  width: number;
  height: number;
  bg: Phaser.GameObjects.Image;
  bar: Phaser.GameObjects.Graphics;
  maxHp: number;
  currentHp: number;

  static preload(scene: Phaser.Scene) {
    scene.load.image("hpBar", hpBarImage);
  }

  constructor(scene: Phaser.Scene, x: number, y: number, maxHp: number) {
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.width = 200; // panjang bar
    this.height = 20; // tinggi bar
    this.maxHp = maxHp;
    this.currentHp = maxHp;

    // gambar outline dari file
    this.bg = scene.add.image(x, y, "hpBar").setOrigin(1, 1);
    this.bg.setScrollFactor(0); // tetap di layar

    // graphics untuk warna hp
    this.bar = scene.add.graphics();
    this.bar.setScrollFactor(0);
    this.bar.setDepth(20);
    this.draw();
  }

  setHp(value: number) {
    this.currentHp = Phaser.Math.Clamp(value, 0, this.maxHp);
    this.draw();
  }

  draw() {
    this.bar.clear();

    // background merah
    this.bar.fillStyle(0xff0000, 1);
    this.bar.fillRect(
      this.x - this.width,
      this.y - this.height,
      this.width,
      this.height
    );

    // health hijau
    const hpWidth = (this.currentHp / this.maxHp) * this.width;
    this.bar.fillStyle(0x00ff00, 1);
    this.bar.fillRect(
      this.x - this.width,
      this.y - this.height,
      hpWidth,
      this.height
    );
  }
}
