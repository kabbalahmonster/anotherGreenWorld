class SceneGameOver extends Phaser.Scene{
   constructor() {
      super({key: 'SceneGameOver'});
   }
   create(){
      this.title = this.add.text(this.game.config.width * 0.5, 128, "GAME OVER", {
         fontFamily: 'monospace',
         fontSize: 48,
         fontStyle: 'bold',
         color: '#ffffff',
         align: 'center'
      });
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
