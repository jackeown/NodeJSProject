function loggedIn() //returns false if not logged in.  Else returns (username? guid?)
{
	
}

function getUserByGUID(guid)
{
	
}

function getUserByUserName(userName)
{
	
}

function queryDatabase(sql)
{
	
}

function getFriends(person)
{
	if(typeof(person) === "undefined")
	{
		//var person = getUser();
	}
	if(false)
	{
		return person.friends;
	}
	return [{id:'n1',name:"Ellenor Bartowsky",friends:['n2','n3','n4','n5','n6']},
			{id:'n2',name:"John Casey",friends:['n1','n3','n4','n5','n6']},
			{id:'n3',name:"Jeff Barnes",friends:['n1','n2','n4','n5','n6']},
			{id:'n4',name:"Morgan Grimes",friends:['n1','n2','n3','n5','n6']},
			{id:'n5',name:"Chuck Bartowski",friends:['n1','n2','n3','n4','n6']},
			{id:'n6',name:"Sarah Walker",friends:['n1','n2','n3','n4','n5']}];
}
