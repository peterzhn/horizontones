let z = 0;
let transitionProgress = 0;

// Durations for each transition phase in hours
const durationDawnToDay = 4.78; // From 7 AM to 12 PM
const durationDayToDusk = 4.78; // From 12 PM to 5 PM
const durationDuskToNight = 7.22; // From 5 PM to 12 AM
const durationNightToDawn = 7.22; // From 12 AM to 7 AM

const totalDuration = 24; // Total cycle is 24 hours

//const totalDuration = durationDawnToDay + durationDayToDusk + durationDuskToNight + durationNightToDawn;

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

  // Calculate current time in terms of hours since 7 AM
  let now = new Date();
  let hoursSince7AM =
    now.getHours() + now.getMinutes() / 60 + now.getSeconds() / 3600 - 6.9667;
  if (hoursSince7AM < 0) hoursSince7AM += 24; // Adjust for times past midnight

  // Map the time to transition progress
  transitionProgress = map(hoursSince7AM, 0, 24, 0, totalDuration);

  // Determine current phase and calculate transition stage
  let currentColor1, currentColor2, transitionStage;
  if (transitionProgress < durationDawnToDay) {
    transitionStage = transitionProgress / durationDawnToDay;
    currentColor1 = lerpColor(dawn1, day1, transitionStage);
    currentColor2 = lerpColor(dawn2, day2, transitionStage);

    //print("stage1:",transitionStage,transitionProgress);
  } else if (transitionProgress < durationDawnToDay + durationDayToDusk) {
    transitionStage =
      (transitionProgress - durationDawnToDay) / durationDayToDusk;
    currentColor1 = lerpColor(day1, dusk1, transitionStage);
    currentColor2 = lerpColor(day2, dusk2, transitionStage);

    //  print("stage2:",transitionStage,transitionProgress);
  } else if (
    transitionProgress <
    durationDawnToDay + durationDayToDusk + durationDuskToNight
  ) {
    transitionStage =
      (transitionProgress - durationDawnToDay - durationDayToDusk) /
      durationDuskToNight;
    currentColor1 = lerpColor(dusk1, night1, transitionStage);
    currentColor2 = lerpColor(dusk2, night2, transitionStage);

    // print("stage3:",transitionStage,transitionProgress);
  } else {
    transitionStage =
      (transitionProgress -
        durationDawnToDay -
        durationDayToDusk -
        durationDuskToNight) /
      durationNightToDawn;
    currentColor1 = lerpColor(night1, dawn1, transitionStage);
    currentColor2 = lerpColor(night2, dawn2, transitionStage);

    // print("stage4:",transitionStage,transitionProgress);
  }

  // Update z and the transition progress
  z += 0.02;

  background(220);
  noStroke();
  for (let i = 0; i < width; i += 10) {
    for (let j = 0; j < height; j += 10) {
      let percent = noise(j / 500, i / 500, z);

      // Use the interpolated colors
      let myColor = lerpColor(currentColor1, currentColor2, percent);

      fill(myColor);
      square(i, j, 10);
    }
  }
}
