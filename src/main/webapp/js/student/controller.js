'use strict';


angular.module('snaplync').controller('StudentController', ['$cookies','$state','$rootScope','$scope','$location', '$http','fileUpload', 
                                                         function($cookies, $state, $rootScope, $scope, $location, $http,fileUpload) {
	
	
	

	$scope.emailError = false;
	$scope.reasonsForFreeClass = [
	                             {"message":"I am preparing and studying for a new Job", "selected":false},
	                             {"message":"I am in college or recent graduate and entering job market", "selected":false}
	                             ];
	$scope.expLevel='1-5';
	$scope.businessFunctions = [
	                           {"message":"Banking, Finance and Accounting","selected":false},
	                           {"message":"Retail and Logistics","selected":false},
	                           {"message":"Information Technology","selected":false},
	                           {"message":"Computer Hardware","selected":false},
	                           {"message":"Healthcare and Pharmacuticals","selected":false},
	                           {"message":"Media , Entertainment and Publishing","selected":false},
	                           {"message":"Hospitality and Sports","selected":false},
	                           {"message":"Other","selected":false,'value':''}
	                           
	                           ];
	$scope.areasOfInterest = [
		                           {"message":"Big Data Technologies ( Hadoop and MongoDB)","selected":false},
		                           {"message":"Java & J2EE technologies","selected":false},
		                           {"message":"Microsoft Technologies","selected":false},
		                           {"message":"ERP Technologies ( SAP , Oracle)","selected":false},
		                           {"message":"Database technologies","selected":false},
		                           {"message":"Quality Assurance Technologies etc","selected":false},
		                           {"message":"Project Management ( PMP and PgMP)","selected":false},
		                           {"message":"Other","selected":false,'value':''}
		                           
		                           ];
	
	$scope.navigate = function(a) {
		if(a==2) {
			if(!validateEmail($scope.emailAddress)) {
				$scope.emailError =true;
				
			} else {
				$scope.emailError =false;
				$scope.currentPage = a;
			}
			return;
		}
		$scope.currentPage = a;
	}
	
	
	$scope.register = function() {
		$scope.user_data = {email: $scope.emailAddress,zip:$scope.zip, experienceLevel: $scope.expLevel};
		
		var reasonForFreeClass="";
		for(var i =0; i < $scope.reasonsForFreeClass.length; i++) {
			if($scope.reasonsForFreeClass[i].selected) {
				if("" != reasonForFreeClass) {
					reasonForFreeClass +="::"
				}
				if($scope.reasonsForFreeClass[i].message=="Other") {
					reasonForFreeClass +=$scope.reasonsForFreeClass[i].message+"||"+$scope.reasonsForFreeClass[i].value;
				} else {
					reasonForFreeClass +=$scope.reasonsForFreeClass[i].message;
				}
			}
		}
		$scope.user_data.reasonForFreeClass=reasonForFreeClass;
		
		var businessFunction="";
		for(var i =0; i < $scope.businessFunctions.length; i++) {
			if($scope.businessFunctions[i].selected) {
				if("" != businessFunction) {
					businessFunction +="::"
				}
				if($scope.businessFunctions[i].message=="Other") {
					businessFunction +=$scope.businessFunctions[i].message+"||"+$scope.businessFunctions[i].value;
				} else {
					businessFunction +=$scope.businessFunctions[i].message;
				}
			}
		}
		$scope.user_data.businessFunction=businessFunction;
		
		
		var areaOfInterest="";
		for(var i =0; i < $scope.areasOfInterest.length; i++) {
			if($scope.areasOfInterest[i].selected) {
				if("" != areaOfInterest) {
					areaOfInterest +="::"
				}
				if($scope.areasOfInterest[i].message=="Other") {
					areaOfInterest +=$scope.areasOfInterest[i].message+"||"+$scope.areasOfInterest[i].value;
				} else {
					areaOfInterest +=$scope.areasOfInterest[i].message;
				}
			}
		}
		$scope.user_data.areaOfInterest=areaOfInterest;
		$scope.user_data.complete=true;
		
		
		console.log($scope.user_data);
		$scope.loading=true;
    	
		$http.post("/api/user", $scope.user_data)
        .success(function(response){
        	$scope.loading=false;
        	$scope.navigate(6);
        })
        .error(function(response){
        	$scope.error = "Some problem in registering you, please contact support@snaplync.com"
        	console.log(response);
        	$scope.navigate(6);
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
	
	
	
}]);
function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}