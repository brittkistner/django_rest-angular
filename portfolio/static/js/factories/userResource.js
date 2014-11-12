portfolio.factory('User', function($resource) {
    return $resource('/users/:userId', {
            //paramDefaults
        }, {
            //Actions
            update: {method: 'PUT'}

        }
    );
});