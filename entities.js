class Entity extends Phaser.GameObjects.Sprite {
   constructor(scene, x, y, key, type) {
      super(scene, x, y, key);
      this.scene = scene;
      this.scene.add.existing(this);
      this.scene.physics.world.enableBody(this, 0);
      this.setData('type', type);
      this.setData('isDead', false);
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
   moveUp(){
      this.body.velocity.y = -this.getData('speed') * 3;
   }
   moveDown(){
      this.body.velocity.y = this.getData('speed');
   }
   moveLeft(){
      this.body.velocity.x = -this.getData('speed');
      this.play('left', true);
   }
   turn(){
      this.body.velocity.x = 0;
      this.play('turn');
   }
   moveRight(){
      this.body.velocity.x = this.getData('speed');
      this.play('right', true);
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
   }

}

class Robot extends Entity{
   constructor(scene, x, y, key){
      super(scene, x, y, key, "Robot");
      //Set a random speed for the robot
      this.setData("speed", Phaser.Math.Between(40, 80));
      this.body.setBounce(0);
         // robot.setBounce(0);
         // robot.setCollideWorldBounds(true);
         // robot.setVelocity(Phaser.Math.Between(-200, 200), 20);
   }
   moveLeft(){
      this.body.velocity.x = -this.getData('speed');
      this.play('botLeft', true);
   }
   stop(){
      this.body.velocity.x = 0;
      // this.play('turn');
   }
   moveRight(){
      this.body.velocity.x = this.getData('speed');
      this.play('botRight', true);
   }

   update(){
      // console.log(this.scene.player.x);
      if(this.body.x > this.scene.player.x){
         this.moveLeft();
      } else {
         this.moveRight();
      }
   }
}


class Flower extends Entity{
   constructor(scene, x, y, key){
      super(scene, x, y, key, "Flower");
   }
   create(){
   }
}


