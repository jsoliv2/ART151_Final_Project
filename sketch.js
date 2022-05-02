let sceneState = 0; // 0: Title, 1:Game

let quitCounter = 0;
let resetCounter = 0;

let playerObj;
let bossObj;
let borderEnemyObj;
let ghostEnemyObj;
let powerupObj;

let playerProjectile;
let mainBossProjectile;
let enemyProjectiles = [];

let tileObjects;
let wallSprites;

let logoImage;

let tileImage;
let tileImageAlt;

let wallImageGreen;
let wallImageBlue;
let wallImageRed;
let wallImageBlack;

let healthPowerImg;
let swapPowerImg;
let speedPowerImg;

let mapData;

/* https://fonts.google.com/specimen/Press+Start+2P */
let PS2PFont;

/* CAMERA VARIABLES */
let videoCapture;
let currentScreenshot;
let screenshotInterval = 6;
let screenshotTimer = 0;

/* GAME VARIABLES */
let selectedMapNumber = 1;

let powerupSpawnTimer = 1200;

let playerHealth = 100;
let maxPlayerHealth = 100;

let bossHealth = 300;
let maxBossHealth = 300;

let speedPowerupTimer = 0;

let hpDrainDistance = 200;
let hpDrainDistanceMultiplier = 1;

let hpDrainRate = 0.0167;
let hpDrainRateMultiplier = 1;

let borderEnemySpawnTimer = 0;

function preload() {
  createPlayerAnims();
  createEnemyAnims();
  loadSoundsAndMusic();
  
  logoImage = loadImage("dual_duel_logo.png");
  
  tileImage = loadImage("sprites/cracked_tile.png");
  tileImageAlt = loadImage("sprites/non_cracked_tile.png");
  wallImageGreen = loadImage("sprites/wall_green.png");
  wallImageBlue = loadImage("sprites/wall_blue.png");
  wallImageRed = loadImage("sprites/wall_red.png");
  wallImageBlack = loadImage("sprites/wall_black.png");
  healthPowerImg = loadImage("sprites/powerup1.png");
  swapPowerImg = loadImage("sprites/powerup2.png");
  speedPowerImg = loadImage("sprites/powerup3.png");
  
  PS2PFont = loadFont("PressStart2P.ttf");
  mapData = loadJSON("map_data.json");
}

function setup() {
  colorMode(HSB, 360, 100, 100, 100);
  
  createCanvas(768, 576);
  
  textFont(PS2PFont);
  
  videoCapture = createCapture(VIDEO);
  videoCapture.size(width, height);
  videoCapture.hide();
  currentScreenshot = null;
  
  switch(sceneState) {
    case 0:
      menuSetup();
      break;
    case 1:
      gameSetup();
      break;
    default:
      break;
  }
}

function gameSetup() {
  sceneState = 1;
  currentScreenshot = null;
  
  playerHealth = 100;
  maxPlayerHealth = 100;
  
  bossHealth = 300;
  maxBossHealth = 300;
  
  speedPowerupTimer = 0;
  
  powerupSpawnTimer = random(900, 1200);
  borderEnemySpawnTimer = 0;
  
  playerObj = new PlayerObject((width / 2) - 192, height / 2);
  bossObj = new BossObject((width / 2) + 192, height / 2);
  borderEnemyObj = null;
  borderEnemyGroup = new Group();
  ghostEnemyObj = null;
  powerupObj = null;
  
  playerProjectile = null;
  
  createWallSprites();
  
  if (menuMusic.isPlaying()) {
    menuMusic.stop();
  }
  
  if (victoryMusic.isPlaying()) {
    victoryMusic.stop();
  }
  
  if (backgroundMusic.isPlaying()) {
    backgroundMusic.stop();
  }
  backgroundMusic.loop();
}

