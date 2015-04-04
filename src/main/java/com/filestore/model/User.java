package com.filestore.model;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.Lob;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name = "user_table")
public class User {
    
    @Id
    @GeneratedValue(generator="increment")
    @GenericGenerator(name="increment", strategy = "increment")
    private Long id;
    
    @Column(name="email", nullable=false, unique=true)
    private String email;
    
    @Column(name="password")
    private String password;
    
    @Column(name="fullname")
    private String fullName;
    
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "created")
    private Date created;
    
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "updated")
    private Date updated;
    
   
    
    
    
    
    
    
    
    
    public Long getId() {
        return id;
    }



    public void setId(Long id) {
        this.id = id;
    }


    public String getEmail() {
        return email;
    }










    public void setEmail(String email) {
        this.email = email;
    }










    public String getPassword() {
        return password;
    }










    public void setPassword(String password) {
        this.password = password;
    }










    public String getFullName() {
        return fullName;
    }










    public void setFullName(String fullName) {
        this.fullName = fullName;
    }










    public Date getCreated() {
        return created;
    }










    public void setCreated(Date created) {
        this.created = created;
    }










    public Date getUpdated() {
        return updated;
    }










    public void setUpdated(Date updated) {
        this.updated = updated;
    }










    @PrePersist
    @PreUpdate
    public void preCreate() {
	if(this.created == null) {
	    this.created = new Date();
	}
	this.updated = new Date();
	
    }
    
    
    

}
