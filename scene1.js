class SceneOne extends Phaser.Scene{

   
   constructor() {
      super({key: 'SceneOne'});
      this.robotTarget = 6;
      this.robotSpeed = {min: 40, max: 80};
   }   

   
   preload() {
      this.load.image('bgstage1', 'assets/greenWorldBG1.png');
      this.load.image('ground', 'assets/platform.png');
      this.load.image('flower', 'assets/star.png');
      this.load.spritesheet('robot', 
         'assets/badBot2.png',
         {frameWidth:90, frameHeight: 144}
      );
      this.load.spritesheet('dude',
         'assets/esmeralda5.png', 
         {frameWidth: 106, frameHeight: 150}
      );
      
      this.load.audio('track1', 'assets/track1.ogg');
      
      flowerInc = 800 / (this.robotTarget);
      flowerSpawn = 0;
   }
   create(){
      this.add.image(400, 300, 'bgstage1');
      this.scoreText = this.add.text(16, 16, 'score: ' + game.score, {fontSize: '32px', fill: '#000'});
      this.scoreText = this.add.text(16, 16, 'score: 0', {fontSize: '32px', fill: '#000'});
      this.platforms = this.physics.add.staticGroup();
      this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();
      this.player = new Player(this, 200, 250, 'dude');
      this.player.body.collideWorldBounds=true;
      
      //let flower = new Flower(this,200,250,'flower');

      // this.player.setBounce(0.1);
      // this.player.setCollideWorldBounds(true);
      this.physics.add.collider(this.player, this.platforms);
      //player animations
      this.anims.create({ key: 'left', frames: this.anims.generateFrameNumbers('dude', {start: 1, end: 2}), frameRate: 6, repeat: -1 });
      this.anims.create({ key: 'turn', frames: [{key: 'dude', frame: 3}], frameRate: 20 });
      this.anims.create({ key: 'right', frames: this.anims.generateFrameNumbers('dude', {start: 4, end: 5}), frameRate: 6, repeat: -1 });
   
      //robot animations
      this.anims.create({ key: 'botLeft', frames: this.anims.generateFrameNumbers('robot', {start: 0, end: 1}), frameRate: 6, repeat: -1 });
      this.anims.create({ key: 'botRight', frames: this.anims.generateFrameNumbers('robot', {start: 2, end: 3}), frameRate: 6, repeat: -1 });
   
      
      //attach keyboard listeners
      this.cursors = this.input.keyboard.createCursorKeys();
      this.robots = this.physics.add.group();
      this.flowers = this.physics.add.group();
      
      this.physics.add.collider(this.flowers, this.platforms);
      this.physics.add.collider(this.player, this.robots, this.playerRobotCollision, null, this);
      this.physics.add.collider(this.robots, this.platforms);
      this.physics.add.collider(this.robots, this.player);
      this.time.addEvent({
         delay: 1000,
         callback: this.robotLoop,
         callbackScope: this,
         repeat: this.robotTarget - 1
      });
   }
   

   robotLoop(){
      let positions = [30, config.width - 30];
      let x = Phaser.Utils.Array.GetRandom(positions);
      let robotSpeed = Phaser.Math.Between(this.robotSpeed.min, this.robotSpeed.max);
      let robot = new Robot(this, x, 300, 'robot', robotSpeed);
      this.robots.add(robot);
   }

   update() {
      if(this.cursors.left.isDown){
         this.player.moveLeft();
      } else if(this.cursors.right.isDown) {
         this.player.moveRight();
      } else {
         this.player.turn();
      }
      if(this.cursors.up.isDown && this.player.body.touching.down) {
         this.player.moveUp();
      }
      //update the robots
      for(var i =0; i< this.robots.getChildren().length; i ++){
         var robot = this.robots.getChildren()[i];
         robot.update();
      }
   }

   playerRobotCollision(player, robot){
      let playerY = Math.ceil(player.y + player.height/2);
      let robotY = Math.ceil(robot.y - robot.height/2);

      if(playerY <= robotY){
         //The player is over the robot
         flowerSpawn = flowerSpawn + flowerInc;
         robot.destroy();         
         player.addKill();         
         // spawn flower when robot killed     
         let flower = new Flower(this,flowerSpawn,300,'flower');
         this.flowers.add(flower);
         
      } else {
         //Decrease player life points
         player.anims.play('turn');
         //set a red tint
         player.setTint(0xff0000);
         //remove the tint after a while
         this.time.addEvent({
            delay: 100,
            callback: function(){
               player.setTint(0xffffff);
            },
            callbackScope: this,
            loop: true
         });
         player.decreaseLife();
         this.lifeText.setText('life:' + this.player.points());
         // gameOver = true;
         if(this.player.points()<=0){
            this.physics.pause();
            this.time.addEvent({
               delay: 100,
               callback: function() {
                  this.scene.start('SceneGameOver');
               },
               callbackScope: this,
               loop: false
            });
         }
      }

      this.scoreText.setText('score:' + game.score);
      // all robots were killed go the next level
      if(this.player.kills() >= this.robotTarget){
         this.physics.pause();
         this.time.addEvent({
            delay: 100,
            callback: function() {
               this.scene.start('SceneTwo');
            },
            callbackScope: this,
            loop: false
         });
      }

   }

}
