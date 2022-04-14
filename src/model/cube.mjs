// Now create an array of positions for the cube.

function generateCubeVertice(modelGL) {
  var q1 = 0;
  var q2 = 1;
  var q3 = 2;
  var q4 = 3;
  for (var i = 0; i < CubeVertices / cubeFace; i++) {
    quad(q1 + 4 * i, q2 + 4 * i, q3 + 4 * i, q4 + 4 * i);
    for (var k = 0; k < 6; k++) {
      var randomColors = [colorRgb.r, colorRgb.g, colorRgb.b, 1];
      for (var j = 0; j < 4; j++) {
        modelGL.cubeColors.push(randomColors[j]);
      }
    }
  }
  modelGL.cubeNormals = getNormals(positions);
}

var positionss = [],
  colorss = [];

var vertices = [
  vec4(-0.5, -0.5, 0.5, 0.5),
  vec4(-0.5, 0.5, 0.5, 0.5),
  vec4(0.5, 0.5, 0.5, 0.5),
  vec4(0.5, -0.5, 0.5, 0.5),
  vec4(-0.5, -0.5, -0.5, 0.5),
  vec4(-0.5, 0.5, -0.5, 0.5),
  vec4(0.5, 0.5, -0.5, 0.5),
  vec4(0.5, -0.5, -0.5, 0.5),
];

var vertexColors = [
  [0.0, 0.0, 0.0, 0.5], // black
  [0.5, 0.0, 0.0, 0.5], // red
  [0.5, 0.5, 0.0, 0.5], // yellow
  [0.0, 0.5, 0.0, 0.5], // green
  [0.0, 0.0, 0.5, 0.5], // blue
  [0.5, 0.0, 0.5, 0.5], // magenta
  [0.0, 0.5, 0.5, 0.5], // cyan
  [0.5, 0.5, 0.5, 0.5], // white
];

function quads(a, b, c, d) {
  var indices = [a, b, c, a, c, d];
  for (var i = 0; i < indices.length; ++i) {
    positionss.push(vertices[indices[i]]);
    console.log(vertices[indices[i]]);
    console.log(indices[i]);
    modelGL.cubePoints.push(indices[i]);
    //colors.push( vertexColors[indices[i]] );

    // for solid colored faces use
    modelGL.cubeColors.push(vertexColors[a]);
  }
}

function cube() {
  quads(1, 0, 3, 2);
  quads(2, 3, 7, 6);
  quads(3, 0, 4, 7);
  quads(6, 5, 1, 2);
  quads(4, 5, 6, 7);
  quads(5, 4, 0, 1);
}

// prettier-ignore
var positions = [
  // Front face
  -0.5, -0.5,  0.5,
   0.5, -0.5,  0.5,
   0.5,  0.5,  0.5,
  -0.5,  0.5,  0.5,

  // Back face
  -0.5, -0.5, -0.5,
  -0.5,  0.5, -0.5,
   0.5,  0.5, -0.5,
   0.5, -0.5, -0.5,

  // Top face
  -0.5,  0.5, -0.5,
  -0.5,  0.5,  0.5,
   0.5,  0.5,  0.5,
   0.5,  0.5, -0.5,

  // Bottom face
  -0.5, -0.5, -0.5,
   0.5, -0.5, -0.5,
   0.5, -0.5,  0.5,
  -0.5, -0.5,  0.5,

  // Right face
   0.5, -0.5, -0.5,
   0.5,  0.5, -0.5,
   0.5,  0.5,  0.5,
   0.5, -0.5,  0.5,

  // Left face
  -0.5, -0.5, -0.5,
  -0.5, -0.5,  0.5,
  -0.5,  0.5,  0.5,
  -0.5,  0.5, -0.5,
];
