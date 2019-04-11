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
      // this.physics.add.overlap(this.player, this.robots, this.robotContact, null, this);
   }

   robotLoop(){
      if(this.robots.getChildren().length < 8){
         let positions = [30, config.width - 30];
         let x = Phaser.Utils.Array.GetRandom(positions);
         let robot = new Robot(this, x, 500, 'bomb');
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

   getEnemiesByType(type) {
      var arr = [];
      for(var i =0; i< this.enemies.getChildren().length; i ++){
         var enemy = this.enemies.getChildren()[i];
         if(enemy.getData('type') == type) {
            arr.push(enemy);
         }
      }
      return arr;
   }

   //Detect if the object is out of sight and destroys it if so
   frustumCullObject(object) {
      if(object.x < -object.displayWidth || 
         object.x > this.game.config.width + object.displayWidth ||
         object.y < -object.displayHeight * 4 ||
         object.y > this.game.config.height + object.displayHeight
      ) {
         if(object) {
            if(object.onDestroy !== undefined) {
               object.onDestroy();
            }
            object.destroy();
         } 

      }
   }

   playerRobotCollision(player, robot){
      // this.physics.pause();
      robot.setTint(0xff0000);
      player.anims.play('turn');
      // gameOver = true;
   }

   robotContact(player, start) {
      start.disableBody(true, true);
      score += 10;
      scoreText.setText('score: ' + score);
      if(robots.countActive(true) == 0) {
         robots.children.iterate(function(child) {
            child.enableBody(true, child.x, 0, true, true);
         });
         var x = (player.x < 400)? Phaser.Math.Between(400, 800): Phaser.Math.Between(0, 400);
         var bomb = robots.create(x, 16, 'bomb');
         bomb.setBounce(1);
         bomb.setCollideWorldBounds(true);
         bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
      }
   }

}

