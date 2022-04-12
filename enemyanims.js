let enemyIdleAnimDown;
let enemyIdleAnimUp;
let enemyIdleAnimRight;
let enemyIdleAnimLeft;

let enemyWalkAnimDown;
let enemyWalkAnimUp;
let enemyWalkAnimRight;
let enemyWalkAnimLeft;

let enemyProjectileAnim;

function createEnemyAnims() {
  enemyIdleAnimDown  = loadAnimation("sprites/red_wiz_stand_down.png");
  enemyIdleAnimUp    = loadAnimation("sprites/red_wiz_stand_up.png");
  enemyIdleAnimRight = loadAnimation("sprites/red_wiz_stand_right.png");
  enemyIdleAnimLeft  = loadAnimation("sprites/red_wiz_stand_left.png");
  
  
  enemyWalkAnimDown = loadAnimation("sprites/red_wiz_walk_down1.png",
                                    "sprites/red_wiz_stand_down.png",
                                    "sprites/red_wiz_walk_down2.png",
                                    "sprites/red_wiz_stand_down.png");
  enemyWalkAnimDown.frameDelay = 10;
  
  enemyWalkAnimUp = loadAnimation("sprites/red_wiz_walk_up1.png",
                                   "sprites/red_wiz_stand_up.png",
                                   "sprites/red_wiz_walk_up2.png",
                                   "sprites/red_wiz_stand_up.png");
  enemyWalkAnimUp.frameDelay = 10;
  
  enemyWalkAnimRight = loadAnimation("sprites/red_wiz_walk_right1.png",
                                      "sprites/red_wiz_stand_right.png",
                                      "sprites/red_wiz_walk_right2.png",
                                      "sprites/red_wiz_stand_right.png");
  enemyWalkAnimRight.frameDelay = 10;
  
  enemyWalkAnimLeft = loadAnimation("sprites/red_wiz_walk_left1.png",
                                      "sprites/red_wiz_stand_left.png",
                                      "sprites/red_wiz_walk_left2.png",
                                      "sprites/red_wiz_stand_left.png");
  enemyWalkAnimLeft.frameDelay = 10;
  
  enemyProjectileAnim = loadAnimation("sprites/red_magic1.png", "sprites/red_magic2.png");
  enemyProjectileAnim.frameDelay = 8;
}