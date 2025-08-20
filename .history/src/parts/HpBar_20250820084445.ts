import Phaser from "phaser";

import manaBarImage from "../assets/ui/hp_bar/Blue bar.png";
import hpBarContainerImage from "../assets/ui/hp_bar/Hp bar.png";
import energyBarImage from "../assets/ui/hp_bar/red bar.png";
import hpBarImage from "../assets/ui/hp_bar/red bar.png";

export default class HpBar {
  scene: Phaser.Scene;
  x: number;
  y: number;
  maxHp: number;
  currentHp: number;

  container: Phaser.GameObjects.Image;
  bar: Phaser.GameObjects.Image;
  maskShape: Phaser.GameObjects.Graphics;
  mask: Phaser.Display.Masks.GeometryMask;

  barWidth: number;
  barHeight: number;

  static preload(scene: Phaser.Scene) {
    scene.load.image("hpBarContainer", hpBarContainerImage);
    scene.load.image("hpBarImage", hpBarImage);
    scene.load.image("energyBarImage", energyBarImage);
    scene.load.image("manaBarImage", manaBarImage);
  }

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    maxHp: number,
    barWidth: number = 200,
    barHeight: number = 150
  ) {
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.maxHp = maxHp;
    this.currentHp = maxHp;
    this.barWidth = barWidth;
    this.barHeight = barHeight;

    // === Container / frame ===
    this.container = scene.add.image(x, y, "hpBarContainer").setOrigin(1, 1);
    this.container
      .setDisplaySize(this.barWidth + 50, this.barHeight + 50)
      .setScrollFactor(0)
      .setDepth(20);

    // === Bar isi (warna) ===
    this.bar = scene.add.image(x, y, "hpBarImage").setOrigin(1, 1);
    this.bar.setScrollFactor(0).setDepth(21);
    this.bar.setDisplaySize(this.barWidth, this.barHeight);

    // === Mask untuk crop bar sesuai HP ===
    this.maskShape = scene.add.graphics().setScrollFactor(0);
    this.mask = this.maskShape.createGeometryMask();
    this.bar.setMask(this.mask);

    this.draw();
  }

  setHp(value: number) {
    this.currentHp = Phaser.Math.Clamp(value, 0, this.maxHp);
    this.draw();
  }

  draw() {
    this.maskShape.clear();
    const percent = this.currentHp / this.maxHp;

    // pakai displayWidth & displayHeight
    const barWidth = this.bar.displayWidth;
    const barHeight = this.bar.displayHeight;

    this.maskShape.fillStyle(0xffffff, 1);
    this.maskShape.beginPath();
    this.maskShape.fillRect(
      this.bar.x - barWidth, // mulai dari kiri
      this.bar.y - barHeight, // pos bar
      barWidth * percent,
      barHeight
    );
    this.maskShape.closePath();
  }
}
