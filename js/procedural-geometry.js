class ProceduralGeometry extends THREE.PlaneBufferGeometry {
  /**
   * Applies the given function to each vertex
   * @param {Function} func - A function that takes an x and y coordinate and then returns the z coordinate that should be used
   */
  apply(func) {
    // The format of this array is [x, y, z, x, y, z, x, ...]
    const vertices = this.attributes.position.array;
    for (let xIndex = 0; xIndex < vertices.length; xIndex += 3) {
      const x = vertices[xIndex];
      const y = vertices[xIndex + 1];
      
      vertices[xIndex + 2] = func(x, y);
    }

    this.attributes.position.needsUpdate = true;
  }
}

window.ProceduralGeometry = ProceduralGeometry;

