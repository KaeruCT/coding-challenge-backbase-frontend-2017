# euro-weather

## Architecture overview

I think I followed a pretty standard architecture for a small angular project.
If the application was bigger I would have created a different file for each module instead of putting everything in `main.js`. Currently the only module is `euroWeather`.

There are two main components, `<city-list>` and `<city-detail>`, which do most of the UI work. The logic to retrieve information from the API is centralized in `WeatherService.js`.

I chose to use plain ol' CSS instead of SASS because the style for the application is in reality very simple and it did not feel like a good tradeoff.

## How to build the project

After cloning the repo, cd into it and run `npm install` and then `npm run build`.
A `dist` directory should appear if everything went well.
Then you can open `dist/index.html` to look at the project in action.

## Configuration

In the file `config.json` you will find basic configuration for the application so it's very easy to update the settings without having to look for them in the code.

## Possible improvements

If I could spend more time on this project, I would...

 * Add a linter (like `jshint`)
 * Add a formatter (like `js-beautify`)
 * Add a bunch of tests
 * Improve the chart (it's not very pretty...)
