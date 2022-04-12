class PlayerObject {
  sprite;
  
  attackTimer;
  moveSpeed;
  
  currentDirection;
  
  constructor(startX, startY) {
    this.sprite = createSprite(startX, startY, 32, 32);
    this.sprite.addAnimation("idle_down", playerIdleAnimDown);
    this.sprite.addAnimation("idle_up", playerIdleAnimUp);
    this.sprite.addAnimation("idle_right", playerIdleAnimRight);
    this.sprite.addAnimation("idle_left", playerIdleAnimLeft);
    
    this.sprite.addAnimation("walk_down", playerWalkAnimDown);
    this.sprite.addAnimation("walk_up", playerWalkAnimUp);
    this.sprite.addAnimation("walk_right", playerWalkAnimRight);
    this.sprite.addAnimation("walk_left", playerWalkAnimLeft);
    
    this.attackTimer = 0;
    this.moveSpeed = 4;
    
    this.currentDirection = 2; // [0 = Left, 1 = Up, 2 = Right, 3 = Down]
  }
  
  moveCheck() {
    // Left or Right Arrow Keys
    if (this.attackTimer == 0 && keyDown(37) && !keyDown(38) && !keyDown(39) && !keyDown(40)) {
      this.sprite.velocity.x = -this.moveSpeed;
      this.currentDirection = 0;
    }
    else if (this.attackTimer == 0 && !keyDown(37) && !keyDown(38) && keyDown(39) && !keyDown(40)) {
      this.sprite.velocity.x = this.moveSpeed;
      this.currentDirection = 2;
    }
    else {
      if (this.attackTimer > 0 || (!keyDown(37) && !keyDown(39))) {
        this.sprite.velocity.x = 0;
      }
    }

    // Up or Down Arrow Keys
    if (this.attackTimer == 0 && !keyDown(37) && keyDown(38) && !keyDown(39) && !keyDown(40)) {
      this.sprite.velocity.y = -this.moveSpeed;
      this.currentDirection = 1;
    }
    else if (this.attackTimer == 0 && !keyDown(37) && !keyDown(38) && !keyDown(39) && keyDown(40)) {
      this.sprite.velocity.y = this.moveSpeed;
      this.currentDirection = 3;
    }
    else {
      if (this.attackTimer > 0 || (!keyDown(38) && !keyDown(40))) {
        this.sprite.velocity.y = 0;
      }
    }
    
    this.sprite.collide(wallSprites);
  }
  
  attackCheck() {
    if (keyWentDown(90) && this.attackTimer == 0 && playerProjectile == null) { // Z Key
      this.attackTimer = 10;
    }
    else {
      if (this.attackTimer > 0) {
        if (this.attackTimer == 8) {
          playerProjectile = new Projectile(this.sprite.position.x, this.sprite.position.y, this.currentDirection);
        }
        this.attackTimer--;
      }
    }
  }
  
  animationCheck() {
    if (this.sprite.velocity.x != 0 || this.sprite.velocity.y != 0) {
      switch (this.currentDirection) {
        case 0:
          if (this.sprite.getAnimationLabel() != "walk_left") { 
            this.sprite.changeAnimation("walk_left");
          }
          break;
        case 1:
          if (this.sprite.getAnimationLabel() != "walk_up") { 
            this.sprite.changeAnimation("walk_up");
          }
          break;
        case 2:
          if (this.sprite.getAnimationLabel() != "walk_right") { 
            this.sprite.changeAnimation("walk_right");
          }
          break;
        case 3:
          if (this.sprite.getAnimationLabel() != "walk_down") { 
            this.sprite.changeAnimation("walk_down");
          }
          break;
        default:
          break;
      }
    }
    else {
      switch (this.currentDirection) {
        case 0:
          if (this.sprite.getAnimationLabel() != "idle_left") {
            this.sprite.changeAnimation("idle_left");
          }
          break;
        case 1:
          if (this.sprite.getAnimationLabel() != "idle_up") {
            this.sprite.changeAnimation("idle_up");
          }
          break;
        case 2:
          if (this.sprite.getAnimationLabel() != "idle_right") {
            this.sprite.changeAnimation("idle_right");
          }
          break;
        case 3:
          if (this.sprite.getAnimationLabel() != "idle_down") {
            this.sprite.changeAnimation("idle_down");
          }
          break;
        default:
          break;
      }
    }
  }
}

class BossObject extends PlayerObject {
  constructor(startX, startY) {
    super(startX, startY);
    this.moveSpeed = -4;
    this.sprite.addAnimation("en_idle_down", enemyIdleAnimDown);
    this.sprite.addAnimation("en_idle_up", enemyIdleAnimUp);
    this.sprite.addAnimation("en_idle_right", enemyIdleAnimRight);
    this.sprite.addAnimation("en_idle_left", enemyIdleAnimLeft);
    
    this.sprite.addAnimation("en_walk_down", enemyWalkAnimDown);
    this.sprite.addAnimation("en_walk_up", enemyWalkAnimUp);
    this.sprite.addAnimation("en_walk_right", enemyWalkAnimRight);
    this.sprite.addAnimation("en_walk_left", enemyWalkAnimLeft);
  }
  
  attackCheck() {
    if (keyWentDown(90) && this.attackTimer == 0 && mainBossProjectile == null) { // Z Key
      this.attackTimer = 20;
    }
    else {
      if (this.attackTimer > 0) {
        if (this.attackTimer == 16) {
          mainBossProjectile = new BossProjectile(this.sprite.position.x, this.sprite.position.y, this.currentDirection);
        } 
        this.attackTimer--;
      }
    }
  }
  
  animationCheck() {
    if (this.sprite.velocity.x != 0 || this.sprite.velocity.y != 0) {
      switch (this.currentDirection) {
        case 0:
          if (this.sprite.getAnimationLabel() != "en_walk_right") { 
            this.sprite.changeAnimation("en_walk_right");
          }
          break;
        case 1:
          if (this.sprite.getAnimationLabel() != "en_walk_down") { 
            this.sprite.changeAnimation("en_walk_down");
          }
          break;
        case 2:
          if (this.sprite.getAnimationLabel() != "en_walk_left") { 
            this.sprite.changeAnimation("en_walk_left");
          }
          break;
        case 3:
          if (this.sprite.getAnimationLabel() != "en_walk_up") { 
            this.sprite.changeAnimation("en_walk_up");
          }
          break;
        default:
          break;
      }
    }
    else {
      switch (this.currentDirection) {
        case 0:
          if (this.sprite.getAnimationLabel() != "en_idle_right") {
            this.sprite.changeAnimation("en_idle_right");
          }
          break;
        case 1:
          if (this.sprite.getAnimationLabel() != "en_idle_down") {
            this.sprite.changeAnimation("en_idle_down");
          }
          break;
        case 2:
          if (this.sprite.getAnimationLabel() != "en_idle_left") {
            this.sprite.changeAnimation("en_idle_left");
          }
          break;
        case 3:
          if (this.sprite.getAnimationLabel() != "en_idle_up") {
            this.sprite.changeAnimation("en_idle_up");
          }
          break;
        default:
          break;
      }
    }
  }
}