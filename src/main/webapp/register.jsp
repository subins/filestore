<!DOCTYPE html>
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

  <body>

    
    
    
    
<div class="container  ng-cloak" data-ng-controller="RegisterController" data-ng-init="init()">
    <div class="row">
    
        <div class="col-sm-6 col-md-4 col-md-offset-4 col-sm-offset-3">
            <h1 class="text-center login-title">Create an account</h1>
            <div ng-show="success" class="alert alert-dismissible alert-success">
		  		<strong>Great!</strong> You are successfully registered <a href="login" class="alert-link">Click here to login</a>.
			</div>
            <div ng-show="errorMessage" class="alert alert-dismissible alert-danger">
		  		 Registration failed, please contact support.
			</div>
            
            <div class="account-wall row">
                <img class="profile-img" src="https://lh5.googleusercontent.com/-b0-k99FZlyE/AAAAAAAAAAI/AAAAAAAAAAA/eu7opA4byxI/photo.jpg?sz=120"
                    alt="">
                <form class="form-signin" novalidate="novalidate" ng-submit="register()" method="post">
                <div class="form-group" ng-class="{'has-error':error.email}">
                 <input name="email" ng-model="user.email" type="text" class="form-control" placeholder="Give your Email" required autofocus>
                 <label ng-show="error.email && error.email_required" class="control-label" for="inputError">Email is mandatory</label>
                 <label ng-show="error.email && error.email_exists" class="control-label" for="inputError">Email already in use</label>
                 <label ng-show="error.email && error.email_format" class="control-label" for="inputError">Give a valid email address</label>
                
                </div>
                
                <div class="form-group" ng-class="{'has-error':error.password}">
                <input name="password" ng-model="user.password"  type="password" class="form-control" placeholder="Choose a Password" required>
                <label ng-show="error.password && error.password_required" class="control-label" for="inputError">Password is mandatory</label>
                 
                </div>
                
                <div class="form-group" ng-class="{'has-error':error.confirmPassword}">
                <input name="confirmPassword" ng-model="user.confirmPassword" type="password" class="form-control" placeholder="Password once again" required>
                <label ng-show="error.confirmPassword && error.confirmPassword_required" class="control-label" for="inputError">Confirm your password</label>
                <label ng-show="error.confirmPassword && error.confirmPassword_match" class="control-label" for="inputError">Passwords are not matching</label>
                
                </div>
                
                <input name="fullName" ng-model="user.fullName" type="text" class="form-control" placeholder="Give your full name" required>
                <br>
                <button class="btn btn-lg btn-primary btn-block" type="submit">
                
                    Register</button>
                
                <label class="pull-right">
                    Already a member?&nbsp; 
                    <a href="login" class="need-help">Login </a><span class="clearfix"></span>
                
                </label>
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
    <script src="./lib/jasny-bootstrap/dist/js/jasny-bootstrap.min.js"></script>
    
    
    
    
    
    
    
    <script src="./js/app.js"></script>
    <script src="./js/base.js"></script>
    <script src="./js/register-controller.js"></script>
    
  </body>
</html>
