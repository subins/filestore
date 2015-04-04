package com.filestore.servlet;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.filestore.db.DBUtil;
import com.filestore.db.TestData;
import com.filestore.model.Session;

public class HomeServlet extends HttpServlet {
    public void doGet(HttpServletRequest req, HttpServletResponse res) throws IOException, ServletException {
	
	res.setContentType("text/html");
	RequestDispatcher rd = req.getRequestDispatcher("home.jsp");
	rd.forward(req, res);
	
    }

}
