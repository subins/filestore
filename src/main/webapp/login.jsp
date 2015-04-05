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

    
    
    
    
<div class="container ng-cloak" ng-controller="LoginController" ng-init="init()">
    <div class="row">
        <div class="col-sm-6 col-md-4 col-md-offset-4 col-sm-offset-3">
            <h1 class="text-center login-title">Sign in to continue</h1>
            <div ng-show="success" class="alert alert-dismissible alert-success">
		  		<strong>Great!</strong> You are successfully registered <a href="login" class="alert-link">Click here to login</a>.
			</div>
            <div ng-show="passwordWrong" class="alert alert-dismissible alert-danger">
		  		 Login Failed
			</div>
            <div class="account-wall row">
                <img class="profile-img" src="https://lh5.googleusercontent.com/-b0-k99FZlyE/AAAAAAAAAAI/AAAAAAAAAAA/eu7opA4byxI/photo.jpg?sz=120"
                    alt="">
                <form class="form-signin" ng-submit="login()" novalidate>
                
                <div class="form-group" ng-class="{'has-error':error.email}">
                 <input type="text" ng-model="email" class="form-control" placeholder="Email" required autofocus>
                <label ng-show="error.email && error.email_required" class="control-label" for="inputError">Email is mandatory</label>
                 </div>
                 
                 
                <div class="form-group" ng-class="{'has-error':error.password}">
                <input type="password" ng-model="password" class="form-control" placeholder="Password" required>
                <label ng-show="error.password && error.password_required" class="control-label" for="inputError">Email is mandatory</label>
                 </div>
                <button class="btn btn-lg btn-primary btn-block" type="submit">
                    Sign in</button>
                <div class="col-xs-6"t style="padding-left:0px">    
                <label class="checkbox pull-left">
                    <input type="checkbox" value="remember-me" style="padding-left: 26px;">
                    Remember me
                </label>
                </div>
                <div class="col-xs-6"  style="padding-righ:0px">    
                <a href="register" class="pull-right need-help">Create an account </a><span class="clearfix"></span>
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
    <script src="./lib/jasny-bootstrap/dist/js/jasny-bootstrap.min.js"></script>
    
    
    <script src="./lib/cloudinary_js/js/jquery.cloudinary.js"></script>
    <!-- angular file upload -->
    <script src="./lib/ng-file-upload/angular-file-upload-shim.min.js"></script>
    <!-- cloudinary angular plugin -->
    <script src="./lib/cloudinary_ng/js/angular.cloudinary.js"></script>
    <!-- angular file upload -->
    <script src="./lib/ng-file-upload/angular-file-upload.min.js"></script> 
    
    
    
    
    
    <script src="./lib/geoPosition.js"></script>
    <script src="./js/app.js"></script>
    <script src="./js/base.js"></script>
    <!-- script src="./js/controller.js"></script-->
    <script src="./js/login-controller.js"></script>
    
  </body>
</html>
