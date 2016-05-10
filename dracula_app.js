var main = function(){

	var invertedIndex = [], thirdTable = [];
	var g = new Graph();
	
	var roots = [], leaves = [];


	"use strict";

	var searchTerm;

	$.getJSON("/data", function(tables){

		invertedIndex = tables["invertedIndex"];
		thirdTable = tables["forwardIndex"];
		searchTerm = tables["searchTerm"]

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
		


		drawGraph = function(node, table, searchID, pathnodes, g, children){

			

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
			
	        
	  //       for (i = 0; i < thirdTable.length; i = i + 1){

			// 	if (thirdTable[i]["parent"] === null){

			// 		var root = thirdTable[i];
			// 		rootnodes.push(root);
			// 		console.log("Found root: " + root["key"])
			// 		nodeLabel = "ROOT \n" + root["key"] + ":" + root["value"];
			// 		g.addNode( root["node_id"], { label: nodeLabel, render: render_root}) ; 
			// 	}
			// }	

	        // now, constructing graphs
			

			remaining_nodes = []; 
			remaining_nodes.push(node["node_id"]);  		// --> initializing with root node

			// creating root node


			while (remaining_nodes.length !== 0){

				nodeID = remaining_nodes.shift();
				// console.log("Current node Id: " + nodeID);
				node = getDetails(nodeID, table);

				
				nodeLabel = "ROOT \n" + node["key"] + ":" + node["value"];
				g.addNode(node["node_id"], { label: nodeLabel, render: render_root});

				if (node["children"] !== null){
					var children = node["children"];

					children.forEach(function(child){

						remaining_nodes.push(child);
						
						childNode = getDetails(child, table);
						
						// creating new child node and connecting to parent node
						childlabel = childNode["key"] + ":" + childNode["value"];
						if(pathnodes.indexOf(childNode["node_id"]) !== -1 ){

							g.addNode(childNode["node_id"], { label: childlabel, render: render_pathNode } );
							g.addEdge(node["node_id"], childNode["node_id"], { directed : true, stroke : "red"});
						}
						
						else{
							g.addNode(childNode["node_id"], { label: childlabel, render: render_node } );
							g.addEdge(node["node_id"], childNode["node_id"], { directed : true });
						}
					});
				}
				else{
					console.log("Should be pushing here");
					leaves.push(node);
					// console.log("Size of leaves = " + children.size);
				}

			}


		}
			

		draw = function(g){

			// checking size of roots and leaves

			console.log("Roots = " + roots.length);
			console.log("Leaves = " + leaves.length);

			
			// now, adding link edges

			leaves.forEach(function(leaf){

				for(i = 0; i < roots.length; i = i + 1){

					var leafValue = leaf["value"].toString().toLowerCase();
					var rootKey = roots[i]["key"].toString().toLowerCase();

					if ((leafValue.localeCompare(rootKey) === 0 && leaf["root"] !== roots[i]["node_id"]))
						g.addEdge(leaf["node_id"], roots[i]["node_id"], {stroke : "blue"});			// str1.localeCompare(str2);
				}
			});

			var layouter = new Graph.Layout.Spring(g);
			layouter.layout();
			 
			var renderer = new Graph.Renderer.Raphael('canvas', g, 1000, 1000);
			renderer.draw();

			// console.log("Final node collection: " + g.nodes);
		}
		
		
		var container = [], rootNode;

		// modifying search based on unigram or bigram
		var terms = searchTerm.split(' ');
		
		if (terms.length === 1){

			console.log("Sahi hai");
			for (i = 0; i < invertedIndex.length; i = i + 1){

				if (invertedIndex[i][searchTerm]!== undefined)
					container = invertedIndex[i][searchTerm];

				}
			}

		else
			{

				console.log("Nahi hai");
				var container1, container2;

				var term1 = terms[0], term2 = terms[1];

				// getting all node ID's for first term
				for (i = 0; i < invertedIndex.length; i = i + 1){

					if (invertedIndex[i][term1]!== undefined)
						container1 = invertedIndex[i][term1];

					if (invertedIndex[i][term2]!== undefined)
						container2 = invertedIndex[i][term2]
				}

				// printing both id's 
				console.log(term1 + " found at : " + container1);
				console.log(term2 + " found at : " + container2);

				// taking union of both of these
				container = container1;

				container2.forEach(function(c){

					if(container1.indexOf(c) == -1)
						container1.push(c);
				});

			}
		
		console.log("Final container = " + container);
		// searching for term in invertedIndex

		
		
		// finding all paths from root to the searchTerm node
		
		//var overall_path_nodes = new Set();

		var overall_path_nodes = []

		container.forEach(function(element) {

			overall_path_nodes.push(element.toString());
			console.log(getRootID(element.toString(), thirdTable));
			var path = pathToRoot(element.toString(), thirdTable);
			path.forEach(function(p){

				overall_path_nodes.push(p.toString());
			});

		});
		
		var alreadyDrawn = new Set();

		
		 // ---> to be used for linking purposes later on

		// now, drawing all graphs containing this element
		container.forEach(function(c){

			if (!(alreadyDrawn.has(getRootID(c.toString(), thirdTable)))) {
				console.log("Adding to visited set")
				alreadyDrawn.add(getRootID(c.toString(), thirdTable));
				rootNode = getDetails(getRootID(c.toString(),thirdTable), thirdTable);
				roots.push(rootNode);
				drawGraph(rootNode, thirdTable, c.toString(), overall_path_nodes, g);

			}
		});

		//console.log("Total roots = " + roots.length);
		//console.log("Total leaf nodes = " + leaves.length);

		draw(g);

		

		})
};

$(document).ready(main);