package com.filestore.dto;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class BaseResponse {

    private String message;
    private boolean success;
    private String value;
    
    public BaseResponse() {
	// TODO Auto-generated constructor stub
    }
    public BaseResponse(String message,boolean success) {
	this.message = message;
	this.success = success;
    
    }
    
    public String getMessage() {
        return message;
    }
    public void setMessage(String message) {
        this.message = message;
    }
    public boolean isSuccess() {
        return success;
    }
    public void setSuccess(boolean success) {
        this.success = success;
    }
    public String getValue() {
	return value;
    }
    public void setValue(String value) {
	this.value = value;
    }
    
    
}
