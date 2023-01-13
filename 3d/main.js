import './style.css';
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
// import bootstrap from 'bootstrap';
// ADD carousell from Bootstrap with links and images to the projects
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({canvas: document.querySelector('#bg'),});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(-3);
// camera.position.setY(53);

renderer.render(scene, camera);
// why Tourus???
const geometryT = new THREE.CylinderGeometry(15, 3, 16, 6);
const materialT= new THREE.MeshStandardMaterial({color: 0xd3d300});
const torus = new THREE.Mesh(geometryT, materialT);

// scene.add(torus);

// Cube
const nesTexture = new THREE.TextureLoader().load('images/smile.jpg');

const nes = new THREE.Mesh(
  new THREE.BoxGeometry(6,6,6),
  new THREE.MeshBasicMaterial({ map: nesTexture})
);

// scene.add(nes);

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
const pointLight = new THREE.PointLight(0xffff80, 1, 100);

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
const asteroidTexture = new THREE.TextureLoader().load('images/asteroid.jpg');
const normalAsteroidTexture = new THREE.TextureLoader().load('images/asteroidNormal.jpg');





  

const geometry = new THREE.TorusGeometry(3.192, 3.9204, 6, 4);
const material = new THREE.MeshStandardMaterial({
  map: asteroidTexture,
  normalMap: normalAsteroidTexture});
  const asteroid1 = new THREE.Mesh(geometry, material);
  const asteroid2 = new THREE.Mesh(geometry, material);
  const asteroid3 = new THREE.Mesh(geometry, material);

  asteroid1.position.x = 150;
  asteroid1.position.y = 10;
  asteroid1.position.z = 10;
  asteroid2.position.x = -30;
  asteroid3.position.x = -200;
  asteroid3.position.y = 30;
  
  
  

scene.add(asteroid1)
scene.add(asteroid2)
scene.add(asteroid3)




// const [a, b, c]  = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(900));

// asteroid.position.set(a, b, c);


// Array(30).fill().forEach(addAsteroids)

// Create function that calls the 2 functions
// function addAsteroids() {
//   const asteroidTexture = new THREE.TextureLoader().load('images/asteroid.jpg');
//   const normalAsteroidTexture = new THREE.TextureLoader().load('images/asteroidNormal.jpg');

//   const geometry = new THREE.TorusGeometry(3.192, 3.9204, 6, 4);
//   const material = new THREE.MeshStandardMaterial({
//     color: 0xe6e6e6,
//     map: asteroidTexture,
//     normalMap: normalAsteroidTexture});
//   const asteroid = new THREE.Mesh(geometry, material);

//   const [x, y, z]  = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(300));

//   asteroid.position.set(x, y, z);


//   scene.add(asteroid)
  
// }

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


// Animation
function animation() {
  requestAnimationFrame(animation);
  asteroid1.rotation.x += 0.0;
  asteroid1.rotation.y += 0.01;
  asteroid1.rotation.z += 0.001;
  
  asteroid2.rotation.x += 0.01;
  asteroid2.rotation.y += 0.001;
  asteroid2.rotation.z += 0.0;
  
  asteroid3.rotation.x += 0.001;
  asteroid3.rotation.y += 0.0;
  asteroid3.rotation.z += 0.01;

  earth.rotation.x += 0.00;
  earth.rotation.y += 0.01;
  earth.rotation.z += 0.00;
  camera.position.z += 0.001;
  camera.position.y += 0.001;
  // torus.rotation.x += 0.0;
  // torus.rotation.y += 0.02;
  // asteroid.rotation.z += 0.01;

  controls.update();
  renderer.render(scene, camera);
}


animation()


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
  earth.position.z += -0.1;
  earth.position.x += 0.02;
  earth.position.y += 0.03;

  // camera rotation???
  // camera.rotation.z = t * -0.01;
  camera.rotation.x = t * -2.0;
  camera.rotation.y = t * 0.5;
  camera.position.z = t * -0.03;
  // camera.position.x = t * -0.007;
  // camera.position.y = t * -0.003;

  asteroid1.rotation.x += 0.1;
  asteroid2.rotation.z += 0.1;
  asteroid3.rotation.y += 0.1;
  
  asteroid1.position.x += -0.9;
  asteroid1.position.y += 0.01;
  asteroid1.position.z += 0.02;

  asteroid2.position.x += 0.5;
  asteroid2.position.y += -0.0;
  asteroid2.position.z += -0.3;

  asteroid3.position.x += 1.0;
  asteroid3.position.y += 0.0;
  asteroid3.position.z += 0.00;

  // earth.position.x += 0.05;
  // earth.position.y += 0.3;
}




var slideIndex = 1;
  showSlides(slideIndex);

  function plusSlides(n) {
    showSlides(slideIndex += n);
  }

  function currentSlide(n) {
    showSlides(slideIndex = n);
  }

  function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("slide");
    if (n > slides.length) {slideIndex = 1}    
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    slides[slideIndex-1].style.display = "block";  
  }
  var prev = document.getElementById("prev");
  var next = document.getElementById("next");

  
  prev.addEventListener("click", function() {
    plusSlides(-1);
  });

  next.addEventListener("click", function() {
    plusSlides(1);
  });