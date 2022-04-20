var left = -1.0;
var right = 1.0;
var top = 1.0;
var bottom = -1.0;
var positions = [];

var mf, mfv;

const timer = (ms) => new Promise((res) => setTimeout(res, ms));

const fieldOfView = (45 * Math.PI) / 180; // in radians

const zNear = 1;
const zFar = 2000.0;

projectionMatrix = mat4.create();
modelViewMatrix = mat4.create();
normalMatrix = mat4.create();

var angleSpeed = 1.5;
var texture;

var setAnimeForward = true;
// shading button
var shadingButton = document.getElementById("shading");
var textureButton = document.getElementById("texture-btn");
var animationButton = document.getElementById("animation-btn");

var torsoStart = 0;
var idxStart = 1;
var idxEnd = 11;

menu_index = 0;

var fieldOfViewRadians = degToRad(60);
var modelXRotationRadians = degToRad(0);
var modelYRotationRadians = degToRad(0);

let textureMenu = 0;

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

  //get data from text
  document.getElementById("LoadButton").addEventListener("click", function () {
    var input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";

    input.onchange = (e) => {
      var f = e.target.files[0];
      var read = new FileReader();
      read.readAsText(f, "UTF-8");

      read.onload = (readerEvent) => {
        var arrfile = readerEvent.target.result;

        const myJSON = JSON.parse(arrfile);
        console.log(myJSON);
        positions = myJSON.positions;
        // pos = myJSON.positions;
        // top = myJSON.topology;
        // col = myJSON.colors;
        // shape = myJSON.shape;
        setUpVariable(myJSON);
        modelGL.gl.clearColor(0.0, 0.0, 0.0, 1.0); // Clear to black, fully opaque
        modelGL.gl.clearDepth(1.0);
        modelGL.gl.clear(modelGL.gl.COLOR_BUFFER_BIT | modelGL.gl.DEPTH_BUFFER_BIT); // Clear everything
        // resetAll();

        generateCubeVertice(modelGL, positions);
        var buffers = initBuffers(modelGL.gl);
        modelGL.buffers = buffers;

        var trans = { x: 0, y: 0, z: 0 };
        var rot = { x: 0, y: 0, z: 0 };
        var scale = { x: 0, y: 0, z: 0 };
        var light = { x: 0, y: 0, z: 0 };

        modelGL.trans = trans;
        modelGL.rot = rot;
        modelGL.scale = scale;
        modelGL.light = light;
        numNodes = myJSON.numNodes;

        console.log("AAAAAAA");
        console.log(myJSON);
        console.log(myJSON.name);
        if (myJSON.name == 0) {
          menu_index = 0;
          mf.selectedIndex = menu_index;
          mf.click();
        } else if (myJSON.name == 1) {
          menu_index = 1;
          mf.selectedIndex = menu_index;
          mf.click();
        } else if (myJSON.name == 2) {
          menu_index = 2;
          mf.selectedIndex = menu_index;
          mf.click();
        }
        render();
        // for (i = 0; i < numNodes; i++) initNodes(i);

        // // const buffers = initBuffers(gl, pos, top, col);
        // // newPos = [-0.0, 0.0, -6.0]
        // // function render() {
        // //     drawScene(gl, programInfo, buffers, top);
        // //     requestAnimationFrame(render);
        // // }
        // // requestAnimationFrame(render);
        // render();
        // document.getElementById("currModel").innerHTML = shape;
      };
    };
    input.click();
  });

  var programInfo = {
    program: shaderProgram,
    attribLocations: {
      vertexPosition: modelGL.gl.getAttribLocation(shaderProgram, "aVertexPosition"),
      vertexColor: modelGL.gl.getAttribLocation(shaderProgram, "aVertexColor"),
      vertexNormal: modelGL.gl.getAttribLocation(shaderProgram, "aVertexNormal"),
      textureCoord: modelGL.gl.getAttribLocation(shaderProgram, "aTextureCoord"),
      vertexTangent: modelGL.gl.getAttribLocation(shaderProgram, "aVertexTangent"),
      vertexBitangent: modelGL.gl.getAttribLocation(shaderProgram, "aVertexBitangent"),
    },
    uniformLocations: {
      projectionMatrix: modelGL.gl.getUniformLocation(shaderProgram, "uProjectionMatrix"),
      modelViewMatrix: modelGL.gl.getUniformLocation(shaderProgram, "uModelViewMatrix"),
      viewMatrix: modelGL.gl.getUniformLocation(shaderProgram, "uViewMatrix"),
      normalMatrix: modelGL.gl.getUniformLocation(shaderProgram, "uNormalMatrix"),
      directionalVector: modelGL.gl.getUniformLocation(shaderProgram, "directionalVector"),
      isShading: modelGL.gl.getUniformLocation(shaderProgram, "uShading"),
      isTexture: modelGL.gl.getUniformLocation(shaderProgram, "uTexture"),
      uSampler: modelGL.gl.getUniformLocation(shaderProgram, "uSampler"),
      uTexture: modelGL.gl.getUniformLocation(shaderProgram, "u_texture"),
      worldCameraposition: modelGL.gl.getUniformLocation(shaderProgram, "uWorldCameraPosition"),
      viewLocation: modelGL.gl.getUniformLocation(shaderProgram, "u_view"),
      worldLocation: modelGL.gl.getUniformLocation(shaderProgram, "u_world"),
      textureType1: modelGL.gl.getUniformLocation(shaderProgram, "textureType1"),
      textureType2: modelGL.gl.getUniformLocation(shaderProgram, "textureType2"),
    },
  };

  modelViewMatrixLoc = modelGL.gl.getUniformLocation(shaderProgram, "uModelViewMatrix");

  viewMatrix = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, -2, 1];
  modelGL.programInfo = programInfo;

  //texture = loadTexture(modelGL.gl, "/assets/bump.jpg");

  modelGL.aspect = modelGL.gl.canvas.clientWidth / modelGL.gl.canvas.clientHeight;
  modelGL.ratio = modelGL.gl.canvas.width / modelGL.gl.canvas.height;

  // set listener to sliders

  document.getElementById("rotate-x").addEventListener("input", function (e) {
    var rotation = (parseInt(document.getElementById("rotate-x").value) - 50) / 50;
    modelGL.rot.x = rotation;
    //requestAnimationFrame(render);
  });
  document.getElementById("rotate-y").addEventListener("input", function (e) {
    var rotation = (parseInt(document.getElementById("rotate-y").value) - 50) / 50;
    modelGL.rot.y = rotation;
    //requestAnimationFrame(render);
  });

  document.getElementById("translate-x").addEventListener("input", function (e) {
    var translate = (5 * (parseInt(document.getElementById("translate-x").value) - 50)) / 100;
    modelGL.trans.x = translate;
    //requestAnimationFrame(render);
  });
  document.getElementById("translate-y").addEventListener("input", function (e) {
    var translate = (5 * (parseInt(document.getElementById("translate-y").value) - 50)) / 100;
    modelGL.trans.y = translate;
    //requestAnimationFrame(render);
  });
  document.getElementById("translate-z").addEventListener("input", function (e) {
    var translate = (5 * (parseInt(document.getElementById("translate-z").value) - 50)) / 100;
    modelGL.trans.z = translate;
    //requestAnimationFrame(render);
  });

  document.getElementById("scale-x").addEventListener("input", function (e) {
    var scaler = (parseInt(document.getElementById("scale-x").value) - 50) / 100;
    modelGL.scale.x = scaler;
    //requestAnimationFrame(render);
  });
  document.getElementById("scale-y").addEventListener("input", function (e) {
    var scaler = (parseInt(document.getElementById("scale-y").value) - 50) / 100;
    modelGL.scale.y = scaler;
    //requestAnimationFrame(render);
  });
  document.getElementById("scale-z").addEventListener("input", function (e) {
    var scaler = (parseInt(document.getElementById("scale-z").value) - 50) / 100;
    modelGL.scale.z = scaler;
    //requestAnimationFrame(render);
  });

  document.getElementById("light-x").addEventListener("input", function (e) {
    var lighter = (parseInt(document.getElementById("light-x").value) - 50) / 100;
    modelGL.light.x = lighter;
    //requestAnimationFrame(render);
  });
  document.getElementById("light-y").addEventListener("input", function (e) {
    var lighter = (parseInt(document.getElementById("light-y").value) - 50) / 100;
    modelGL.light.y = lighter;
    //requestAnimationFrame(render);
  });
  document.getElementById("light-z").addEventListener("input", function (e) {
    var lighter = (parseInt(document.getElementById("light-z").value) - 50) / 100;
    modelGL.light.z = lighter;
    //requestAnimationFrame(render);
  });

  document.getElementById("camera").addEventListener("input", function (e) {
    var scaler = parseInt(document.getElementById("camera").value);
    cameraAngleRadians = degToRad(scaler);
    //requestAnimationFrame(render);
  });

  document.getElementById("zoom").addEventListener("input", function (e) {
    var scaler = parseInt(document.getElementById("zoom").value);
    radius = scaler;
    //requestAnimationFrame(render);
  });

  setUpSlider();

  document.getElementById("colorpicker").addEventListener("change", function (e) {
    colorRgb = hexToRgb(document.getElementById("colorpicker").value);
    modelGL.cubePoints = [];
    modelGL.cubeColors = [];

    generateCubeVertice(modelGL, positions);

    modelGL.buffers = initBuffers(modelGL.gl);
    //requestAnimationFrame(render);
  });

  document.getElementById("save").onclick = function () {
    save();
  };

  // JavaScript for Texture View Button
  document.getElementById("textureImage").onclick = function () {
    textureMenu = 0;
    setTextureType(modelGL.gl, 0);
  };
  document.getElementById("textureEnvirontment").onclick = function () {
    textureMenu = 1;
    setTextureType(modelGL.gl, 1);
  };
  document.getElementById("textureBump").onclick = function () {
    textureMenu = 2;
    setTextureType(modelGL.gl, 2);
  };

  mf = document.getElementById("menu-features");
  mf.addEventListener("click", () => {
    menu_index = mf.selectedIndex;
    if (menu_index == 0) {
      torsoStart = 0;
      idxStart = 1;
      idxEnd = 11;
    } else if (menu_index == 1) {
      torsoStart = 15;
      idxStart = 16;
      idxEnd = 26;
    } else if (menu_index == 2) {
      torsoStart = 27;
      idxStart = 28;
      idxEnd = 38;
    }
    for (i = 0; i < numNodes; i++) initNodes(i);
  });

  // Set event listener for export button
  let formatJSONPrefix = "data:text/json;charset=utf-8,";
  // const exportBtn = document.getElementById("export-button");
  // exportBtn.addEventListener("click", () => {
  //   var string_data = formatJSONPrefix + encodeURIComponent(JSON.stringify(modelGL));
  //   var download_button = document.getElementById("download-link");
  //   download_button.setAttribute("href", string_data);
  //   download_button.setAttribute("download", "data.json");
  //   download_button.click();
  // });

  // const importBtn = document.getElementById("import-button");
  // importBtn.addEventListener("click", () => {
  //   if (window.FileList && window.FileReader && window.File) {
  //     uploadBtn.click();
  //   } else {
  //     alert("file upload not supported by your browser!");
  //   }
  // });

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
          //requestAnimationFrame(render);
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

  // render();
  //requestAnimationFrame(render);
}

