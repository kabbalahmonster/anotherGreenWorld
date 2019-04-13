class SceneBetween12 extends Phaser.Scene{
   constructor() {
      super({key: 'SceneBetween12'});
   }
   create(){
      this.title = this.add.text(this.game.config.width * 0.5, 300,
         'Jump over those robots', {
         fontFamily: 'monospace',
         fontSize: 48,
         fontStyle: 'bold',
         color: '#ffffff',
         align: 'center'
      });
      this.title.setOrigin(0.5);
      this.title2 = this.add.text(this.game.config.width * 0.5, 400,
         'to kill them all!', {
         fontFamily: 'monospace',
         fontSize: 48,
         fontStyle: 'bold',
         color: '#ffffff',
         align: 'center'
      });
      this.title2.setOrigin(0.5);
      this.time.addEvent({
         delay: 2000,
         callback: function() {
            console.log('fire!');
            this.scene.start('SceneOne');
         },
         callbackScope: this,
         loop: false
      });
   }
}
class SceneBetween23 extends Phaser.Scene{
   constructor() {
      super({key: 'SceneBetween23'});
   }
   create(){
      this.title = this.add.text(this.game.config.width * 0.5, 300,
         'Ohh no...', {
         fontFamily: 'monospace',
         fontSize: 48,
         fontStyle: 'bold',
         color: '#ffffff',
         align: 'center'
      });
      this.title.setOrigin(0.5);
      this.title2 = this.add.text(this.game.config.width * 0.5, 400,
         'they are faster now!', {
         fontFamily: 'monospace',
         fontSize: 48,
         fontStyle: 'bold',
         color: '#ffffff',
         align: 'center'
      });
      this.title2.setOrigin(0.5);
      this.time.addEvent({
         delay: 2000,
         callback: function() {
            console.log('fire!');
            this.scene.start('SceneTwo');
         },
         callbackScope: this,
         loop: false
      });
   }
}
class SceneBetween34 extends Phaser.Scene{
   constructor() {
      super({key: 'SceneBetween34'});
   }
   create(){
      this.title = this.add.text(this.game.config.width * 0.5, 300,
         'They are angry', {
         fontFamily: 'monospace',
         fontSize: 40,
         fontStyle: 'bold',
         color: '#ffffff',
         align: 'center'
      });
      this.title.setOrigin(0.5);
      this.title2 = this.add.text(this.game.config.width * 0.5, 400,
         'drop some puddles (space)', {
         fontFamily: 'monospace',
         fontSize: 40,
         fontStyle: 'bold',
         color: '#ffffff',
         align: 'center'
      });
      this.title2.setOrigin(0.5);
      this.time.addEvent({
         delay: 3000,
         callback: function() {
            console.log('fire!');
            this.scene.start('SceneThree');
         },
         callbackScope: this,
         loop: false
      });
   }
}
