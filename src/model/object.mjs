class ModelGL {
  constructor() {
    this.gl;
    this.canvas;

    this.cubePoints = [];
    this.cubeColors = [];

    this.programInfo;
    this.buffers;
    this.rot;
    this.trans;
    this.scale;
    this.light;

    this.menuIdx;
    this.menuViewIdx;
  }

  load_data(data) {}
}

var modelViewMatrixLoc;

var projectionMatrix;
var modelViewMatrix;
var normalMatrix;
var viewMatrix;
