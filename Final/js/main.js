import * as THREE from './node_modules/three/build/three.module.js';
import {
	OrbitControls
} from './node_modules/three/examples/jsm/controls/OrbitControls.js';
import {
	OBJLoader
} from './node_modules/three/examples/jsm/loaders/OBJLoader.js';
import {
	FBXLoader
} from './node_modules/three/examples/jsm/loaders/FBXLoader.js';
import {
	FresnelShader
} from './node_modules/three/examples/jsm/shaders/FresnelShader.js';

import {
	tween
} from './tween.js';

import {
	GUI,
	guiMeshPhysicalMaterial,
	handleColorChange
} from './gui.js';
// Create clock
var clock = new THREE.Clock()

// create GUI
var gui = new GUI();

// Create scene
var scene = new THREE.Scene();

// Create renderer
var renderer = new THREE.WebGLRenderer({
	antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create camera
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.x = 0;
camera.position.y = 50;
camera.position.z = 0;
scene.add(camera);

// create AmbientLight
var ambientLight = new THREE.AmbientLight(0xcccccc, 0.4);
scene.add(ambientLight);

// create PointLight
var pointLight = new THREE.PointLight(0xffffff, 0.8);
camera.add(pointLight);

//create controls
var controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
controls.dampingFactor = 0.05;

controls.screenSpacePanning = false;

controls.maxPolarAngle = Math.PI / 2;
// instantiate a loader


var textureLoader = new THREE.TextureLoader();

var floorAO = textureLoader.load(
	'./objs/Kitchen/materials/concrete_floor_02_4k_jpg/concrete_floor_02_AO_4k.jpg');
var floorBump = textureLoader.load(
	'./objs/Kitchen/materials/concrete_floor_02_4k_jpg/concrete_floor_02_bump_4k.jpg');
var floorDiffuse = textureLoader.load(
	'./objs/Kitchen/materials/concrete_floor_02_4k_jpg/concrete_floor_02_diff_4k.jpg');
var floorDisplacement = textureLoader.load(
	'./objs/Kitchen/materials/concrete_floor_02_4k_jpg/concrete_floor_02_Disp_4k.jpg');
var floorNormal = textureLoader.load(
	'./objs/Kitchen/materials/concrete_floor_02_4k_jpg/concrete_floor_02_Nor_4k.jpg');
var floorRough = textureLoader.load(
	'./objs/Kitchen/materials/concrete_floor_02_4k_jpg/concrete_floor_02_rough_4k.jpg');
var floorSpecular = textureLoader.load(
	'./objs/Kitchen/materials/concrete_floor_02_4k_jpg/concrete_floor_02_spec_4k.jpg');

var wallAO = textureLoader.load(
	'./objs/Kitchen/materials/white_plaster_03_4k_jpg/white_plaster_03_ao_4k.jpg');
var wallDiffuse = textureLoader.load(
	'./objs/Kitchen/materials/white_plaster_03_4k_jpg/white_plaster_03_diff_4k.jpg');
var wallDisplacement = textureLoader.load(
	'./objs/Kitchen/materials/white_plaster_03_4k_jpg/white_plaster_03_disp_4k.jpg');
var wallNormal = textureLoader.load(
	'./objs/Kitchen/materials/white_plaster_03_4k_jpg/white_plaster_03_nor_4k.jpg');
var wallRough = textureLoader.load(
	'./objs/Kitchen/materials/white_plaster_03_4k_jpg/white_plaster_03_rough_4k.jpg');
var wallRoughAO = textureLoader.load(
	'./objs/Kitchen/materials/white_plaster_03_4k_jpg/white_plaster_03_rough_ao_4k.jpg');

var wallMaterial = new THREE.MeshStandardMaterial({
	aoMap: wallAO,
	aoMapIntensity: 0.5,
	map: wallDiffuse,
	displacementMap: wallDisplacement,
	displacementScale: 0.1,
	displacementBias: 0.0,
	normalMap: wallNormal,
	roughnessMap: wallRough,
	roughness: 0.5
});

var floorMaterial = new THREE.MeshStandardMaterial({
	aoMap: floorAO,
	aoMapIntensity: 0.5,
	map: floorDiffuse,
	displacementMap: floorDisplacement,
	displacementScale: 0.1,
	displacementBias: 0.0,
	normalMap: floorNormal,
	roughnessMap: floorRough,
	roughness: 0.5
});
var floorMaterial2 = new THREE.MeshStandardMaterial({
	color: 0xffffff,
	roughness: 0.1
});
var wallMaterial2 = new THREE.MeshStandardMaterial({
	color: 0xffffff,
	roughness: 0.0
});

var path = "./objs/textures/cube/Park2/";
var format = '.jpg';
var urls = [
	path + 'posx' + format, path + 'negx' + format,
	path + 'posy' + format, path + 'negy' + format,
	path + 'posz' + format, path + 'negz' + format
];

var textureCube = new THREE.CubeTextureLoader().load(urls);

// scene = new THREE.Scene();
scene.background = textureCube;

var shader = FresnelShader;
var uniforms = THREE.UniformsUtils.clone(shader.uniforms);

uniforms["tCube"].value = textureCube;

var glassMaterial = new THREE.MeshBasicMaterial({
	color: 0xffffff,
	// opacity: 0.0,
	// transparent: true,
	// alphaMap: 0.1,
	envMap: scene.background
});

// var glassMaterial = new THREE.ShaderMaterial( {
// 	uniforms: uniforms,
// 	vertexShader: shader.vertexShader,
// 	fragmentShader: shader.fragmentShader
// } );

// var glassMaterial = new THREE.MeshLambertMaterial({
// 	color: 0xffffff,
// 	transparent: true,
// 	alphaMap: 0,
// 	opacity: 0.1
// });
var doorMaterial = new THREE.MeshStandardMaterial({
	color: 0xD1C7B9,
	roughness: 0.0
});
var material_assets = {
	'Floor_Balcony': floorMaterial,
	'Floor_Bedroom': floorMaterial,
	'Floor_Kitchen': floorMaterial,
	'Floor_LivingRoom': floorMaterial,
	'Floor_Bedroom.001': floorMaterial2,
	'Floor_Bedroom.002': floorMaterial2,
	'Wall_inner': wallMaterial2,
	'Wall_outer': wallMaterial,
	'Window.001': glassMaterial,
	'Window.002': glassMaterial,
	'Window.003': glassMaterial,
	'Window.004': glassMaterial,
	'Window.005': glassMaterial,
	'Door': doorMaterial,
	'Indoor': doorMaterial,
	'Indoor.001': doorMaterial,
	'Indoor.001': doorMaterial,
};

var objLoader = new OBJLoader();

var fbxLoader = new FBXLoader();

var objs = []
var animated_objs = [];

objLoader.load(
	'./objs/Kitchen.obj',
	function (object) {
		var obj = object;
		obj.traverse(function (child) {
			if (child.name.includes('Floor')) {
				objs.push(child);
			}
			var key = child.name.split('_Cube')[0]; // var key = child.name.substring(0,4).toLowerCase()
			if (material_assets.hasOwnProperty(key)) {
				// child.material.map = texture_assets[key]
				child.material = material_assets[key]
			}
		});
		obj.name = 'ROOM'
		console.log(obj);
		scene.add(obj);
	}

);


objLoader.load(
	'./objs/sofa_chair_.obj',
	function (object) {
		object.scale.set(0.02, 0.02, 0.02);
		object.position.x = -70
		object.position.z = -2
		object.name = 'SOFA'
		var texture = new THREE.TextureLoader().load("./objs/textures/sofa/texture_1.jpg");
		texture.wrapS = THREE.RepeatWrapping;
		texture.wrapT = THREE.RepeatWrapping;
		texture.repeat.set(15, 3);
		var material = new THREE.MeshPhysicalMaterial({
			map: texture
		});
		object.traverse(child => {
			objs.push(child);
			if (child instanceof THREE.Mesh) {

				child.material = material;

			}
		})

		scene.add(object);
	}

);

objLoader.load(
	'./objs/box.obj',
	function (object) {
		object.position.x = -70
		object.position.z = 42
		object.traverse(obj => objs.push(obj))

		scene.add(object);
	}

);

fbxLoader.load("./fbxs/Fan_Done5_Rigged.fbx", object => {
	object.scale.set(0.02, 0.02, 0.02);
	object.position.x = -100;
	object.position.z = 22;
	object.rotation.y = Math.PI;
	const mixer = new THREE.AnimationMixer(object);
	console.log(object.animations);

	mixer.clipAction(object.animations[0]).play();
	scene.add(object);
	animated_objs.push({
		object,
		mixer
	});
}, undefined, function (e) {

	console.error(e);

});

var targetTween = new tween(20)
var cameraTween = new tween(0.5)

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

function onMouseUp(event) {
	mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
	mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
	raycaster.setFromCamera(mouse, camera);

	var intersects = raycaster.intersectObjects(objs);

	if (intersects.length == 0) return

	var obj = intersects[0].object;

	if (obj.name.includes('Floor')) {
		if ((event.which && event.which == 3) || (event.button && event.button == 2)) {

			var objpos = intersects[0].point;

			var distance = camera.position.clone().sub(objpos).normalize()
			distance.y += 50;
		} else {
			return;
		}
	} else {
		var objpos = obj.parent.position.clone()

		gui.removeFolder('MeshPhysicalMaterial')
		guiMeshPhysicalMaterial(gui, obj.material);

		var distance = camera.position.clone().sub(objpos).normalize()
		if (obj.parent.name == "SOFA") {
			distance.y += 38
			distance.z += 27
		} else {
			distance.y += 25
			distance.z += -30
		}
	}
	targetTween.init(controls.target, objpos);
	cameraTween.init(camera.position, objpos.clone().add(distance));
}
window.addEventListener('mouseup', onMouseUp, false);
window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize(window.innerWidth, window.innerHeight);

}

function animate() {
	var dt = clock.getDelta()
	requestAnimationFrame(animate);
	animated_objs.forEach(({
		mixer
	}) => mixer.update(dt));
	controls.update();
	renderer.render(scene, camera);

	targetTween.update(dt);
	cameraTween.update(dt);

	if (cameraTween.running) {
		camera.position.copy(cameraTween.current)
	}


	if (targetTween.running) {
		camera.lookAt(targetTween.current);

		controls.target = targetTween.current
	}
}

animate();
