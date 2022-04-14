var left = -1.0;
var right = 1.0;
var top = 1.0;
var bottom = -1.0;

var mf, mfv;

const fieldOfView = (45 * Math.PI) / 180; // in radians

const zNear = 1;
const zFar = 2000.0;

projectionMatrix = mat4.create();
modelViewMatrix = mat4.create();
normalMatrix = mat4.create();

var headHeight = 3.5;
var headWidth = 1.5;

function toggleShade() {
  const shaderProgram = initShaders(modelGL.gl, "vertex-shader", "fragment-shader", "fragment-shader-no-shade");
  modelGL.programInfo = {
    program: shaderProgram,
    attribLocations: {
      vertexPosition: modelGL.gl.getAttribLocation(shaderProgram, "aVertexPosition"),
      vertexColor: modelGL.gl.getAttribLocation(shaderProgram, "aVertexColor"),
      vertexNormal: modelGL.gl.getAttribLocation(shaderProgram, "aVertexNormal"),
    },
    uniformLocations: {
      projectionMatrix: modelGL.gl.getUniformLocation(shaderProgram, "uProjectionMatrix"),
      modelViewMatrix: modelGL.gl.getUniformLocation(shaderProgram, "uModelViewMatrix"),
      normalMatrix: modelGL.gl.getUniformLocation(shaderProgram, "uNormalMatrix"),
      directionalVector: modelGL.gl.getUniformLocation(shaderProgram, "directionalVector"),
    },
  };
  modelGL.buffers = initBuffers(modelGL.gl, modelGL.programInfo);
  drawScene();
}

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
  var shaderProgram = initShaders(modelGL.gl, "vertex-shader", "fragment-shader", "fragment-shader-no-shade");

  var programInfo = {
    program: shaderProgram,
    attribLocations: {
      vertexPosition: modelGL.gl.getAttribLocation(shaderProgram, "aVertexPosition"),
      vertexColor: modelGL.gl.getAttribLocation(shaderProgram, "aVertexColor"),
      vertexNormal: modelGL.gl.getAttribLocation(shaderProgram, "aVertexNormal"),
    },
    uniformLocations: {
      projectionMatrix: modelGL.gl.getUniformLocation(shaderProgram, "uProjectionMatrix"),
      modelViewMatrix: modelGL.gl.getUniformLocation(shaderProgram, "uModelViewMatrix"),
      normalMatrix: modelGL.gl.getUniformLocation(shaderProgram, "uNormalMatrix"),
      directionalVector: modelGL.gl.getUniformLocation(shaderProgram, "directionalVector"),
    },
  };

  modelViewMatrixLoc = modelGL.gl.getUniformLocation(shaderProgram, "uModelViewMatrix");

  modelGL.programInfo = programInfo;

  modelGL.aspect = modelGL.gl.canvas.clientWidth / modelGL.gl.canvas.clientHeight;
  modelGL.ratio = modelGL.gl.canvas.width / modelGL.gl.canvas.height;

  if (menu_index == 0) {
    //cube();
    generateCubeVertice(modelGL);
  } else if (menu_index == 1) {
    generatePyramidVertice(modelGL);
  } else if (menu_index == 2) {
    donut.makeVerts(modelGL);
  }
  var buffers = initBuffers(modelGL.gl);
  modelGL.buffers = buffers;

  mf = document.getElementById("menu-features");
  mf.addEventListener("click", () => {
    menu_index = mf.selectedIndex;
    modelGL.cubePoints = [];
    modelGL.cubeColors = [];
    if (menu_index == 0) {
      generateCubeVertice(modelGL);
    } else if (menu_index == 1) {
      generatePyramidVertice(modelGL);
    } else if (menu_index == 2) {
      donut.makeVerts(modelGL);
    }

    modelGL.buffers = initBuffers(modelGL.gl);
    requestAnimationFrame(render);
  });

  var trans = { x: 0, y: 0, z: 0 };
  var rot = { x: 0, y: 0, z: 0 };
  var scale = { x: 0, y: 0, z: 0 };
  var light = { x: 0, y: 0, z: 0 };

  modelGL.trans = trans;
  modelGL.rot = rot;
  modelGL.scale = scale;
  modelGL.light = light;

  for (i = 0; i < numNodes; i++) initNodes(i);

  function render() {
    drawScene();
  }

  render();
  requestAnimationFrame(render);

  // set listener to sliders

  document.getElementById("rotate-x").addEventListener("input", function (e) {
    var rotation = (parseInt(document.getElementById("rotate-x").value) - 50) / 50;
    modelGL.rot.x = rotation;
    requestAnimationFrame(render);
  });
  document.getElementById("rotate-y").addEventListener("input", function (e) {
    var rotation = (parseInt(document.getElementById("rotate-y").value) - 50) / 50;
    modelGL.rot.y = rotation;
    requestAnimationFrame(render);
  });
  document.getElementById("rotate-z").addEventListener("input", function (e) {
    var rotation = (parseInt(document.getElementById("rotate-z").value) - 50) / 50;
    modelGL.rot.z = rotation;
    requestAnimationFrame(render);
  });

  document.getElementById("translate-x").addEventListener("input", function (e) {
    var translate = (5 * (parseInt(document.getElementById("translate-x").value) - 50)) / 100;
    modelGL.trans.x = translate;
    requestAnimationFrame(render);
  });
  document.getElementById("translate-y").addEventListener("input", function (e) {
    var translate = (5 * (parseInt(document.getElementById("translate-y").value) - 50)) / 100;
    modelGL.trans.y = translate;
    requestAnimationFrame(render);
  });
  document.getElementById("translate-z").addEventListener("input", function (e) {
    var translate = (5 * (parseInt(document.getElementById("translate-z").value) - 50)) / 100;
    modelGL.trans.z = translate;
    requestAnimationFrame(render);
  });

  document.getElementById("scale-x").addEventListener("input", function (e) {
    var scaler = (parseInt(document.getElementById("scale-x").value) - 50) / 100;
    modelGL.scale.x = scaler;
    requestAnimationFrame(render);
  });
  document.getElementById("scale-y").addEventListener("input", function (e) {
    var scaler = (parseInt(document.getElementById("scale-y").value) - 50) / 100;
    modelGL.scale.y = scaler;
    requestAnimationFrame(render);
  });
  document.getElementById("scale-z").addEventListener("input", function (e) {
    var scaler = (parseInt(document.getElementById("scale-z").value) - 50) / 100;
    modelGL.scale.z = scaler;
    requestAnimationFrame(render);
  });

  document.getElementById("light-x").addEventListener("input", function (e) {
    var lighter = (parseInt(document.getElementById("light-x").value) - 50) / 100;
    modelGL.light.x = lighter;
    requestAnimationFrame(render);
  });
  document.getElementById("light-y").addEventListener("input", function (e) {
    var lighter = (parseInt(document.getElementById("light-y").value) - 50) / 100;
    modelGL.light.y = lighter;
    requestAnimationFrame(render);
  });
  document.getElementById("light-z").addEventListener("input", function (e) {
    var lighter = (parseInt(document.getElementById("light-z").value) - 50) / 100;
    modelGL.light.z = lighter;
    requestAnimationFrame(render);
  });

  document.getElementById("camera").addEventListener("input", function (e) {
    var scaler = parseInt(document.getElementById("camera").value);
    cameraAngleRadians = degToRad(scaler);
    requestAnimationFrame(render);
  });

  document.getElementById("zoom").addEventListener("input", function (e) {
    var scaler = parseInt(document.getElementById("zoom").value);
    radius = scaler;
    requestAnimationFrame(render);
  });

  document.getElementById("colorpicker").addEventListener("change", function (e) {
    colorRgb = hexToRgb(document.getElementById("colorpicker").value);
    menu_index = mf.selectedIndex;
    modelGL.cubePoints = [];
    modelGL.cubeColors = [];
    if (menu_index == 0) {
      generateCubeVertice(modelGL);
    } else if (menu_index == 1) {
      generatePyramidVertice(modelGL);
    } else if (menu_index == 2) {
      donut.makeVerts(modelGL);
    }

    modelGL.buffers = initBuffers(modelGL.gl);
    // requestAnimationFrame(render);
    requestAnimationFrame(render);
  });

  mfv = document.getElementById("menu-features-view");
  mfv.addEventListener("click", () => {
    menu_index_view = mfv.selectedIndex;
    requestAnimationFrame(render);
  });

  // Set event listener for export button
  let formatJSONPrefix = "data:text/json;charset=utf-8,";
  const exportBtn = document.getElementById("export-button");
  exportBtn.addEventListener("click", () => {
    modelGL.menuIdx = menu_index;
    modelGL.menuViewIdx = menu_index_view;

    var string_data = formatJSONPrefix + encodeURIComponent(JSON.stringify(modelGL));
    var download_button = document.getElementById("download-link");
    download_button.setAttribute("href", string_data);
    download_button.setAttribute("download", "data.json");
    download_button.click();
  });

  const importBtn = document.getElementById("import-button");
  importBtn.addEventListener("click", () => {
    if (window.FileList && window.FileReader && window.File) {
      uploadBtn.click();
    } else {
      alert("file upload not supported by your browser!");
    }
  });

  const uploadBtn = document.getElementById("upload-button");
  uploadBtn.addEventListener("change", async (e) => {
    const file = e.target.files[0];
    const read_file = new FileReader();
    read_file.addEventListener("load", async (e) => {
      try {
        var data = await JSON.parse(e.target.result);
        if (data) {
          modelGL.load_data(data);
          mf.selectedIndex = modelGL.menuIdx;
          mfv.selectedIndex = modelGL.menuViewIdx;
          mf.click();
          mfv.click();
          drawScene();
          requestAnimationFrame(render);
        }
      } catch (err) {
        alert(`invalid json file\n${err}`);
      }
    });
    read_file.readAsText(file);
  });

  const resetBtn = document.getElementById("reset-button");
  const btnIdx = [
    "rotate-x",
    "rotate-y",
    "rotate-z",
    "translate-x",
    "translate-y",
    "translate-z",
    "scale-x",
    "scale-y",
    "scale-z",
    "light-x",
    "light-y",
    "light-z",
    "camera",
    "zoom",
  ];
  resetBtn.addEventListener("click", () => {
    mf.selectedIndex = 0;
    mfv.selectedIndex = 0;
    projectionMatrix = mat4.create();
    modelViewMatrix = mat4.create();
    modelGL.gl.clearColor(0.25, 0.25, 0.25, 1.0); // Clear to black, fully opaque
    modelGL.gl.clearDepth(1.0);
    modelGL.gl.clear(modelGL.gl.COLOR_BUFFER_BIT | modelGL.gl.DEPTH_BUFFER_BIT);

    for (let i = 0; i < btnIdx.length; i++) {
      document.getElementById(btnIdx[i]).value = 50;
    }

    modelGL.trans = { x: 0, y: 0, z: 0 };
    modelGL.rot = { x: 0, y: 0, z: 0 };
    modelGL.scale = { x: 0, y: 0, z: 0 };
    modelGL.light = { x: 0, y: 0, z: 0 };

    mfv.click();

    drawScene();
  });
}

