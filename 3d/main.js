import './style.css'
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({canvas: document.querySelector('#bg'),});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);
// Torus
const geometry = new THREE.TorusGeometry(15, 3, 16, 6);
const material= new THREE.MeshStandardMaterial({color: 0xd3d300});
const torus = new THREE.Mesh(geometry, material);

// scene.add(torus);

// Cube
const nesTexture = new THREE.TextureLoader().load('images/nes.jpg');

const nes = new THREE.Mesh(
  new THREE.BoxGeometry(6,6,6),
  new THREE.MeshBasicMaterial({ map: nesTexture})
);

scene.add(nes);

// Sun

// const spotLight = new THREE.SpotLight( 0xffffff );
// spotLight.position.set( 100, 1000, 100 );

// spotLight.castShadow = true;

// spotLight.shadow.mapSize.width = 1024;
// spotLight.shadow.mapSize.height = 1024;

// spotLight.shadow.camera.near = 500;
// spotLight.shadow.camera.far = 4000;
// spotLight.shadow.camera.fov = 30;

// scene.add( spotLight );

// Lighting
const pointLight = new THREE.PointLight(0xffff80);

pointLight.position.set(10,10,10);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight)

// Helpers
const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper)

// orbitControls
const controls = new OrbitControls(camera, renderer.domElement);

// Earth
const earthTexture = new THREE.TextureLoader().load('images/earthDay.jpg');
const normalEarthTexture = new THREE.TextureLoader().load('images/normalEarth.jpg');

const earth = new THREE.Mesh(
  new THREE.SphereGeometry(10, 32, 16),
  new THREE.MeshStandardMaterial({ 
    map: earthTexture,
    normalMap: normalEarthTexture
  } )
);

// earth.position.y = 30;

scene.add(earth)

// Moon
// const moonTexture = new THREE.TextureLoader().load('images/mn.jpg');
// const normalEarthTexture = new THREE.TextureLoader().load('images/earthNight.jpg');

// const moon = new THREE.Mesh(
//   new THREE.SphereGeometry(10, 32, 16),
//   new THREE.MeshStandardMaterial({ map: earthTexture,
//   } )
// );

// Asteroids

// Coming Soon!!!!

// Stars
function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({color: 0xe6e6e6});
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z]  = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(900));

  star.position.set(x, y, z);
  scene.add(star)
  
}

Array(800).fill().forEach(addStar)

// Background
const spaceTexture = new THREE.TextureLoader().load('images/space.jpg');
scene.background = spaceTexture;

// cameraMovement



// Animation
function animate() {
  requestAnimationFrame(animate);
  nes.rotation.x += 0.007;
  nes.rotation.y += 0.005;
  nes.rotation.z += 0.0;

  earth.rotation.x += 0.00;
  earth.rotation.y += 0.01;
  earth.rotation.z += 0.00;

  torus.rotation.x += 0.0;
  torus.rotation.y += 0.02;
  torus.rotation.z += 0.01;

  controls.update();
  renderer.render(scene, camera);
}


animate()


//scrollPercent

let scrollPercent = 0

document.body.onscroll = () => {
  
    //calculate the current scroll progress as a percentage
    scrollPercent =
        ((document.documentElement.scrollTop || document.body.scrollTop) /
            ((document.documentElement.scrollHeight ||
                document.body.scrollHeight) -
                document.documentElement.clientHeight)) *
        100
    ;(document.getElementById('scrollProgress')).innerText =
        'Scroll Progress : ' + scrollPercent.toFixed(2)

  const t = document.body.getBoundingClientRect().top;
  earth.position.z += -0.3;
  earth.position.x += 0.3;
  earth.position.y += -0.02;

  // camera rotation???
  camera.position.z = t * -0.03;
  camera.position.x = t * -0.00;
  camera.position.y = t * -0.00;

  // earth.position.z += 0.0;
  // earth.position.x += 0.05;
  // earth.position.y += 0.3;
}
