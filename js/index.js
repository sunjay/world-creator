const exp = Math.exp, sin = Math.sin, cos = Math.cos;

const WINDOW_WIDTH = 600;
const WINDOW_HEIGHT = 400;

const TERRAIN_WIDTH = 50;
const TERRAIN_LENGTH = 50;
const TERRAIN_HEIGHT = 10;
const TERRAIN_RESOLUTION = 4;
const f = (x, y) => TERRAIN_HEIGHT*(cos(x/(TERRAIN_WIDTH/4))*cos(x/5) + cos(y/(TERRAIN_LENGTH/4))*cos(y/5));

const app = new Application(WINDOW_WIDTH, WINDOW_HEIGHT);

const geometry = new ProceduralGeometry(TERRAIN_WIDTH, TERRAIN_LENGTH, TERRAIN_WIDTH * TERRAIN_RESOLUTION, TERRAIN_LENGTH * TERRAIN_RESOLUTION);
geometry.apply(f);

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

const container = document.getElementById('world-creator');
app.start(container);

