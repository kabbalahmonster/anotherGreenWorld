class SceneTwo extends Phaser.Scene{

   constructor() {
      super({key: 'SceneTwo'});
      this.robotTarget = 12;
      this.robotSpeed = {min: 80, max: 160};
   }
   
   preload() {
      // this.load.image('bgstage2', 'assets/greenWorldBG1.png');
      
      this.load.audio('stomp', 'assets/stomp.ogg');
      flowerInc = 800 / (this.robotTarget);
      flowerSpawn = 0;
   }

   create(){
      this.add.image(config.width/2, config.height/2, 'stage1bg');
      this.scoreText = this.add.text(16, 16, 'score: ' + game.score, {fontSize: '32px', fill: '#000'});
      this.lifeText = this.add.text(16, 40, 'life: 100', {fontSize: '32px', fill: '#000'});
      this.platforms = this.physics.add.staticGroup();
      this.platforms.create(config.width/2, config.height-20, 'invisible')
         .setScale(config.width*2, 100).refreshBody();

      this.player = new Player(this, 200, 250, 'dude');      
      this.player.body.collideWorldBounds=true;
     
      
      stompFX = this.sound.add('stomp');

      backTrack= this.sound.add('track2',{loop:true, detune: -500});
      backTrack.play();
      

      // this.player = this.physics.add.sprite(100, 450, 'dude');
      // this.player.setBounce(0.1);
      // this.player.setCollideWorldBounds(true);
      this.physics.add.collider(this.player, this.platforms);
      
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
         stompFX.play();
         flowerSpawn = flowerSpawn + flowerInc;
         robot.destroy();
         player.addKill();
         // spawn flower when rocot killed                  
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
            
            backTrack.stop();
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
      if(this.player.kills()>=this.robotTarget){
         backTrack.stop();
         this.physics.pause();
         this.time.addEvent({
            delay: 100,
            callback: function() {
               this.scene.start('SceneGameWin');
            },
            callbackScope: this,
            loop: false
         });
      }
   }

}

