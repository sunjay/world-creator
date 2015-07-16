const WIDTH = 600;
const HEIGHT = 400;

const app = new Application(WIDTH, HEIGHT);

const planeWidth = 50;
const planeHeight = 50;
const geometry = new ProceduralGeometry(planeWidth, planeHeight, planeWidth * 2, planeHeight * 2);
const f = (x, y) => 5*Math.sin(0.5*x + 0.5*y);
geometry.apply(f);

const material = new THREE.MeshLambertMaterial({color: 0xFFBF00, side: THREE.DoubleSide});
const plane = new THREE.Mesh(geometry, material);
plane.receiveShadow = true;
plane.castShadow = true;
app.camera.lookAt(plane.position);

app.addToScene(plane);

const axisHelper = new THREE.AxisHelper(5);
axisHelper.position.x = planeWidth/2;
axisHelper.position.y = planeHeight/2;
app.addToScene(axisHelper);

const container = document.getElementById('world-creator');
app.start(container);

