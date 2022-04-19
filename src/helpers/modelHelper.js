var instanceMatrix;

var gl;

var TORSO_ID = 0;
var NECK_ID = 1;
var HEAD_ID = 2;
var LEFT_FRONT_LEG_ID = 3;
var LEFT_FRONT_FOOT_ID = 4;
var RIGHT_FRONT_LEG_ID = 5;
var RIGHT_FRONT_FOOT_ID = 6;
var LEFT_BACK_LEG_ID = 7;
var LEFT_BACK_FOOT_ID = 8;
var RIGHT_BACK_LEG_ID = 9;
var RIGHT_BACK_FOOT_ID = 10;

var GLOBAL_ANGLE_ID = 12;
var GLOBAL_X_COORDINATE = 13;
var GLOBAL_Y_COORDINATE = 14;

var torsoId2 = 15;
var headId2 = 16;
var leftUpperArmId2 = 17;
var leftLowerArmId2 = 18;
var rightUpperArmId2 = 19;
var rightLowerArmId2 = 20;
var leftUpperLegId2 = 21;
var leftLowerLegId2 = 22;
var rightUpperLegId2 = 23;
var rightLowerLegId2 = 24;
var headId22 = 25;

var torsoHeight;
var torsoWidth;
var upperArmHeight;
var lowerArmHeight;
var upperArmWidth;
var lowerArmWidth;
var upperLegWidth;
var lowerLegWidth;
var lowerLegHeight;
var upperLegHeight;
var headHeight;
var headWidth;
var neckHeight;
var neckWidth;

var torsoHeight2;
var torsoWidth2;
var upperArmHeight2;
var lowerArmHeight2;
var upperArmWidth2;
var lowerArmWidth2;
var upperLegWidth2;
var lowerLegWidth2;
var lowerLegHeight2;
var upperLegHeight2;
var headHeight2;
var headWidth2;


var torsoHeights = [8.0, 5.0];
var torsoWidths = [3.0, 2.5];
var upperArmHeights = [5.0, 3.0];
var lowerArmHeights = [2.0, 2.0];
var upperArmWidths = [1.3, 0.5];
var lowerArmWidths = [0.8, 0.5];
var upperLegWidths = [1.3, 0.5];
var lowerLegWidths = [0.8, 0.5];
var lowerLegHeights = [2.0, 2.0];
var upperLegHeights = [5.0, 3.0];
var headHeights = [3.5, 1.5];
var headWidths = [1.5, 1.0];




var numNodes;
var numAngles;
var angle;

var initTheta = [];
var theta = [];
var theta2 = [];


var stack = [];

var figure = [];

var modelViewMatrices;
var projectionMatrices;
var normalMatrices;

for (var i = 0; i < 26; i++) figure[i] = createNode(null, null, null, null);

function scale4(a, b, c) {
  var result = matrix4();
  result[0][0] = a;
  result[1][1] = b;
  result[2][2] = c;
  return result;
}

instanceMatrix = matrix4();

// Create the node for the tree
function createNode(matrixTransform, render, sibling, child) {
  var node = {
    transform: matrixTransform,
    render: render,
    sibling: sibling,
    child: child,
  };
  return node;
}


function setUpVariable(myJSON){
  console.log(myJSON)
  torsoHeight = myJSON.torsoHeight;
  torsoWidth = myJSON.torsoWidth;
  upperArmHeight = myJSON.upperArmHeight;
  lowerArmHeight = myJSON.lowerArmHeight;
  upperArmWidth =  myJSON.upperArmWidth;
  lowerArmWidth = myJSON.lowerArmWidth;
  upperLegWidth = myJSON.upperLegWidth;
  lowerLegWidth = myJSON.lowerLegWidth;
  lowerLegHeight = myJSON.lowerLegHeight;
  upperLegHeight = myJSON.upperLegHeight;
  headHeight = myJSON.headHeight;
  headWidth = myJSON.headWidth;
  neckHeight = myJSON.neckHeight;
  neckWidth = myJSON.neckWidth;

  torsoHeight2 = myJSON.torsoHeight2;
  torsoWidth2 = myJSON.torsoWidth2;
  upperArmHeight2 = myJSON.upperArmHeight2;
  lowerArmHeight2 = myJSON.lowerArmHeight2;
  upperArmWidth2 = myJSON.upperArmWidth2;
  lowerArmWidth2 = myJSON.lowerArmWidth2;
  upperLegWidth2 = myJSON.upperLegWidth2;
  lowerLegWidth2 = myJSON.lowerLegWidth2;
  lowerLegHeight2 = myJSON.lowerLegHeight2;
  upperLegHeight2 = myJSON.upperLegHeight2;
  headHeight2 = myJSON.headHeight2;
  headWidth2 = myJSON.headWidth2;

  numNodes = myJSON.numNodes;
  numAngles = myJSON.numAngles;
  angle = myJSON.angle;
  initTheta = myJSON.initTheta;
  theta = myJSON.theta;
  theta2 = myJSON.theta2;

}


