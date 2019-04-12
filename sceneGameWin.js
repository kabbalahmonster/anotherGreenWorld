class SceneGameWin extends Phaser.Scene{
   constructor() {
      super({key: 'SceneGameWin'});
   }
   create(){
      this.title = this.add.text(this.game.config.width * 0.5, 128, "YOU WIN!\nTHIS WORLD IS NOW GREENER", {
         fontFamily: 'monospace',
         fontSize: 48,
         fontStyle: 'bold',
         color: '#ffffff',
         align: 'center'
      });
      this.title.setOrigin(0.5);
   }
}
