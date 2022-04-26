function takeScreenshot() {
  currentScreenshot = videoCapture.get(0, 0, width, height);
  currentScreenshot.filter(INVERT);
  currentScreenshot.resize(width / 4, height / 8);
  
  currentScreenshot.loadPixels();
  let d = pixelDensity();
  let fullImage = 4 * (currentScreenshot.width * d) * (currentScreenshot.height * d); // Calculate pixel indices
  
  for (let i = 0; i < fullImage; i += 4) {    
    currentScreenshot.pixels[i]     *= 0.15;
    currentScreenshot.pixels[i + 1] *= 0.95;
    currentScreenshot.pixels[i + 2] *= 0.15;
    
    // Modify alpha value
    currentScreenshot.pixels[i + 3] *= (0.45 * (1 - ((playerHealth / maxPlayerHealth) * (bossHealth / maxBossHealth))));
  }
  currentScreenshot.updatePixels();
}

function takeMenuScreenshot() {
  currentScreenshot = videoCapture.get(0, 0, width, height);
  currentScreenshot.filter(INVERT);
  currentScreenshot.resize(width / 4, height / 8);
  
  currentScreenshot.loadPixels();
  let d = pixelDensity();
  let fullImage = 4 * (currentScreenshot.width * d) * (currentScreenshot.height * d); // Calculate pixel indices
  
  for (let i = 0; i < fullImage; i += 4) {    
    currentScreenshot.pixels[i]     *= 0.95;
    currentScreenshot.pixels[i + 1] *= 0.15;
    currentScreenshot.pixels[i + 2] *= 0.15;
    
    // Modify alpha value
    currentScreenshot.pixels[i + 3] *= 0.6;
  }
  currentScreenshot.updatePixels();
}