package com.filestore.servlet;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class LoginServlet extends HttpServlet {
    public void doGet(HttpServletRequest req, HttpServletResponse res)
	      throws IOException, ServletException {
	
	//TestData.createTestData();
	res.setContentType("text/html");
	RequestDispatcher rd = req.getRequestDispatcher("login.jsp");
	rd.forward(req, res);
    }
    
    

}