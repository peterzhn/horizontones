# HorizonTones

HorizonTones is an ambient timepiece made for Time at NYU ITP. Designed as a desktop wallpaper, it marks the passage of the day with an animated gradient inspired by the changing sky.

[Open the live sketch](https://peterzhn.github.io/horizontones/)

## How it works

SunCalc calculates sunrise, solar noon, sunset, and nadir (when the sun is at its lowest point below the horizon) for New York City. The sketch assigns a two-color palette to each event and blends between neighboring palettes based on the current time. It uses full timestamps from surrounding days so the transition continues through midnight and into the next sunrise.

p5.js uses animated Perlin noise to vary the mix of the two colors across the screen, giving the gradient its drifting motion.

## Run locally

Open `index.html` in a browser. The page loads p5.js and SunCalc from a CDN, so you'll need an internet connection. The timing, palettes, and animation are in `sketch.js`.

## Deployment

GitHub Pages publishes the files in the root of the `main` branch. Changes committed to `main` go live after the Pages deployment finishes.
