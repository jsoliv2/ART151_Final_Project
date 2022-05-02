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
let bgmVol = 0.40;

let victoryMusic;
let vmVol = 0.50;

let menuMusic;
let mmVol = 0.20;

let musicVolume = 10;

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
  backgroundMusic.setVolume(bgmVol * musicVolume / 10);
  
  victoryMusic = loadSound("sounds/8_Bit_Presentation.mp3");
  victoryMusic.setVolume(vmVol * musicVolume / 10);
  
  menuMusic = loadSound("sounds/Land_of_8_Bits.mp3");
  menuMusic.setVolume(mmVol * musicVolume / 10);
}