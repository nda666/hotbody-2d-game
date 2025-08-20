import React, { useEffect, useRef } from "react";

import Phaser from "phaser";

import maleSkin1 from "./assets/character/skin/male_skin1.png";

class MyScene extends Phaser.Scene {
  preload() {
    this.load.image("player", maleSkin1);
  }

  create() {
    this.add.image(100, 300, "player");
  }
}

const Game: React.FC = () => {
  const gameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gameRef.current) return;

    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      backgroundColor: "#87CEEB",
      parent: gameRef.current,
      scene: MyScene,
    };

    const game = new Phaser.Game(config);

    return () => {
      game.destroy(true);
    };
  }, []);

  return <div ref={gameRef} />;
};

export default Game;
