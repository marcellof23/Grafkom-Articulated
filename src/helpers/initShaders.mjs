function initShaders(gl, vertexShaderId, fragmentShaderId) {
  var vertShdr;
  var fragShdr;

  var vertElem = document.getElementById(vertexShaderId);
  var fragElem = document.getElementById(fragmentShaderId);

  vertShdr = buildShader(gl, vertElem.text, gl.VERTEX_SHADER);
  fragShdr = buildShader(gl, fragElem.text, gl.FRAGMENT_SHADER);

  var program = gl.createProgram();
  gl.attachShader(program, vertShdr);
  gl.attachShader(program, fragShdr);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    alert("Error compiling shader: " + gl.getShaderInfoLog(shader));
    return -1;
  }

  return program;
}

function buildShader(gl, src, type) {
  var shader = gl.createShader(type);
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert("Error while compiling shader: " + gl.getShaderInfoLog(shader));
    return;
  }
  return shader;
}

function initBuffers(gl) {
  // Create a buffer for the cube's vertex positions.
  const positionBuffer = gl.createBuffer();

  console.log(positionBuffer);
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

  const colorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(modelGL.cubeColors), gl.STATIC_DRAW);

  const indexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

  console.log(modelGL.cubePoints);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(modelGL.cubePoints), gl.STATIC_DRAW);

  return {
    position: positionBuffer,
    color: colorBuffer,
    indices: indexBuffer,
  };
}
