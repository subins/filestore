<!DOCTYPE html>
<%@page import="com.filestore.model.User"%>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="icon" href="favicon.ico">

    <title>File Store</title>

    <!-- Bootstrap core CSS -->
    <link href="lib/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">
    
    <!-- Custom styles for this template -->
    <link href="css/styles.css" rel="stylesheet">

   
    
  </head>
 <%
User user = (User)request.getAttribute("user");

%>
  <body class="ng-cloak" ng-controller="ChangePasswordController" ng-init="init();loggedInEmail='<%=user.getEmail()%>'">

    
    
    
<div class="navbar navbar-fixed-top navbar-inverse">    
<div class="container">
	<div class="navbar-header">
		<button class="navbar-toggle" type="button" data-ng-click="toggleCollapsibleMenu()">
			<span class="sr-only">Toggle navigation</span>
			<span class="icon-bar"></span>
			<span class="icon-bar"></span>
			<span class="icon-bar"></span>
		</button>
		<a href="home" target="_self" class="navbar-brand" style="margin-left: 10px">File Store</a>
	</div>
	<nav class="collapse navbar-collapse" collapse="!isCollapsed" role="navigation">
		
		
		<ul class="nav navbar-nav navbar-right" >
			<li class="dropdown">
				<a href="#" class="dropdown-toggle" data-toggle="dropdown">
                   {{loggedInEmail}} <b class="caret"></b>
                </a>
				<ul class="dropdown-menu">
					<li ng-show="authentication.user.roles.indexOf('admin')!=-1">
						<a href="updateprofile">Profile</a>
					</li>
					<li>
						<a href="changepassword">Change Password</a>
					</li>
					<li class="divider"></li>
					<li>
						<a style="cursor:pointer" ng-click="logout()" target="_self">Signout</a>
					</li>
				</ul>
			</li>
		</ul>
	</nav>
</div>
</div>




<div class="container" style="margin-top:100px">
<div class="col-md-8 col-md-offset-2">
    
    		<div ng-show="successMessage" class="alert alert-dismissible alert-success hide" ng-class="{'show':successMessage}">
		  		{{successMessage}}
			</div>
            <div ng-show="errorMessage" class="alert alert-dismissible alert-danger hide" ng-class="{'show':errorMessage}">
		  		 {{errorMessage}}
			</div>
    
    
    
    
    
    
    
    <div class="row-fluid">
             <h5>
               Change Password               
             </h5>
            
                        
    </div>
    
    
    <div class="row-fluid">
		<div class="account-wall row">
                
                <form class="form-signin" ng-submit="changepassword()" novalidate>
                
                <div class="form-group" ng-class="{'has-error':error.currentPassword}">
                <input type="password" ng-model="currentPassword" class="form-control" placeholder="Current Password" required>
                <label ng-show="error.currentPassword && error.currentPassword_required" class="control-label" for="inputError">Current password is required </label>
                <label ng-show="error.currentPassword && error.currentPassword_wrong" class="control-label" for="inputError">Current password is wrong </label>
                 </div>
                 
                 
                <div class="form-group" ng-class="{'has-error':error.newPassword}">
                <input type="password" ng-model="newPassword" class="form-control" placeholder="New Password" required>
                <label ng-show="error.newPassword && error.newPassword_required" class="control-label" for="inputError">Give New Password</label>
                 </div>
                <button class="btn btn-lg btn-primary btn-block" type="submit">
                    Change Password</button>
                <div class="col-xs-6"t style="padding-left:0px">    
                
                </div>
               
                </form>
            </div>
		</div>
		
</div>		
</div>
    
    
    
    
    
    
    
    
    
    <!-- Bootstrap core JavaScript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <script src="./lib/jquery/dist/jquery.js"></script>
    <script src="./lib/angular/angular.js"></script>
    <script src="./lib/angular-resource/angular-resource.js"></script>
    <script src="./lib/angular-cookies/angular-cookies.js"></script>
    <script src="./lib/angular-animate/angular-animate.js"></script>
    <script src="./lib/angular-touch/angular-touch.js"></script>
    <script src="./lib/angular-sanitize/angular-sanitize.js"></script>
    <script src="./lib/angular-ui-router/release/angular-ui-router.js"></script>
    <script src="./lib/angular-ui-utils/ui-utils.js"></script>
    <script src="./lib/angular-bootstrap/ui-bootstrap-tpls.js"></script>
    <script src="./lib/bootstrap/dist/js/bootstrap.js"></script>
    
    
    
    
    <script src="./js/app.js"></script>
    <script src="./js/base.js"></script>
    <script src="./js/change-password-controller.js"></script>
    

  </body>
</html>
