package com.filestore.dto;

import java.util.List;

import javax.xml.bind.annotation.XmlRootElement;

import com.filestore.model.File;

@XmlRootElement
public class FilesResponseDto extends BaseResponse {
    private List<File> files;

    public List<File> getFiles() {
	return files;
    }

    public void setFiles(List<File> files) {
	this.files = files;
    }
    

}
