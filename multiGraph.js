window.onload = function(){


	var g = new Graph();

	g.addNode("id34", { label : "Tomato", stroke : "red" , fill : "red"}) ; 
	
	g.addNode("id35", { label : "meat and greed" , stroke : "green" , fill : "green"} );

	g.addEdge("id35", "id34");




	var layouter = new Graph.Layout.Spring(g);
	layouter.layout();
	 
	var renderer = new Graph.Renderer.Raphael('canvas', g, 300, 301);
	renderer.draw(); 

	console.log(floyd_warshall(g).getPath("id35", "id34"));
}