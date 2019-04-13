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

      backTrack = this.sound.add('win');
      backTrack.play();
      this.title.setOrigin(0.5);
      this.time.addEvent({
         delay: 1500,
         callback: function (){
            document.location.reload();
         },
         callbackScope: this
      });
   }
}
