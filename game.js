var config = {
   type: Phaser.AUTO,
   width: 900,
   height: 675,
   backgroundColor: 'black',
   physics: {
      default: 'arcade',
      arcade: {
         gravity: {x: 0, y: 1000},
         debug: false
      }
   },
   scene: [
      SceneMain,
      SceneBetween12,
      SceneBetween23,
      SceneBetween34,
      SceneOne,
      SceneTwo,
      SceneThree,
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
let ouchFX;
let dropFX;

