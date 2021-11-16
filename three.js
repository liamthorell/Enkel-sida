import * as THREE from "https://cdn.skypack.dev/three@0.132.2";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.132.2/examples/jsm/loaders/GLTFLoader.js";

//hoppas du inte blir allt för förvirrad när du går in i denna fil. Jag ska försöka
//att förklara det enkelt och bra.

//först skapar vi en scene, det är där allt finns i och det som visas på skärmen.
const scene = new THREE.Scene();

//sedan så skapar vi en camera och sätter några värden om placeringen av kameran
//och hur kameran visar sakerna i scenen.
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

//här skapar vi en renderer, alltså den som renderar scenen på våran skärm och sätter den till
//elemenetet med id "canvas" i våran HTML. Vi sätter även lite viktiga värden för renderern.
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#canvas"),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, (window.innerHeight / 4) * 3);
renderer.outputEncoding = THREE.sRGBEncoding;

//nu lägger vi till ljus som gör att vi kan se sakernan vi lägger in i scenen.
//Vi sätter positionen och lägger in ljuset i scenen.
const light = new THREE.PointLight(0xffffff);
const lightAmbient = new THREE.AmbientLight(0xffffff, 0.2);
light.position.set(0, 0, 100);
const lightHelper = new THREE.PointLightHelper(light);
scene.add(light, lightHelper, lightAmbient);

//vi sätter camerans position så att det kommer visas på ett snyggt sätt
camera.position.z = 30;

//nu lägger vi till en GLTFLoader som ska ladda in våran 3D-modell.
const loader = new GLTFLoader();
loader.load(
  "assets/3d/The100_Logo.gltf",
  function (gltf) {
    //Här gör vi så att den får en grön färg lika som i abby bilden.
    const texture = new THREE.TextureLoader().load("assets/img/abby.png");
    const material = new THREE.MeshStandardMaterial({ map: texture });

    //Här lägger vi in modellen i scenen.
    let object = gltf.scene;
    object.scale.set(0.23, 0.23);
    object.children[0].material = material;
    scene.add(object);
    //Och här sätter vi positionen på modellen.
    object.position.z = 0;
    object.position.x = 0;
    object.position.y = 0;

    //Denna funktion körs varje frame och kommer därför uppdatera scenen ofta
    //så att modellen kan röra sig.
    function animate() {
      //Här lägger vi in animete functionen som en callback funktion i  "requestAnimationFrame"
      //funktionen så att animate funktionen körs varje frame.
      requestAnimationFrame(animate);

      //Nu roterar vi modellen välidigt lite för att få en jämn animation.
      object.rotation.x += 0.01;
      object.rotation.y += 0.01;
      object.rotation.z += 0.01;

      //Därefter renderar vi scenen.
      renderer.render(scene, camera);
    }
    animate();
  },
  undefined,
  //Vid fel så kommer detta att köras och vi kommer att få ett felmeddelande i konsollen.
  function (error) {
    console.error(error);
  }
);

//Om vi ändrar storleken på våran fönster så kommer detta att köras och
//canvasen kommer att uppdatera sin storlek.
window.addEventListener("resize", onWindowResize, false);
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}
