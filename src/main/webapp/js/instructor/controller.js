'use strict';


angular.module('snaplync').controller('InstructorController', ['$cookies','$state','$rootScope','$scope','$location', '$http','fileUpload', 
                                                         function($cookies, $state, $rootScope, $scope, $location, $http,fileUpload) {
	
	
	

	
	$scope.skills = [];
	
	
	$scope.emailError = false;
	$scope.passwordError = false;
	$scope.course = {};
	$scope.resetCourse = function() {
		$scope.course = {skills: ['','',''],title:"",instructorName:"",companyName:"",benefits:"",
				description:"",price:"",hourlyBilled:true,firstBillingFree:false,
				mediumClassroom:false,mediumOnline:false,image:""};
	};
	$scope.courses=[];
	$scope.resetCourse();
	$scope.navigate = function(a) {
		if(a==2) {
			if(!validateEmail($scope.emailAddress)) {
				$scope.emailError =true;
				
			} 
			else if($scope.password.length <3) {
				$scope.passwordError =true;
			} 
			else {
				$scope.emailError =false;
				$scope.passwordError =false;
				$scope.currentPage = a;
			}
			return;
		}
		
		
		if(a==4) {
			if($scope.course.title.trim().length < 1) {
				$scope.titleError =true;
				
			} 
			else if($scope.course.instructorName.trim().length <1) {
				$scope.instructorNameError =true;
			} 
			else {
				$scope.course.instructorNameError =false;
				$scope.titleError = false;
				$scope.currentPage = a;
			}
			return;
		}
		
		if(a==5) {
			if($scope.course.skills[0].trim().length < 1) {
				$scope.primarySkillError =true;
			} else {
				$scope.course.primarySkillError =false;
				$scope.currentPage = a;
			}
			
			return;
		}
		
		
		console.log($scope.course);
		$scope.currentPage = a;
	}
	
	$scope.addCourse = function() {
		$scope.loading =true;
		$scope.uploadFile(function(status) {
    		if(status ==false) {
    			$scope.error = "File upload failed.";
    			$scope.loading=false;
    			return;
    		}
    		$scope.course.email = $scope.emailAddress;
    		$http.post("/api/course", $scope.course)
            .success(function(response){
            	
            	//$scope.navigate(9);
    			$scope.loading=false;
    			$scope.courses.push($scope.course);
    			$('#myTab a[href="#profile"]').tab('show');
    			$(".file_upload_exists").hide();
    			$(".file_upload_new").show();
    			$(".snaplync-thumpnail").html("");
    			$scope.resetCourse(); 
    			$scope.navigate(3);
            })
            .error(function(response){
            	console.log(response);
    			$scope.loading=false;
            	$scope.error = response.message;
            	
            });
    	});
	}
	
	$scope.register = function() {
		$scope.user_data = {email: $scope.emailAddress,zip:$scope.zip};
		
		
		$scope.user_data.complete=true;
		$scope.user_data.phone=$scope.phone;
		$scope.user_data.password=$scope.password;
		$scope.user_data.instructor = true;
		
		$scope.loading=true;
    	
		$http.post("/api/user", $scope.user_data)
        .success(function(response){
        	$scope.loading=false;
        	$scope.navigate(3);
        })
        .error(function(response){
        	$scope.error = "Some problem in registering you, please contact support@snaplync.com"
        	console.log(response);
        	$scope.navigate(2);
        	$scope.loading=false;
        	
        });
	}
	
	
	
	
	
	$scope.init = function() {
		$scope.currentPage = 1;
		if(geoPosition.init()){  // Geolocation Initialisation
			var zip = $scope.getZipCode() 	
			if(zip == null) {
				geoPosition.getCurrentPosition(success_callback,error_callback,{enableHighAccuracy:true});
			} else {
				$scope.zip = zip;
			}
            
	    }else{
	    	console.log("not enabled");
	          // You cannot use Geolocation in this device
	    }
		$http.get('/api/skill').success(function(response) {
			$scope.skills = response;
            $scope.skills_count = response.length;
            
        }).error(function(response) {
            $scope.error = "Something went wrong";
            
        });
	    // p : geolocation object
	    function success_callback(p){
	    	var params = {
	    	        lat: p.coords.latitude,
	    	        lng: p.coords.longitude,
	    	        username: 'subinseba'
	    	    };
	        $scope.$apply(function() {
	        	$http.get('http://api.geonames.org/findNearbyPostalCodesJSON',{'params':params}).success(function(response) {
	    			console.log(response);
	    			$scope.setZipCode(response['postalCodes'][0]['postalCode']);
	    			console.log($scope.zip);
	                
	            }).error(function(response) {
	                $scope.error = "Something went wrong";
	                
	            });
	        	
	        })
	    }
	
	    function error_callback(p){
	    	$scope.zip = "failed";
	    	$scope.$apply();
	    	console.log("error");
	    }
	}
	
	$scope.showUpdateZip = function() {
		$('.zipupdate').modal({
			  keyboard: true,
			  backdrop: true
			})
	}
	$scope.gotoStudentRegistration = function() {
		$location.url('/student');
	}
	$scope.gotoInstructorRegistration = function() {
		$location.url('/instructor');
	}
	$scope.updateZipCode =function() {
		var regPostalCode = new RegExp("^[0-9]+$");
	    var postal_code = $scope.zip;
	    if (regPostalCode.test(postal_code) == false) {
	    	$scope.zipcodeerror=true;
	    	return;
	    }
	    
		$scope.setZipCode($scope.zip);
		$('.zipupdate').modal('hide')
	}
	$scope.setZipCode = function(zip) {
		$scope.zip = zip
		$cookies.zipcode = zip;
	}
	$scope.getZipCode = function(success, failure) {
		if($scope.zip !=null && $scope.zip != undefined) {
			return $scope.zip;
		} else {
			var zip = $cookies.zipcode;
			if(!zip) zip=null;
			return zip;
		}
	}	
	
	$scope.uploadFile = function(callback){
		if(document.getElementById("myFile").files ==null || document.getElementById("myFile").files[0]==null) {
			callback(true);
			return;
		}
        var file = document.getElementById("myFile").files[0]
        var fd = new FormData();
        fd.append('file', file);
        console.log('file is ' + JSON.stringify(file));
        var uploadUrl = "/api/file/upload";
        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .success(function(response){
        	console.log(response);
        	$scope.course.image = response.path;
        	callback(true);
        })
        .error(function(response){
        	console.log(response);
        	callback(false);
        });
    };
	
	
}]);
function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}