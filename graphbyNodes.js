window.onload = function() {

	var g1 = new Graph();

	var g2 = new Graph();

	g1.addEdge("strawberry", "cherry");
	g1.addEdge("strawberry", "apple");
	g1.addEdge("strawberry", "tomato");
	 
	g1.addEdge("tomato", "apple");
	g1.addEdge("tomato", "kiwi");
	 
	g1.addEdge("cherry", "apple");
	g1.addEdge("cherry", "kiwi");
	 
	var layouter = new Graph.Layout.Spring(g1);
	layouter.layout();
	 
	var renderer = new Graph.Renderer.Raphael('canvas', g1, 300, 310);
	renderer.draw();

	g2.addEdge("strawberry", "cherry");
	g2.addEdge("strawberry", "apple");
	g2.addEdge("strawberry", "tomato");
	 
	g2.addEdge("tomato", "apple");
	g2.addEdge("tomato", "kiwi");
	 
	g2.addEdge("cherry", "apple");
	g2.addEdge("cherry", "kiwi");
	 
	var layouter = new Graph.Layout.Spring(g2);
	layouter.layout();
	 
	var renderer = new Graph.Renderer.Raphael('canvas', g2, 300, 301);
	renderer.draw();

}
