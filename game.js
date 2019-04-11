var config = {
   type: Phaser.AUTO,
   width: 800,
   heigth: 600,
   backgroundColor: 'black',
   physics: {
      default: 'arcade',
      arcade: {
         gravity: {x: 0, y: 300},
         debug: false
      }
   },
   scene: [
      SceneStart
   ],
   // pixelArt: true,
   // roundPixels: true
};
var game = new Phaser.Game(config);

