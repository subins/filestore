package com.filestore.rest;

import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.apache.commons.lang.RandomStringUtils;

import com.filestore.db.DBUtil;
import com.filestore.dto.BaseResponse;
import com.filestore.dto.FileDto;
import com.filestore.dto.FilesResponseDto;
import com.filestore.model.File;
import com.filestore.model.User;
import com.sun.jersey.core.header.FormDataContentDisposition;
import com.sun.jersey.multipart.FormDataBodyPart;
import com.sun.jersey.multipart.FormDataParam;

@Path("/file")
public class FileController {
    
    private String BASE_PATH = "/Users/subin/Documents/work/filestore/filestore/tmp/";
    @POST
    @Path("/upload")
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    @Produces(MediaType.APPLICATION_JSON)
    public Response uploadFile(
	    @FormDataParam("file") InputStream uploadedInputStream,
	    @FormDataParam("file") FormDataContentDisposition fileDisposition,
	    @FormDataParam("file") FormDataBodyPart body,
	    @Context HttpServletRequest request) throws IOException {
	
	
	String fileName = fileDisposition.getFileName();
	System.out.println("***** fileName " + fileDisposition.getFileName());
	String filePath = BASE_PATH + fileName;
	OutputStream fileOutputStream = new FileOutputStream(filePath);
	long size=0;
	try {
	    int read = 0;
	    final byte[] bytes = new byte[1024];
	    while ((read = uploadedInputStream.read(bytes)) != -1) {
		fileOutputStream.write(bytes, 0, read);
		size += read;
	    }
	} catch(Exception e) {
	    e.printStackTrace();
	    BaseResponse response = new BaseResponse();
	    response.setMessage("failed");
	    response.setSuccess(false);
	    return Response.status(500).entity(response).build();
	} finally {

	    fileOutputStream.close();
	}
	File file = new File();
	file.setName(fileName);
	file.setOwner((User)request.getAttribute("user"));
	file.setOpen(false);
	file.setPath(filePath);
	file.setSize(size);
	file.setCreated(new Date());
	file.setContentType(body.getMediaType().toString());
	EntityManager em = DBUtil.getEntityManagerFactory().createEntityManager();
	em.getTransaction().begin();
	em.persist(file);
	em.getTransaction().commit();
	
	BaseResponse response = new BaseResponse();
	response.setMessage("successfully uploaded");
	response.setSuccess(true);
	return Response.status(200).entity(response).build();
	
    }
    
    
    
    @GET
    @Path("/")
    @Produces(MediaType.APPLICATION_JSON)
    public Response list(@Context HttpServletRequest request) throws IOException {
	List<File> files = new ArrayList<File>();
	User user = (User) request.getAttribute("user");
	EntityManager em = DBUtil.getEntityManagerFactory().createEntityManager();
	Query q = em.createQuery("Select f from File f where f.owner.id=:id order by f.created desc", File.class);
	q.setParameter("id", user.getId());
	files = q.getResultList();
	
	FilesResponseDto dto= new FilesResponseDto();
	dto.setFiles(files);
	dto.setMessage("ok");
	dto.setSuccess(true);
	return Response.status(200).entity(dto).build();
	
	
    }
    
    @PUT
    @Path("/")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response updateFile(
	    FileDto fileDto,
	    @Context HttpServletRequest request) throws IOException {
	
	
	EntityManager em = DBUtil.getEntityManagerFactory().createEntityManager();
	Query q = em.createQuery("Select f from File f where f.id=:id", File.class);
	q.setParameter("id", fileDto.getId());
	try {
        	File file = (File)q.getSingleResult();
        	file.setName(fileDto.getName());
        	if(! (file.getOwner().getId().equals(((User)request.getAttribute("user")).getId()))) {
        	    throw new Exception("not authorized");
        	}
        	file.setOpen(fileDto.getOpen());
        	file.setPath(fileDto.getPath());
        	file.setSize(fileDto.getSize());
        	em.getTransaction().begin();
        	file = em.merge(file);
        	em.getTransaction().commit();
        	return Response.status(200).entity(file).build();
	} catch(Exception e) {
	    e.printStackTrace();
	    BaseResponse response = new BaseResponse();
	    response.setMessage("failed");
	    response.setSuccess(false);
	    return Response.status(500).entity(response).build();
	}
	
	
    }
}
