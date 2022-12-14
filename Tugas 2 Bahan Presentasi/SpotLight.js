const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshPhongMaterial( { color: 0xffffff } );
const cube = new THREE.Mesh( geometry, material );
cube.castShadow = true;
scene.add( cube );

camera.position.z = 5;

// const color = 0xff000;
// const intensity = 1;
// const distance = 5;
// const angle = Math.PI/4.0;
// const penumbra = 0.5;
// const decay = 0;

const light = new THREE.AmbientLight( 0xff000, 1 );
light.position.set( 0, 0, 2 );
// AmbientLight( color : Integer, intensity : Float )
// color - (optional) Numeric value of the RGB component of the color. Default is 0xffffff.
// intensity - (optional) Numeric value of the light's strength/intensity. Default is 1.


scene.add( light );
scene.add( light.target )

function animate() {
	requestAnimationFrame( animate );

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

	renderer.render( scene, camera );
}
animate();