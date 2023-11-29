let z = 0;
let transitionProgress = 0;
let lastmillis = 0;

// Durations for each transition phase in frames (60 frames per second)
const durationDawnToDay = 5; 
const durationDayToDusk = 5; 
const durationDuskToNight =  7; 
const durationNightToDawn = 7; 

const totalDuration = durationDawnToDay + durationDayToDusk + durationDuskToNight + durationNightToDawn;

function setup() {
  createCanvas(displayWidth, displayHeight);

}

function draw() {
  // Define colors for each time of day
  let dawn1 = color("#FA889A");
  let day1 = color("#f6c88b");
  let dusk1 = color("#F65924");
  let night1 = color("#9741A9");

  let dawn2 = color("#FBD15C");
  let day2 = color("#93c9e9");
  let dusk2 = color("#181138");
  let night2 = color("#1E2742");

  // Update z and the transition progress
  z += 0.01;
  transitionProgress+=(millis()-lastmillis)/1000;
  lastmillis = millis();

  // Ensure transition progress loops back after completing a full cycle
  transitionProgress = transitionProgress % totalDuration;

  // Determine current phase and calculate transition stage
  let currentColor1, currentColor2, transitionStage;
  if (transitionProgress < durationDawnToDay) {
    transitionStage = transitionProgress / durationDawnToDay;
    currentColor1 = lerpColor(dawn1, day1, transitionStage);
    currentColor2 = lerpColor(dawn2, day2, transitionStage);
    
      //print("stage1:",transitionStage,transitionProgress);
    
  } else if (transitionProgress < durationDawnToDay + durationDayToDusk) {
    transitionStage = (transitionProgress - durationDawnToDay) / durationDayToDusk;
    currentColor1 = lerpColor(day1, dusk1, transitionStage);
    currentColor2 = lerpColor(day2, dusk2, transitionStage);
    
      //  print("stage2:",transitionStage,transitionProgress);

  } else if (transitionProgress < durationDawnToDay + durationDayToDusk + durationDuskToNight) {
    transitionStage = (transitionProgress - durationDawnToDay - durationDayToDusk) / durationDuskToNight;
    currentColor1 = lerpColor(dusk1, night1, transitionStage);
    currentColor2 = lerpColor(dusk2, night2, transitionStage);

       // print("stage3:",transitionStage,transitionProgress);

  } else {
    transitionStage = (transitionProgress - durationDawnToDay - durationDayToDusk - durationDuskToNight) / durationNightToDawn;
    currentColor1 = lerpColor(night1, dawn1, transitionStage);
    currentColor2 = lerpColor(night2, dawn2, transitionStage);
    
       // print("stage4:",transitionStage,transitionProgress);

  }

  background(220);
  noStroke();
  for (let i = 0; i < width; i += 10) {
    for (let j = 0; j < height; j += 10) {
      let percent = noise(j /500, i / 500, z);

      // Use the interpolated colors
      let myColor = lerpColor(currentColor1, currentColor2, percent);

      fill(myColor);
      square(i, j, 10);
    }
  }
}

function mousePressed() {
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    let fs = fullscreen();
    fullscreen(!fs);
  }
}