function download(content, fileName, contentType) {
  var a = document.createElement("a");
  var file = new Blob([content], {type: contentType});
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.click();
}

async function save() {
  var data = {
    torsoHeight,
    torsoWidth,
    upperArmHeight,
    lowerArmHeight,
    upperArmWidth,
    lowerArmWidth,
    upperLegWidth,
    lowerLegWidth,
    lowerLegHeight,
    upperLegHeight,
    headHeight,
    headWidth,
    neckHeight,
    neckWidth,

    torsoHeight2,
    torsoWidth2,
    upperArmHeight2,
    lowerArmHeight2,
    upperArmWidth2,
    lowerArmWidth2,
    upperLegWidth2,
    lowerLegWidth2,
    lowerLegHeight2,
    upperLegHeight2,
    headHeight2,
    headWidth2,

    numNodes,
    numAngles,
    angle,

    initTheta,
    theta,
    theta2
  }
  let jsonData = JSON.stringify(data);
  download(jsonData, 'model.json', 'text/plain');
}



function initNodes(Id) {
  var m = matrix4();
  switch (Id) {
    case TORSO_ID:
      m = rotate(theta[GLOBAL_ANGLE_ID], 0, 0, 1);
      m = mult(m, rotate(theta[TORSO_ID], 0, 1, 0));
      figure[TORSO_ID] = createNode(m, torso, null, NECK_ID);
      break;

    case NECK_ID:
      m = translate(1.0, torsoHeight - neckHeight + 3.5, 0.0);
      m = mult(m, rotate(theta[NECK_ID], 1, 0, 0));
      m = mult(m, rotate(angle, 0, 1, 0));
      m = mult(m, translate(0.0, -1 * neckHeight, 0.0));
      figure[NECK_ID] = createNode(m, neck, LEFT_FRONT_LEG_ID, HEAD_ID);
      break;

    case HEAD_ID:
      m = translate(0.0, 0.2 * headHeight, 0.0);
      m = mult(m, rotate(theta[HEAD_ID], 1, 0, 0));
      m = mult(m, translate(0.0, -0.8 * headHeight, 0.0));
      figure[HEAD_ID] = createNode(m, head, null, null);
      break;
    case LEFT_FRONT_LEG_ID:
      m = translate(-(torsoWidth / 3 + upperArmWidth), 0.9 * torsoHeight, 0.0);
      m = mult(m, rotate(theta[LEFT_FRONT_LEG_ID], 1, 0, 0));
      figure[LEFT_FRONT_LEG_ID] = createNode(m, leftUpperArm, RIGHT_FRONT_LEG_ID, LEFT_FRONT_FOOT_ID);
      break;

    case RIGHT_FRONT_LEG_ID:
      m = translate(torsoWidth / 3 + upperArmWidth, 0.9 * torsoHeight, 0.0);
      m = mult(m, rotate(theta[RIGHT_FRONT_LEG_ID], 1, 0, 0));
      figure[RIGHT_FRONT_LEG_ID] = createNode(m, rightUpperArm, LEFT_BACK_LEG_ID, RIGHT_FRONT_FOOT_ID);
      break;

    case LEFT_BACK_LEG_ID:
      m = translate(-(torsoWidth / 3 + upperLegWidth), 0.1 * upperLegHeight, 0.0);
      m = mult(m, rotate(theta[LEFT_BACK_LEG_ID], 1, 0, 0));
      figure[LEFT_BACK_LEG_ID] = createNode(m, leftUpperLeg, RIGHT_BACK_LEG_ID, LEFT_BACK_FOOT_ID);
      break;

    case RIGHT_BACK_LEG_ID:
      m = translate(torsoWidth / 3 + upperLegWidth, 0.1 * upperLegHeight, 0.0);
      m = mult(m, rotate(theta[RIGHT_BACK_LEG_ID], 1, 0, 0));
      figure[RIGHT_BACK_LEG_ID] = createNode(m, rightUpperLeg, null, RIGHT_BACK_FOOT_ID);
      break;

    case LEFT_FRONT_FOOT_ID:
      m = translate(0.0, upperArmHeight, 0.0);
      m = mult(m, rotate(theta[LEFT_FRONT_FOOT_ID], 1, 0, 0));
      figure[LEFT_FRONT_FOOT_ID] = createNode(m, leftLowerArm, null, null);
      break;

    case RIGHT_FRONT_FOOT_ID:
      m = translate(0.0, upperArmHeight, 0.0);
      m = mult(m, rotate(theta[RIGHT_FRONT_FOOT_ID], 1, 0, 0));
      figure[RIGHT_FRONT_FOOT_ID] = createNode(m, rightLowerArm, null, null);
      break;

    case LEFT_BACK_FOOT_ID:
      m = translate(0.0, upperLegHeight, 0.0);
      m = mult(m, rotate(theta[LEFT_BACK_FOOT_ID], 1, 0, 0));
      figure[LEFT_BACK_FOOT_ID] = createNode(m, leftLowerLeg, null, null);
      break;

    case RIGHT_BACK_FOOT_ID:
      m = translate(0.0, upperLegHeight, 0.0);
      m = mult(m, rotate(theta[RIGHT_BACK_FOOT_ID], 1, 0, 0));
      figure[RIGHT_BACK_FOOT_ID] = createNode(m, rightLowerLeg, null, null);
      break;

    case torsoId2:
      m = rotate(theta[torsoId2], 0, 1, 0);
      figure[torsoId2] = createNode(m, torso, null, headId2);
      break;

    case headId22:
    case headId2:
      m = translate(0.0, torsoHeight2 + 0.5 * headHeight2, 0.0);
      m = mult(m, rotate(theta[headId2], 1, 0, 0));
      m = mult(m, rotate(theta[headId2], 0, 1, 0));
      m = mult(m, translate(0.0, -0.5 * headHeight2, 0.0));
      figure[headId2] = createNode(m, head, leftUpperArmId2, null);
      break;

    case leftUpperArmId2:
      m = translate(-(torsoWidth2 + upperArmWidth2), 0.9 * torsoHeight2, 0.0);
      m = mult(m, rotate(theta[leftUpperArmId2], 1, 0, 0));
      figure[leftUpperArmId2] = createNode(m, leftUpperArm, rightUpperArmId2, leftLowerArmId2);
      break;

    case rightUpperArmId2:
      m = translate(torsoWidth2 + upperArmWidth2, 0.9 * torsoHeight2, 0.0);
      m = mult(m, rotate(theta[rightUpperArmId2], 1, 0, 0));
      figure[rightUpperArmId2] = createNode(m, rightUpperArm, leftUpperLegId2, rightLowerArmId2);
      break;

    case leftUpperLegId2:
      m = translate(-(torsoWidth2 + upperLegWidth2) + 0.75, 0.1 * upperLegHeight2, 0.0);
      m = mult(m, rotate(theta[leftUpperLegId2], 1, 0, 0));
      figure[leftUpperLegId2] = createNode(m, leftUpperLeg, rightUpperLegId2, leftLowerLegId2);
      break;

    case rightUpperLegId2:
      m = translate(torsoWidth2 + upperLegWidth2 - 0.75, 0.1 * upperLegHeight2, 0.0);
      m = mult(m, rotate(theta[rightUpperLegId2], 1, 0, 0));
      figure[rightUpperLegId2] = createNode(m, rightUpperLeg, null, rightLowerLegId2);
      break;

    case leftLowerArmId2:
      m = translate(0.0, upperArmHeight2, 0.0);
      m = mult(m, rotate(theta[leftLowerArmId2], 1, 0, 0));
      figure[leftLowerArmId2] = createNode(m, leftLowerArm, null, null);
      break;

    case rightLowerArmId2:
      m = translate(0.0, upperArmHeight2, 0.0);
      m = mult(m, rotate(theta[rightLowerArmId2], 1, 0, 0));
      figure[rightLowerArmId2] = createNode(m, rightLowerArm, null, null);
      break;

    case leftLowerLegId2:
      m = translate(0.0, upperLegHeight2, 0.0);
      m = mult(m, rotate(theta[leftLowerLegId2], 1, 0, 0));
      figure[leftLowerLegId2] = createNode(m, leftLowerLeg, null, null);
      break;

    case rightLowerLegId2:
      m = translate(0.0, upperLegHeight2, 0.0);
      m = mult(m, rotate(theta[rightLowerLegId2], 1, 0, 0));
      figure[rightLowerLegId2] = createNode(m, rightLowerLeg, null, null);
      break;
  }
}

