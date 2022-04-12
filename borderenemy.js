class BorderEnemy {
  sprite;
  fireInterval;
  borderPosition;
  currentDirection;
  
  deleteFlag;
  
  currentFireTimer;
  
  constructor(borderPos, interval) {
    if (playerObj == null) {return;}
    
    this.fireInterval = interval;
    this.borderPosition = borderPos;
    switch (this.borderPosition) {
      case 0:
        this.sprite = createSprite(48, playerObj.sprite.position.y, 32, 32);
        this.currentDirection = 2;
        this.sprite.addAnimation("move", enemyWalkAnimRight);
        break;
      case 1:
        this.sprite = createSprite(playerObj.sprite.position.x, 80, 32, 32);
        this.currentDirection = 3;
        this.sprite.addAnimation("move", enemyWalkAnimDown);
        break;
      case 2:
        this.sprite = createSprite(width - 48, playerObj.sprite.position.y, 32, 32);
        this.currentDirection = 0;
        this.sprite.addAnimation("move", enemyWalkAnimLeft);
        break;
      case 3:
        this.sprite = createSprite(playerObj.sprite.position.x, height - 80, 32, 32);
        this.currentDirection = 1;
        this.sprite.addAnimation("move", enemyWalkAnimUp);
        break;
    }
    this.deleteFlag = false;
    this.currentFireTimer = interval;
  }
  
  updateEnemy() {
    if (playerObj == null) {return;}
    
    switch (this.borderPosition) {
      case 0:
        this.sprite.position.y = playerObj.sprite.position.y;
        break;
      case 1:
        this.sprite.position.x = playerObj.sprite.position.x;
        break;
      case 2:
        this.sprite.position.y = playerObj.sprite.position.y;
        break;
      case 3:
        this.sprite.position.x = playerObj.sprite.position.x;
        break;
    }
  }
  
  updateAttackInterval() {
    if (playerObj == null) {return;}
    
    if (this.currentFireTimer > 0) {
      this.currentFireTimer--;
    }
    else {
      enemyProjectiles.push(new EnemyProjectile(this.sprite.position.x, this.sprite.position.y, this.currentDirection));
      this.currentFireTimer = this.fireInterval;
    }
  }
}