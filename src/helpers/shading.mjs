function shading(modelMatrix, viewMatrix) {
  var temp = multiply(modelMatrix, viewMatrix);
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

  normalMatrixes = math.inv(mvMatrix);

  normalMatrixes = math.transpose(normalMatrixes);
  var normalVector = [];
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      normalVector.push(normalMatrixes[i][j]);
    }
  }

  gl.uniformMatrix4fv(modelGL.programInfo.uniformLocations.normalMatrix, false, normalVector);
}

function updateShading() {
  let checkbox = document.getElementById("shader");
  isShading = checkbox.checked;
}

function checkShading(modelMatrix, viewMatrix) {
  var isShading = true;
  if (isShading) {
    shading(modelMatrix, viewMatrix);
  } else {
    var normalMatrixes = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    gl.uniformMatrix4fv(modelGL.programInfo.uniformLocations.normalMatrix, false, normalMatrixes);
  }
}
