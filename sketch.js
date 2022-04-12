let playerObj;
let bossObj;
let borderEnemyObj;
let ghostEnemyObj;

let playerProjectile;
let mainBossProjectile;
let enemyProjectiles = [];

let wallSprites;

let tileImage;
let tileImageAlt;

let wallImage1;
let wallImage2;

/* https://fonts.google.com/specimen/Press+Start+2P */
let PS2PFont;

let playerHealth = 100;
let maxPlayerHealth = 100;

let bossHealth = 300;
let maxBossHealth = 300;

let hpDrainDistance = 200;
let hpDrainDistanceMultiplier = 1;

let hpDrainRate = 0.0167;
let hpDrainRateMultiplier = 1;

let borderEnemySpawnTimer = 0;

function preload() {
  createPlayerAnims();
  createEnemyAnims();
  tileImage = loadImage("sprites/cracked_tile.png");
  tileImageAlt = loadImage("sprites/non_cracked_tile.png");
  wallImage1 = loadAnimation("sprites/wall_1.png");
  wallImage2 = loadAnimation("sprites/wall_2.png");
  PS2PFont = loadFont("PressStart2P.ttf");
}

function setup() {
  colorMode(HSB, 360, 100, 100);
  
  createCanvas(768, 576);
  
  textFont(PS2PFont);
  
  playerObj = new PlayerObject((width / 2) - 192, height / 2);
  bossObj = new BossObject((width / 2) + 192, height / 2);
  borderEnemyObj = null;
  borderEnemyGroup = new Group();
  ghostEnemyObj = null;
  
  playerProjectile = null;
  
  createWallSprites();
}

function createWallSprites() {
  wallSprites = new Group();
  let tempWallSprite;
  
  wallSprites.add(createSprite(16, height / 2, 32, height));
  wallSprites.add(createSprite(width - 16, height / 2, 32, height));
  wallSprites.add(createSprite(width / 2, 32, width, 64));
  wallSprites.add(createSprite(width / 2, height - 32, width, 64));
  
  tempWallSprite = createSprite(192, 144, 192, 32);
  tempWallSprite.addAnimation("wall", wallImage2);
  wallSprites.add(tempWallSprite);
  
  tempWallSprite = createSprite(112, 176, 32, 96);
  tempWallSprite.addAnimation("wall", wallImage1);
  wallSprites.add(tempWallSprite);
  
  tempWallSprite = createSprite(width - 192, 144, 192, 32);
  tempWallSprite.addAnimation("wall", wallImage2);
  wallSprites.add(tempWallSprite);
  
  tempWallSprite = createSprite(width - 112, 176, 32, 96);
  tempWallSprite.addAnimation("wall", wallImage1);
  wallSprites.add(tempWallSprite);
  
  tempWallSprite = createSprite(192, height - 144, 192, 32);
  tempWallSprite.addAnimation("wall", wallImage2);
  wallSprites.add(tempWallSprite);
  
  tempWallSprite = createSprite(112, height - 176, 32, 96);
  tempWallSprite.addAnimation("wall", wallImage1);
  wallSprites.add(tempWallSprite);
  
  tempWallSprite = createSprite(width - 192, height - 144, 192, 32);
  tempWallSprite.addAnimation("wall", wallImage2);
  wallSprites.add(tempWallSprite);
  
  tempWallSprite = createSprite(width - 112, height - 176, 32, 96);
  tempWallSprite.addAnimation("wall", wallImage1);
  wallSprites.add(tempWallSprite);
  
}

function draw() {
  background(120,50,85);
  createTileBG();
  
  cleanupObjects();
  
  checkInputs();
  updateProjectiles();
  checkHPDrainDistance()
  updateEnemies();
  
  checkAnimations();
  drawSprites();
  drawBorders();
  drawHealthbars();
  drawText();
  
  updateDifficulty();
}

function checkInputs() {
  if (playerObj != null) {
    playerObj.attackCheck();
    playerObj.moveCheck();
  }
  
  if (bossObj != null) {
    bossObj.attackCheck();
    bossObj.moveCheck();
  }
}

function checkAnimations() {
  if (playerObj != null) {
    playerObj.animationCheck();
  }
  
  if (bossObj != null) {
    bossObj.animationCheck();
  }
}

function updateProjectiles() {
  if (playerProjectile != null) {
    playerProjectile.projectileUpdate();
  }
  
  if (mainBossProjectile != null) {
    mainBossProjectile.projectileUpdate();
  }
  
  for (let enProj of enemyProjectiles) {
    enProj.projectileUpdate();
  }
}

function updateEnemies() {
  if (borderEnemyObj != null) {
    borderEnemyObj.updateEnemy();
    borderEnemyObj.updateAttackInterval();
  }
  
  if (ghostEnemyObj != null) {
    ghostEnemyObj.updateEnemy();
  }
}

