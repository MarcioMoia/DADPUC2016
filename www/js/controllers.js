angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $ionicPopover, $timeout,  $location, $ionicPopup) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  var db = new restdb("816dcae7ddca17f3f1b070f2e10db0198b1c1");

  // Form data for the login modal
  $scope.loginData =[];

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

	 $scope.GetBanco = function() {
		$scope.showAlert('Entrei na funcao');
    	$http.get('https://tpdb-2a26.restdb.io/rest/user').then(function(response) {
    		$scope.showAlert('Peguei os dados');
            $scope.loginData = response.data;
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



