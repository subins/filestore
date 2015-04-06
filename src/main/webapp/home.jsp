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
String url = request.getRequestURL().toString();
	    url= url.substring(0, url.lastIndexOf("/")+1);
	    
%>
<%=url %>
  <body class="ng-cloak" ng-controller="HomeController" ng-init="init();loggedInEmail='<%=user.getEmail()%>';base_url='<%=url%>';">

    
    
    
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
    
    
    
    
    
    
    
    
    
    <div class="row-fluid">
             <h5>
               All Files               
             </h5>
            
                        
    </div>
    <div class="row" style="margin-bottom:5px">
    	<div class="col-md-1 pull-left">
            <button type="button" class="btn btn-primary" ng-click="popup()">Upload</button>
        </div>
    </div>
    
    <div class="row-fluid">
		<table class="table table-striped table-hover table-responsive" cellspacing="0" sortable="sortable">
		  
		  <tr class="sky_blue_head">
		                             <th>Id</th>
		                             <th>File Name</th>
		                             <th>Size</th>
		                             <th>Content Type</th>
		                             <th style="min-width: 100px">Public</th>
		                             <th style="text-align:center" width="20%">Public Link</th>
		                               </tr>
		                               <tr ng-repeat="file in files">
		                                 <td><a target="_blank" href="api/file/download?fileid={{file.id}}">{{file.id}}</a></td>
		                                 <td><a target="_blank" href="api/file/download?fileid={{file.id}}">{{file.name |trim:30}}</a></td>
		                                 <td>{{file.size | memory}}</td>
		                                 <td>{{file.contentType}}</td>
		                                 <td> 
		                                 	<button type="button" class="btn btn-default btn-xs" ng-class="{'btn-success': file.open}" ng-click="setPublic(file)">yes</button>
  											<button type="button" class="btn btn-default btn-xs" ng-class="{'btn-success':!file.open}" ng-click="setPrivate(file)">no</button>
		                                 </td>
		                                 
		                                 
		                                 <td><input type="text" ng-disabled="!file.open" value="{{base_url}}api/file/download?fileid={{file.id}}"/></td>
		                                 
		
		                          </tr>
		                          
		
		</table>  
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
    
    
    <script src="./lib/cloudinary_js/js/jquery.cloudinary.js"></script>
    <!-- angular file upload -->
    <script src="./lib/ng-file-upload/angular-file-upload-shim.min.js"></script>
    <!-- cloudinary angular plugin -->
    <script src="./lib/cloudinary_ng/js/angular.cloudinary.js"></script>
    <!-- angular file upload -->
    <script src="./lib/ng-file-upload/angular-file-upload.min.js"></script> 
    
    
    
    
    
    <script src="./js/app.js"></script>
    <script src="./js/base.js"></script>
    <script src="./js/home-controller.js"></script>
    
    
    <!-- upload modal -->
<div class="modal" id="upload" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-center">
    <div class="modal-content">
      <div class="modal-header" style="border-radius:0px;background: #2196f3">
        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
        <h4 class="modal-title" style="color:white" id="myModalLabel">Upload a new file</h4>
      </div>
      <div class="modal-body">
        <div class="container-fluid">
        
            <form  name="details_form" id="details_form" class="form-horizontal" role="form" novalidate>
                                
                   <div class="alert alert-danger" role="alert" data-ng-if="popup_error" data-ng-bind="popup_error">{{popup_error}}</div>
                   <div class="alert alert-info" role="alert" data-ng-if="popup_info" data-ng-bind="popup_info">{{popup_info}}</div>
                               <div>
                                    <input type="file" class="form-control" id="myFile" name="myFile" data-ng-model="myFile">
                                </div>
                                 
             </form>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" data-ng-click="uploadFile()">{{loading?'Uploading':'Upload'}}<img data-ng-show="loading" class="snaplync-loading" src="img/ajax-loader-fb.gif"></button>
      </div>
    </div>
  </div>
</div>
    
    
    
  </body>
</html>