function traverse(Id, modelViewMatrixes, projectionMatrixes, normalMatrixes) {
  gl = modelGL.gl;
  modelViewMatrices = modelViewMatrixes;
  projectionMatrices = projectionMatrixes;
  normalMatrices = normalMatrixes;
  if (Id == null) return;
  stack.push(modelViewMatrices);
  modelViewMatrices = mult(modelViewMatrices, figure[Id].transform);
  figure[Id].render();
  if (figure[Id].child != null) traverse(figure[Id].child, modelViewMatrices, projectionMatrices, normalMatrices);
  modelViewMatrices = stack.pop();
  if (figure[Id].sibling != null) traverse(figure[Id].sibling, modelViewMatrices, projectionMatrices, normalMatrices);
}

function torso() {
  instanceMatrix = mult(modelViewMatrices, translate(0.0, 0.5 * torsoHeights[menu_index], 0.0));
  instanceMatrix = mult(
    instanceMatrix,
    scale4(torsoWidths[menu_index], torsoHeights[menu_index], torsoWidths[menu_index]),
  );
  gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
  modelGL.gl.uniformMatrix4fv(modelGL.programInfo.uniformLocations.projectionMatrix, false, projectionMatrix);
  modelGL.gl.uniformMatrix4fv(modelGL.programInfo.uniformLocations.normalMatrix, false, normalMatrix);
  for (var i = 0; i < 6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4 * i, 4);
}

