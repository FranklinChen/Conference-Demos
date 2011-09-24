var loadModel = (function () {
	var camera, scene, renderer;
	var mesh;
	function init() {
		// scene size
		var HEIGHT = 480
		, WIDTH = 640;
		
		// camera properties
		var FOV = 45, ASPECT = WIDTH/HEIGHT, NEAR = 0.1, FAR = 10000;
		
		// create a renderer, camera, and scene
		renderer = new THREE.WebGLRenderer();
		renderer.setSize (WIDTH, HEIGHT);
		camera = new THREE.Camera(FOV, ASPECT, NEAR, FAR);
		camera.position.z = 1800;
		//camera.position.y = 30;
		
		scene = new THREE.Scene();
		drawCube();
		
		
		
		// add lighting
		var light = new THREE.DirectionalLight(0xFFFFFF);
		
		light.position.x = 10;
		light.position.y = 200;
		light.position.z = 130;
		
		scene.addLight(light);
		
		// attach the scene to the DOM
		$("#loading-assets").get(0).appendChild(renderer.domElement);
	}
	
	function drawCube() {
		var loader = new THREE.JSONLoader();
		loader.load( {model: "demos/loadingModel/cube.js", callback: createScene1 });
		
	}
	
	function createScene1(geometry) {
		geometry.materials[0][0].shading = THREE.FlatShading;
		mesh = THREE.SceneUtils.addMesh( scene, geometry, 250, 400, 0, 0, 0, 0, 0, geometry.materials[0] );
	}
	
	function animate() {
		requestAnimationFrame (animate);
		render();
	}
	
	function render() {
		if (mesh) {
			mesh.rotation.x += 0.01;
		}
		renderer.render(scene, camera);
	}
	
	init();
	animate();
})();
