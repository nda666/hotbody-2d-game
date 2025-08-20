import React, { useEffect, useRef, useState } from "react";

import Phaser from "phaser";

import MyScene from "./scene/Stage1"; // ✅ Import scene yang sudah kita split

const Game: React.FC = () => {
  const gameRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<MyScene>();
  const [jumpForce, setJumpForce] = useState(300);
  const [testHp, setTestHp] = useState(100);
  const [testEnergy, setTestEnergy] = useState(100);
  const [testMana, setTestMana] = useState(100);

  useEffect(() => {
    if (!gameRef.current) return;

    const myScene = new MyScene();
    sceneRef.current = myScene;

    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: 1280,
      height: 720,
      backgroundColor: "#87CEEB",
      parent: gameRef.current,
      physics: {
        default: "arcade",
        arcade: {
          gravity: { y: 800 },
          debug: true,
        },
      },
      scene: myScene, // ✅ langsung masukin ke config
      render: {
        pixelArt: true,
      },
    };

    const game = new Phaser.Game(config);

    return () => {
      game.destroy(true);
    };
  }, []);

  useEffect(() => {
    if (sceneRef.current && sceneRef.current.player) {
      sceneRef.current.player.jumpForce = jumpForce;
      if (sceneRef.current.hpBar) {
        sceneRef.current.hpBar.setHp(testHp);
      }
    }
  }, [jumpForce, testHp]);

  useEffect(() => {
    if (sceneRef.current.hpBar) {
      sceneRef.current.hpBar.setMana(testMana);
    }
  }, [testMana]);

  return (
    <div>
      <div style={{ marginBottom: 0, position: "fixed" }}>
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <label>Jump Force: {jumpForce}</label>
          <input
            type="range"
            min="100"
            max="800"
            step="10"
            value={jumpForce}
            onChange={(e) => setJumpForce(Number(e.target.value))}
            style={{ marginLeft: 8, width: 100 }}
          />
        </div>

        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <label>Set Hp: {testHp}</label>
          <input
            type="range"
            min="0"
            max="100"
            step="1"
            value={testHp}
            onChange={(e) => setTestHp(Number(e.target.value))}
            style={{ marginLeft: 8, width: 100 }}
          />
        </div>

        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <label>Set Mana: {testMana}</label>
          <input
            type="range"
            min="0"
            max="100"
            step="1"
            value={testMana}
            onChange={(e) => setTestMana(Number(e.target.value))}
            style={{ marginLeft: 8, width: 100 }}
          />
        </div>

        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <label>Set Energy: {testEnergy}</label>
          <input
            type="range"
            min="0"
            max="100"
            step="1"
            value={testEnergy}
            onChange={(e) => setTestEnergy(Number(e.target.value))}
            style={{ marginLeft: 8, width: 100 }}
          />
        </div>
      </div>
      <div ref={gameRef} />
    </div>
  );
};

export default Game;
