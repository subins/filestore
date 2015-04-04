package com.filestore.dto;

import javax.persistence.Column;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.filestore.model.File;
import com.filestore.model.User;

public class FileDto {

    private Long id;
    private String name;
    private Long size;
    private String path;
    private Boolean open;
    
    public static FileDto getFileDto(File file) {
	FileDto dto = new FileDto();
	dto.setId(file.getId());
	dto.setName(file.getName());
	dto.setPath(file.getPath());
	dto.setOpen(file.getOpen());
	dto.setSize(file.getSize());
	return dto;
    }
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public Long getSize() {
        return size;
    }
    public void setSize(Long size) {
        this.size = size;
    }
    public String getPath() {
        return path;
    }
    public void setPath(String path) {
        this.path = path;
    }
    public Boolean getOpen() {
        return open;
    }
    public void setOpen(Boolean open) {
        this.open = open;
    }
    
    
}
