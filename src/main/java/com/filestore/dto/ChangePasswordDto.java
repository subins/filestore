package com.filestore.dto;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class ChangePasswordDto {

    private String currentPassword;
    private String newPassword;
    public String getCurrentPassword() {
        return currentPassword;
    }
    public void setCurrentPassword(String currentPassword) {
        this.currentPassword = currentPassword;
    }
    public String getNewPassword() {
        return newPassword;
    }
    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }
    
    
}
