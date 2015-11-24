exports.path = require("path");
exports.fs = require('fs');
exports.ejs = require('ejs');

var mainConfigPath = exports.path.join(exports.path.dirname(require.main.filename),"settings","configuration.json");
var mainConfigFile = exports.fs.readFileSync(mainConfigPath,"utf8");
exports.mainConfig = JSON.parse(mainConfigFile);

var guiConfigPath = exports.path.join(__dirname,"configuration.json");
var guiConfigFile = exports.fs.readFileSync(guiConfigPath,"utf8");
exports.guiServerConfig = JSON.parse(guiConfigFile);

exports.getHeader = function(title,stylesPath,stylesheets)
{
	var headerString = "<head>";
		headerString +="<title>"+title+"</title>";
		for(var i=0;i<stylesheets.length;i++)
		{
			headerString +="<link rel='stylesheet' href='" + stylesPath + stylesheets[i]+"'>";
		}
		headerString +="<script src='/assets/clientJS/main.js'></script>";
		headerString +="<script src='/assets/clientJS/users.js'></script>";
		//--------------------------------------===POLYMER===--------------------------------------
		headerString +="<script src='/bower_components/webcomponentsjs/webcomponents.js'></script>";
		headerString +="<link rel='import' href='/bower_components/paper-menu/paper-menu.html' />";
		headerString +="<link rel='import' href='/bower_components/paper-item/paper-item.html' />";
		headerString +="<link rel='import' href='/bower_components/paper-material/paper-material.html' />";
		headerString +="<link rel='import' href='/bower_components/font-roboto/roboto.html' />";
		headerString +="</head>";
		return headerString;
}

exports.getNavigation = function(title,page,loggedIn)
{
	var navString = "";
	    navString += "<paper-material class='navigation'>";
	    navString += "<h1 class='title'>"+title+"</h1>";
		navString += "<paper-menu selected='0'>";
		
		if(loggedIn !== false)
		{
			var pageArray = ["apps","connect","config","login"];
			navString += "<paper-item><a class='flex' href='/apps' layout horizontal center>		Applications			</a></paper-item>";
			navString += "<paper-item><a class='flex' href='/connect' layout horizontal center>	Connect with Friends	</a></paper-item>";
			navString += "<paper-item><a class='flex' href='/config' layout horizontal center>	Configuration			</a></paper-item>";
			navString += "<paper-item><a class='flex' href='/' layout horizontal center>			Logout					</a></paper-item>";
			navString = navString.replace("<paper-menu selected='0'","<paper-menu selected='"+pageArray.indexOf(page)+"'");
		}
		else{
			var pageArray = ["apps","connect","config","login"];
			navString += "<paper-item disabled><a class='flex' href='/apps' layout horizontal center>		Applications			</a></paper-item>";
			navString += "<paper-item disabled><a class='flex' href='/connect' layout horizontal center>	Connect with Friends	</a></paper-item>";
			navString += "<paper-item disabled><a class='flex' href='/config' layout horizontal center>	Configuration			</a></paper-item>";
			navString += "<paper-item><a class='flex' href='/' layout horizontal center>			Login					</a></paper-item>";
			navString = navString.replace("<paper-menu selected='0'","<paper-menu selected='"+pageArray.indexOf(page)+"'");
		}
		navString += "</paper-menu>";
		navString += "</paper-material>";
	return navString;
}

exports.getFileContents = function(path)
{
	var extension = exports.getExtension(exports.linkTo(path));
	var contentType = exports.getContentTypeFromExtension(extension);
	var fileData;
	if(["text/html","text/css"].indexOf(contentType) != -1) // if content-type of html or css
	{
		fileData = exports.ejs.render(String(exports.fs.readFileSync(exports.linkTo(path))),{helpers:exports});
	}
	else
	{
		fileData = exports.fs.readFileSync(exports.linkTo(path));
	}
	return fileData;
}

exports.linkTo = function(path)
{
	path = exports.normalizePath(path);
	var finalPath;
	if(exports.pathIsLegitFile(path))
	{
		finalPath = exports.guiServerConfig["rootPath"] + path;
	}
	else if (exports.pathIsLegitFile(path+"/index.html"))
	{
		finalPath = exports.guiServerConfig["rootPath"] + path + "/index.html";
	}
	else
	{
		finalPath = exports.guiServerConfig["rootPath"] + "/404.html";
	}
	return finalPath;
}

exports.normalizePath = function(path)
{
	path = path.replace(/(\.+)/g,"."); 	//don't allow consecutive periods in path for security.
	path = path.replace(/\/+/g,"/");	//remove consecutive slashes.
	return path;
}

exports.getExtension = function(path)
{
	path = exports.normalizePath(path);
	var slashParts = path.split("/");
	var lastSlashPart = slashParts[slashParts.length-1];
	var dotParts = lastSlashPart.split(".");
	var lastDotPart = dotParts[dotParts.length-1];
	return lastDotPart
	//TODO
}

exports.isValidExtension = function(ext)
{
	if(getContentTypeFromExtension(ext) !== null)
	{
		return true;
	}
	else
	{
		return false;
	}
}

exports.getContentTypeFromExtension = function(ext)
{
	var contentType = null;
	if(ext == "html")
	{
		contentType = 'text/html';
	}
	else if(ext == "js")
	{
		contentType = 'text/javascript';
	}
	else if(ext == "css")
	{
		contentType = 'text/css';
	}
	else if(ext == "jpeg" || ext == "jpg")
	{
		contentType = 'image/jpeg';
	}
	else if(ext == "png")
	{
		contentType = 'image/png';
	}
	else if(ext == "ttf")
	{
		contentType = 'font';
	}
	return contentType;
}

exports.pathIsLegitFile = function(path)
{
	try
	{
		var fileStats = exports.fs.lstatSync(exports.guiServerConfig["rootPath"] + path);
		return fileStats.isFile();
	}
	catch(err)
	{
		return false;
	}
}
