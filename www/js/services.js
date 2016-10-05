//Aqui estao os metodos onde ele carrega o pessoal na aplicacao. Tratar aqui os dados dos candidatos

angular.module('starter.services', [])


.service('LoginService', function ($http, $q) {
      
        this.logar = function () {
        var deferred = $q.defer();
        console.log("enviando request");//apague depois
        $http.get('https://tpdb-2a26.restdb.io/rest/user', {headers:{'x-apikey':'57f527fe8d875fc707b1be3d'}}).then(function (response){
          deferred.resolve(response);
          console.log("request ok"); //apague depois
        },function (rejected) {
          console.log("rejeitado" + JSON.stringify(rejected));
        });
        return deferred.promise;
      } 
})

.factory('Profiles', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var profiles = [{
    id: 0,
    name: 'Anoop Kumar',
    deseg: 'Team Lead',
    face: 'img/150x165/anoop-kumar.png'
  }, {
    id: 1,
    name: 'Vijay Kumar',
    deseg: 'Project Manager',
    face: 'img/150x165/vijay-kumar.png'
  }, {
    id: 2,
	name: 'Durgesh Soni',
	deseg: 'Team Lead',
    face: 'img/150x165/durgesh-soni.png'
  }, {
    id: 3,
	 name: 'Manish Mittal',
    deseg: 'Project Manager',
    face: 'img/150x165/manish-mittal.png'
  }, {
    id: 4,
	name: 'Vinay Kumar',
	deseg: 'UI Designer',
    face: 'img/150x165/vinay-kumar.png'
  }, {
    id: 5,
	name: 'Ankit Gera',
	deseg: 'System Administrator',
    face: 'img/150x165/ankit-gera.png'
  }];

  return {
    all: function() {
      return profiles;
    },
    remove: function(id) {
      profiles.splice(profiles.indexOf(id), 1);
    },
    get: function(profileId) {
      for (var i = 0; i < profiles.length; i++) {
        if (profiles[i].id === parseInt(profileId)) {
          return profiles[i];
        }
      }
      return null;
    }
  };
});
