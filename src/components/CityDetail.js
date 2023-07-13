import cityDetailTemplate from './city-detail.tpl.html';
import './city-detail.css';

export default {
  restrict: 'E',
  template: cityDetailTemplate,
  controller: ['$q', '$routeParams', 'weatherService', function CityListController ($q, $routeParams, weatherService) {
    this.ready = false;
    this.error = false;

    weatherService.getForecast($routeParams.cityId).then(result => {
      this.city = result;
      this.ready = true;
    }, error => {
      console.error(error);
      this.error = true;
    });
  }]
};
