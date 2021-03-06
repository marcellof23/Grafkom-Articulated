// Now create an array of positions for the cube.

function generateCubeVertice(modelGL, positions) {
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
// prettier-ignore
// var positions = [
//   // Front face
//   -0.5, -0.5,  0.5,
//    0.5, -0.5,  0.5,
//    0.5,  0.5,  0.5,
//   -0.5,  0.5,  0.5,

//   // Back face
//   -0.5, -0.5, -0.5,
//   -0.5,  0.5, -0.5,
//    0.5,  0.5, -0.5,
//    0.5, -0.5, -0.5,

//   // Top face
//   -0.5,  0.5, -0.5,
//   -0.5,  0.5,  0.5,
//    0.5,  0.5,  0.5,
//    0.5,  0.5, -0.5,

//   // Bottom face
//   -0.5, -0.5, -0.5,
//    0.5, -0.5, -0.5,
//    0.5, -0.5,  0.5,
//   -0.5, -0.5,  0.5,

//   // Right face
//    0.5, -0.5, -0.5,
//    0.5,  0.5, -0.5,
//    0.5,  0.5,  0.5,
//    0.5, -0.5,  0.5,

//   // Left face
//   -0.5, -0.5, -0.5,
//   -0.5, -0.5,  0.5,
//   -0.5,  0.5,  0.5,
//   -0.5,  0.5, -0.5,
// ];
