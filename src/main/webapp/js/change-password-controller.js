'use strict';


angular.module('filestore').controller('ChangePasswordController', ['$window','$cookies','$state','$rootScope','$scope','$location', '$http', 
                                                         function($window, $cookies, $state, $rootScope, $scope, $location, $http) {
	
	
	$scope.init = function() {
		$scope.error={};
	}
	
	
	
	$scope.changepassword =  function() {
		$scope.clearError();
		if($scope.currentPassword == undefined || $scope.currentPassword=="") {
			$scope.error.currentPassword=true;
			$scope.error.currentPassword_required =true;
			return;
		}
		if($scope.newPassword == undefined || $scope.newPassword=="") {
			$scope.error.newPassword=true;
			$scope.error.newPassword_required =true;
			return;
		}
		
		$http.post('api/user/changepassword',{newPassword:$scope.newPassword,currentPassword:$scope.currentPassword})
		.success(function(response) {
			$scope.errorMessage= null;
			$scope.successMessage = "Updated password";
        	
            
        }).error(function(data, status, headers, config) {
        	$scope.successMessage = null;
        	$scope.errorMessage= "Password update failed";
        	if(status == 502) {
        		$scope.error.currentPassword_wrong= true;
        		$scope.error.currentPassword =true;
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
		$scope.successMessage=null;
		$scope.errorMessage= null;
	}
	
	$scope.toggleCollapsibleMenu = function() {
		$scope.isCollapsed = !$scope.isCollapsed;
	};
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

