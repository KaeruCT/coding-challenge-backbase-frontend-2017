import angular from 'angular';
import ngRoute from 'angular-route';
window.angular = angular;

import './main.css';

import WeatherService from './service/WeatherService';
import CityList from './components/CityList';
import CityDetail from './components/CityDetail';
import LineChart from './components/LineChart';

angular
  .module('euroWeather', ['ngRoute'])
  .factory('weatherService', WeatherService)
  .component('cityList', CityList)
  .component('cityDetail', CityDetail)
  .component('lineChart', LineChart)

  .config(['$locationProvider', '$routeProvider',
    function config($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix('!');
      $routeProvider.
        when('/cities', {
          template: '<city-list/>'
        }).
        when('/cities/:cityId', {
          template: '<city-detail/>'
        }).
        otherwise('/cities');
    }
  ]);
