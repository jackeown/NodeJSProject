/*
 * 
 * This file is the main entry point for the NodeJSProject.
 * 
 * It reads in the JSON files that hold the servers you're running and
 * the connections you have with other users in the NodeJSProject.
 * 
 * It then starts up the user-defined nodejs servers.
 * If and when the ip address of this computer changes, this file will
 * handle requests to your NodeJSProject connections and notify them of
 * your new ip address.
 * 
 * 
 */
var fs = require('fs');

var serversString = fs.readFileSync('./settings/servers.json',"utf8");
var friendsString = fs.readFileSync('./settings/friends.json',"utf8");

var serversObj = JSON.parse(serversString);
var friendsObj = JSON.parse(friendsString);
var servers = serversObj["servers"];
var friends = friendsObj["friends"];


for(var i=0;i<servers.length;i++)
{
	serverInfo = servers[i];
	startServer(serverInfo);
}


function startServer(serverInfo)
{
	if(serverInfo.type == "http")
	{
		var http = require('http');
		var server = require('./servers/'+serverInfo.path);
		http.createServer(server["onRequest"]).listen(serverInfo.port);
	}
	else if(serverInfo.type == "net")
	{
		var net = require('net');
		var server = require('./servers/'+serverInfo.path);
		net.createServer(server["onConnection"]).listen(serverInfo.port);
	}
}
