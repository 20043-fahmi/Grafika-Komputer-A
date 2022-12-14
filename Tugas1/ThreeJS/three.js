var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const ambient = new THREE.AmbientLight(0x222222)
scene.add(ambient)

const light = new THREE.DirectionalLight(0xffffff)
light.position.set(0,0,6)
scene.add(light)

const loader = new THREE.TextureLoader()

var urls = [
'edge.png','Backbone.png',
'top.png', 'bottom.png',
'Front.png','back.png']

var materials = urls.map(url => {
    return new THREE.MeshLambertMaterial({
        map: loader.load(url)
    })
})

var geometry = new THREE.BoxGeometry(3.5, 5, 0.5 );

var cube = new THREE.Mesh( geometry, materials );
scene.add( cube );

camera.position.z = 5;

var animate = function () {
	requestAnimationFrame( animate );

	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;

	renderer.render( scene, camera );
};

animate();