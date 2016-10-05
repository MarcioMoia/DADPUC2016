angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $ionicPopover, $timeout,  $location, $ionicPopup, $http, LoginService) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //})

  // Form data for the login modal
  $scope.loginData ={};

  //--------------------------------------------
   $scope.login = function(user) {
   	//$scope.showAlert('Funcao de login');

   	$scope.GetBanco();
			
		if(typeof(user)=='undefined'){
			$scope.showAlert('Please fill username and password to proceed.');	
			return false;
		}

		if(user.cpf=='demo@gmail.com' && user.senha=='demo'){
			$location.path('/app/dashboard');
		}else{
			//$scope.showAlert('Invalid username or password.');	
			$scope.showAlert('a');
		}
		
	};
  //--------------------------------------------
  $scope.logout = function() {   $location.path('/app/login');   };
  //--------------------------------------------
   // An alert dialog
	 $scope.showAlert = function(msg) {
	   var alertPopup = $ionicPopup.alert({
		 title: 'Warning Message',
		 template: msg
	   });
	 };

	 $scope.GetBanco = function(LocalizarService) {
		 var promise = LoginService.logar();
		 promise.then(function (data) {
            $scope.dados = data.data;
			angular.forEach($scope.dados, function(value, key){
				console.log(value);
				console.log(value.cpf);
				console.log(value.senha);
				console.log("indíce: " + key);
			});        
        },function(erro) {
              console.log('Erro : ' + JSON.stringify(erro));
        }, function(update) {
              console.log('Got notification: ' + update);
        });
	};
  //--------------------------------------------
})

.controller('ProfilesCtrl', function($scope , Profiles) {
    $scope.profiles = Profiles.all();
})

.controller('ProfileCtrl', function($scope, $stateParams , Profiles) {
	$scope.profile = Profiles.get($stateParams.profileId);
})

.controller('DashCtrl', function($scope, $stateParams , Profiles) {
	$scope.profiles = Profiles.all();
});
