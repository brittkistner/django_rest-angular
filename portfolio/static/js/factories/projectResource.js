portfolio.factory('ProjectResource', function($resource) {
    return $resource('/projects/', {
            //paramDefaults
        }, {
            //Actions
            update: {method: 'PUT'}

        }
    );
});