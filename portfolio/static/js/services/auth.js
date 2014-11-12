portfolio.factory('AuthService', function ($http, $q, $window, $location) {

  var register = function (username, password) {
    var deferred = $q.defer();
    var url = '/users/register/';

    $http.post(url, 'username=' + username + '&password=' + password, {
    headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
    }
    }).then(
    function (response) {
    var token = response.data.token;
    var username = response.data.username;

    if (token && username) {
      $window.localStorage.token = token;
      $window.localStorage.username = username;
      deferred.resolve(true);
    } else {
      deferred.reject('Invalid data received from server');
    }
    },
    function (response) {
    deferred.reject(response.data.error);
    }
    );
    return deferred.promise;
  };

  return {
    register: function (username, password) {
      return register(username, password);
    }
  };

});