function projectController($scope, $http, $routeParams) {
    console.log('projectController');
    $scope.projectId = $routeParams.projectId;

    $http.get('/projects/' + $scope.projectId)
        .success(function (project) {
            console.log(project);
            $scope.project = project;
        })
        .error(function (error) {
            console.log('error');
            console.log(error);
        });
}