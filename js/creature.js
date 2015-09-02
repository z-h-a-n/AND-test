var loadedObject = null;

function loadCreature() {
	var material = new THREE.MeshLambertMaterial( { 
	emissive: "#9d009d",
	color: "#0d7500"
	} );

	var loader = new THREE.OBJLoader();
	loader.load('../creature.obj', function (object) {
		loadedObject = object;
		console.log(loadedObject);
		var geometry = object.children[0].geometry;
		geometry.computeFaceNormals()
		geometry.computeVertexNormals()
		geometry.normalsNeedUpdate	= true

		object.traverse(function (child) {
	    if( child instanceof THREE.Mesh ) {
	      child.material = material;
	      child.material.needsUpdate = true;
	    }
		});


		object.scale.set(0.2 , 0.2, 0.2);
		object.position.set(0, 0, 0)

		// object.rotation.set(0.1, 0, 0);
		
		// debugger;
		scene.add(object);
		// debugger;
		// object.rotation.x += 0.01;
		// cube.rotation.y += 0.01;
		// requestAnimationFrame( animate );
		// object.rotationX += 0.1;
		// object.rotation._y += 1;

	});

}

