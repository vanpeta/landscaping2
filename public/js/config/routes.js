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
      url: '/about',
      templateUrl: 'js/about/about.html',
      controller: 'adminController',
      controllerAs: 'vm'
    })
    .state ('Work', {
      url: '/work',
      templateUrl: 'js/work/work.html',
      controller: 'adminController',
      controllerAs: 'vm'
    })
    .state ('Service', {
      url: '/service',
      templateUrl: 'js/service/service.html',
      controller: 'mainController',
      controllerAs: 'vm'
    })
    .state ('Contact', {
      url: '/contact',
      templateUrl: 'js/contact/contact.html',
      controller: 'contactController',
      controllerAs: 'vm'
    })
    .state ('Admin', {
      url: '/admin',
      templateUrl: 'js/admin/admin.html',
      controller: 'adminController',
      controllerAs: 'vm'
    })
    $urlRouterProvider.otherwise('/');
  }
})()
