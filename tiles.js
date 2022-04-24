class WallTile {
  sprite;
  wallType;
  
  constructor(startX, startY, wallType) {
    this.sprite = createSprite(startX, startY, 32, 32);
    this.sprite.depth = 0;
    this.sprite.addToGroup(wallSprites);
    this.wallType = wallType;
    
    this.sprite.addImage("wall_green", wallImageGreen);
    this.sprite.addImage("wall_blue" , wallImageBlue);
    this.sprite.addImage("wall_red"  , wallImageRed);
    this.sprite.addImage("wall_black", wallImageBlack);
    
    switch (this.wallType) {
      case "green":
        this.sprite.changeImage("wall_green");
        break;
      case "blue":
        this.sprite.changeImage("wall_blue");
        break;
      case "red":
        this.sprite.changeImage("wall_red");
        break;
      case "black":
        this.sprite.changeImage("wall_black");
        break;
      default:
        this.sprite.changeImage("wall_green");
        break;
    }
  }
}