'use strict';


angular.module('filestore').controller('RegisterController', ['$cookies','$state','$rootScope','$scope','$location', '$http', 
                                                         function($cookies, $state, $rootScope, $scope, $location, $http) {
	
	
	$scope.init = function() {
		$scope.user={email:"",password:"",confirmPassword:""};
		$scope.error={};
		$scope.success = false;
	}
	
	$scope.register = function() {
		$scope.clearError();
		if($scope.user.email=="") {
			$scope.error.email=true;
			$scope.error.email_required =true;
			return;
		}
		if(!validateEmail($scope.user.email)) {
			$scope.error.email=true;
			$scope.error.email_format =true;
			return;
		}
		if($scope.user.password=="") {
			$scope.error.password=true;
			$scope.error.password_required =true;
			return;
		}
		if($scope.user.confirmPassword=="") {
			$scope.error.confirmPassword=true;
			$scope.error.confirmPassword_required =true;
			return;
		}
		if($scope.user.confirmPassword!=$scope.user.password) {
			$scope.error.confirmPassword=true;
			$scope.error.confirmPassword_match =true;
			return;
		}
		var obj ={};
		angular.copy($scope.user, obj)
		delete obj.confirmPassword;
		$http.post('api/user/register',obj)
		.success(function(response) {
            
            $scope.success = true;
            
        }).error(function(data, status, headers, config) {
        	$scope.success = false;
        	if(status ==502) {
        		$scope.error.email=true;
    			$scope.error.email_exists=true;
        	} else {
        		$scope.errorMessage = "User Registration failed."
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

function validateEmail(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
}
