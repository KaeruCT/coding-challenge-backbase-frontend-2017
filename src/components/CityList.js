import cityListTemplate from './city-list.tpl.html';
import './city-list.css';
import {cities} from '../config.json';

export default {
  restrict: 'E',
  template: cityListTemplate,
  controller: ['$q', 'weatherService', function CityListController ($q, weatherService) {
    this.cities = [];
    this.error = false;
    this.ready = false; // set to true when all the initial requests have finished

    var pending = [];
    cities.forEach(cityName => {
      pending.push(weatherService.getWeatherInfo(cityName).then(result => {
        this.cities.push(result);
      }));
    }, error => {
      console.error(error);
      this.error = true;
    });

    $q.all(pending).then(() => {
      this.ready = true;
    });
  }]
};