function head() {
  instanceMatrix = mult(modelViewMatrices, translate(0.0, 0.5 * headHeights[menu_index], 0.0));
  instanceMatrix = mult(
    instanceMatrix,
    scale4(headWidths[menu_index], headHeights[menu_index], headWidths[menu_index]),
  );
  gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
  modelGL.gl.uniformMatrix4fv(modelGL.programInfo.uniformLocations.projectionMatrix, false, projectionMatrix);
  modelGL.gl.uniformMatrix4fv(modelGL.programInfo.uniformLocations.normalMatrix, false, normalMatrix);
  for (var i = 0; i < 6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4 * i, 4);
}

function neck() {
  instanceMatrix = mult(modelViewMatrices, translate(0.0, 0.5 * neckHeight, 0.0));
  instanceMatrix = mult(instanceMatrix, scale4(neckWidth, neckHeight, neckWidth));
  gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
  modelGL.gl.uniformMatrix4fv(modelGL.programInfo.uniformLocations.projectionMatrix, false, projectionMatrix);
  modelGL.gl.uniformMatrix4fv(modelGL.programInfo.uniformLocations.normalMatrix, false, normalMatrix);
  for (var i = 0; i < 6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4 * i, 4);
}

function leftUpperArm() {
  instanceMatrix = mult(modelViewMatrices, translate(0.0, 0.5 * upperArmHeights[menu_index], 0.0));
  instanceMatrix = mult(
    instanceMatrix,
    scale4(upperArmWidths[menu_index], upperArmHeights[menu_index], upperArmWidths[menu_index]),
  );
  gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
  modelGL.gl.uniformMatrix4fv(modelGL.programInfo.uniformLocations.projectionMatrix, false, projectionMatrix);
  modelGL.gl.uniformMatrix4fv(modelGL.programInfo.uniformLocations.normalMatrix, false, normalMatrix);
  for (var i = 0; i < 6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4 * i, 4);
}

function leftLowerArm() {
  instanceMatrix = mult(modelViewMatrices, translate(0.0, 0.5 * lowerArmHeights[menu_index], 0.0));
  instanceMatrix = mult(
    instanceMatrix,
    scale4(lowerArmWidths[menu_index], lowerArmHeights[menu_index], lowerArmWidths[menu_index]),
  );
  gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
  modelGL.gl.uniformMatrix4fv(modelGL.programInfo.uniformLocations.projectionMatrix, false, projectionMatrix);
  modelGL.gl.uniformMatrix4fv(modelGL.programInfo.uniformLocations.normalMatrix, false, normalMatrix);
  for (var i = 0; i < 6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4 * i, 4);
}

