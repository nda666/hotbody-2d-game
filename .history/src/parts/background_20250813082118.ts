import bgLayer1 from "../assets/world/oak_woods/background/background_layer_1.png";
import bgLayer2 from "../assets/world/oak_woods/background/background_layer_2.png";
import bgLayer3 from "../assets/world/oak_woods/background/background_layer_3.png";

export default class Background {
  layers: Phaser.GameObjects.TileSprite[] = [];

  constructor(scene: Phaser.Scene) {
    this.layers.push(this.createLayer(scene, "bg1", 0));
    this.layers.push(this.createLayer(scene, "bg2", 1));
    this.layers.push(this.createLayer(scene, "bg3", 2));
  }

  static preload(scene: Phaser.Scene) {
    scene.load.image("bg1", bgLayer1);
    scene.load.image("bg2", bgLayer2);
    scene.load.image("bg3", bgLayer3);
  }

  private createLayer(scene: Phaser.Scene, key: string, depth: number) {
    const gameWidth = scene.scale.width;
    const gameHeight = scene.scale.height;
    const src = scene.textures.get(key).getSourceImage() as HTMLImageElement;
    const scale = gameHeight / src.height;

    return scene.add
      .tileSprite(0, 0, gameWidth * 2, gameHeight, key)
      .setOrigin(0, 0)
      .setScale(scale)
      .setScrollFactor(0)
      .setDepth(depth);
  }

  move(speed: number, direction: "left" | "right") {
    const dir = direction === "left" ? -1 : 1;
    this.layers[0].tilePositionX += dir * speed * 0.2;
    this.layers[1].tilePositionX += dir * speed * 0.3;
    this.layers[2].tilePositionX += dir * speed * 0.5;
  }
}
