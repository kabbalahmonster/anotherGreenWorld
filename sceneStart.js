class SceneStart extends Phaser.Scene{

   constructor() {
      super({key: 'SceneStart'});
   }
   
   preload() {
      this.load.image('sky', 'assets/sky.png');
      this.load.image('ground', 'assets/platform.png');
      this.load.image('robot', 'assets/star.png');
      this.load.spritesheet('dude',
         'assets/dude.png', 
         {frameWidth: 32, frameHeight: 48}
      );
   }

   create(){
      this.add.image(400, 300, 'sky');
      this.scoreText = this.add.text(16, 16, 'score: 0', {fontSize: '32px', fill: '#000'});
      this.lifeText = this.add.text(16, 40, 'life: 10', {fontSize: '32px', fill: '#000'});
      this.platforms = this.physics.add.staticGroup();
      this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();
      this.player = new Player(this, 200, 450, 'dude');

      // this.player = this.physics.add.sprite(100, 450, 'dude');
      // this.player.setBounce(0.1);
      // this.player.setCollideWorldBounds(true);
      this.physics.add.collider(this.player, this.platforms);
      //player animations
      this.anims.create({ key: 'left', frames: this.anims.generateFrameNumbers('dude', {start: 0, end: 3}), frameRate: 10, repeat: -1 });
      this.anims.create({ key: 'turn', frames: [{key: 'dude', frame: 4}], frameRate: 20 });
      this.anims.create({ key: 'right', frames: this.anims.generateFrameNumbers('dude', {start: 5, end: 8}), frameRate: 10, repeat: -1 });
      //attach keyboard listeners
      this.cursors = this.input.keyboard.createCursorKeys();
      this.robots = this.physics.add.group();
      this.physics.add.collider(this.player, this.robots, this.playerRobotCollision, null, this);
      this.physics.add.collider(this.robots, this.platforms);
      this.physics.add.collider(this.robots, this.player);
      this.time.addEvent({
         delay: 1000,
         callback: this.robotLoop,
         callbackScope: this,
         loop: true
      });
   }

   robotLoop(){
      if(this.robots.getChildren().length < 8){
         let positions = [30, config.width - 30];
         let x = Phaser.Utils.Array.GetRandom(positions);
         let robot = new Robot(this, x, 500, 'robot');
         this.robots.add(robot);
      }
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
         robot.destroy();
      } else {
         //Decrease player life points
         player.anims.play('turn');
         player.setTint(0xff0000);
         player.decreaseLife();
         this.lifeText.setText('life:' + this.player.points());
         if(this.player.points()<=0){
            this.physics.pause();
         }
         // gameOver = true;
      }
   }

}

