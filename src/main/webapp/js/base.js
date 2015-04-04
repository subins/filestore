'use strict';

var ApplicationConfiguration={};
ApplicationConfiguration.applicationModuleName="filestore";
ApplicationConfiguration.applicationModuleVendorDependencies=['ngResource', 'ngCookies', 'ngAnimate', 'ngTouch', 'ngSanitize',
                                                              'ui.router', 'ui.bootstrap', 'ui.utils'];
angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);

//Setting HTML5 Location Mode
angular.module(ApplicationConfiguration.applicationModuleName).config(['$locationProvider',
	function($locationProvider) {
		$locationProvider.hashPrefix('!');
	}
]);

//Then define the init function for starting up the application
angular.element(document).ready(function() {
	//Fixing facebook bug with redirect
	if (window.location.hash === '#_=_') window.location.hash = '#!';

	//Then init the app
	angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
});


//// Setting up route
//angular.module('filestore').config(['$stateProvider', '$urlRouterProvider','$locationProvider',
//	function($stateProvider, $urlRouterProvider,$locationProvider) {
//		// Articles state routing
//		$stateProvider.
//		state('state1', {
//			url: '/state1',
//			templateUrl: 'views/state1.client.view.html'
//		}).
//		state('state2', {
//			url: '/state2',
//			templateUrl: 'views/state2.client.view.html'
//		}).
//		state('state3', {
//			url: '/state3',
//			templateUrl: 'views/state3.client.view.html'
//		}).
//		state('state4', {
//			url: '/state4',
//			templateUrl: 'views/state4.client.view.html'
//		}).
//		state('state5', {
//			url: '/state5',
//			templateUrl: 'views/state5.client.view.html'
//		}).
//		state('state6', {
//			url: '/state6',
//			templateUrl: 'views/state6.client.view.html'
//		}).
//		state('state7', {
//			url: '/state7',
//			templateUrl: 'views/state7.client.view.html'
//		}).
//		state('companyState2', {
//			url: '/company-state-2',
//			templateUrl: 'views/companyState2.client.view.html'
//		}).
//		state('companyState3', {
//			url: '/company-state-3',
//			templateUrl: 'views/companyState3.client.view.html'
//		}).
//		state('companyState4', {
//			url: '/company-state-4',
//			templateUrl: 'views/companyState4.client.view.html'
//		}).
//		state('companyState5', {
//			url: '/company-state-5',
//			templateUrl: 'views/companyState5.client.view.html'
//		}).
//		state('companyState6', {
//			url: '/company-state-6',
//			templateUrl: 'views/companyState6.client.view.html'
//		}).
//		state('companyState7', {
//			url: '/company-state-7',
//			templateUrl: 'views/companyState7.client.view.html'
//		}).
//		state('home', {
//			url: '/',
//			templateUrl: 'views/home.client.view.html'
//		});
//		$locationProvider.html5Mode(true);
//		$urlRouterProvider.otherwise('/');
//	}
//]);

angular.module('filestore').filter('trim', function() {
    return function(input, length) {
        if(length < 1) {
            length =1;
        }
        if(input!="undefined" && input!=null && input.length>length+3) {
            return input.substring(0,length) +"...";
        } else {
            return input;
        }
    };
});

angular.module('filestore').directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            
            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);

angular.module('filestore').service('fileUpload', ['$http', function ($http) {
    this.uploadFileToUrl = function(file, uploadUrl, callback){
        var fd = new FormData();
        fd.append('file', file);
        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .success(function(response){
        	callback(response);
        })
        .error(function(response){
        	callback(response);
        });
    }
}]);
angular.module('filestore').directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });

                event.preventDefault();
            }
        });
    };
});


