angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $ionicPopover, $timeout,  $location, $ionicPopup, $http, LoginService, $q) {

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
   		
		if(typeof(user)=='undefined'){
			$scope.showAlert('Please fill username and password to proceed.');	
			return false;
		}

		$scope.VerificaLogin(user);

		/*if(loginAutorizado == true){
			
		}else{
				
			
		}*/
		
	};

	$scope.cadastrar = function(user)
	{

		if (user == 'undefined')
		{
			$scope.showAlert('Please fill the fields.');
			return false;
		}
		if (user.cpf == 'undefined')
		{
			$scope.showAlert('Please fill the fields.');
			return false;
		}
		if (user.senha == 'undefined')
		{
			$scope.showAlert('Please fill the fields.');
			return false;
		}
		if (user.cidade == 'undefined')
		{
			$scope.showAlert('Please fill the fields.');
			return false;
		}

		 var promise = $scope.PostBanco(user);
	};

	$scope.VerificaLogin = function(user)
	{
		
		var logouFlag = false;
	
		$scope.GetBanco()
		.then(function(response){
			console.log("retornando");
		for(i = 0; i < $scope.loginData.length;i++)
		{
				if((user.cpf == $scope.loginData[i].cpf) && (user.senha == $scope.loginData[i].senha))
				{
					$location.path('/app/dashboard');
					logouFlag = true;
					break;
				}
		}	

		if(logouFlag == false)
		{
			$scope.showAlert('Invalid username or password.');
		}
		});

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
		 var promise = LoginService.logar();
		 promise.then(function (data) {
            $scope.loginData = data.data;
            return $q.all(promise);
            console.log("Tamanho depois: " + $scope.loginData.length);
        },function(erro) {
              console.log('Erro : ' + JSON.stringify(erro));
        }, function(update) {
              console.log('Got notification: ' + update);
        });

		return promise; 
		
	};

	 $scope.PostBanco = function(user) {
		 var promise = LoginService.CadastroUsuario(user);
		 promise.then(function (data) {
            $scope.loginData = data.data;
        },function(erro) {
              console.log('Erro : ' + JSON.stringify(erro));
        }, function(update) {
              console.log('Got notification: ' + update);
        });

		return promise; 
		
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
