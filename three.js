import * as THREE from "https://cdn.skypack.dev/three@0.132.2";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.132.2/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.132.2/examples/jsm/loaders/GLTFLoader.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#canvas"),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, (window.innerHeight / 4) * 3);

const loader = new GLTFLoader();

renderer.outputEncoding = THREE.sRGBEncoding;

const light = new THREE.PointLight(0xffffff);
const lightAmbient = new THREE.AmbientLight(0xffffff, 0.2);

light.position.set(0, 0, 100);

const lightHelper = new THREE.PointLightHelper(light);
scene.add(light, lightHelper, lightAmbient);

camera.position.z = 30;

const controls = new OrbitControls(camera, renderer.domElement);

loader.load(
  "assets/3d/The100_Logo.gltf",
  function (gltf) {
    const texture = new THREE.TextureLoader().load("assets/img/abby.png");
    const material = new THREE.MeshStandardMaterial({ map: texture });

    let object = gltf.scene;
    object.scale.set(0.23, 0.23);
    object.children[0].material = material;

    scene.add(object);
    object.position.z = 0;
    object.position.x = 0;
    object.position.y = 0;

    function animate() {
      requestAnimationFrame(animate);

      object.rotation.x += 0.01;
      object.rotation.y += 0.01;
      object.rotation.z += 0.01;

      controls.update();

      renderer.render(scene, camera);
    }
    animate();
  },
  undefined,
  function (error) {
    console.error(error);
  }
);
window.addEventListener("resize", onWindowResize, false);

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}
