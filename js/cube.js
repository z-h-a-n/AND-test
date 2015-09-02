var camera, scene, renderer;

var cube;

var axis = new THREE.Vector3(0,1,0);
var rad = 0.05;

var position = { x : 1, y: 0 };
var target = { x : -1, y: 0 };
var tween = new TWEEN.Tween(target).to(position, 2000);
tween.start();
tween.easing(TWEEN.Easing.Quadratic.InOut);


$(function(){
	if ($('#container').length > 0) {
		init();
		animate()
		}
});

function init() {

	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

	renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

	var light	= new THREE.AmbientLight( 0x020202 )
	scene.add( light )
	// add a light in front
	var light	= new THREE.DirectionalLight('white', 1.5)
	light.position.set(0.5, 0.5, 2)
	scene.add( light )
	// add a light behind
	var light	= new THREE.DirectionalLight('white', 1)
	light.position.set(-0.5, -0.5, -2)
	scene.add( light )		

	var geometry = new THREE.BoxGeometry( 2, 2, 2 );
	var material = new THREE.MeshLambertMaterial( { 
	emissive: "#9d009d",
	color: "#0d7500"
	} )
	cube = new THREE.Mesh( geometry, material );

	camera.position.z = 5;

	loadCreature();

}

function animate() {
	requestAnimationFrame( animate );
	update();
}

function update() {

	if (loadedObject) {

		// loadedObject.position.x = -0.1;
		loadedObject.scale.set(0.2, 0.2, 0.2)
		loadedObject.rotateOnAxis(axis,rad);
	}
	renderer.render(scene, camera);
}

function rotateSlow() {

	if (loadedObject) {

		// tween.onUpdate(function(){
  //   	loadedObject.position.x = target.x;
  //   	console.log(position.x);
		// });
		// // tween = new TWEEN.Tween(position).to(target, 2000);
		
		// TWEEN.update();


		axis = new THREE.Vector3(0,1,0);
		rad = 0.1;
		loadedObject.rotateOnAxis(axis,rad);
		loadedObject.position.x = 2;
		loadedObject.scale.set(0.23, 0.23, 0.23);

	}

	renderer.render(scene, camera);
}

function rotateFast() {

	if (loadedObject) {

		// tween.onUpdate(function(){
  //   	loadedObject.position.x = target.x;
  //   	console.log(target.x);
		// });
		// tween = new TWEEN.Tween(position).to(target, 2000);
		// TWEEN.update();

		rad = 0.4;
		loadedObject.rotateOnAxis(axis,rad);
		loadedObject.position.x = -2;
	}

	renderer.render(scene, camera);
}



