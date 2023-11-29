let z = 0;
let transitionProgress = 0;

let durationDawnToDay,
  durationDayToDusk,
  durationDuskToNight,
  durationNightToDawn;

let sunrise, solarNoon, nadir, nextSunrise;

const totalDuration = 24; // Total cycle is 24 hours

//const totalDuration = durationDawnToDay + durationDayToDusk + durationDuskToNight + durationNightToDawn;

function setup() {
  createCanvas(displayWidth, displayHeight);

  let latitude = 40.73061; // NYC latitude
  let longitude = -73.935242; // NYC longitude
  let times = SunCalc.getTimes(new Date(), latitude, longitude);

  sunrise = times.sunrise.getHours() + times.sunrise.getMinutes() / 60;
  solarNoon = times.solarNoon.getHours() + times.solarNoon.getMinutes() / 60;
  nadir = times.nadir.getHours() + times.nadir.getMinutes() / 60;
  nextSunrise = times.sunrise.getHours() + times.sunrise.getMinutes() / 60 + 24; // Next day's sunrise

  durationDawnToDay = solarNoon - sunrise;
  durationDayToDusk = durationDawnToDay; // Same as Dawn to Day
  durationNightToDawn = nextSunrise - nadir;
  durationDuskToNight = durationNightToDawn; // Same as Night to Dawn

  console.log("Duration Dawn to Day (hours):", durationDawnToDay);
  console.log("Duration Day to Dusk (hours):", durationDayToDusk);
  console.log("Duration Dusk to Night (hours):", durationDuskToNight);
  console.log("Duration Night to Dawn (hours):", durationNightToDawn);
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
  let hoursSinceSunrise =
    now.getHours() + now.getMinutes() / 60 + now.getSeconds() / 3600 - sunrise;
  if (hoursSinceSunrise < 0) hoursSinceSunrise += 24; // Adjust for times past midnight

  // Map the time to transition progress
  transitionProgress = map(hoursSinceSunrise, 0, 24, 0, totalDuration);

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
