function userController($scope, $http, $routeParams, User){
    console.log('userController');
//    $scope.userId = $routeParams.userId;
    var parameters = {
        userId: $routeParams.userId
    };

    $scope.user = User.get(parameters);
//        .$promise.then(
//            console.log('success user'),
////            $scope.user.followed_project.forEach(function(projectId) {
////                $http.get('/projects/' + projectId)
////                .success(function (project) {
////                    console.log(project);
////                    $scope.followedProject.push(project);
////                    console.log($scope.follwedProject);
////                })
////                .error(function (error) {
////                    console.log('error');
////                    console.log(error);
////                })
////            })
//    );

    $scope.followedProjects = [];



    $scope.alerts = [];
    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };

    //Delete user.  Will also delete user's projects are also deleted
    $scope.deleteUser = function(){
        User.delete(parameters, function() {
            $scope.alerts.push({type: 'success', msg: 'This message has been deleted'})
        })
    };


    $scope.username = '';
    $scope.firstname = '';
    $scope.lastname = '';
    $scope.email = '';
    $scope.about = '';


    $scope.editing = false;
    $scope.updateUser = function() {
        console.log('editclicked');
        $scope.editing = true;
    };

    $scope.saveChanges = function() {
        console.log('saveclicked');
        $scope.editing = false;

        $scope.user.username = $scope.username;
        $scope.user.firstname = $scope.firstname;
        $scope.user.lastname = $scope.lastname;
        $scope.user.email = $scope.email;
        $scope.user.about = $scope.about;

        User.update(parameters, $scope.user);
    };

    $scope.getProjects = function(){
        console.log($scope.user.username);
        $http.get('/projects/?username=' + $scope.user.username)
            .success(function (projects) {
                console.log(projects.results);
                $scope.projects = projects.results;
            })
            .error(function (error) {
                console.log('error');
                console.log(error);
            });
    };

    //Retrieve all of the projects a user follows
    $scope.followedProjectList = false;
//    console.log($scope.followedProjectList);
    $scope.getFollowedProjects = function(){
       console.log('clicked');
        if ($scope.followedProjectList = false) {
            console.log('false');
            $scope.followedProjectList = true;
        } else {
            console.log('true');
            $scope.followedProjectList = false;
        }

    };

    $scope.detailProject = function() {
        $http.get('/projects/' + projectId)
        .success(function (project) {
            console.log(project);
            $scope.followedProject = project;
        })
        .error(function (error) {
            console.log('error');
            console.log(error);
        });
    }

}