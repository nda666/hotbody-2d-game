import Phaser from "phaser";

import manaBarImage from "../assets/ui/hp_bar/Blue bar.png";
import hpBarContainerImage from "../assets/ui/hp_bar/Hp bar.png";
import hpBarImage from "../assets/ui/hp_bar/red bar.png";
import energyBarImage from "../assets/ui/hp_bar/yellow bar.png";

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

  maxEnergy: number;
  currentEnergy: number;
  energyBar: Phaser.GameObjects.Image;
  energyMaskShape: Phaser.GameObjects.Graphics;
  energyMask: Phaser.Display.Masks.GeometryMask;
  energyBarWidth: number;
  energyBarHeight: number;

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

    this.barWidth = barHeight - 20;
    this.barHeight = barHeight - 20;

    this.manaBarHeight = barHeight * (25 / 100);
    this.manaBarWidth = barWidth - barHeight + 6;

    this.energyBarHeight = barHeight * (25 / 100);
    this.energyBarWidth = barWidth - (barHeight + 15);

    this.maxMana = 100;
    this.currentMana = 100;

    this.maxEnergy = 100;
    this.currentEnergy = 100;

    // === Container / frame ===
    this.container = scene.add.image(x, y, "hpBarContainer");
    this.container
      .setDisplaySize(this.containerWidth, this.containerHeight)
      .setScrollFactor(0)
      .setDepth(20);

    // === HP Bar ===
    this.bar = scene.add.image(x - 45, y - 3, "hpBarImage");
    this.bar
      .setDisplaySize(this.barWidth, this.barHeight)
      .setScrollFactor(0)
      .setDepth(19);

    this.maskShape = scene.add.graphics().setScrollFactor(0);
    this.mask = this.maskShape.createGeometryMask();
    this.bar.setMask(this.mask);

    // === Mana Bar ===
    this.manaBar = scene.add.image(x + 50, y + 55, "manaBarImage");
    this.manaBar
      .setDisplaySize(this.manaBarWidth, this.manaBarHeight)
      .setScrollFactor(0)
      .setDepth(19);

    this.manaMaskShape = scene.add.graphics().setScrollFactor(0);
    this.manaMask = this.manaMaskShape.createGeometryMask();
    this.manaBar.setMask(this.manaMask);

    // === Energy Bar ===
    this.energyBar = scene.add.image(x + 47, y + 40, "energyBarImage");
    this.energyBar
      .setDisplaySize(this.energyBarWidth, this.energyBarHeight)
      .setScrollFactor(0)
      .setDepth(21);

    this.energyMaskShape = scene.add.graphics().setScrollFactor(0);
    this.energyMask = this.energyMaskShape.createGeometryMask();
    this.energyBar.setMask(this.energyMask);

    this.draw();
  }

  setHp(value: number) {
    this.currentHp = Phaser.Math.Clamp(value, 0, this.maxHp);
    this.draw();
  }

  setMana(value: number) {
    this.currentMana = Phaser.Math.Clamp(value, 0, this.maxMana);
    this.drawMana();
  }

  setEnergy(value: number) {
    this.currentEnergy = Phaser.Math.Clamp(value, 0, this.maxEnergy);
    this.drawEnergy();
  }

  draw() {
    // HP
    this.maskShape.clear();
    const percent = this.currentHp / this.maxHp;

    const barWidth = this.bar.displayWidth;
    const barHeight = this.bar.displayHeight;

    this.maskShape.fillStyle(0xffffff, 1);
    this.maskShape.beginPath();
    this.maskShape.fillRect(
      this.bar.x - barWidth / 2,
      this.bar.y + barHeight / 2 - barHeight * percent,
      barWidth,
      barHeight * percent
    );
    this.maskShape.closePath();

    // refresh mana & energy juga
    this.drawMana();
    this.drawEnergy();
  }

  drawMana() {
    this.manaMaskShape.clear();
    const percent = this.currentMana / this.maxMana;

    const barWidth = this.manaBar.displayWidth;
    const barHeight = this.manaBar.displayHeight;

    this.manaMaskShape.fillStyle(0xffffff, 1);
    this.manaMaskShape.beginPath();
    this.manaMaskShape.fillRect(
      this.manaBar.x - barWidth / 2,
      this.manaBar.y - barHeight,
      barWidth * percent,
      barHeight
    );
    this.manaMaskShape.closePath();
  }

  drawEnergy() {
    this.energyMaskShape.clear();
    const percent = this.currentEnergy / this.maxEnergy;

    const barWidth = this.energyBar.displayWidth;
    const barHeight = this.energyBar.displayHeight;

    this.energyMaskShape.fillStyle(0xffffff, 1);
    this.energyMaskShape.beginPath();
    this.energyMaskShape.fillRect(
      this.energyBar.x - barWidth / 2,
      this.energyBar.y - barHeight,
      barWidth * percent,
      barHeight
    );
    this.energyMaskShape.closePath();
  }
}
