package com.filestore.rest;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.xml.ws.RequestWrapper;

import org.apache.commons.lang.RandomStringUtils;
import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.hdfs.DFSClient;
import org.apache.hadoop.hdfs.DFSInputStream;

import com.filestore.db.DBUtil;
import com.filestore.dto.BaseResponse;
import com.filestore.dto.FileDto;
import com.filestore.dto.FilesResponseDto;
import com.filestore.model.File;
import com.filestore.model.User;
import com.filestore.servlet.LoginFilter;
import com.sun.jersey.core.header.FormDataContentDisposition;
import com.sun.jersey.multipart.FormDataBodyPart;
import com.sun.jersey.multipart.FormDataParam;

@Path("/file")
public class FileController {
    
    private String BASE_PATH = "/Users/subin/Documents/work/filestore/filestore/tmp/";
    
    /*@POST
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
	
    }*/
    
    
    @POST
    @Path("/upload")
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    @Produces(MediaType.APPLICATION_JSON)
    public Response uploadFile(
	    @FormDataParam("file") InputStream uploadedInputStream,
	    @FormDataParam("file") FormDataContentDisposition fileDisposition,
	    @FormDataParam("file") FormDataBodyPart body,
	    @Context HttpServletRequest request) throws IOException, URISyntaxException {
	User user = (User) request.getAttribute("user");
	String hdfsurl="hdfs://128.199.91.73";
	String fileName = fileDisposition.getFileName();
	String destinationFilename = "/"+user.getEmail()+"_"+System.currentTimeMillis() + "_"+fileName;
	
	Configuration conf = new Configuration();
        conf.set("fs.defaultFS", hdfsurl);
        DFSClient client = new DFSClient(new URI(hdfsurl), conf);
        OutputStream out = null;
        InputStream in = null;
        long size=0;
        try {
            if (client.exists(destinationFilename)) {
                System.out.println("File already exists in hdfs: " + destinationFilename);
                BaseResponse response = new BaseResponse();
    	    	response.setMessage("failed");
    	    	response.setSuccess(false);
    	    	return Response.status(500).entity(response).build();
            }
            
            out = new BufferedOutputStream(client.create(destinationFilename, false));
            in = new BufferedInputStream(uploadedInputStream);
            byte[] buffer = new byte[1024];
 
            int len = 0;
            while ((len = in.read(buffer)) > 0) {
                out.write(buffer, 0, len);
                size+=len;
            }
        } finally {
            
            if (in != null) {
                in.close();
            }
            
            if (out != null) {
                out.close();
            }
            if (client != null) {
                client.close();
            }
        }
	
	
	File file = new File();
	file.setName(fileName);
	file.setOwner(user);
	file.setOpen(false);
	file.setPath(destinationFilename);
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
    @Path("/download")
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    public Response download(@Context HttpServletRequest request,
	    @Context HttpServletResponse response) throws IOException, URISyntaxException  {
	
	String idString = request.getParameter("fileid");
	Long id = new Long(idString);
	User user = (User) request.getAttribute("user");
	String hdfsurl="hdfs://128.199.91.73";
	DFSInputStream is = null;
	Configuration conf = new Configuration();
	conf.set("fs.defaultFS", hdfsurl);
	DFSClient client = new DFSClient(new URI(hdfsurl), conf);
	
	String sessionId = LoginFilter.getSessionIdFromCookie(request);
	EntityManager em = DBUtil.getEntityManagerFactory().createEntityManager();
	boolean authenticated = LoginFilter.validSession(sessionId, em, request);
	
	
	try {
        	Query q = em.createQuery("select f from File f where f.id=:id", File.class);
        	q.setParameter("id", id);
        	File file= (File)q.getSingleResult();
        	if(!file.getOpen()) { // case of private file
        	    if(! (authenticated && ((User)request.getAttribute("user")).getId() == file.getOwner().getId())) {
        		response.sendError(401);
        		return null;
        	    }
        	}
        	is = client.open(file.getPath());
        	//response.setHeader("Content-Length", String.valueOf(file.getSize()));
        	response.setContentType(file.getContentType());
        	response.setHeader("Content-Disposition", "attachment; filename=\"" + file.getName() + "\"");
        	byte[] buffer = new byte[10240];
        	for (int length = 0; (length = is.read(buffer)) > 0;) {
        	        response.getOutputStream().write(buffer, 0, length);
        	 }
        	
        		
        	
	} catch(Exception e) {
	    	e.printStackTrace();
	    	BaseResponse resp = new BaseResponse();
	    	resp.setMessage("failed");
	    	resp.setSuccess(false);
	    	return Response.status(500).entity(resp).build();
	    
	} finally {
	    if(is !=null) {
		is.close();
	    }
	    client.close();
	    response.getOutputStream().close();
	}
	return null;
	
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