function rightUpperArm() {
  instanceMatrix = mult(modelViewMatrices, translate(0.0, 0.5 * upperArmHeights[menu_index], 0.0));
  instanceMatrix = mult(
    instanceMatrix,
    scale4(upperArmWidths[menu_index], upperArmHeights[menu_index], upperArmWidths[menu_index]),
  );
  gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
  modelGL.gl.uniformMatrix4fv(modelGL.programInfo.uniformLocations.projectionMatrix, false, projectionMatrix);
  modelGL.gl.uniformMatrix4fv(modelGL.programInfo.uniformLocations.normalMatrix, false, normalMatrix);
  for (var i = 0; i < 6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4 * i, 4);
}

function rightLowerArm() {
  instanceMatrix = mult(modelViewMatrices, translate(0.0, 0.5 * lowerArmHeights[menu_index], 0.0));
  instanceMatrix = mult(
    instanceMatrix,
    scale4(lowerArmWidths[menu_index], lowerArmHeights[menu_index], lowerArmWidths[menu_index]),
  );
  gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
  modelGL.gl.uniformMatrix4fv(modelGL.programInfo.uniformLocations.projectionMatrix, false, projectionMatrix);
  modelGL.gl.uniformMatrix4fv(modelGL.programInfo.uniformLocations.normalMatrix, false, normalMatrix);
  for (var i = 0; i < 6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4 * i, 4);
}

function leftUpperLeg() {
  instanceMatrix = mult(modelViewMatrices, translate(0.0, 0.5 * upperLegHeights[menu_index], 0.0));
  instanceMatrix = mult(
    instanceMatrix,
    scale4(upperLegWidths[menu_index], upperLegHeights[menu_index], upperLegWidths[menu_index]),
  );
  gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
  modelGL.gl.uniformMatrix4fv(modelGL.programInfo.uniformLocations.projectionMatrix, false, projectionMatrix);
  modelGL.gl.uniformMatrix4fv(modelGL.programInfo.uniformLocations.normalMatrix, false, normalMatrix);
  for (var i = 0; i < 6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4 * i, 4);
}

function leftLowerLeg() {
  instanceMatrix = mult(modelViewMatrices, translate(0.0, 0.5 * lowerLegHeights[menu_index], 0.0));
  instanceMatrix = mult(
    instanceMatrix,
    scale4(lowerLegWidths[menu_index], lowerLegHeights[menu_index], lowerLegWidths[menu_index]),
  );
  gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
  modelGL.gl.uniformMatrix4fv(modelGL.programInfo.uniformLocations.projectionMatrix, false, projectionMatrix);
  modelGL.gl.uniformMatrix4fv(modelGL.programInfo.uniformLocations.normalMatrix, false, normalMatrix);
  for (var i = 0; i < 6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4 * i, 4);
}

function rightUpperLeg() {
  instanceMatrix = mult(modelViewMatrices, translate(0.0, 0.5 * upperLegHeights[menu_index], 0.0));
  instanceMatrix = mult(
    instanceMatrix,
    scale4(upperLegWidths[menu_index], upperLegHeights[menu_index], upperLegWidths[menu_index]),
  );
  gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
  modelGL.gl.uniformMatrix4fv(modelGL.programInfo.uniformLocations.projectionMatrix, false, projectionMatrix);
  modelGL.gl.uniformMatrix4fv(modelGL.programInfo.uniformLocations.normalMatrix, false, normalMatrix);
  for (var i = 0; i < 6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4 * i, 4);
}

function rightLowerLeg() {
  instanceMatrix = mult(modelViewMatrices, translate(0.0, 0.5 * lowerLegHeights[menu_index], 0.0));
  instanceMatrix = mult(
    instanceMatrix,
    scale4(lowerLegWidths[menu_index], lowerLegHeights[menu_index], lowerLegWidths[menu_index]),
  );
  gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
  modelGL.gl.uniformMatrix4fv(modelGL.programInfo.uniformLocations.projectionMatrix, false, projectionMatrix);
  modelGL.gl.uniformMatrix4fv(modelGL.programInfo.uniformLocations.normalMatrix, false, normalMatrix);
  for (var i = 0; i < 6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4 * i, 4);
}