function quad(a, b, c, d) {
  var indexes = [a, b, c, a, c, d];
  for (var i = 0; i < indexes.length; ++i) {
    modelGL.cubePoints.push([indexes[i]]);
  }
}

function drawScene() {
  modelGL.gl.clearColor(0.25, 0.25, 0.25, 1.0); // Clear to black, fully opaque
  modelGL.gl.clearDepth(1.0); // Clear everything
  modelGL.gl.enable(modelGL.gl.DEPTH_TEST); // Enable depth testing
  modelGL.gl.depthFunc(modelGL.gl.LEQUAL); // Near things obscure far things

  modelGL.gl.clear(modelGL.gl.COLOR_BUFFER_BIT | modelGL.gl.DEPTH_BUFFER_BIT);

  projectionMatrix = mat4.create();
  modelViewMatrix = mat4.create();

  if (menu_index_view == 0) {
    mat4.ortho(projectionMatrix, -10.0, 10.0, -10.0, 10.0, -10.0, 10.0);
    //mat4.perspective(projectionMatrix, fieldOfView, modelGL.aspect, zNear, zFar);
  } else if (menu_index_view == 1) {
    eye = vec3(0, 0, 1);
    mat4.lookAt(modelViewMatrix, eye, at, up);
    mat4.ortho(projectionMatrix, -1, 1, -1, 1, -1, 20);
  } else if (menu_index_view == 2) {
    modelViewMatrix = mat4.oblique(modelViewMatrix, 45, 120);
    mat4.ortho(projectionMatrix, -1, 1, -1, 1, -1.5, 20);
  }

  mat4.invert(normalMatrix, modelViewMatrix);
  mat4.transpose(normalMatrix, normalMatrix);

  if (!modelGL.rot) {
    modelGL.rot = { x: 0, y: 0, z: 0 };
  }

  if (!modelGL.trans) {
    modelGL.trans = { x: 0, y: 0, z: 0 };
  }

  if (!modelGL.light) {
    modelGL.light = { x: 0, y: 0, z: 0 };
  }

  if (!modelGL.scale) {
    modelGL.scale = { x: 0, y: 0, z: 0 };
  }

  mat4.translate(
    modelViewMatrix, // dest matrix
    modelViewMatrix, // matrix to modelGL.translate
    [0, 0, 0],
  ); // amount to modelGL.translate

  {
    modelGL.gl.bindBuffer(modelGL.gl.ARRAY_BUFFER, modelGL.buffers.position);
    modelGL.gl.vertexAttribPointer(
      modelGL.programInfo.attribLocations.vertexPosition,
      3,
      modelGL.gl.FLOAT,
      false,
      0,
      0,
    );
    modelGL.gl.enableVertexAttribArray(modelGL.programInfo.attribLocations.vertexPosition);
  }

  {
    modelGL.gl.bindBuffer(modelGL.gl.ARRAY_BUFFER, modelGL.buffers.normal);
    modelGL.gl.vertexAttribPointer(modelGL.programInfo.attribLocations.vertexNormal, 3, modelGL.gl.FLOAT, false, 0, 0);
    modelGL.gl.enableVertexAttribArray(modelGL.programInfo.attribLocations.vertexNormal);
  }

  {
    modelGL.gl.bindBuffer(modelGL.gl.ARRAY_BUFFER, modelGL.buffers.color);
    modelGL.gl.vertexAttribPointer(modelGL.programInfo.attribLocations.vertexColor, 4, modelGL.gl.FLOAT, false, 0, 0);
    modelGL.gl.enableVertexAttribArray(modelGL.programInfo.attribLocations.vertexColor);
  }

  // Tell WebGL which indices to use to index the vertices
  modelGL.gl.bindBuffer(modelGL.gl.ELEMENT_ARRAY_BUFFER, modelGL.buffers.indices);

  // Tell WebGL to use our program when drawing
  modelGL.gl.useProgram(modelGL.programInfo.program);

  // // set the light direction.
  modelGL.gl.uniform3fv(
    modelGL.programInfo.uniformLocations.directionalVector,
    normalizeVector([modelGL.light.x, modelGL.light.y, 1 + modelGL.light.z]),
  );

  // mat4.rotateY(modelViewMatrix, modelViewMatrix, cameraAngleRadians);

  // mat4.translate(modelViewMatrix, modelViewMatrix, [0, 0, radius * 0.6]);

  // // Make a view matrix from the camera matrix
  // mat4.invert(modelViewMatrix, modelViewMatrix);

  var viewProjectionMatrix = new Float32Array(16);
  mat4.identity(viewProjectionMatrix);
  mat4.multiply(viewProjectionMatrix, projectionMatrix, modelViewMatrix);

  mat4.rotate(
    modelViewMatrix, // dest matrix
    modelViewMatrix, // matrix to rotate
    modelGL.rot.z, // amount to rotate in radians
    [0, 0, 1],
  ); // axis to rotate around (Z)
  mat4.rotate(
    modelViewMatrix, // dest matrix
    modelViewMatrix, // matrix to rotate
    modelGL.rot.y, // amount to rotate in radians
    [0, 1, 0],
  );
  mat4.rotate(
    modelViewMatrix, // dest matrix
    modelViewMatrix, // matrix to rotate
    modelGL.rot.x, // amount to rotate in radians
    [1, 0, 0],
  );
  mat4.translate(
    modelViewMatrix, // dest matrix
    modelViewMatrix, // matrix to modelGL.translate
    [modelGL.trans.x, modelGL.trans.y, modelGL.trans.z],
  ); // amount to modelGL.translate
  mat4.scale(
    modelViewMatrix, // dest matrix
    modelViewMatrix, // matrix to modelGL.translate
    [1.0 + modelGL.scale.x, 1.0 + modelGL.scale.y, 1.0 + modelGL.scale.z],
  ); // amount to modelGL.translate

  // Compute a view projection matrix

  mat4.rotate(
    normalMatrix, // dest matrix
    normalMatrix, // matrix to rotate
    modelGL.rot.z, // amount to rotate in radians
    [0, 0, 1],
  ); // axis to rotate around (Z)
  mat4.rotate(
    normalMatrix, // dest matrix
    normalMatrix, // matrix to rotate
    modelGL.rot.y, // amount to rotate in radians
    [0, 1, 0],
  );
  mat4.rotate(
    normalMatrix, // dest matrix
    normalMatrix, // matrix to rotate
    modelGL.rot.x, // amount to rotate in radians
    [1, 0, 0],
  );

  traverse(torsoId, arrayToMat4(modelViewMatrix), projectionMatrix, normalMatrix);

  // Set the shader uniforms
  //modelGL.gl.uniformMatrix4fv(modelGL.programInfo.uniformLocations.projectionMatrix, false, projectionMatrix);
  //modelGL.gl.uniformMatrix4fv(modelGL.programInfo.uniformLocations.modelViewMatrix, false, modelViewMatrix);
  //modelGL.gl.uniformMatrix4fv(modelGL.programInfo.uniformLocations.normalMatrix, false, normalMatrix);

  {
    if (menu_index == 0) {
      NumOfVertices = CubeVertices;
    } else if (menu_index == 1) {
      NumOfVertices = PyramidNumVertices;
    } else if (menu_index == 2) {
      NumOfVertices = donutNumVertices;
    }
    console.log(NumOfVertices);
    //modelGL.gl.drawElements(modelGL.gl.TRIANGLES, NumOfVertices, modelGL.gl.UNSIGNED_SHORT, 0);
  }
}

function main() {
  modelGL = new ModelGL();
  init();
}

window.onload = main;

document.getElementById("shading").addEventListener("change", function (event) {
  toggleShade();
});
