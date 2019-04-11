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
      this.player = this.physics.add.sprite(100, 450, 'dude');
      this.player.setBounce(0.1);
      this.player.setCollideWorldBounds(true);
      this.physics.add.collider(this.player, this.platforms);
      this.anims.create({
         key: 'left',
         frames: this.anims.generateFrameNumbers('dude', {start: 0, end: 3}),
         frameRate: 10,
         repeat: -1
      });
      this.anims.create({
         key: 'turn',
         frames: [{key: 'dude', frame: 4}],
         frameRate: 20
      });
      this.anims.create({
         key: 'right',
         frames: this.anims.generateFrameNumbers('dude', {start: 5, end: 8}),
         frameRate: 10,
         repeat: -1
      });
      this.cursors = this.input.keyboard.createCursorKeys();

      this.robots = this.physics.add.group();
      this.bombs = this.physics.add.group();
      this.physics.add.collider(this.bombs, this.platforms);
      this.physics.add.collider(this.player, this.bombs, this.hitBomb, null, this);
      this.physics.add.collider(this.robots, this.platforms);
      this.physics.add.collider(this.robots, this.player);
      // this.physics.add.overlap(this.player, this.robots, this.robotContact, null, this);
   }

   update() {
      if(this.cursors.left.isDown){
         this.player.setVelocityX(-160);
         this.player.anims.play('left', true);
      } else if(this.cursors.right.isDown) {
         this.player.setVelocityX(160);
         this.player.anims.play('right', true);
      } else {
         this.player.setVelocityX(0);
         this.player.anims.play('turn');
      }
      if(this.cursors.up.isDown && this.player.body.touching.down) {
         this.player.setVelocityY(-330);
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

   hitBomb(player, bomb){
      this.physics.pause();
      player.setTint(0xff0000);
      player.anims.play('turn');
      gameOver = true;
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
         var bomb = bombs.create(x, 16, 'bomb');
         bomb.setBounce(1);
         bomb.setCollideWorldBounds(true);
         bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
      }
   }

}

