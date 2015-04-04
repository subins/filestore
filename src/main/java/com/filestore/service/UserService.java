package com.filestore.service;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;

import com.filestore.db.DBUtil;
import com.filestore.model.User;

public class UserService {

    public User getUserWithEmail(String email, EntityManager em) {
	try {
	    User user= em.createQuery("Select u from User u where u.email=:email", User.class).setParameter("email", email).getSingleResult();
	    return user;
	} catch(NoResultException e) {
	    return null;
	}
    }
   
}
