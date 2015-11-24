/*
 * This file defines the GUI Server.
 * It is a custom HTTP server that serves as 
 * the default user interface to the NodeJSProject.  
 * It serves 3 main purposes:
 * 
 * 1.) Interacting with the services you and others create.
 * 2.) Connecting socially with others and interacting with the services they share with you.
 * 3.) Configuring the NodeJSProject settings (such as port numbers, users, and permissions)
 * 
 * Let's say a request is made to this server.
 * If the request is for certain file types (html for instance), then
 * helpers.getFileContents(path) will yeild the contents of the file,
 * but with server side javascript evaluated between the '<%' and '%>'
 * character sequences within the file.
 * (See ejs "embedded javascript")
 * 
 * If the request is for the other class of file types (images for instance),
 * then the file is just passed along without any parsing.
 *
 */

exports.onRequest = function(req,res)
{
	var path = require("path");
	var helpers = require(path.join(__dirname,"www","assets","serverJS","helpers.js"));
	var ejs = require('ejs');
	var url = require("url").parse(req.url, true);
	var path = url.pathname;
	
	var extension = helpers.getExtension(helpers.linkTo(path));
	var contentType = helpers.getContentTypeFromExtension(extension);
	//~ console.log("TESTING1: "+__dirname);
	//~ console.log("TESTING2: "+require.main.filename);
	
	if (contentType != null)
	{
		try
		{
			console.log("Content-Type: "+ contentType);
			
			res.writeHead(200, {'Content-Type': contentType});
			if(["html","css"].indexOf(extension) != -1 || extension == "")
			{
				console.log("serving up hot and ready html/css file");
				res.end(helpers.getFileContents(path));
			}
			else{			
				res.end(helpers.getFileContents(path));
			}
		}
		catch(err)
		{
			res.end("Failed to read file at path: "+path);
			console.log("guiServer failed to read file at path: "+path);
		}
	}
	else
	{
		res.end("Bad file extension: "+extension);	
	}
	
	
	console.log("-----------------------------------------------------------------------");
	console.log("Path: "+ path);
	console.log("Extension: "+extension);
	console.log("helpers.linkTo(path): "+ helpers.linkTo(path));
}

