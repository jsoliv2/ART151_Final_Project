class HealthPowerup {
  sprite;
  expireTimer;
  deleteFlag;
  
  constructor() {
    this.sprite = createSprite(48 + (32 * parseInt(random(0, 21))), 80 + (32 * parseInt(random(0, 13))), 32, 32);
    
    this.sprite.addImage("healthpwr", healthPowerImg);
    
    while ((playerObj != null && this.sprite.collide(playerObj.sprite)) || (bossObj != null && this.sprite.collide(bossObj.sprite)) || this.sprite.collide(wallSprites)) {
      this.sprite.position.x = 48 + (32 * parseInt(random(0, 21)));
      this.sprite.position.y = 80 + (32 * parseInt(random(0, 13)));
    }
    
    
    this.expireTimer = 540;
    this.deleteFlag = false;
  }
  
  updatePowerup() {
    if ((playerObj != null && this.sprite.collide(playerObj.sprite)) || (bossObj != null && this.sprite.collide(bossObj.sprite))) {
      powerupCollectSnd.play();
      
      playerHealth += 50;
      if (playerHealth > maxPlayerHealth) {
        playerHealth = maxPlayerHealth;
      }
      
      bossHealth += 50;
      if (bossHealth > maxBossHealth) {
        bossHealth = maxBossHealth;
      }
      
      this.expireTimer = 0;
    }
    
    if (playerObj == null || bossObj == null) {
      this.travelTimer = 0;
    }
    
    if (this.expireTimer > 0) {
      this.expireTimer--;
    }
    else {
      this.deleteFlag = true;
    }
  }
}

class SwapPowerup extends HealthPowerup {
  constructor() {
    super();
    this.sprite.addImage("swappwr", swapPowerImg);
    this.sprite.changeImage("swappwr");
  }
  
  updatePowerup() {
    if ((playerObj != null && this.sprite.collide(playerObj.sprite)) || (bossObj != null && this.sprite.collide(bossObj.sprite))) {
      powerupCollectSnd.play();
      
      let tempXPos = playerObj.sprite.position.x;
      let tempYPos = playerObj.sprite.position.y;
      
      playerObj.sprite.position.x = bossObj.sprite.position.x;
      playerObj.sprite.position.y = bossObj.sprite.position.y;
      
      bossObj.sprite.position.x = tempXPos;
      bossObj.sprite.position.y = tempYPos;
      
      this.expireTimer = 0;
    }
    
    if (playerObj == null || bossObj == null) {
      this.travelTimer = 0;
    }
    
    if (this.expireTimer > 0) {
      this.expireTimer--;
    }
    else {
      this.deleteFlag = true;
    }
  }
}

class SpeedPowerup extends HealthPowerup {
  constructor() {
    super();
    this.sprite.addImage("speedpwr", speedPowerImg);
    this.sprite.changeImage("speedpwr");
  }
  
  updatePowerup() {
    if ((playerObj != null && this.sprite.collide(playerObj.sprite)) || (bossObj != null && this.sprite.collide(bossObj.sprite))) {
      powerupCollectSnd.play();
      
      speedPowerupTimer = 480;
      this.expireTimer = 0;
    }
    
    if (playerObj == null || bossObj == null) {
      this.travelTimer = 0;
    }
    
    if (this.expireTimer > 0) {
      this.expireTimer--;
    }
    else {
      this.deleteFlag = true;
    }
  }
}