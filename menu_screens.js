function menuSetup() {
  sceneState = 0;
  currentScreenshot = null;
  if (backgroundMusic.isPlaying()) {
    backgroundMusic.stop();
  }
  
  if (victoryMusic.isPlaying()) {
    victoryMusic.stop();
  }
  
  menuMusic.play();
}

function menuLoop() {
  background(0);
  if (currentScreenshot != null) {
    image(currentScreenshot, 0, 0, width, height);
  }
  
  checkMenuInput();
  drawMenuElements();
  
  if (screenshotTimer < screenshotInterval) {
    ++screenshotTimer;
  }
  else {
    takeMenuScreenshot();
    screenshotTimer = 0;
  }
}

function checkMenuInput() {
  if (keyWentDown(37)) {
    stageMenuSelectSnd.play();
    selectedMapNumber--;
    if (selectedMapNumber < 0) {
      selectedMapNumber = 5;
    }
  }
  else if (keyWentDown(39)) {
    stageMenuSelectSnd.play();
    selectedMapNumber++;
    if (selectedMapNumber > 5) {
      selectedMapNumber = 0;
    }
  }
  else if (keyWentDown(90)) {
    gameSetup();
  }
  else {
    /* Nothing */
  }
}

function drawMenuElements() {
  textAlign(CENTER);
  image(logoImage, 100, 76);

  textSize(25);
  fill("yellow");
  text("Press [Z] to face yourself...", width / 2, height * 0.50);
  
  textSize(16);
  fill("yellow");
  text("Select your headspace with left or right:", width / 2, height * 0.70);
  
  textSize(16);
  fill('blue');
  let mapString = "<- 1. Neutral ->";
  switch (selectedMapNumber) {
    case 0:
      mapString = "<- 0. Empty ->";
      break;
    case 1:
      mapString = "<- 1. Neutral ->";
      break;
    case 2:
      mapString = "<- 2. Spiraling ->";
      break;
    case 3:
      mapString = "<- 3. Closed ->";
      break;
    case 4:
      mapString = "<- 4. Guarded ->";
      break;
    case 5:
      mapString = "<- 5. Narrow ->";
      break;
    default:
      mapString = "<- 0. Empty ->";
      break;
  }
  text(mapString, width / 2, height * 0.80);
  
  textSize(12);
  fill("gray");
  text("[+/-]: Adjust Volume | [C]: Credits", width / 2, height - 16);
}