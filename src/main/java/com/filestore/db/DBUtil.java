package com.filestore.db;

import java.util.HashMap;
import java.util.Map;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

public class DBUtil {

    private DBUtil() {
	
    }
    private static EntityManagerFactory emf= null; 
    
    public static EntityManagerFactory getEntityManagerFactory(){
	if(emf !=null) {
	    return emf;
	}
	Map<String, String> properties = new HashMap<>();
	String dbUrl = "jdbc:mysql://localhost/filestore?user=root";
	properties.put("javax.persistence.jdbc.driver","com.mysql.jdbc.Driver");
	properties.put("javax.persistence.jdbc.url",dbUrl);
		emf = Persistence.createEntityManagerFactory("filestore", properties);
	return emf;
    }
    
}
