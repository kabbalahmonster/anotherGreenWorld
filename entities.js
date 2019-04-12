class Entity extends Phaser.GameObjects.Sprite {
   constructor(scene, x, y, key, type) {
      super(scene, x, y, key);
      this.scene = scene;
      this.scene.add.existing(this);
      this.scene.physics.world.enableBody(this, 0);
      this.setData('type', type);
      this.setData('isDead', false);
      this.depth = 20;
   }
}

class Player extends Entity{
   constructor(scene, x, y, key){
      super(scene, x, y, key, "Player");
      this.setData("speed", 200);
      this.setData("lifePoints", 100);
      this.setData("killCount", 0);
   }
   create(){
   }
   speed(){
      return this.getData('speed');
   }
   moveUp(){
      this.body.velocity.y = - this.speed()* 3;
   }
   moveDown(){}
   moveLeft(){
      this.body.velocity.x = -this.speed();
      this.play('left', true);
   }
   moveRight(){
      this.body.velocity.x = this.speed();
      this.play('right', true);
   }
   turn(){
      this.body.velocity.x = 0;
      this.play('turn');
   }
   decreaseLife(){
      this.setData('lifePoints', this.points() - 1);
   }
   points(){
      return this.getData('lifePoints');
   }
   kills(){
      return this.getData('killCount');
   }
   addKill(){
      this.setData('killCount', this.kills() + 1);
      game.score += 1;
   }

}

class Robot extends Entity{
   constructor(scene, x, y, key, speed){
      super(scene, x, y, key, "Robot");
      //Set a random speed for the robot
      this.setData("speed", speed);
      this.body.setBounce(0);
      this.directionX = 1;
      if(x > config.width/2){
         this.directionX = -1;
      }
   }
   moveLeft(){
      this.body.velocity.x = -this.getData('speed');
      this.play('botLeft', true);
   }
   stop(){
      this.body.velocity.x = 0;
   }
   moveRight(){
      this.body.velocity.x = this.getData('speed');
      this.play('botRight', true);
   }

   update(){
      if(this.body.x < this.body.width/2){
         this.directionX = 1;
      } 
      if(this.body.x + this.body.width/2 >= config.width){
         this.directionX =  -1;
      }
      if(this.directionX == 1){
         this.moveRight();
      } else {
         this.moveLeft();
      }
   }
}


class Flower extends Entity{
   constructor(scene, x, y, key){
      super(scene, x, y, key, "Flower");
      this.depth =10;
   }
   create(){
   }
}


