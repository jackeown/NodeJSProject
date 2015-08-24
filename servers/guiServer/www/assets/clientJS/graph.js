// Sigma Graph Functions


function graphFriends(friends,s)
{
	// Add Nodes
	for(var i=0;i<friends.length;i++)
	{
		friend = friends[i];
		s.graph.addNode({
			id: friend.id,
			label: friend.name,
			x:Math.random()*10,
			y:Math.random()*10,
			size:10
		});
	}
	
	// Add Edges
	for(var i=0;i<friends.length;i++)
	{
		for(var j=0;j<friends[i].friends.length;j++)
		{
			s.graph.addEdge({
				id:'e-'+friends[i].id+'-'+friends[i].friends[j],
				source: friends[i].id,
				target: friends[i].friends[j]
			})
		}
	}
}
