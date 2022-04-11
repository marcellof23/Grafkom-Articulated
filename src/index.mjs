var cubeRotation = 0.0;
var NumVertices = 108;
const cubeFace = 6;

var modelGL;

const { mat2, mat3, mat4, vec2, vec3, vec4 } = glMatrix;

function init() {
  // Retrieve  canvas element
  modelGL.canvas = document.getElementById("webgl");
  // Get the rendering context

  modelGL.gl = WebGLUtils.setupWebGL(modelGL.canvas);
  if (!modelGL.gl) {
    alert("WebGL isn't available");
  }

  modelGL.gl.canvas.width = 0.8 * window.innerWidth;
  modelGL.gl.canvas.height = 1 * window.innerHeight;

  // Set viewport
  modelGL.gl.viewport(0, 0, modelGL.gl.canvas.width, modelGL.gl.canvas.height);

  // Initialize shaders
  var shaderProgram = initShaders(modelGL.gl, "vertex-shader", "fragment-shader");

  const programInfo = {
    program: shaderProgram,
    attribLocations: {
      vertexPosition: modelGL.gl.getAttribLocation(shaderProgram, "aVertexPosition"),
      vertexColor: modelGL.gl.getAttribLocation(shaderProgram, "aVertexColor"),
    },
    uniformLocations: {
      projectionMatrix: modelGL.gl.getUniformLocation(shaderProgram, "uProjectionMatrix"),
      modelViewMatrix: modelGL.gl.getUniformLocation(shaderProgram, "uModelViewMatrix"),
      worldMatrix: modelGL.gl.getUniformLocation(shaderProgram, "uWorldMatrix"),
    },
  };

  generateCubeVertice();

  const buffers = initBuffers(modelGL.gl);

  var then = 0;

  function render(now) {
    now *= 0.001; // convert to seconds
    const deltaTime = now - then;
    then = now;

    drawScene(programInfo, buffers, deltaTime);

    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}

function generateCubeVertice() {
  var q1 = 0;
  var q2 = 1;
  var q3 = 2;
  var q4 = 3;
  console.log(NumVertices / 6);
  for (var i = 0; i < NumVertices / cubeFace; i++) {
    quad(q1 + 4 * i, q2 + 4 * i, q3 + 4 * i, q4 + 4 * i);
  }
}

function quad(a, b, c, d) {
  var indexes = [a, b, c, a, c, d];
  for (var i = 0; i < indexes.length; ++i) {
    modelGL.cubePoints.push([indexes[i]]);
  }

  for (var i = 0; i < 4; i++) {
    var randomColors = [Math.random(), Math.random(), Math.random(), 1.0];
    for (var j = 0; j < 4; j++) {
      modelGL.cubeColors.push(randomColors[j]);
    }
  }
}

function drawScene(programInfo, buffers, deltaTime) {
  modelGL.gl.clearColor(0.25, 0.25, 0.25, 1.0); // Clear to black, fully opaque
  modelGL.gl.clearDepth(1.0); // Clear everything
  modelGL.gl.enable(modelGL.gl.DEPTH_TEST); // Enable depth testing
  modelGL.gl.depthFunc(modelGL.gl.LEQUAL); // Near things obscure far things

  modelGL.gl.clear(modelGL.gl.COLOR_BUFFER_BIT | modelGL.gl.DEPTH_BUFFER_BIT);

  const fieldOfView = (45 * Math.PI) / 180; // in radians
  const aspect = modelGL.gl.canvas.clientWidth / modelGL.gl.canvas.clientHeight;
  const zNear = 0.1;
  const zFar = 100.0;
  const projectionMatrix = mat4.create();

  var worldMatrix = new Float32Array(16);
  mat4.identity(worldMatrix);

  mat4.perspective(projectionMatrix, fieldOfView, aspect, zNear, zFar);
  const modelViewMatrix = mat4.create();

  mat4.translate(
    modelViewMatrix, // dest matrix
    modelViewMatrix, // matrix to translate
    [-0.0, 0.0, -12.0],
  ); // amount to translate
  mat4.rotate(
    modelViewMatrix, // dest matrix
    modelViewMatrix, // matrix to rotate
    cubeRotation, // amount to rotate in radians
    [0, 0, 1],
  ); // axis to rotate around (Z)
  mat4.rotate(
    modelViewMatrix, // dest matrix
    modelViewMatrix, // matrix to rotate
    cubeRotation * 0.7, // amount to rotate in radians
    [0, 1, 0],
  );
  {
    modelGL.gl.bindBuffer(modelGL.gl.ARRAY_BUFFER, buffers.position);
    modelGL.gl.vertexAttribPointer(programInfo.attribLocations.vertexPosition, 3, modelGL.gl.FLOAT, false, 0, 0);
    modelGL.gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);
  }
  {
    modelGL.gl.bindBuffer(modelGL.gl.ARRAY_BUFFER, buffers.color);
    modelGL.gl.vertexAttribPointer(programInfo.attribLocations.vertexColor, 4, modelGL.gl.FLOAT, false, 0, 0);
    modelGL.gl.enableVertexAttribArray(programInfo.attribLocations.vertexColor);
  }
  // Tell WebGL which indices to use to index the vertices
  modelGL.gl.bindBuffer(modelGL.gl.ELEMENT_ARRAY_BUFFER, buffers.indices);
  // Tell WebGL to use our program when drawing
  modelGL.gl.useProgram(programInfo.program);
  // Set the shader uniforms\
  modelGL.gl.uniformMatrix4fv(programInfo.uniformLocations.projectionMatrix, false, projectionMatrix);
  modelGL.gl.uniformMatrix4fv(programInfo.uniformLocations.modelViewMatrix, false, modelViewMatrix);
  modelGL.gl.uniformMatrix4fv(programInfo.uniformLocations.worldMatrix, false, worldMatrix);

  {
    modelGL.gl.drawElements(modelGL.gl.TRIANGLES, 108, modelGL.gl.UNSIGNED_SHORT, 0);
  }
  cubeRotation += deltaTime;
}

function main() {
  modelGL = new ModelGL();
  init();
}

window.onload = main;