function createWallSprites() {
  tileObjects = [];
  wallSprites = new Group();
  let tempWallSprite;
  
  wallSprites.add(createSprite(16, height / 2, 32, height));
  wallSprites.add(createSprite(width - 16, height / 2, 32, height));
  wallSprites.add(createSprite(width / 2, 32, width, 64));
  wallSprites.add(createSprite(width / 2, height - 32, width, 64));
  
  let currentMapArray;
  
  switch (selectedMapNumber) {
    case 0:
      currentMapArray = mapData.map0;
      break;
    case 1:
      currentMapArray = mapData.map1;
      break;
    case 2:
      currentMapArray = mapData.map2;
      break;
    case 3:
      currentMapArray = mapData.map3;
      break;
    case 4:
      currentMapArray = mapData.map4;
      break;
    case 5:
      currentMapArray = mapData.map5;
      break;
    default:
      currentMapArray = mapData.map0;
      break;
  }
  
  for (let i = 0; i < currentMapArray.length; ++i) {
    let tileValue = currentMapArray[i];
    switch (tileValue) {
      case 1:
        tileObjects.push(new WallTile(48 + ((i % 22) * 32), 80 + (parseInt(i / 22) * 32), "green"));
        break;
      case 2:
        tileObjects.push(new WallTile(48 + ((i % 22) * 32), 80 + (parseInt(i / 22) * 32), "blue"));
        break;
      case 3:
        tileObjects.push(new WallTile(48 + ((i % 22) * 32), 80 + (parseInt(i / 22) * 32), "red"));
        break;
      case 4:
        tileObjects.push(new WallTile(48 + ((i % 22) * 32), 80 + (parseInt(i / 22) * 32), "black"));
        break;
      default:
        break;
    }
  }
}

function draw() {
  switch(sceneState) {
    case 0:
      menuLoop();
      if (keyWentDown(67)) {
        alert("DUAL DUEL by Kyle Soliva, 2022\n- Sprites created by me\n- Sounds created with JSFXR (https://sfxr.me/)\n- Font is PressStart2P by Cody Boisclair (\"CodeMan38\")\n- Music:\n  - \"Retro Platforming\" by David Fesliyan\n  - \"8-Bit Presentation\" by David Fesliyan\n  - \"Land of 8-Bits\" by Stephen Bennett\n  - Background music via https://www.FesliyanStudios.com");
      }
      break;
    case 1:
      gameLoop();
      
      if (keyDown(82) && resetCounter >= 60) { // R
        resetCounter = 0;
        resetGame();
      }
      else if (keyDown(82) && resetCounter < 60) {
        resetCounter++;
      }
      else if (keyWentUp(82)) {
        resetCounter = 0;
      }
      else if (keyDown(27) && quitCounter >= 60) { // Esc
        quitCounter = 0;
        quitToMenu();
      }
      else if (keyDown(27) && quitCounter < 60) {
        quitCounter++;
      }
      else if (keyWentUp(27)) {
        quitCounter = 0;
      }
      else {
        /* Nothing */
      }
      break;
    default:
      break;
  }
  
  if (keyWentDown(107)) { // +
    if (musicVolume < 10) {
      musicVolume++;
      backgroundMusic.setVolume(bgmVol * musicVolume / 10);
      victoryMusic.setVolume(vmVol * musicVolume / 10);
      menuMusic.setVolume(mmVol * musicVolume / 10);
    }
  }
  else if (keyWentDown(109)) { // -
    if (musicVolume > 0) {
      musicVolume--;
      backgroundMusic.setVolume(bgmVol * musicVolume / 10);
      victoryMusic.setVolume(vmVol * musicVolume / 10);
      menuMusic.setVolume(mmVol * musicVolume / 10);
    }
  }
  else {
    /* Nothing */
  }
}

