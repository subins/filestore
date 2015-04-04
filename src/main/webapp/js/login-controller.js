'use strict';


angular.module('filestore').controller('LoginController', ['$window','$cookies','$state','$rootScope','$scope','$location', '$http', 
                                                         function($window,$cookies, $state, $rootScope, $scope, $location, $http) {
	
	
	$scope.init = function() {
		$scope.user={email:"",password:""};
		$scope.error={};
		$scope.success = false;
	}
	$scope.login = function() {
		$scope.clearError();
		if(!$scope.email || $scope.email=="") {
			$scope.error.email=true;
			$scope.error.email_required =true;
			return;
		}
		
		if(!$scope.password || $scope.password=="") {
			$scope.error.password=true;
			$scope.error.password_required =true;
			return;
		}
		
		var obj ={};
		$http.post('api/user/login',{email:$scope.email,password:$scope.password})
		.success(function(response) {
            
            $scope.success = true;
            $cookies.sessionid = response.value;
            $window.location="home";
            
        }).error(function(data, status, headers, config) {
        	$scope.success = false;
        	if(status == 402) {
        		$scope.passwordWrong =true;
        	}
        	
        });
		
		
	}
	
	$scope.clearError = function() {
		for (var variableKey in $scope.error){
		    if ($scope.error.hasOwnProperty(variableKey)){
		        delete $scope.error[variableKey];
		    }
		}
		$scope.errorMessage=null;
	}
	
}]);
