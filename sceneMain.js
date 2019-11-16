class SceneMain extends Phaser.Scene{
   constructor() {
      super({key: 'SceneMain'});
   }
   preload(){
      this.load.image('title','assets/title.png');
      this.load.image('invisible', 'assets/transparent.png');
      this.load.image('flower1', 'assets/flower1.png');
      this.load.image('flower2', 'assets/flower2.png');
      this.load.image('flower3', 'assets/flower3.png');
      this.load.image('pond', 'assets/pond.png');
      this.load.spritesheet('robot', 
         'assets/badBot2.png',
         {frameWidth:90, frameHeight: 144}
      );
      this.load.spritesheet('dude',
         'assets/esmeralda5.png', 
         {frameWidth: 106, frameHeight: 150}
      );
      this.load.spritesheet('robot2', 
         'assets/badbot3.png',
         {frameWidth:90, frameHeight: 139}
      );
      this.load.audio('track1', 'assets/track1.ogg');
      this.load.audio('track2', 'assets/track2.ogg');
      this.load.audio('track3', 'assets/track3.ogg');
      this.load.audio('stomp', 'assets/stomp.ogg');
      this.load.audio('ouch', 'assets/ouch.ogg');
      this.load.audio('drop', 'assets/drop.ogg');
      this.load.audio('gameover', 'assets/gameover.ogg');
      
      this.load.audio('win', 'assets/win.ogg');
      this.load.audio('intro', 'assets/intro.ogg');

   }
   create(){
      //player animations
      this.anims.create({ key: 'left', frames: this.anims.generateFrameNumbers('dude', {start: 1, end: 2}), frameRate: 6, repeat: -1 });
      this.anims.create({ key: 'turn', frames: [{key: 'dude', frame: 3}], frameRate: 20 });
      this.anims.create({ key: 'right', frames: this.anims.generateFrameNumbers('dude', {start: 4, end: 5}), frameRate: 6, repeat: -1 });
   
      //robot animations
      this.anims.create({ key: 'botLeft', frames: this.anims.generateFrameNumbers('robot', {start: 0, end: 1}), frameRate: 6, repeat: -1 });
      this.anims.create({ key: 'botRight', frames: this.anims.generateFrameNumbers('robot', {start: 2, end: 3}), frameRate: 6, repeat: -1 });
      this.anims.create({ key: 'bot2Left', frames: this.anims.generateFrameNumbers('robot2', {start: 0, end: 1}), frameRate: 6, repeat: -1 });
      this.anims.create({ key: 'bot2Right', frames: this.anims.generateFrameNumbers('robot2', {start: 2, end: 3}), frameRate: 8, repeat: -1 });
      this.add.image(config.width/2, config.height/2, 'title');

      
      // backTrack = this.sound.add('intro',{loop:true/*, detune: -200*/});
      // backTrack.play(); 

      this.time.addEvent({
         delay: 3000,
         callback: function(){
            this.scene.start('SceneBetween12');
            // this.scene.start('SceneTwo');
            // this.scene.start('SceneThree');
         },
         callbackScope: this 
      });
   }
}
