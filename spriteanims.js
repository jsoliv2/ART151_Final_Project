let playerIdleAnimDown;
let playerIdleAnimUp;
let playerIdleAnimRight;
let playerIdleAnimLeft;

let playerWalkAnimDown;
let playerWalkAnimUp;
let playerWalkAnimRight;
let playerWalkAnimLeft;

let playerProjectileAnim;

function createPlayerAnims() { 
  playerIdleAnimDown  = loadAnimation("sprites/blue_wiz_stand.png");
  playerIdleAnimUp    = loadAnimation("sprites/blue_wiz_stand_up.png");
  playerIdleAnimRight = loadAnimation("sprites/blue_wiz_stand_right.png");
  playerIdleAnimLeft  = loadAnimation("sprites/blue_wiz_stand_left.png");
  
  
  playerWalkAnimDown = loadAnimation("sprites/blue_wiz_walk1.png",
                                     "sprites/blue_wiz_stand.png",
                                     "sprites/blue_wiz_walk2.png",
                                     "sprites/blue_wiz_stand.png");
  playerWalkAnimDown.frameDelay = 10;
  
  playerWalkAnimUp = loadAnimation("sprites/blue_wiz_walk_up1.png",
                                   "sprites/blue_wiz_stand_up.png",
                                   "sprites/blue_wiz_walk_up2.png",
                                   "sprites/blue_wiz_stand_up.png");
  playerWalkAnimUp.frameDelay = 10;
  
  playerWalkAnimRight = loadAnimation("sprites/blue_wiz_walk_right1.png",
                                      "sprites/blue_wiz_stand_right.png",
                                      "sprites/blue_wiz_walk_right2.png",
                                      "sprites/blue_wiz_stand_right.png");
  playerWalkAnimRight.frameDelay = 10;
  
  playerWalkAnimLeft = loadAnimation("sprites/blue_wiz_walk_left1.png",
                                      "sprites/blue_wiz_stand_left.png",
                                      "sprites/blue_wiz_walk_left2.png",
                                      "sprites/blue_wiz_stand_left.png");
  playerWalkAnimLeft.frameDelay = 10;
  
  playerProjectileAnim = loadAnimation("sprites/blue_magic1.png", "sprites/blue_magic2.png");
  playerProjectileAnim.frameDelay = 8;
}