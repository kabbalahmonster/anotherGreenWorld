class SceneMain extends Phaser.Scene{
   constructor() {
      super({key: 'SceneMain'});
   }
   preload(){
      this.load.image('title','assets/title.png');
   }
   create(){
      this.add.image(config.width/2, config.height/2, 'title');
      this.time.addEvent({
         delay: 3000,
         callback: function(){
            this.scene.start('SceneOne');
         },
         callbackScope: this 
      });
   }
}