var time_old = 0;

async function render() {
  drawScene();
  // console.log("punten");

  for (var i = idxStart; i < idxEnd; i++) {
    initNodes(i);
  }

  await timer(100);
  render();
  //requestAnimationFrame(render);
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

  if (!textureButton.checked) generateCubeVertice(modelGL, positions);
  projectionMatrix = mat4.create();
  modelViewMatrix = mat4.create();

  mat4.ortho(projectionMatrix, -10.0, 15.0, -10.0, 10.0, -10.0, 10.0);

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

  {
    modelGL.gl.bindBuffer(modelGL.gl.ARRAY_BUFFER, modelGL.buffers.textureCoord);
    modelGL.gl.vertexAttribPointer(modelGL.programInfo.attribLocations.textureCoord, 2, modelGL.gl.FLOAT, false, 0, 0);
    modelGL.gl.enableVertexAttribArray(modelGL.programInfo.attribLocations.textureCoord);
  }

  // Tell WebGL which indices to use to index the vertices
  modelGL.gl.bindBuffer(modelGL.gl.ELEMENT_ARRAY_BUFFER, modelGL.buffers.indices);

  // Tell WebGL to use our program when drawing
  modelGL.gl.useProgram(modelGL.programInfo.program);

  // Tell WebGL we want to affect texture unit 0
  //modelGL.gl.activeTexture(modelGL.gl.TEXTURE0);

  // // Bind the texture to texture unit 0
  // modelGL.gl.bindTexture(modelGL.gl.TEXTURE_2D, texture);

  // // Tell the shader we bound the texture to texture unit 0
  // modelGL.gl.uniform1i(modelGL.programInfo.uniformLocations.uSampler, 0);

  // // set the light direction.
  modelGL.gl.uniform3fv(
    modelGL.programInfo.uniformLocations.directionalVector,
    normalizeVector([modelGL.light.x, modelGL.light.y, 1 + modelGL.light.z]),
  );

  mat4.rotateY(modelViewMatrix, modelViewMatrix, cameraAngleRadians);

  // mat4.translate(modelViewMatrix, modelViewMatrix, [0, 0, radius * 0.005]);
  mat4.scale(
    modelViewMatrix, // dest matrix
    modelViewMatrix, // matrix to modelGL.translate
    [radius * 0.1, radius * 0.1, radius * 0.1],
  );
  console.log(radius);

  // Make a view matrix from the camera matrix
  mat4.invert(modelViewMatrix, modelViewMatrix);

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
    modelGL.rot.y + 0.4, // amount to rotate in radians
    [0, 1, 0],
  );
  mat4.rotate(
    modelViewMatrix, // dest matrix
    modelViewMatrix, // matrix to rotate
    modelGL.rot.x + 0.3, // amount to rotate in radians
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

  traverse(torsoStart, arrayToMat4(modelViewMatrix), projectionMatrix, normalMatrix);

  // Set the shader uniforms
  modelGL.gl.uniformMatrix4fv(modelGL.programInfo.uniformLocations.viewMatrix, false, viewMatrix);
  modelGL.gl.uniformMatrix4fv(modelGL.programInfo.uniformLocations.projectionMatrix, false, projectionMatrix);
  modelGL.gl.uniformMatrix4fv(modelGL.programInfo.uniformLocations.modelViewMatrix, false, modelViewMatrix);
  modelGL.gl.uniformMatrix4fv(modelGL.programInfo.uniformLocations.normalMatrix, false, normalMatrix);
  modelGL.gl.uniform1i(modelGL.programInfo.uniformLocations.isShading, shadingButton.checked);
  modelGL.gl.uniform1i(modelGL.programInfo.uniformLocations.isTexture, textureButton.checked);

  //  Mapping
  if (textureButton.checked) {
    if (textureMenu == 0) {
      console.log("image mapping");
      modelGL.gl.uniform1i(modelGL.programInfo.uniformLocations.uTexture, 1);
      modelGL.gl.uniform1i(modelGL.programInfo.uniformLocations.textureType1, 0);
      modelGL.gl.uniform1i(modelGL.programInfo.uniformLocations.textureType2, 0);
      modelGL.gl.uniform1i(modelGL.programInfo.uniformLocations.uSampler, 0);
    }

    // Environment Mapping
    else if (textureMenu == 1) {
      console.log("Environment Mapping");
      modelGL.gl.uniform1i(modelGL.programInfo.uniformLocations.uTexture, 0);
      modelGL.gl.uniform1i(modelGL.programInfo.uniformLocations.textureType1, 1);
      modelGL.gl.uniform1i(modelGL.programInfo.uniformLocations.textureType2, 1);
      modelGL.gl.uniform1i(modelGL.programInfo.uniformLocations.uSampler, 1);
    }

    // Bump Mapping
    else {
      console.log("Bump Mapping");
      modelGL.gl.uniform1i(modelGL.programInfo.uniformLocations.uTexture, 1);
      modelGL.gl.uniform1i(modelGL.programInfo.uniformLocations.textureType1, 2);
      modelGL.gl.uniform1i(modelGL.programInfo.uniformLocations.textureType2, 2);
      modelGL.gl.uniform1i(modelGL.programInfo.uniformLocations.uSampler, 0);
    }
  }
  // console.log(textureMenu)

  {
    NumOfVertices = CubeVertices;
    //modelGL.gl.drawElements(modelGL.gl.TRIANGLES, NumOfVertices, modelGL.gl.UNSIGNED_SHORT, 0);
  }

  if (animationButton.checked) {
    for (var i = idxStart; i < idxEnd; i++) {
      theta[i] += angleSpeed;
      if (theta[i] > initTheta[i] + 30 || theta[i] < initTheta[i] - 30) {
        angleSpeed *= -1.0;
      }
    }
  }
}

