const exp = Math.exp, sin = Math.sin, cos = Math.cos;

const WINDOW_WIDTH = 600;
const WINDOW_HEIGHT = 400;

const TERRAIN_WIDTH = 100;
const TERRAIN_LENGTH = 100;
const TERRAIN_HEIGHT = 10;
const TERRAIN_RESOLUTION = 4;

const container = Object.freeze({
  width: WINDOW_WIDTH,
  height: WINDOW_HEIGHT
});
const world = Object.freeze({
  width: TERRAIN_WIDTH,
  length: TERRAIN_LENGTH,
  height: TERRAIN_HEIGHT,
  resolution: TERRAIN_RESOLUTION
});
for (let propName of Object.getOwnPropertyNames(Math)) {
  window[propName] = Math[propName];
}

const app = new Application(WINDOW_WIDTH, WINDOW_HEIGHT);

const geometry = new ProceduralGeometry(TERRAIN_WIDTH, TERRAIN_LENGTH, TERRAIN_WIDTH * TERRAIN_RESOLUTION, TERRAIN_LENGTH * TERRAIN_RESOLUTION);

const material = new THREE.MeshLambertMaterial({color: 0xFFBF00, side: THREE.DoubleSide});
const plane = new THREE.Mesh(geometry, material);
plane.receiveShadow = true;
plane.castShadow = true;
app.camera.lookAt(plane.position);

app.addToScene(plane);

const axisHelper = new THREE.AxisHelper(5);
axisHelper.position.x = TERRAIN_WIDTH/2;
axisHelper.position.y = TERRAIN_LENGTH/2;
app.addToScene(axisHelper);

const containerElement = document.getElementById('world-creator');
app.start(containerElement);

const worldForm = document.getElementById('world-form');
worldForm.onsubmit = () => {
  let userFunction = "(x, y) => ";
  userFunction += document.getElementById('world-function').value;

  const code = babel.transform(userFunction, {blacklist: ["strict"]}).code;
  const f = eval(code);

  geometry.apply(f);
  return false;
};
worldForm.dispatchEvent(new Event('submit'));

