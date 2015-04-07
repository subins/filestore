'use strict';


angular.module('filestore').controller('UpdateProfileController', ['$window','$cookies','$state','$rootScope','$scope','$location', '$http', 
                                                         function($window, $cookies, $state, $rootScope, $scope, $location, $http) {
	
	
	$scope.init = function() {
		$scope.error ={};
	}
	
	
	$scope.toggleCollapsibleMenu = function() {
		$scope.isCollapsed = !$scope.isCollapsed;
	};
	
	$scope.updateprofile =  function() {
		$scope.clearError();
		if($scope.email== undefined || $scope.email=="") {
			$scope.error.email=true;
			$scope.error.email_required =true;
			return;
		}
		if(!validateEmail($scope.email)) {
			$scope.error.email=true;
			$scope.error.email_format =true;
			return;
		}
		if($scope.fullName=="") {
			$scope.error.fullName=true;
			$scope.error.fullName_required =true;
			return;
		}
		$http.post('api/user/updateprofile',{fullName:$scope.fullName,email:$scope.email})
		.success(function(response) {
			$scope.errorMessage= null;
			$scope.successMessage = "Updated user profile";
        	
            
        }).error(function(data, status, headers, config) {
        	$scope.successMessage = null;
        	
        	$scope.errorMessage= "Profile update failed";
        });
		
		
		
	}
	
	$scope.clearError = function() {
		for (var variableKey in $scope.error){
		    if ($scope.error.hasOwnProperty(variableKey)){
		        delete $scope.error[variableKey];
		    }
		}
		$scope.errorMessage=null;
		$scope.successMessage=null;
		$scope.errorMessage= null;
	}
	$scope.logout = function() {
    	$http.get("api/user/logout")
        .success(function(response){
        	$window.location="home";
        
        })
        .error(function(response){
        	$window.location="home";
        	
        });
    } 
	
}]);

function validateEmail(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
}