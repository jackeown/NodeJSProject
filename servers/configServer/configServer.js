/*
 * This file defines the Core Server.
 * It is a simple TCP server meant to do 3 things:
 * 
 * 		1.) Handle Sessions			(handleSession)
 * 		2.) Run Queries				(runQuery)
 * 		3.) Handle Configuration	(handleConfig)
 * 
 * All data sent through a connection to this server should be encrypted
 * using session data as the key  (userId + sessionId).
 * 
 * 
 * When JSON data is sent over a connection to this server,
 * it is routed to the appropriate function (handleSession, runQuery, or handleConfig)
 * by checking the requestType field of the main JSON data.
 */

exports.onConnection = function(socket)
{
	
	//~ ================================================================================================
	//~ ==========================  Define Possible Responses to Data  =================================
	//~ ================================================================================================

	// Session Scope
	var handleSession = function(dataObj)
	{
		var responseObj = {};
		responseObj.type = "session";
		
		
		socket.write(JSON.stringify(responseObj));
	}
	
	// Database Scope
	var runQuery = function(dataObj)
	{
		var responseObj = {};
		responseObj.type = "query";
		
		responseObj.queryResults = [[1,2,3],[4,5,6]];
		
		
		
		
		socket.write(JSON.stringify(responseObj));
	}
	
	
	
	// Configuration Scope
	var handleConfig = function(dataObj)
	{
		var responseObj = {};
		responseObj.type="config";
		
		
		
		
		socket.write(JSON.stringify(responseObj));
	}
	
	
	
	
	// Error Scope
	var handleError = function(err)
	{
		var responseObj = {};
		responseObj.type="error";
		responseObj.error = err;
		socket.write(JSON.stringify(responseObj));
	}
		
	//~ ================================================================================================
	//~ ======================  Route Requests to the Appropriate Functions ============================			
	//~ ================================================================================================

	socket.on('data',function(data)
	{
		try
		{
			data = String(data);
			var dataObj = JSON.parse(data);
			var requestType = dataObj.requestType;
		}
		catch(err)
		{
			handleError(err);
		}
		switch(requestType)
		{
			case "session":
				handleSession(dataObj);
				break;
			case "query":
				runQuery(dataObj);
				break;
			case "config":
				handleConfig(dataObj);
				break;
			default:
				handleError("Invalid request type!  Valid request types are login, query, and config");
		}
		socket.destroy();
	});
}
