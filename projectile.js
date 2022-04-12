class Projectile {
  sprite;
  travelTimer;
  deleteFlag;
  
  moveSpeed;
  currentDirection;
  
  constructor(startX, startY, startDir) {
    this.sprite = createSprite(startX, startY, 16, 16);
    this.travelTimer = 45;
    this.deleteFlag = false;
    this.moveSpeed = 6;
    this.currentDirection = startDir;
    switch (this.currentDirection) {
        case 0:
          this.sprite.velocity.x = -this.moveSpeed;
          break;
        case 1:
          this.sprite.velocity.y = -this.moveSpeed;
          break;
        case 2:
          this.sprite.velocity.x = this.moveSpeed;
          break;
        case 3:
          this.sprite.velocity.y = this.moveSpeed;
          break;
        default:
          break;
    }
    this.sprite.addAnimation("loop", playerProjectileAnim);
  }
  
  projectileUpdate() {
    if (bossObj != null && this.sprite.collide(bossObj.sprite)) {
      bossHealth -= (10 * (1 + (1 - (playerHealth / maxPlayerHealth))));
      if (bossHealth < 0) {
        bossHealth = 0;
      }
      this.travelTimer = 0;
    }
    
    if (borderEnemyObj != null && this.sprite.collide(borderEnemyObj.sprite)) {
      playerHealth += 15;
      if (playerHealth > maxPlayerHealth) {
        playerHealth = maxPlayerHealth;
      }
      borderEnemyObj.deleteFlag = true;
      this.travelTimer = 0;
    }
    
    if (ghostEnemyObj != null && this.sprite.collide(ghostEnemyObj.sprite)) {
      ghostEnemyObj.setFreezeTimer();
      this.travelTimer = 0;
    }
    
    if (this.travelTimer > 0) {
      this.travelTimer--;
    }
    else {
      this.deleteFlag = true;
    }
  }
}

class BossProjectile extends Projectile {
  constructor(startX, startY, startDir) {
    super(startX, startY, startDir);
    this.travelTimer = 65;
    this.sprite.velocity.x *= -0.8;
    this.sprite.velocity.y *= -0.8;
    this.sprite.addAnimation("loop2", enemyProjectileAnim);
    this.sprite.changeAnimation("loop2");
  }
  
  projectileUpdate() {
    if (playerObj != null && this.sprite.collide(playerObj.sprite)) {
      playerHealth -= (10 * (1 + (1 - (bossHealth / maxBossHealth))));
      if (playerHealth < 0) {
        playerHealth = 0;
      }
      this.travelTimer = 0;
    }
    
    if (this.travelTimer > 0) {
      this.travelTimer--;
    }
    else {
      this.deleteFlag = true;
    }
  }
}

class EnemyProjectile extends Projectile {
  constructor(startX, startY, startDir) {
    super(startX, startY, startDir);
    this.travelTimer = 130;
    this.sprite.velocity.x *= 1.2;
    this.sprite.velocity.y *= 1.2;
    this.sprite.addAnimation("loop2", enemyProjectileAnim);
    this.sprite.changeAnimation("loop2");
  }
  
  projectileUpdate() {
    if (playerObj != null && this.sprite.collide(playerObj.sprite)) {
      playerHealth -= 5;
      if (playerHealth < 0) {
        playerHealth = 0;
      }
      this.travelTimer = 0;
    }
    
    if (this.travelTimer > 0) {
      this.travelTimer--;
    }
    else {
      this.deleteFlag = true;
    }
  }
}