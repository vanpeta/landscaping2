(function () {
  angular.module('landscaping')
  .config(MainRouter);

  MainRouter.$inject = ["$stateProvider", "$urlRouterProvider"];

  function MainRouter ($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state ('home', {
      url: '/',
      templateUrl: 'js/home/home.html',
      controller: 'mainController',
      controllerAs: 'vm'
    })
    .state ('About', {
      url: '/About',
      templateUrl: 'js/about/about.html',
      controller: 'mainController',
      controllerAs: 'vm'
    })
    .state ('Work', {
      url: '/Work',
      templateUrl: 'js/work/work.html',
      controller: 'mainController',
      controllerAs: 'vm'
    })
    .state ('Service', {
      url: '/Service',
      templateUrl: 'js/service/service.html',
      controller: 'mainController',
      controllerAs: 'vm'
    })
    .state ('Contact', {
      url: '/Contact',
      templateUrl: 'js/contact/contact.html',
      controller: 'mainController',
      controllerAs: 'vm'
    })
    $urlRouterProvider.otherwise('/');
  }
})()
