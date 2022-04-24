class GhostEnemy {
  sprite;
  targetSprite;
  
  easing;
  drainRate;
  
  freezeTimer;
  
  constructor() {
    ghostEnemyAppearSnd.play();
    
    this.sprite = createSprite(width / 2, height + 64, 32, 32);
    this.targetSprite = playerObj.sprite;
    this.easing = 0.015;
    this.drainRate = 5;
    this.freezeTimer = 0;
    
    this.sprite.addAnimation("move", enemyWalkAnimDown);
  }
  
  updateEnemy() {
    if (this.freezeTimer > 0) {
      this.freezeTimer--;
      if (this.freezeTimer < 0) {
        this.freezeTimer = 0;
      }
    }
    else {
      let deltaX = (this.easing * (this.targetSprite.position.x - this.sprite.position.x));
      let deltaY = (this.easing * (this.targetSprite.position.y - this.sprite.position.y));
      this.sprite.position.x += deltaX;
      this.sprite.position.y += deltaY;

      if (playerObj != null && this.sprite.overlap(this.targetSprite)) {
        playerHealth -= 0.083;
        if (playerHealth < 1) {
          playerHealth = 1;
        }
      }
    }
  }
  
  setFreezeTimer() {
    if (this.freezeTimer <= 0) {
      this.freezeTimer = 90;
    }
  }
}