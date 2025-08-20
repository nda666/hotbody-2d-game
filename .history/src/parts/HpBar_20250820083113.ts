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

  static preload(scene: Phaser.Scene) {
    scene.load.image("hpBarContainer", hpBarContainerImage);
    scene.load.image("hpBarImage", hpBarImage);
    scene.load.image("energyBarImage", energyBarImage);
    scene.load.image("manaBarImage", manaBarImage);
  }

  constructor(scene: Phaser.Scene, x: number, y: number, maxHp: number) {
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.maxHp = maxHp;
    this.currentHp = maxHp;

    // === Bar isi (warna) ===
    this.bar = scene.add.image(x, y, "hpBarImage").setOrigin(1, 1);
    this.bar.setScrollFactor(0);

    // === Mask untuk crop bar sesuai HP ===
    this.maskShape = scene.add.graphics().setScrollFactor(0);
    this.mask = this.maskShape.createGeometryMask();
    this.bar.setMask(this.mask);

    // === Container / frame ===
    this.container = scene.add.image(x, y, "hpBarContainer").setOrigin(1, 1);
    this.container.setScrollFactor(0);

    this.draw();
  }

  setHp(value: number) {
    this.currentHp = Phaser.Math.Clamp(value, 0, this.maxHp);
    this.draw();
  }

  draw() {
    this.maskShape.clear();
    const percent = this.currentHp / this.maxHp;
    const barWidth = this.bar.width;
    const barHeight = this.bar.height;

    // gambar kotak mask sebesar persentase hp
    this.maskShape.fillStyle(0xffffff, 1);
    this.maskShape.beginPath();
    this.maskShape.fillRect(
      this.bar.x - barWidth, // mulai dari kiri
      this.bar.y - barHeight, // pos bar
      barWidth * percent, // crop sesuai HP
      barHeight
    );
    this.maskShape.closePath();
  }
}
