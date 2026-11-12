const latitude = 40.73061;
const longitude = -73.935242;
const dayMs = 24 * 60 * 60 * 1000;

let palettes;
let solarEvents = [];
let scheduleDay;
let z = 0;

function setup() {
  createCanvas(displayWidth, displayHeight);

  palettes = {
    sunrise: [color("#FA889A"), color("#FBD15C")],
    solarNoon: [color("#f6c88b"), color("#93c9e9")],
    sunset: [color("#F65924"), color("#181138")],
    nadir: [color("#9741A9"), color("#1E2742")],
  };

  noStroke();
}

function updateSolarEvents(now) {
  // Anchor the schedule to UTC so it works in any browser time zone.
  const utcNoon = Date.UTC(
    now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 12
  );
  if (scheduleDay === utcNoon) return;

  // Include neighboring dates so every moment has a previous and next event.
  solarEvents = [-1, 0, 1].flatMap(offset => {
    const date = new Date(utcNoon + offset * dayMs);
    const times = SunCalc.getTimes(date, latitude, longitude);

    return Object.keys(palettes).map(event => ({
      time: times[event].getTime(),
      palette: palettes[event],
    }));
  }).sort((a, b) => a.time - b.time);

  scheduleDay = utcNoon;
}

function draw() {
  const now = new Date();
  updateSolarEvents(now);

  const time = now.getTime();
  const nextIndex = solarEvents.findIndex(event => event.time > time);
  const previous = solarEvents[nextIndex - 1];
  const next = solarEvents[nextIndex];
  const progress = (time - previous.time) / (next.time - previous.time);

  const color1 = lerpColor(previous.palette[0], next.palette[0], progress);
  const color2 = lerpColor(previous.palette[1], next.palette[1], progress);

  z += 0.02;
  background(220);

  for (let x = 0; x < width; x += 10) {
    for (let y = 0; y < height; y += 10) {
      const amount = noise(y / 500, x / 500, z);
      fill(lerpColor(color1, color2, amount));
      square(x, y, 10);
    }
  }
}