function main() {
  modelGL = new ModelGL();
  init();
}

window.onload = main;

// document.getElementById("shading").addEventListener("change", function (event) {
//   isShading = !isShading;
//   modelGL.buffers = initBuffers(modelGL.gl, modelGL.programInfo);
//   //drawScene();
//   //toggleShade();
// });

function setUpSlider() {
  document.getElementById("slider0").addEventListener("input", function (e) {
    var id;
    if (menu_index == 0) {
      id = TORSO_ID;
    } else if (menu_index == 1) {
      id = torsoId2;
    } else if (menu_index == 2) {
      id = torsoId2;
    }
    theta[id] = e.target.value;
    //initNodes(TORSO_ID);
    //requestAnimationFrame(render);
  });

  document.getElementById("slider1").addEventListener("input", function (e) {
    var id;
    if (menu_index == 0) {
      id = NECK_ID;
    } else if (menu_index == 1) {
      id = NECK_ID;
    } else if (menu_index == 2) {
      id = NECK_ID;
    }
    theta[id] = e.target.value;
    //initNodes(NECK_ID);
    //requestAnimationFrame(render);
  });

  document.getElementById("slider2").addEventListener("input", function (e) {
    var id;
    if (menu_index == 0) {
      id = HEAD_ID;
    } else if (menu_index == 1) {
      id = headId2;
    } else if (menu_index == 2) {
      id = headId2;
    }
    theta[id] = e.target.value;
    //initNodes(HEAD_ID);
    //requestAnimationFrame(render);
  });

  document.getElementById("slider3").addEventListener("input", function (e) {
    theta[LEFT_FRONT_LEG_ID] = e.target.value;
    initNodes(LEFT_FRONT_LEG_ID);
    //requestAnimationFrame(render);
  });

  document.getElementById("slider4").addEventListener("input", function (e) {
    theta[LEFT_FRONT_FOOT_ID] = e.target.value;
    initNodes(LEFT_FRONT_FOOT_ID);
    //requestAnimationFrame(render);
  });

  document.getElementById("slider5").addEventListener("input", function (e) {
    theta[RIGHT_FRONT_LEG_ID] = e.target.value;
    initNodes(RIGHT_FRONT_LEG_ID);
    //requestAnimationFrame(render);
  });

  document.getElementById("slider6").addEventListener("input", function (e) {
    theta[RIGHT_FRONT_FOOT_ID] = e.target.value;
    initNodes(RIGHT_FRONT_FOOT_ID);
    //requestAnimationFrame(render);
  });

  document.getElementById("slider7").addEventListener("input", function (e) {
    theta[LEFT_BACK_LEG_ID] = e.target.value;
    initNodes(LEFT_BACK_LEG_ID);
    //requestAnimationFrame(render);
  });

  document.getElementById("slider8").addEventListener("input", function (e) {
    theta[LEFT_BACK_FOOT_ID] = e.target.value;
    initNodes(LEFT_BACK_FOOT_ID);
    //requestAnimationFrame(render);
  });

  document.getElementById("slider9").addEventListener("input", function (e) {
    theta[RIGHT_BACK_LEG_ID] = e.target.value;
    initNodes(RIGHT_BACK_LEG_ID);
    //requestAnimationFrame(render);
  });

  document.getElementById("slider10").addEventListener("input", function (e) {
    theta[RIGHT_BACK_FOOT_ID] = e.target.value;
    initNodes(RIGHT_BACK_FOOT_ID);
    //requestAnimationFrame(render);
  });
}
