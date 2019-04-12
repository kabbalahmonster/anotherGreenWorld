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
      this.setData('canCreatePond', true);
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
   points(){ return this.getData('lifePoints'); }
   kills(){ return this.getData('killCount'); }
   canCreatePond(){ return this.getData('canCreatePond'); }
   addKill(points=1){
      this.setData('killCount', this.kills() + 1);
      game.score += points;
   }
   createPond(){
      let {x, y}= this.body;
      //If the player is almost at floor level, and there are no more than 2 ponds
      let maxNumberOfPonds = 2;
      if(y > 420 && this.canCreatePond() && this.scene.ponds.getChildren().length <= maxNumberOfPonds){
         let pond = new Pond(this.scene,x,y+10,'pond');
         this.scene.ponds.add(pond);
         this.setData('canCreatePond', false);
         this.scene.time.addEvent({
            delay: 500,
            callback: function(){
               this.setData('canCreatePond', true);
            },
            callbackScope: this
         });
      }
   }

}
class Pond extends Entity{
   constructor(scene, x, y, key){
      super(scene, x, y, key, "Pond");
      this.depth =10;
      this.setData('lives', 2);
      this.body.collideWorldBounds=true;
   }
   create(){
   }
   hit(){
      this.setTint(0x0000fff3);
      this.setData('lives', this.power()-1);
      this.body.velocity.x = 0;
      if(this.power() == 0){
         this.destroy();
      }
   }
   power(){
      return this.getData('lives');
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
