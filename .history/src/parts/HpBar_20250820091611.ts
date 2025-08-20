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

  maxMana: number;
  currentMana: number;
  manaBar: Phaser.GameObjects.Image;
  manaMaskShape: Phaser.GameObjects.Graphics;
  manaMask: Phaser.Display.Masks.GeometryMask;
  manaBarWidth: number;
  manaBarHeight: number;

  containerWidth: number;
  containerHeight: number;
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
    barHeight: number = 120
  ) {
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.maxHp = maxHp;
    this.currentHp = maxHp;

    this.containerWidth = barWidth;
    this.containerHeight = barHeight;

    this.barWidth = barHeight - 20; // use master height because the bar width is the same as the height
    this.barHeight = barHeight - 20;

    this.manaBarHeight = barHeight * (10 / 100);
    this.manaBarWidth = barWidth - 20;

    this.maxMana = 100;
    this.currentMana = 100;

    // this.maxMana = maxMana;
    // this.currentMana = maxMana;

    // === Container / frame ===
    this.container = scene.add.image(x, y, "hpBarContainer");
    this.container
      .setDisplaySize(this.containerWidth, this.containerHeight)
      .setScrollFactor(0)
      .setDepth(20);

    // === Bar isi (warna) ===
    this.bar = scene.add.image(x - 45, y - 3, "hpBarImage");
    this.bar
      .setDisplaySize(this.barWidth, this.barHeight)
      .setScrollFactor(0)
      .setDepth(19);

    // === Mask untuk crop bar sesuai HP ===
    this.maskShape = scene.add.graphics().setScrollFactor(0);
    this.mask = this.maskShape.createGeometryMask();
    this.bar.setMask(this.mask);

    this.manaBar = scene.add.image(x + 0, y + 40, "manaBarImage");
    this.manaBar
      .setDisplaySize(this.manaBarWidth, this.manaBarHeight)
      .setScrollFactor(0)
      .setDepth(21);

    // === Mask ===
    this.manaMaskShape = scene.add.graphics().setScrollFactor(0);
    this.manaMask = this.maskShape.createGeometryMask();
    this.manaBar.setMask(this.manaMask);

    this.draw();
  }

  setHp(value: number) {
    this.currentHp = Phaser.Math.Clamp(value, 0, this.maxHp);
    this.draw();
  }

  draw() {
    this.maskShape.clear();
    const percent = this.currentHp / this.maxHp;

    const barWidth = this.bar.displayWidth;
    const barHeight = this.bar.displayHeight;

    this.maskShape.fillStyle(0xffffff, 1);
    this.maskShape.beginPath();

    // karena origin default = (0.5, 0.5), titik (x,y) ada di tengah
    // jadi kita geser mask ke kiri setengah bar
    this.maskShape.fillRect(
      this.bar.x - barWidth / 2, // kiri
      this.bar.y + barHeight / 2 - barHeight * percent, // geser ke atas
      barWidth, // full width
      barHeight * percent
    );
    this.maskShape.closePath();

    this.drawMana();
  }

  drawMana() {
    this.manaMaskShape.clear();
    const percent = this.currentMana / this.maxMana;

    const barWidth = this.manaBar.displayWidth;
    const barHeight = this.manaBar.displayHeight;

    this.manaMaskShape.fillStyle(0xffffff, 1);
    this.manaMaskShape.beginPath();

    // Horizontal bar, habis ke kiri
    this.manaMaskShape.fillRect(
      this.manaBar.x - barWidth / 2, // kiri
      this.manaBar.y - barHeight / 2, // atas
      barWidth * percent, // isi lebar
      barHeight // tinggi full
    );

    this.manaMaskShape.closePath();
  }
}
