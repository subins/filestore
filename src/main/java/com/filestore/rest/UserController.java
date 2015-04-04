package com.filestore.rest;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Set;
import java.util.TreeSet;
import java.util.UUID;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.google.gson.Gson;
import com.filestore.db.DBUtil;
import com.filestore.dto.BaseResponse;
import com.filestore.dto.ChangePasswordDto;
import com.filestore.dto.LoginDto;
import com.filestore.dto.UserDto;
import com.filestore.model.Session;
import com.filestore.model.User;
import com.filestore.service.UserService;

@Path("/user")
public class UserController {

    UserService userService = new UserService();
    
    @POST
    @Path("/register")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response createUser(UserDto userDto) {
	EntityManager em = DBUtil.getEntityManagerFactory().createEntityManager();
	em.getTransaction().begin();
	BaseResponse result = new BaseResponse();
	try {
	    User user = userService.getUserWithEmail(userDto.getEmail(), em);
	    if(user != null) {
		BaseResponse response = new BaseResponse();
		response.setMessage("error persisting user, User exists ");
		response.setSuccess(false);
		return Response.status(502).entity(response).build();	
	    }
	    user = new User();
	    user.setEmail(userDto.getEmail());
	    user.setFullName(userDto.getFullName());
	    user.setPassword(userDto.getPassword()); //TODO encode password 
	    user.setCreated(new Date());
	    user = em.merge(user);
	    em.getTransaction().commit();
		
	    
	} catch(Exception e) {
	    em.getTransaction().rollback();
	    e.printStackTrace();
	    BaseResponse response = new BaseResponse();
	    response.setMessage("error persisting user."+ e.getMessage());
	    response.setSuccess(false);
	    return Response.status(500).entity(response).build();
	}
	result.setSuccess(true);
	return Response.status(200).entity(result).build();
		
	
    }
    
    
    
    
    @POST
    @Path("/login")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response login(LoginDto loginDto) {
	EntityManager em = DBUtil.getEntityManagerFactory().createEntityManager();
	em.getTransaction().begin();
	BaseResponse result = new BaseResponse();
	Session session = new Session();
	    
	try {
	    User user = userService.getUserWithEmail(loginDto.getEmail(), em);
	    if(user == null || !user.getPassword().equals(loginDto.getPassword())) {
		BaseResponse response = new BaseResponse();
		response.setMessage("error,user not found ");
		response.setSuccess(false);
		return Response.status(402).entity(response).build();	
	    }
	    session.setUser(user);
	    session.setActive(true);
	    session.setCreated(new Date());
	    session.setToken(UUID.randomUUID().toString() + System.currentTimeMillis());
	    session = em.merge(session);
	    em.getTransaction().commit();
	    
	    
	} catch(Exception e) {
	    em.getTransaction().rollback();
	    e.printStackTrace();
	    BaseResponse response = new BaseResponse();
	    response.setMessage("error logging in user."+ e.getMessage());
	    response.setSuccess(false);
	    return Response.status(500).entity(response).build();
	}
	result.setSuccess(true);
	result.setValue(session.getToken());
	return Response.status(200).entity(result).build();
	
	
    }
    
    
    
    
    @GET
    @Path("/logout")
    @Produces(MediaType.APPLICATION_JSON)
    public Response logout(@Context HttpServletRequest req) {
	EntityManager em = DBUtil.getEntityManagerFactory().createEntityManager();
	em.getTransaction().begin();
	BaseResponse result = new BaseResponse();
	    
	try {
	    String token= getSessionIdFromCookie(req);
	    if(token == null) {
		throw new Exception("no cookie found");
	    }
	    Query q = em.createQuery("Select s from Session s where s.token=:token");
	    q.setParameter("token", token);
	    Session s = (Session)q.getSingleResult();
	    s.setActive(false);
	    s.setUpdated(new Date());
	    em.merge(s);
	    em.getTransaction().commit();
	    
	    
	} catch(Exception e) {
	    em.getTransaction().rollback();
	    e.printStackTrace();
	    BaseResponse response = new BaseResponse();
	    response.setMessage("error logging out in user."+ e.getMessage());
	    response.setSuccess(false);
	    return Response.status(500).entity(response).build();
	}
	result.setSuccess(true);
	return Response.status(200).entity(result).build();
	
	
    }
    
    
    @POST
    @Path("/changepassword")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response changepassword(ChangePasswordDto changePasswordDto, @Context HttpServletRequest request) {
	EntityManager em = DBUtil.getEntityManagerFactory().createEntityManager();
	em.getTransaction().begin();
	BaseResponse result = new BaseResponse();
	    
	try {
	    User user = (User) request.getAttribute("user");
	    user = userService.getUserWithEmail(user.getEmail(), em);
	    
	    if(!changePasswordDto.getCurrentPassword().equals(user.getPassword())) {
		em.getTransaction().rollback();
		BaseResponse response = new BaseResponse();
		response.setMessage("current password wrong.");
		response.setSuccess(false);
		return Response.status(502).entity(response).build();
	    }
	    user.setPassword(changePasswordDto.getNewPassword());
	    em.persist(user);
	    em.getTransaction().commit();
	    
	    
	} catch(Exception e) {
	    em.getTransaction().rollback();
	    e.printStackTrace();
	    BaseResponse response = new BaseResponse();
	    response.setMessage("error updating password."+ e.getMessage());
	    response.setSuccess(false);
	    return Response.status(500).entity(response).build();
	}
	result.setSuccess(true);
	return Response.status(200).entity(result).build();
	
	
    }
    @POST
    @Path("/updateprofile")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response updateprofile(UserDto userDto, @Context HttpServletRequest request) {
	EntityManager em = DBUtil.getEntityManagerFactory().createEntityManager();
	em.getTransaction().begin();
	BaseResponse result = new BaseResponse();
	    
	try {
	    User user = (User) request.getAttribute("user");
	    user = userService.getUserWithEmail(user.getEmail(), em);
	    user.setEmail(userDto.getEmail());
	    user.setFullName(userDto.getFullName());
	    em.persist(user);
	    em.getTransaction().commit();
	    
	    
	} catch(Exception e) {
	    em.getTransaction().rollback();
	    e.printStackTrace();
	    BaseResponse response = new BaseResponse();
	    response.setMessage("error updating user."+ e.getMessage());
	    response.setSuccess(false);
	    return Response.status(500).entity(response).build();
	}
	result.setSuccess(true);
	return Response.status(200).entity(result).build();
	
	
    }
    
    
    private String getSessionIdFromCookie(HttpServletRequest req) {
	Cookie[] cookies = req.getCookies();

	for (int i = 0; i < cookies.length; i++) {
	  String name = cookies[i].getName();
	  String value = cookies[i].getValue();
	  if(name.equals("sessionid")) {
	      return value;
	  }
	}
	return null;
    }
}
