function shading(modelMatrix, viewMatrix) {
  var temp = mult(modelMatrix, viewMatrix);
  var mvMatrix = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];
  var normalMatrixes = [];

  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      mvMatrix[i][j] = temp[i * 4 + j];
    }
  }

  mat4.invert(normalMatrixes, flatten(mvMatrix));
  mat4.transpose(normalMatrixes, normalMatrixes);

  var normalVector = [];
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      normalVector.push(normalMatrixes[i * 4 + j]);
    }
  }
  console.log(normalVector);
  gl.uniformMatrix4fv(modelGL.programInfo.uniformLocations.normalMatrix, false, normalVector);

  console.log(modelGL.programInfo);
}

function updateShading() {
  let checkbox = document.getElementById("shader");
  isShading = checkbox.checked;
}

function checkShading(modelMatrix, viewMatrix) {
  if (isShading) {
    shading(modelMatrix, viewMatrix);
  } else {
    var normalMatrixes = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    gl.uniformMatrix4fv(modelGL.programInfo.uniformLocations.normalMatrix, false, normalMatrixes);
  }
}