function cleanupObjects() {
  if (playerProjectile != null && playerProjectile.deleteFlag) {
    playerProjectile.sprite.remove();
    playerProjectile = null;
  }
  
  if (mainBossProjectile != null && mainBossProjectile.deleteFlag) {
    mainBossProjectile.sprite.remove();
    mainBossProjectile = null;
  }
  
  if (borderEnemyObj != null && borderEnemyObj.deleteFlag) {
    borderEnemyObj.sprite.remove();
    borderEnemyObj = null;
  }
  
  for (let i = 0; i < enemyProjectiles.length; ++i) {
    let enProj = enemyProjectiles[i];
    if (enProj.deleteFlag) {
      enProj.sprite.remove();
      enemyProjectiles.splice(i, 1);
    }
  }
  
  if (playerHealth <= 0 && playerObj != null) {
    playerObj.sprite.remove();
    playerObj = null;
  }
  
  if (bossHealth <= 0 && bossObj != null) {
    bossObj.sprite.remove();
    bossObj = null;
  }
}

function checkHPDrainDistance() {
  if (playerObj == null || bossObj == null) {return;}
  
  let vec = createVector(abs(playerObj.sprite.position.x - bossObj.sprite.position.x), abs(playerObj.sprite.position.y - bossObj.sprite.position.y));
  if (vec.mag() <= (hpDrainDistance * hpDrainDistanceMultiplier) && playerHealth > 1) {
    playerHealth -= (hpDrainRate * hpDrainRateMultiplier);
    if (playerHealth < 1) {
      playerHealth = 1;
    }
  }
}

function updateDifficulty() {
  if (bossHealth > 200) {
    hpDrainDistanceMultiplier = 1;
    hpDrainRateMultiplier = 1;
  }
  else if (bossHealth > 100) {
    handleBorderEnemies();
    hpDrainDistanceMultiplier = 1.25;
    hpDrainRateMultiplier = 2;
  }
  else if (bossHealth > 0) {
    handleBorderEnemies();
    handleGhostEnemy();
    hpDrainDistanceMultiplier = 1.5;
    hpDrainRateMultiplier = 4;
  }
  else {
    if (borderEnemyObj != null) {
      borderEnemyObj.sprite.remove();
      borderEnemyObj = null;
    }
    
    if (ghostEnemyObj != null) {
      ghostEnemyObj.sprite.remove();
      ghostEnemyObj = null;
    }
    
    hpDrainDistanceMultiplier = 0;
    hpDrainRateMultiplier = 0;
  }
}

function handleBorderEnemies() {
  if (borderEnemyObj == null) {
    if (borderEnemySpawnTimer > 0) {
      borderEnemySpawnTimer--;
    }
    else {
      borderEnemyObj = new BorderEnemy(random([0, 1, 2, 3]), random(180, 300));
      borderEnemySpawnTimer = random(300, 480);
    }
  }
}

function handleGhostEnemy() {
  if (ghostEnemyObj == null) {
    ghostEnemyObj = new GhostEnemy();
  }
}

function createTileBG() {
  for (let x = 32; x < (width - 32); x += 32) {
    for (let y = 64; y < (height - 64); y += 32) {
      if (((x / 32) + (y / 64)) % 3 != 0) {
        image(tileImageAlt, x, y);
      }
      else {
        image(tileImage, x, y);
      }
    }
  }
}

function drawBorders() {
  noStroke();
  fill("black");
  rect(0, 0, width, 64);
  rect(0, height - 64, width, 64);
  rect(0, 0, 32, height);
  rect(width - 32, 0, 32, height);
}

function drawHealthbars() {
  fill("blue");
  rect(64, 24, lerp(0, 256, playerHealth / maxPlayerHealth), 16);
  fill("red");
  rect(width - 64, 24, -lerp(0, 256, bossHealth / maxBossHealth), 16);
  noFill();
  stroke("white");
  strokeWeight(1);
  rect(63, 23, 257, 17);
  rect(width - 63, 23, -257, 17);
}

function drawText() {
  noStroke();
  
  fill("white");
  textSize(16);
  
  textAlign(LEFT);
  text("YOU", 60, 62);
  
  textAlign(RIGHT);
  text("ENEMY", width - 60, 62);
  
  textAlign(CENTER);
  textSize(12);
  fill("gray");
  text("Arrow Keys: Move | Z Key: Cast Magic", width / 2, height - 48);
  textSize(18);
  text("DUAL\nDUEL", width / 2, 32);
  
  fill("blue");
  textAlign(LEFT);
  textSize(14);
  text("Defeat your dark side!", 32, height - 16);
  textAlign(RIGHT);
  fill("red");
  textSize(14);
  text("Give in to weakness...", width - 32, height - 16);
}