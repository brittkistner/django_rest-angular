portfolio.factory('ProjectFactory', function($http){
   return{
       projectList: [],
       getProjects: function(callback) {
           $http.get('/projects/')
               .success(function(projects){
                   callback(projects);
               }).error(function(error) {
                   console.log('error');
                   console.log(error);
               });
       }

   }

});