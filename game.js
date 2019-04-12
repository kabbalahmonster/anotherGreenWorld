var config = {
   type: Phaser.AUTO,
   width: 800,
   heigth: 600,
   backgroundColor: 'black',
   physics: {
      default: 'arcade',
      arcade: {
         gravity: {x: 0, y: 800},
         debug: false
      }
   },
   scene: [
      SceneStart,
      SceneNext,
      SceneGameWin,
      SceneGameOver
   ],
   // pixelArt: true,
   // roundPixels: true
};
var game = new Phaser.Game(config);

let flowerSpawn;
let flowerInc;
let goal;
let flowers;
let backTrack;

