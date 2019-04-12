var config = {
   type: Phaser.AUTO,
   width: 900,
   height: 675,
   backgroundColor: 'black',
   physics: {
      default: 'arcade',
      arcade: {
         gravity: {x: 0, y: 800},
         debug: false
      }
   },
   scene: [
      SceneOne,
      SceneTwo,
      SceneGameWin,
      SceneGameOver
   ],
   // pixelArt: true,
   // roundPixels: true
};
var game = new Phaser.Game(config);
game.score = 0;
let flowerSpawn;
let flowerInc;
let flowers;
let backTrack;
let stompFX;

