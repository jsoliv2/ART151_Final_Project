let playerMagicSnd;
let enemyMagicSnd;
let magicWallHitSnd;

let playerHurtSnd;
let enemyHurtSnd;

let borderEnemyAppearSnd;
let ghostEnemyAppearSnd;

let powerupAppearSnd;
let powerupCollectSnd;

let stageMenuSelectSnd;

let backgroundMusic;
let victoryMusic;
let menuMusic;

function loadSoundsAndMusic() {
  soundFormats('wav', 'mp3');
  
  playerMagicSnd = loadSound("sounds/blue_magic.wav");
  enemyMagicSnd = loadSound("sounds/red_magic.wav");
  magicWallHitSnd = loadSound("sounds/wall_hit.wav");
  
  playerHurtSnd = loadSound("sounds/player_hurt.wav");
  enemyHurtSnd = loadSound("sounds/enemy_hurt.wav");
  
  borderEnemyAppearSnd = loadSound("sounds/border_appear.wav");
  ghostEnemyAppearSnd = loadSound("sounds/ghost_appear.wav");
  
  powerupAppearSnd = loadSound("sounds/powerup.wav");
  powerupCollectSnd = loadSound("sounds/powerup2.wav");
  
  stageMenuSelectSnd = loadSound("sounds/stage_select.wav");
  
  backgroundMusic = loadSound("sounds/Retro_Platforming.mp3");
  backgroundMusic.setVolume(0.65);
  
  victoryMusic = loadSound("sounds/8_Bit_Presentation.mp3");
  victoryMusic.setVolume(0.55);
  
  menuMusic = loadSound("sounds/Land_of_8_Bits.mp3");
  menuMusic.setVolume(0.25);
}