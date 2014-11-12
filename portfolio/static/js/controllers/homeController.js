function homeController($scope, ProjectFactory, $http) {
    console.log('homeController');
//    Get Projects
    if (ProjectFactory.projectList.length > 0) {
        $scope.projects = ProjectFactory.projectList;
        $scope.totalItems = $scope.projects.length;
    } else{
        ProjectFactory.getProjects(function(projectResponse) {
            $scope.projects = projectResponse.results;
            console.log(projectResponse);
            ProjectFactory.projectList = $scope.projects;
        });

    }

//    $scope.user =

    //Create a new user
    $scope.newUser = false;
    $scope.createUser = function() {
        console.log('createUser clicked');
        $scope.newUser = true;
    };

    $scope.saveUser = function(){
        console.log('clicked');
        var data = {
            "username": $scope.username,
            "firstname": $scope.firstname,
            "lastname": $scope.lastname,
            "email": $scope.email,
            "about": $scope.about
           };
        console.log(data);
        $http.post('/users/', data)
           .success(function(user){
               console.log('success');
               console.log(user);
           })
           .error(function(error) {
               console.log('error');
               console.log(error);
           });
    };

    //Create a new project
    $scope.newProject = false;
    $scope.createProject = function() {
        console.log('newProject clicked');
        $scope.newProject = true;
    };
    $scope.saveProject = function() {
        console.log('clicked');

       var data = {
             "title": $scope.title,
             "description": $scope.description
           };
       console.log(data);
       $http.post('/projects/', data)
           .success(function(project){
               console.log('success');
               console.log(project);
               ProjectFactory.projectList.push(project);
           })
           .error(function(error) {
               console.log('error');
               console.log(error);
           });
    };

//   Project Description
    $scope.projectDescription = function() {
        if (this.description){
            this.description = false;
        } else {
            this.description = true;
        }
    };
// Pagination
    $scope.currentPage = 1;
    $scope.pageChanged = function() {
        $http.get('/projects/?page=' + $scope.currentPage)
            .success(function (response) {
                $scope.projects = response;
                console.log(response);
                $scope.totalItems = response.count;
//                console.log('total Items');
//                console.log($scope.totalItems);
            })
    };
    $scope.pageChanged();

//Follow
    $scope.follow = function(projectId) {
        $http.post('/projects/' + projectId + '/follow/')
            .success(function(response) {
                console.log('success');
//                console.log(response);
            })
            .error(function(error) {
                console.log('error');
//                console.log(error);
            })
    };

//Unfollow
    $scope.unfollow = function(projectId) {
        $http.delete('/projects/' + projectId + '/unfollow/')
            .success(function(response) {
                console.log('success');
//                console.log(response);
            })
            .error(function(error) {
                console.log('error');
//                console.log(error);
            })
    };

}
