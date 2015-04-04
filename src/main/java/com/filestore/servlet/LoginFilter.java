package com.filestore.servlet;

import java.io.IOException;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.filestore.db.DBUtil;
import com.filestore.model.Session;

public class LoginFilter implements Filter {

    @Override
    public void destroy() {
	// TODO Auto-generated method stub
	
    }

   

    @Override
    public void init(FilterConfig arg0) throws ServletException {
	// TODO Auto-generated method stub
	
    }
    
    private String[]  public_urls= {
	    "/api/user/login",
	    "/api/user/register",
	    "/js/",
	    "/css/",
	    "/img/",
	    "/lib/",
	    "/login",
	    "/register"
	    };
    
    
    @Override
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) throws IOException, ServletException {
	HttpServletRequest request = (HttpServletRequest) req;
	HttpServletResponse response = (HttpServletResponse) res;
	
	String req_url = request.getRequestURI();
	for(String s : public_urls) {
	    if(req_url.indexOf(s)!=-1) {
		chain.doFilter(req, res);
		return;
	    }
	}
	
	String sessionId = getSessionIdFromCookie(request);
	EntityManager em = DBUtil.getEntityManagerFactory().createEntityManager();
	if(sessionId!=null && validSession(sessionId, em, request)) {
	    chain.doFilter(req, res);
	    
	} else {
	    response.sendRedirect("login");
	}
	
	
	
	
    }
    
    private boolean validSession(String sessionId, EntityManager em, HttpServletRequest request) {
	try {
	    Query q = em.createQuery("Select s from Session s where s.token=:token");
	    q.setParameter("token", sessionId);
	    Session s = (Session)q.getSingleResult();
	    request.setAttribute("user", s.getUser());
	    if(s.getActive()) {
		return true;
	    } else {
		return false;
	    }
	} catch(Exception e) {
	    return false;
	}
	
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
