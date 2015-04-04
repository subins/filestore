'use strict';


angular.module('filestore').controller('HomeController', ['$window','$cookies','$state','$rootScope','$scope','$location', '$http', 
                                                         function($window, $cookies, $state, $rootScope, $scope, $location, $http) {
	
	
	$scope.init = function() {
		$http.get("api/file")
        .success(function(response){
        	console.log(response);
        	$scope.files =response.files;
        
        })
        .error(function(response){
        	console.log(response);
        	
        });
	}
	
	$scope.toggleCollapsibleMenu = function() {
		$scope.isCollapsed = !$scope.isCollapsed;
	};
	
	$scope.popup = function() {
		$('#upload').modal({backdrop:true});
		$('#myFile').val('');
		
	}
	
	$scope.uploadFile = function(callback){
		if(document.getElementById("myFile").files ==null || document.getElementById("myFile").files[0]==null) {
			return;
		}
        var file = document.getElementById("myFile").files[0]
        var fd = new FormData();
        fd.append('file', file);
        console.log('file is ' + JSON.stringify(file));
        var uploadUrl = "api/file/upload";
        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .success(function(response){
        	console.log(response);
        	$('#upload').modal('hide');
        	$scope.init();
        
        })
        .error(function(response){
        	console.log(response);
        	
        });
    };
    $scope.setPublic = function(file) {
    	var obj = angular.copy(file, obj);
    	obj.open=true;
    	delete obj.owner;
    	delete obj.created;
    	delete obj.contentType;
    	$http.put("api/file", obj)
        .success(function(response){
        	console.log(response);
        	file.open=true;
        
        })
        .error(function(response){
        	console.log(response);
        	
        });
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
    $scope.setPrivate = function(file) {
    	var obj = angular.copy(file, obj);
    	obj.open=false;
    	delete obj.owner;
    	delete obj.created;
    	delete obj.contentType;
    	$http.put("api/file", obj)
        .success(function(response){
        	console.log(response);
        	file.open=false;
        
        })
        .error(function(response){
        	console.log(response);
        	
        });
    } 
	
	
	
}]);
angular.module('filestore').filter('memory', function() {
    return function(bytes, precision) {
        if (isNaN(parseFloat(bytes)) || !isFinite(bytes)) return '-';
        if (typeof precision === 'undefined') precision = 1;
        var units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB'],
            number = Math.floor(Math.log(bytes) / Math.log(1024));
        return (bytes / Math.pow(1024, Math.floor(number))).toFixed(precision) +  ' ' + units[number];
    }
});
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