function gameLoop() {
  background(120,50,85);
  createTileBG();
  if (currentScreenshot != null && bossObj != null) {
    image(currentScreenshot, 0, 0, width, height);
  }
  
  cleanupObjects();
  
  checkInputs();
  updateProjectiles();
  checkHPDrainDistance()
  updateEnemies();
  updatePowerups();
  checkAnimations();
  
  drawSprites();
  endMessage();
  drawBorders();
  drawHealthbars();
  drawText();
  
  updateDifficulty();
  updateMusic();
  
  if (screenshotTimer < screenshotInterval) {
    ++screenshotTimer;
  }
  else {
    takeScreenshot();
    screenshotTimer = 0;
  }
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

function updatePowerups() {
  if (playerObj == null || bossObj == null) { return; }
  
  if (powerupObj == null) {
    if (speedPowerupTimer > 0) {
      speedPowerupTimer--;
    }
    else if (powerupSpawnTimer > 0) {
      powerupSpawnTimer--;
    }
    else {
      let choices = [0, 1, 2];
      let powerupPicker = random(choices);
      
      powerupAppearSnd.play();
      
      switch(powerupPicker) {
        case 0:
          powerupObj = new HealthPowerup();
          break;
        case 1:
          powerupObj = new SwapPowerup();
          break;
        case 2:
          powerupObj = new SpeedPowerup();
          break;
        default:
          powerupObj = new HealthPowerup();
          break;
      }
      powerupSpawnTimer = random(900, 1200);
    }
  }
  else {
    powerupObj.updatePowerup();
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
  
  if (powerupObj != null && powerupObj.deleteFlag) {
    powerupObj.sprite.remove();
    powerupObj = null;
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
  if (quitCounter > 0) {
    text("Keep holding [Esc] to quit...", width / 2, height - 48);
  }
  else if (resetCounter > 0) {
    text("Keep holding [R] to reset...", width / 2, height - 48);
  }
  else {
    text("Arrow Keys: Move | [Z]: Cast Magic | [R]: Reset | [Esc]: Quit", width / 2, height - 48);
  }
  
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

function resetObjects() {
  if (playerProjectile != null) {
    playerProjectile.sprite.remove();
    playerProjectile = null;
  }
  
  if (mainBossProjectile != null) {
    mainBossProjectile.sprite.remove();
    mainBossProjectile = null;
  }
  
  if (borderEnemyObj != null) {
    borderEnemyObj.sprite.remove();
    borderEnemyObj = null;
  }
  
  if (ghostEnemyObj != null) {
    ghostEnemyObj.sprite.remove();
    ghostEnemyObj = null;
  }
  
  if (powerupObj != null) {
    powerupObj.sprite.remove();
    powerupObj = null;
  }
  
  for (let i = 0; i < enemyProjectiles.length; ++i) {
    let enProj = enemyProjectiles[i];
    enProj.sprite.remove();
    enemyProjectiles.splice(i, 1);
  }
  
  if (playerObj != null) {
    playerObj.sprite.remove();
    playerObj = null;
  }
  
  if (bossObj != null) {
    bossObj.sprite.remove();
    bossObj = null;
  }
  
  for (let t of tileObjects) {
    t.sprite.remove();
  }
  tileObjects = null;
  
  wallSprites.removeSprites();
}

function endMessage() {
  if (playerHealth == 0) {
    fill("#000000AA");
    rect(0, (height / 3) + 32, width, 128);
    textSize(50);
    fill("red");
    textAlign(CENTER);
    text("YOU FALTERED", width / 2, (height / 2) + 30);
  }
  else if (bossHealth == 0) {
    fill("#000000AA");
    rect(0, (height / 3) + 32, width, 128);
    textSize(50);
    fill("blue");
    textAlign(CENTER);
    text("YOU PREVAILED", width / 2, (height / 2) + 30);
  }
  else {
    /* Nothing */
  }
}

function updateMusic() {
  if (playerObj == null) {
    if (backgroundMusic.isPlaying()) {
      backgroundMusic.stop();
    }
  }
  else if (bossObj == null && !victoryMusic.isPlaying()) {
    if (backgroundMusic.isPlaying()) {
      backgroundMusic.stop();
    }
    victoryMusic.loop();
  }
  else {
    /* Nothing */
  }
}

function quitToMenu() {
  resetObjects();
  menuSetup();
}

function resetGame() {
  resetObjects();
  gameSetup();
}

/* https://stackoverflow.com/questions/8916620/disable-arrow-key-scrolling-in-users-browser */
window.addEventListener("keydown", function(e) {
  if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
    e.preventDefault();
  }
}, false);