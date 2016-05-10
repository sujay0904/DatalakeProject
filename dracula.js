window.onload = function(){ 
	

	var invertedIndex = [{ "_id" : 'ObjectId("5730d09afe006bdd1016022d")', "all" : [ 1 ] },
{ "_id" : 'ObjectId("5730d09afe006bdd1016022e")', "cis550" : [ 2, 8, 14, 21 ] },
{ "_id" : 'ObjectId("5730d09afe006bdd1016022f")', "cis521" : [ 2 ] },
{ "_id" : 'ObjectId("5730d09afe006bdd10160230")', "cggt101" : [ 2 ] },
{ "_id" : 'ObjectId("5730d09afe006bdd10160231")', "shravan" : [ 4, 10, 19 ] },
{ "_id" : 'ObjectId("5730d09afe006bdd10160232")', "sujay" : [ 5, 17, 25 ] },
{ "_id" : 'ObjectId("5730d09afe006bdd10160233")', "yimeng" : [ 6, 11, 18, 24 ] },
{ "_id" : 'ObjectId("5730d09afe006bdd10160234")', "yimxu" : [ 7 ] },
{ "_id" : 'ObjectId("5730d09afe006bdd10160235")', "cis505" : [ 8, 21 ] },
{ "_id" : 'ObjectId("5730d09afe006bdd10160236")', "wharton101" : [ 8 ] },
{ "_id" : 'ObjectId("5730d09afe006bdd10160237")', "marvin" : [ 12, 16, 23 ] },
{ "_id" : 'ObjectId("5730d09afe006bdd10160238")', "mliu" : [ 13 ] },
{ "_id" : 'ObjectId("5730d09afe006bdd10160239")', "cis" : [ 14 ] },
{ "_id" : 'ObjectId("5730d09afe006bdd1016023a")', "cis540" : [ 14 ] },
{ "_id" : 'ObjectId("5730d09afe006bdd1016023b")', "chops" : [ 20 ] },
{ "_id" : 'ObjectId("5730d09afe006bdd1016023c")', "ssuresh" : [ 26 ] }]


	var thirdTable = [{ "_id" : 'ObjectId("5730d091eeccb910daca6fb7")', "node_id" : "1", "root" : "1", "value" : "file", "key" : "all", "parent" : null, "children" : [ "2", "3", "6", "7", "8", "9", "12", "13", "14", "15", "19", "20", "21", "22", "25", "26" ] },
{ "_id" : 'ObjectId("5730d091eeccb910daca6fb8")', "node_id" : "2", "root" : "1", "value" : [ "CIS550", "CIS521", "CGGT101" ], "key" : "courses", "parent" : "1", "children" : null },
{ "_id" : 'ObjectId("5730d091eeccb910daca6fb9")', "node_id" : "3", "root" : "1", "value" : "map1", "key" : "friends", "parent" : "1", "children" : [ "4", "5" ] },
{ "_id" : 'ObjectId("5730d091eeccb910daca6fba")', "node_id" : "4", "root" : "1", "value" : "Shravan", "key" : "f1", "parent" : "3", "children" : null },
{ "_id" : 'ObjectId("5730d091eeccb910daca6fbb")', "node_id" : "5", "root" : "1", "value" : "Sujay", "key" : "f2", "parent" : "3", "children" : null },
{ "_id" : 'ObjectId("5730d091eeccb910daca6fbc")', "node_id" : "6", "root" : "1", "value" : "Yimeng", "key" : "name", "parent" : "1", "children" : null },
{ "_id" : 'ObjectId("5730d091eeccb910daca6fbd")', "node_id" : "7", "root" : "1", "value" : "yimxu", "key" : "pennkey", "parent" : "1", "children" : null },
{ "_id" : 'ObjectId("5730d091eeccb910daca6fbe")', "node_id" : "8", "root" : "1", "value" : [ "CIS550", "CIS505", "WHARTON101" ], "key" : "courses", "parent" : "1", "children" : null },
{ "_id" : 'ObjectId("5730d091eeccb910daca6fbf")', "node_id" : "9", "root" : "1", "value" : "map2", "key" : "friends", "parent" : "1", "children" : [ "10", "11" ] },
{ "_id" : 'ObjectId("5730d091eeccb910daca6fc0")', "node_id" : "10", "root" : "1", "value" : "Shravan", "key" : "f1", "parent" : "9", "children" : null },
{ "_id" : 'ObjectId("5730d091eeccb910daca6fc1")', "node_id" : "11", "root" : "1", "value" : "Yimeng", "key" : "f2", "parent" : "9", "children" : null },
{ "_id" : 'ObjectId("5730d091eeccb910daca6fc2")', "node_id" : "12", "root" : "1", "value" : "Marvin", "key" : "name", "parent" : "1", "children" : null },
{ "_id" : 'ObjectId("5730d091eeccb910daca6fc3")', "node_id" : "13", "root" : "1", "value" : "mliu", "key" : "pennkey", "parent" : "1", "children" : null },
{ "_id" : 'ObjectId("5730d091eeccb910daca6fc4")', "node_id" : "14", "root" : "1", "value" : [ "CIS550", "CIS 521", "CIS540" ], "key" : "courses", "parent" : "1", "children" : null },
{ "_id" : 'ObjectId("5730d091eeccb910daca6fc5")', "node_id" : "15", "root" : "1", "value" : "map3", "key" : "friends", "parent" : "1", "children" : [ "16", "17", "18" ] },
{ "_id" : 'ObjectId("5730d091eeccb910daca6fc6")', "node_id" : "16", "root" : "1", "value" : "Marvin", "key" : "f1", "parent" : "15", "children" : null },
{ "_id" : 'ObjectId("5730d091eeccb910daca6fc7")', "node_id" : "17", "root" : "1", "value" : "Sujay", "key" : "f2", "parent" : "15", "children" : null },
{ "_id" : 'ObjectId("5730d091eeccb910daca6fc8")', "node_id" : "18", "root" : "1", "value" : "Yimeng", "key" : "f3", "parent" : "15", "children" : null },
{ "_id" : 'ObjectId("5730d091eeccb910daca6fc9")', "node_id" : "19", "root" : "1", "value" : "Shravan", "key" : "name", "parent" : "1", "children" : null },
{ "_id" : 'ObjectId("5730d091eeccb910daca6fca")', "node_id" : "20", "root" : "1", "value" : "chops", "key" : "pennkey", "parent" : "1", "children" : null },
{ "_id" : 'ObjectId("5730d091eeccb910daca6fcb")', "node_id" : "21", "root" : "1", "value" : [ "CIS550", "CIS505" ], "key" : "courses", "parent" : "1", "children" : null },
{ "_id" : 'ObjectId("5730d091eeccb910daca6fcc")', "node_id" : "22", "root" : "1", "value" : "map4", "key" : "friends", "parent" : "1", "children" : [ "23", "24" ] },
{ "_id" : 'ObjectId("5730d091eeccb910daca6fcd")', "node_id" : "23", "root" : "1", "value" : "Marvin", "key" : "f1", "parent" : "22", "children" : null },
{ "_id" : 'ObjectId("5730d091eeccb910daca6fce")', "node_id" : "24", "root" : "1", "value" : "Yimeng", "key" : "f2", "parent" : "22", "children" : null },
{ "_id" : 'ObjectId("5730d091eeccb910daca6fcf")', "node_id" : "25", "root" : "1", "value" : "Sujay", "key" : "name", "parent" : "1", "children" : null },
{ "_id" : 'ObjectId("5730d091eeccb910daca6fd0")', "node_id" : "26", "root" : "1", "value" : "ssuresh", "key" : "pennkey", "parent" : "1", "children" : null }];

	

	getDetails = function(node_id, table){

		node = {};
		table.forEach(function(record){

			if (record["node_id"] === node_id){
				node = record;
				// console.log("mil gaya bitches");
				// console.log(record["children"]);
			}

		});

		return node;

	}


	getRootID = function(node_id, table){

		var root;
		
		for (i = 0; i < table.length; i = i + 1){

			if (table[i]["node_id"] === node_id)
				root = thirdTable[i]["root"];

		}

		return root;

	}


	pathToRoot = function(nodeID, table){

		var pathArray = [];

		var node = getDetails(nodeID, table);

		while(node["parent"] !== null){

			pathArray.push(node["parent"]);

			for (i = 0; i < table.length; i = i + 1){

				if(table[i]["node_id"] === node["parent"])
					node = table[i];
			}
		}

		pathArray.reverse();

		console.log("Path from root to node: " + pathArray);

		return pathArray;
	}
	


	drawGraph = function(node, table, searchID, pathnodes){

		
		// For rendering nodes of different colors

		var render_node = function(r, n) {
            /* the Raphael set is obligatory, containing all you want to display */
            var set = r.set().push(
                /* custom objects go here */
                r.rect(n.point[0]-30, n.point[1]-13, 60, 44).attr({"fill": "green", r : "12px", "stroke-width" : n.distance == 0 ? "3px" : "1px" })).push(
                r.text(n.point[0], n.point[1] + 10, (n.label || n.id) ));  // + "\n(" + (n.distance == undefined ? "Infinity" : n.distance) + ")"
            return set;
        };

        var render_root = function(r, n) {
            /* the Raphael set is obligatory, containing all you want to display */
            var set = r.set().push(
                /* custom objects go here */
                r.rect(n.point[0]-30, n.point[1]-13, 60, 44).attr({"fill": "red", r : "12px", "stroke-width" : n.distance == 0 ? "3px" : "1px" })).push(
                r.text(n.point[0], n.point[1] + 10, (n.label || n.id) ));  // + "\n(" + (n.distance == undefined ? "Infinity" : n.distance) + ")"
            return set;
        };

        var render_pathNode = function(r, n) {
            /* the Raphael set is obligatory, containing all you want to display */
            var set = r.set().push(
                /* custom objects go here */
                r.rect(n.point[0]-30, n.point[1]-13, 60, 44).attr({"fill": "red", r : "12px", "stroke-width" : n.distance == 0 ? "3px" : "1px" })).push(
                r.text(n.point[0], n.point[1] + 10, (n.label || n.id) ));  // + "\n(" + (n.distance == undefined ? "Infinity" : n.distance) + ")"
            return set;
        };
		
        // now, constructing graphs
		var g = new Graph();

		remaining_nodes = []; 
		remaining_nodes.push(node["node_id"]);  		// --> initializing with root node

		// creating root node

		nodeLabel = "ROOT \n" + node["key"] + ":" + node["value"];
		g.addNode(node["node_id"], { label: nodeLabel, render: render_root});


		while (remaining_nodes.length !== 0){

			nodeID = remaining_nodes.shift();
			// console.log("Current node Id: " + nodeID);
			node = getDetails(nodeID, table);

			
			if (node["children"] !== null){
				var children = node["children"];

				children.forEach(function(child){

					remaining_nodes.push(child);
					
					childNode = getDetails(child, table);
					
					// creating new child node and connecting to parent node
					childlabel = childNode["key"] + ":" + childNode["value"];
					if(pathnodes.has(childNode["node_id"]))
						g.addNode(childNode["node_id"], { label: childlabel, render: render_pathNode } );
					else
						g.addNode(childNode["node_id"], { label: childlabel, render: render_node } );
					g.addEdge(node["node_id"], childNode["node_id"], { directed : true });
				});
			}


		}

		var layouter = new Graph.Layout.Spring(g);
		layouter.layout();
	 
		var renderer = new Graph.Renderer.Raphael('canvas', g, 1200, 1200);
		renderer.draw();

	}

	var searchTerm = "marvin";

	var container, rootNode;
	
	// searching for term in invertedIndex

	for (i = 0; i < invertedIndex.length; i = i + 1){

		if (invertedIndex[i][searchTerm]!== undefined)
			container = invertedIndex[i][searchTerm];

	}

	
	// printing roots of each child 

	var overall_path_nodes = new Set();

	container.forEach(function(element) {

		overall_path_nodes.add(element.toString());
		console.log(getRootID(element.toString(), thirdTable));
		var path = pathToRoot(element.toString(), thirdTable);
		path.forEach(function(p){

			overall_path_nodes.add(p.toString());
		});

	});
	

	// now, getting ID of root node

	c = container[0];

	console.log("ID to be searched: " + c);

	// finding path to root
	path = pathToRoot(c.toString(), thirdTable);

	for (i = 0; i < thirdTable.length; i = i + 1){

		if (thirdTable[i]["node_id"] === c.toString())
			root = thirdTable[i]["root"];
	}

	// getting root node


	console.log("Root id = " + root);

	rootNode = getDetails(root.toString(), thirdTable);

	drawGraph(rootNode, thirdTable, c.toString(), overall_path_nodes);

	
};