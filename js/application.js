class Application {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.scene = new THREE.Scene();
    this.camera = this._createCamera(width, height);
    this.controls = null;
    
    this._addLights();

    this.renderer = this._createRenderer(width, height);
  }

  start(element) {
    this.controls = this._createCameraControls(this.camera, element);
    this._addRendererToElement(element);
    this._render();
  }

  addToScene(item) {
    this.scene.add(item);
  }

  _render() {
    requestAnimationFrame(this._render.bind(this));
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

  _createCamera(width, height) {
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.up.set(0, 0, 1);
    camera.position.x = 50;
    camera.position.y = 30;
    camera.position.z = 20;
    return camera;
  }

  _createCameraControls(camera, element) {
    const controls = new THREE.TrackballControls(camera, element);

    controls.rotateSpeed = 5.0;
    controls.zoomSpeed = 1.2;
    controls.panSpeed = 0.8;

    controls.noZoom = false;
    controls.noPan = false;

    controls.staticMoving = true;
    controls.dynamicDampingFactor = 0.3;

    controls.keys = [65, 83, 68];

    return controls;
  }

  _addLights() {
    const directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.castShadow = true;
    directionalLight.position.set(-50, -50, 50);
    //directionalLight.shadowCameraVisible = true;
    this.addToScene(directionalLight);
  }

  _createRenderer(width, height) {
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    renderer.setClearColor(0x007FBF);
    renderer.shadowMapEnabled = true;
    return renderer;
  }

  _addRendererToElement(element) {
    element.appendChild(this.renderer.domElement);
  }
}

window.Application = Application;

