(function() {
  "use strict";

  angular
    .module("landscaping")
    .controller("SignInController", SignInController);

  SignInController.$inject = ["$log", "authService", "adminService", "$state"];

  function SignInController($log, authService, adminService, $state) {
    var vm = this;

    // BINDINGS
    vm.signUp = {};
    vm.submitSignUp = submitSignUp;
    vm.logIn = {};
    vm.submitLogIn = submitLogIn;
    vm.conflict = false;

    // FUNCTIONS
    function submitSignUp() {
      adminService
        .create(vm.signUp)
        .then(function(res) {
          return authService.logIn(vm.signUp);
        })
        .then(
          // on success
          function(decodedToken) {
            $log.info('Logged in!', decodedToken);
            $state.go('Admin');
          },
          // on error
          function(err) {
            if (err.status === 409) vm.conflict = true;
            $log.info('Error Claire-r:', err);
          }
        );
    }

    function submitLogIn() {
      authService
        .logIn(vm.logIn)
        .then(
          // on success
          function(decodedToken) {
            $log.info('Logged in!', decodedToken);
            $state.go('Admin');
          },
          // on error
          function(err) {
            $log.info('Error:', err);
          }
        );
    }

    $log.info("SignInController loaded!");
  }
})();
