'use strict';

angular.module('snaplync').controller('HomeController', ['$state','$rootScope','$scope','$location', '$http','fileUpload', 
                                                         function($state, $rootScope, $scope, $location, $http,fileUpload) {
	
	$rootScope.$on('$stateChangeSuccess',function(){
	    $("html, body").animate({ scrollTop: 0 }, 200);
	})
	
	$scope.user_data = {seekingSkills:["",""],havingSkills:["",""], company_profile:{}};
	$scope.user_data.company_profile.courses=[{skill:"",instructor:"",instructor_email:"",hourly_charge:"",medium:"",no_of_seats:""}];
	
	$scope.addNewCourse = function() {
		var course={skill:"",instructor:"",instructor_email:"",hourly_charge:"",medium:"",no_of_seats:""};
		$scope.user_data.company_profile.courses.push(course);
			
	}
	$scope.removeCourseSkill = function(i) {
		$scope.user_data.company_profile.courses.splice(i,1);
	}
	
	$scope.skills = [];
	
	$scope.init = function() {
		
		$http.get('/api/skill').success(function(response) {
			$scope.skills = response;
            $scope.skills_count = response.length;
            
        }).error(function(response) {
            $scope.error = "Something went wrong";
            
        });
	}
	
	$scope.validateCompanyState2 = function(evt) {
		if(!$scope.user_data.company) {
			if(evt) { 
				evt.preventDefault();
				$state.transitionTo('state1');
			}
			
		}
	    
	}
	$scope.validateState2 = function(evt) {
		if(!$scope.user_data.individual) {
			if(evt) { 
				evt.preventDefault();
				$state.transitionTo('state1');
			}
			
		}
	    
	}
	$scope.validateCompanyState3 = function(evt) {
		if(!($scope.user_data.fullName && $scope.user_data.email && $scope.user_data.password)) {
			if(evt) { 
				evt.preventDefault();
				$state.transitionTo('companyState2');
			} else {
				return true;
			}
			
		} else {
			return false;
		}
	    
	}
	$scope.validateState3 = function(evt) {
		if(!($scope.user_data.fullName && $scope.user_data.email && $scope.user_data.password)) {
			if(evt) { 
				evt.preventDefault();
				$state.transitionTo('state2');
			} else {
				return true;
			}
			
		} else {
			return false;
		}
	    
	}
	$scope.validateCompanyState4 = function(evt) {
		$scope.validateCompanyState3(evt);
		if(!($scope.user_data.company_profile.online || $scope.user_data.company_profile.classroom)) {
			if(evt) { 
				evt.preventDefault();
				$state.transitionTo('companyState3');
			} else {
				return true;
			}
			
		} else {
			return false;
		}
	}
	$scope.validateState4 = function(evt) {
		$scope.validateState3(evt);
	    var proceed =false;
	    for(var i=0; i<$scope.user_data.seekingSkills.length; i++) {
	    	if($scope.user_data.seekingSkills[i]!=null){
	    		if($scope.user_data.seekingSkills[i].name) {
    				$scope.user_data.seekingSkills[i] = $scope.user_data.seekingSkills[i].name;
    			}
	    		if($scope.user_data.seekingSkills[i].trim()!="") {
	    			proceed =true;
	    		}
	    	}
	    		
	    	
	    }
	    if(!proceed) {
	    	if(evt) { 
	    		evt.preventDefault();
	    		$state.transitionTo('state3');
	    	} else {
	    		return true;
	    	}
			
	    } else {
	    	return false;
	    }
	}
	$scope.validateCompanyState5 = function(evt) {
		$scope.validateCompanyState4(evt);
		var proceed =false;
		for(var i=0; i < $scope.user_data.company_profile.courses.length; i++) {	
			if($scope.user_data.company_profile.courses[i].skill!=null) {
				if($scope.user_data.company_profile.courses[i].skill.name) {
					if($scope.user_data.company_profile.courses[i].skill.name.trim()!="") {
						proceed =true
					}
				} else {
					if($scope.user_data.company_profile.courses[i].skill.trim()!="") {
						proceed =true;
					}
				}
				
			}
		}
		
		if(!proceed) {
    		if(evt) { 
    			evt.preventDefault();
    			$state.transitionTo('companyState4');
    		} else {
    			return true;
    		}
			
    	} else {
    		return false;
    	}
	}
	$scope.validateState5 = function(evt) {
		$scope.validateState4(evt);
		var proceed =false;
    	for(var i=0; i < $scope.user_data.havingSkills.length; i++) {
    		if($scope.user_data.havingSkills[i]) {
    			if($scope.user_data.havingSkills[i].name) {
    				$scope.user_data.havingSkills[i] = $scope.user_data.havingSkills[i].name;
    			}
    			if($scope.user_data.havingSkills[i].trim()!="") {
    				proceed =true;
    			}
    		}
    	}
    	if(!proceed) {
    		if(evt) { 
    			evt.preventDefault();
    			$state.transitionTo('state4');
    		} else {
    			return true;
    		}
			
    	} else {
    		return false;
    	}
    	
	}
	$scope.validateCompanyState6 = function(evt) {
		$scope.validateCompanyState5(evt);
		
	    
	}
	$scope.validateState6 = function(evt) {
		$scope.validateState5(evt);
		if(!($scope.user_data.companyName && $scope.user_data.title)) {
			if(evt) { 
				evt.preventDefault();
				$state.transitionTo('state5');
			} else {
				return true
			}
			
		} else {
			return false;
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
        	$scope.user_data.photo = response.path;
        	callback(true);
        })
        .error(function(response){
        	console.log(response);
        	callback(false);
        });
    };
	$scope.addHavingSkill = function() {
		var skill="";
		$scope.user_data.havingSkills.push(skill);
	}
	$scope.addSeekingSkill = function() {
		var skill="";
		$scope.user_data.seekingSkills.push(skill);
	}
	$scope.removeSeekingSkill = function(index) {
		$scope.user_data.seekingSkills.splice(index, 1);
	}
	$scope.removeHavingSkill = function(index) {
		$scope.user_data.havingSkills.splice(index, 1);
	}
	
	
	
	
	
	$scope.gotoState1= function() {
		$state.transitionTo('state1');
	}
	$scope.gotoState2= function() {
		$scope.user_data.individual = true;
		$state.transitionTo('state2');
	}
	$scope.gotoState3= function() {
		$state.transitionTo('state3');
	}
	$scope.gotoState4= function() {
		$state.transitionTo('state4');
	}
	$scope.gotoState5= function() {
		$state.transitionTo('state5');
	}
	$scope.gotoState6= function() {
		$state.transitionTo('state6');
	}
	$scope.gotoState7= function() {
		$state.transitionTo('state7');
	}
	

	$scope.gotoCompanyState2= function() {
		$scope.user_data.company = true;
		$state.transitionTo('companyState2');
	}
	$scope.gotoCompanyState3= function() {
		$state.transitionTo('companyState3');
	}
	$scope.gotoCompanyState4= function() {
		$state.transitionTo('companyState4');
	}
	$scope.gotoCompanyState5= function() {
		$state.transitionTo('companyState5');
	}
	$scope.gotoCompanyState6= function() {
		$state.transitionTo('companyState6');
	}
	$scope.gotoCompanyState7= function() {
		$state.transitionTo('companyState7');
	}
	
	$scope.uploadFileAndGotoCompanyState6 = function() {
		$scope.loading=true;
    	$scope.uploadFile( function() {
			console.log("file uploaded");
			$state.transitionTo('companyState6');
			$scope.loading=false;
		});
	}
	$scope.registerNewCompany= function() {
		$scope.loading=true;
		$scope.user_data.complete=true;
		for(var i=0; i < $scope.user_data.company_profile.courses.length; i++) {
    		
			if($scope.user_data.company_profile.courses[i].skill) {
    			if($scope.user_data.company_profile.courses[i].skill.name) {
    				$scope.user_data.company_profile.courses[i].skill = $scope.user_data.company_profile.courses[i].skill.name;
    			}
    			
    		}
    	}
		$http.post("/api/user", $scope.user_data)
        .success(function(response){
        	console.log(response);
        	$state.transitionTo('companyState7');
        	$scope.loading=false;
        	$scope.temp_user_data = {fullName: $scope.user_data.fullName};
        	$scope.user_data = {seekingSkills:["",""],havingSkills:["",""], saved:true}; 
        	
        })
        .error(function(response){
        	$scope.error = "Some problem in registering you, please contact support@snaplync.com"
        	console.log(response);
        	$state.transitionTo('companyState6');
        	$scope.loading=false;
        	
        });
	}
	
	
	
	
	$rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams) {
		if(toState.name == "state2") {
	    	$scope.validateState2(e);
	    	
	    }
		if(toState.name == "state3") {
	    	$scope.validateState3(e);
	    	if($scope.user_data.email) {
		    	$scope.user_data.complete = false;
	    		$http.post("/api/user", $scope.user_data)
	            .success(function(response){
	            	console.log(response);
	            	
	            })
	            .error(function(response){
	            	console.log(response);;
	            	
	            });
	    	}
	    }
	    if(toState.name == "state4") {
	    	$scope.validateState4(e);
	    	
	    }
	    if(toState.name == "state5") {
	    	$scope.validateState5(e);
	    	
	    }
	    if(toState.name == "state6") {
	    	$scope.validateState6(e);
	    	
	    }
	    if(toState.name == "state7") {
	    	if(!$scope.user_data.saved) {
		    	var proceed = $scope.validateState6(e);
		    	console.log("says proceed ="+proceed);
		    	if(!$scope.user_data.fullName) {
		    		return;
		    	}
		    	$scope.loading=true;
		    	$scope.uploadFile(function(status) {
		    		if(status ==false) {
		    			$scope.error = "File upload failed.";
		    			$scope.loading=false;
		    			return;
		    		}
		    		$scope.user_data.complete = true;
		    		$http.post("/api/user", $scope.user_data)
		            .success(function(response){
		            	console.log(response);
		            	$scope.temp_user_data = {fullName: $scope.user_data.fullName};
		            	$scope.user_data = {seekingSkills:["",""],havingSkills:["",""], saved:true}; 
		            	$state.transitionTo('state7');
		    			$scope.loading=false;
		            })
		            .error(function(response){
		            	console.log(response);
		    			$scope.loading=false;
		            	$scope.error = response.message;
		            	
		            });
		    	});
		    	
		    	e.preventDefault();
				$state.transitionTo('state6');
	    	
	    	}
	    }
	    if(toState.name == "companyState2") {
	    	$scope.validateCompanyState2(e);
	    }
	    if(toState.name == "companyState3") {
	    	$scope.validateCompanyState3(e);
	    	
	    }
	    if(toState.name == "companyState4") {
	    	$scope.validateCompanyState4(e);
	    	
	    }
	    if(toState.name == "companyState5") {
	    	$scope.validateCompanyState5(e);
	    	
	    }
	    if(toState.name == "companyState6") {
	    	
	    	$scope.validateCompanyState6(e);
	    	
	    	
	    }
	});
	
	
	
	
	
}]);