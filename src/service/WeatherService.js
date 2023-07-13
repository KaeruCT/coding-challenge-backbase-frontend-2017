import {openWeatherMap} from '../config.json';
const MAX_FORECAST_RESULTS = 10;

export default ['$http', '$q', function ($http, $q) {
  function buildUrl(cityId, path) {
    return `${openWeatherMap.endpoint}${path}?q=${encodeURIComponent(cityId)}&units=metric&APPID=${encodeURIComponent(openWeatherMap.apiKey)}`;
  }

  return {
    getWeatherInfo: function (cityId) {
      return $q((resolve, reject) => {
        $http.get(buildUrl(cityId, 'weather')).then(response => {
          var d = response.data;
          // extract only the data we care about
          var weatherInfo = {
            id: cityId,
            name: d.name,
            temp: Math.round(d.main.temp),
            wind: d.wind.speed
          };
          resolve(weatherInfo);
        }, error => {
          reject(error);
        });
      });
    },
    getForecast: function (cityId) {
      return $q((resolve, reject) => {
        $http.get(buildUrl(cityId, 'forecast')).then(response => {
          var d = response.data;
          // transform the data into a simpler form for the UI to use
          var list = d.list.slice(0, MAX_FORECAST_RESULTS).map(e => {
            return {
              time: e.dt_txt,
              temp: Math.round(e.main.temp),
              wind: e.wind.speed
            }
          });

          var forecast = {
            id: cityId,
            name: d.city.name,
            forecast: list
          };
          resolve(forecast);
        }, error => {
          reject(error);
        });
      });
    }
  };
}]
