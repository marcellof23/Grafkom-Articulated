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

// prettier-ignore
var positions = [
  // First block
  // left top bar complete 6 side
  // top face (urutan bener sesuai kaidah tangan kanan)
  -0.9, 1.1, 0.9,
  -0.9, 1.1, -0.9,
  -1.1, 1.1, -0.9, 
  -1.1, 1.1, 0.9, 

  // bottom face (urutan bener sesuai kaidah tangan kanan)
  -0.9, 0.9, 0.9,
  -1.1, 0.9, 0.9, 
  -1.1, 0.9, -0.9, 
  -0.9, 0.9, -0.9,

  // right face (urutan bener sesuai kaidah tangan kanan)
  -0.9, 1.1, -0.9,  
  -0.9, 1.1, 0.9,
  -0.9, 0.9, 0.9,
  -0.9, 0.9, -0.9,

  // left face (urutan bener sesuai kaidah tangan kanan)
  -1.1, 1.1, -0.9,
  -1.1, 0.9, -0.9,
  -1.1, 0.9, 0.9, 
  -1.1, 1.1, 0.9, 

  // back face (urutan bener sesuai kaidah tangan kanan)
  -1.1, 0.9, -0.9,
  -1.1, 1.1, -0.9, 
  -0.9, 1.1, -0.9,
  -0.9, 0.9, -0.9, 

  // front face (urutan bener sesuai kaidah tangan kanan)
  -1.1, 0.9, 0.9,
  -0.9, 0.9, 0.9, 
  -0.9, 1.1,  0.9,
  -1.1, 1.1,  0.9, 

  // Second block
  // right top bar complete 6 side
  // top face (urutan bener sesuai kaidah tangan kanan)
  1.1, 1.1, 0.9, 
  1.1, 1.1, -0.9,
  0.9, 1.1, -0.9, 
  0.9, 1.1, 0.9,

  // bottom face (urutan bener sesuai kaidah tangan kanan)
  1.1, 0.9, 0.9, 
  0.9, 0.9, 0.9,
  0.9, 0.9, -0.9, 
  1.1, 0.9, -0.9,

  // left face (urutan bener sesuai kaidah tangan kanan)
  0.9, 0.9, -0.9,
  0.9, 0.9, 0.9, 
  0.9, 1.1, 0.9,
  0.9, 1.1, -0.9, 

  // right face (urutan bener sesuai kaidah tangan kanan)
  1.1, 0.9, -0.9,
  1.1, 1.1, -0.9,
  1.1, 1.1, 0.9,
  1.1, 0.9, 0.9,  

  // back face (urutan bener sesuai kaidah tangan kanan)
  0.9, 1.1, -0.9,
  1.1, 1.1, -0.9, 
  1.1, 0.9, -0.9,
  0.9, 0.9, -0.9, 

  // front face (urutan bener sesuai kaidah tangan kanan)
  1.1, 0.9, 0.9,
  1.1, 1.1, 0.9,
  0.9, 1.1, 0.9,
  0.9, 0.9, 0.9,  

  // Third block
  // back top bar incomplete 6 side
  // bottom face (urutan bener sesuai kaidah tangan kanan)
  1.1,  0.9, -0.9,
  -1.1, 0.9, -0.9,
  -1.1, 0.9, -1.1,  
  1.1,  0.9, -1.1,

  // top face (urutan bener sesuai kaidah tangan kanan)
  1.1,  1.1, -0.9,
  1.1,  1.1, -1.1,
  -1.1, 1.1, -1.1,  
  -1.1, 1.1, -0.9,

  // back face (urutan bener sesuai kaidah tangan kanan)
  -1.1, 0.9, -1.1,
  -1.1, 1.1, -1.1, 
  1.1,  1.1, -1.1,
  1.1,  0.9, -1.1, 

  // left face (urutan bener sesuai kaidah tangan kanan)
  -1.1, 0.9, -0.9,
  -1.1,  1.1, -0.9,
  -1.1,  1.1, -1.1, 
  -1.1, 0.9, -1.1, 

  // right face (urutan bener sesuai kaidah tangan kanan)
  1.1, 0.9, -1.1, 
  1.1,  1.1, -1.1,
  1.1,  1.1, -0.9, 
  1.1, 0.9, -0.9,

  // forth block
  // front top bar incomplete
  // bottom face (urutan bener sesuai kaidah tangan kanan)
  1.1,  0.9, 1.1,
  -1.1, 0.9, 1.1, 
  -1.1, 0.9, 0.9,
  1.1,  0.9, 0.9, 

  // top face (urutan bener sesuai kaidah tangan kanan)
  -1.1, 1.1, 0.9,
  -1.1, 1.1, 1.1, 
  1.1,  1.1, 1.1,
  1.1,  1.1, 0.9, 

  // front face (urutan bener sesuai kaidah tangan kanan)
  -1.1, 0.9, 1.1,
  1.1,  0.9, 1.1, 
  1.1,  1.1, 1.1,
  -1.1, 1.1, 1.1, 

  // left face (urutan bener sesuai kaidah tangan kanan)
  -1.1, 0.9,  0.9,
  -1.1, 0.9,  1.1, 
  -1.1,  1.1, 1.1,
  -1.1,  1.1, 0.9, 

  // right face (urutan bener sesuai kaidah tangan kanan)
  1.1, 0.9,  0.9,
  1.1,  1.1, 0.9, 
  1.1,  1.1, 1.1,
  1.1, 0.9,  1.1, 
  
  // fifth block
  // bottom left bar complete 6 side
  // bottom face (urutan bener sesuai kaidah tangan kanan)
  -0.9, -1.1, 0.9,
  -1.1, -1.1, 0.9, 
  -1.1, -1.1, -0.9,
  -0.9, -1.1, -0.9, 

  // top face (urutan bener sesuai kaidah tangan kanan)
  -0.9, -0.9, 0.9,
  -0.9, -0.9, -0.9,
  -1.1, -0.9, -0.9, 
  -1.1, -0.9, 0.9, 

  // right face (urutan bener sesuai kaidah tangan kanan)
  -0.9, -1.1, -0.9, 
  -0.9, -0.9, -0.9,
  -0.9, -0.9, 0.9, 
  -0.9, -1.1, 0.9,

  // left face (urutan bener sesuai kaidah tangan kanan)
  -1.1, -0.9, -0.9,
  -1.1, -1.1, -0.9,
  -1.1, -1.1, 0.9, 
  -1.1, -0.9, 0.9, 

  // back face (urutan bener sesuai kaidah tangan kanan)
  -1.1, -0.9, -0.9,
  -0.9, -0.9, -0.9, 
  -0.9, -1.1, -0.9,
  -1.1, -1.1, -0.9, 

  // front face (urutan bener sesuai kaidah tangan kanan)
  -1.1, -0.9, 0.9,
  -1.1, -1.1,  0.9,
  -0.9, -1.1,  0.9, 
  -0.9, -0.9, 0.9, 

  // Sixth block
  // bottom right bar complete 6 side
  // bottom face (urutan bener sesuai kaidah tangan kanan)
  0.9, -1.1, 0.9,
  0.9, -1.1, -0.9,
  1.1, -1.1, -0.9, 
  1.1, -1.1, 0.9, 

  // top face (urutan bener sesuai kaidah tangan kanan)
  0.9, -0.9, 0.9,
  1.1, -0.9, 0.9, 
  1.1, -0.9, -0.9,
  0.9, -0.9, -0.9, 

  // left face (urutan bener sesuai kaidah tangan kanan)
  0.9, -0.9, -0.9,
  0.9, -1.1, -0.9,
  0.9, -1.1, 0.9, 
  0.9, -0.9, 0.9, 

  // right face (urutan bener sesuai kaidah tangan kanan)
  1.1, -0.9, -0.9,
  1.1, -0.9, 0.9, 
  1.1, -1.1, 0.9,
  1.1, -1.1, -0.9, 

  // back face (urutan bener sesuai kaidah tangan kanan)
  1.1, -0.9, -0.9,
  1.1, -1.1, -0.9, 
  0.9, -1.1, -0.9,
  0.9, -0.9, -0.9, 

  // front bar (urutan bener sesuai kaidah tangan kanan)
  1.1, -0.9, 0.9,
  0.9, -0.9, 0.9, 
  0.9, -1.1, 0.9,
  1.1, -1.1, 0.9, 

  // Seventh block
  // bottom back bar incomplete
  // top face (urutan bener sesuai kaidah tangan kanan)
  -1.1, -0.9, -0.9,
  1.1,  -0.9, -0.9,
  1.1,  -0.9, -1.1,
  -1.1, -0.9, -1.1,  

  // bottom face (urutan bener sesuai kaidah tangan kanan)
  -1.1, -1.1, -0.9,
  -1.1, -1.1, -1.1, 
  1.1,  -1.1, -1.1,
  1.1,  -1.1, -0.9, 

  // back face (urutan bener sesuai kaidah tangan kanan)
  -1.1, -0.9, -1.1,
  1.1,  -0.9, -1.1,
  1.1,  -1.1, -1.1,
  -1.1, -1.1, -1.1,  

  // left face (urutan bener sesuai kaidah tangan kanan)
  -1.1, -0.9, -0.9,
  -1.1, -0.9, -1.1, 
  -1.1, -1.1, -1.1,
  -1.1, -1.1, -0.9, 

  // right face (urutan bener sesuai kaidah tangan kanan)
  1.1, -0.9, -0.9,
  1.1, -1.1, -0.9, 
  1.1, -1.1, -1.1,
  1.1, -0.9, -1.1, 



  // forth block
  // bottom front bar incomplete
  // top face (urutan bener sesuai kaidah tangan kanan)
  -1.1, -0.9, 0.9,
  -1.1, -0.9, 1.1, 
  1.1,  -0.9, 1.1,
  1.1,  -0.9, 0.9, 

  // bottom face (urutan bener sesuai kaidah tangan kanan)
  -1.1, -1.1, 0.9,
  1.1,  -1.1, 0.9, 
  1.1,  -1.1, 1.1,
  -1.1, -1.1, 1.1, 

  // front face (urutan bener sesuai kaidah tangan kanan)
  -1.1, -0.9, 1.1,
  -1.1, -1.1, 1.1, 
  1.1,  -1.1, 1.1,
  1.1,  -0.9, 1.1, 

  // left face (urutan bener sesuai kaidah tangan kanan)
  -1.1, -0.9,  0.9,
  -1.1, -1.1, 0.9, 
  -1.1, -1.1, 1.1,
  -1.1, -0.9,  1.1, 

  // right face (urutan bener sesuai kaidah tangan kanan)
  1.1, -0.9,  0.9,
  1.1, -0.9,  1.1,
  1.1, -1.1, 1.1, 
  1.1, -1.1, 0.9, 

  // ninth block
  // right back bar incomplete
  // back face (urutan bener sesuai kaidah tangan kanan)
  0.9,   0.9, -1.1,
  1.1,   0.9, -1.1, 
  1.1,  -0.9, -1.1,
  0.9,  -0.9, -1.1, 

  // front face (urutan bener sesuai kaidah tangan kanan)
  0.9,   0.9, -0.9,
  0.9,  -0.9, -0.9, 
  1.1,  -0.9, -0.9,
  1.1,   0.9, -0.9, 

  // right face (urutan bener sesuai kaidah tangan kanan)
  1.1,   0.9, -0.9,
  1.1,  -0.9, -0.9, 
  1.1,  -0.9, -1.1,
  1.1,   0.9, -1.1, 

  // left face (urutan bener sesuai kaidah tangan kanan)
  0.9,   0.9, -0.9,
  0.9,   0.9, -1.1, 
  0.9,  -0.9, -1.1,
  0.9,  -0.9, -0.9, 

  // tenth block
  // right front bar incomplete
  // front face (urutan bener sesuai kaidah tangan kanan)
  0.9,   0.9, 1.1,
  0.9,  -0.9, 1.1, 
  1.1,  -0.9, 1.1,
  1.1,   0.9, 1.1, 

  // back face (urutan bener sesuai kaidah tangan kanan)
  0.9,   0.9, 0.9,
  1.1,   0.9, 0.9, 
  1.1,  -0.9, 0.9,
  0.9,  -0.9, 0.9, 

  // right face (urutan bener sesuai kaidah tangan kanan)
  1.1,   0.9, 0.9,
  1.1,   0.9, 1.1, 
  1.1,  -0.9, 1.1,
  1.1,  -0.9, 0.9, 

  // left face (urutan bener sesuai kaidah tangan kanan)
  0.9,   0.9, 0.9,
  0.9,  -0.9, 0.9,
  0.9,  -0.9, 1.1,
  0.9,   0.9, 1.1,  

  // eleventh block
  // left front bar incomplete
  // front face (urutan bener sesuai kaidah tangan kanan)
  -0.9,   0.9, 1.1,
  -1.1,   0.9, 1.1, 
  -1.1,  -0.9, 1.1,
  -0.9,  -0.9, 1.1, 

  // back face (urutan bener sesuai kaidah tangan kanan)
  -0.9,   0.9, 0.9,
  -0.9,  -0.9, 0.9, 
  -1.1,  -0.9, 0.9,
  -1.1,   0.9, 0.9, 

  // left face (urutan bener sesuai kaidah tangan kanan)
  -1.1,   0.9, 0.9,
  -1.1,  -0.9, 0.9, 
  -1.1,  -0.9, 1.1,
  -1.1,   0.9, 1.1, 

  // right face (urutan bener sesuai kaidah tangan kanan)
  -0.9,   0.9, 0.9,
  -0.9,   0.9, 1.1, 
  -0.9,  -0.9, 1.1,
  -0.9,  -0.9, 0.9, 

  // twelveth block
  // left back bar incomplete
  // back face (urutan bener sesuai kaidah tangan kanan)
  -0.9,   0.9, -1.1,
  -0.9,  -0.9, -1.1, 
  -1.1,  -0.9, -1.1,
  -1.1,   0.9, -1.1, 

  // front face (urutan bener sesuai kaidah tangan kanan)
  -0.9,   0.9, -0.9,
  -1.1,   0.9, -0.9, 
  -1.1,  -0.9, -0.9,
  -0.9,  -0.9, -0.9, 

  // left face (urutan bener sesuai kaidah tangan kanan)
  -1.1,   0.9, -0.9,
  -1.1,   0.9, -1.1, 
  -1.1,  -0.9, -1.1,
  -1.1,  -0.9, -0.9, 

  // right face (urutan bener sesuai kaidah tangan kanan)
  -0.9,   0.9, -0.9,
  -0.9,  -0.9, -0.9, 
  -0.9,  -0.9, -1.1,
  -0.9,   0.9, -1.1, 
];

positions = positions.map((x) => x * 0.3);
