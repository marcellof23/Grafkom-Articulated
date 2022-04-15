var instanceMatrix;

var gl;

var torsoId = 0;
// var headId = 1;
// var head1Id = 1;
// var leftUpperArmId = 2;
// var leftLowerArmId = 3;
// var rightUpperArmId = 4;
// var rightLowerArmId = 5;
// var leftUpperLegId = 6;
// var leftLowerLegId = 7;
// var rightUpperLegId = 8;
// var rightLowerLegId = 9;
// var head2Id = 10;

var TORSO_ID = 0;
var NECK_ID = 1;
var HEAD_ID = 2;
var HEAD1_ID = 2;
var HEAD2_ID = 11;
var LEFT_FRONT_LEG_ID = 3;
var LEFT_FRONT_FOOT_ID = 4;
var RIGHT_FRONT_LEG_ID = 5;
var RIGHT_FRONT_FOOT_ID = 6;
var LEFT_BACK_LEG_ID = 7;
var LEFT_BACK_FOOT_ID = 8;
var RIGHT_BACK_LEG_ID = 9;
var RIGHT_BACK_FOOT_ID = 10;
//
var GLOBAL_ANGLE_ID = 12;
var GLOBAL_X_COORDINATE = 13;
var GLOBAL_Y_COORDINATE = 14;

// var torsoHeight = 5.0;
// var torsoWidth = 1.0;
// var upperArmHeight = 3.0;
// var lowerArmHeight = 2.0;
// var upperArmWidth = 0.5;
// var lowerArmWidth = 0.5;
// var upperLegWidth = 0.5;
// var lowerLegWidth = 0.5;
// var lowerLegHeight = 2.0;
// var upperLegHeight = 3.0;
// var headHeight = 1.5;
// var headWidth = 1.0;

var torsoHeight = 8.0;
var torsoWidth = 3.0;
var upperArmHeight = 5.0;
var lowerArmHeight = 2.0;
var upperArmWidth = 1.3;
var lowerArmWidth = 0.8;
var upperLegWidth = 1.3;
var lowerLegWidth = 0.8;
var lowerLegHeight = 2.0;
var upperLegHeight = 5.0;
var headHeight = 3.5;
var headWidth = 1.5;
var neckHeight = 4.0;
var neckWidth = 2.0;

var numNodes = 11;
var numAngles = 11;
var angle = 0;

//var theta = [0, 0, 0, 0, 0, 0, 180, 0, 180, 0, 0, 120];
var theta = [90, 120, 90, 70, 10, 80, 10, 90, 40, 70, 30, 0, -90, 0, 0];

var numVertices = 24;

var stack = [];

var figure = [];

var modelViewMatrices;
var projectionMatrices;
var normalMatrices;

for (var i = 0; i < numNodes; i++) figure[i] = createNode(null, null, null, null);

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

function initNodes(Id) {
  console.log(Id);
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
      m = mult(m, rotate(theta[HEAD2_ID], 0, 1, 0));
      m = mult(m, translate(5, -1 * neckHeight, 0.0));
      figure[NECK_ID] = createNode(m, neck, LEFT_FRONT_LEG_ID, HEAD_ID);
      break;

    case HEAD_ID:
    case HEAD1_ID:
    case HEAD2_ID:
      m = translate(0.0, 0.2 * headHeight, 0.0);
      m = mult(m, rotate(theta[HEAD1_ID], 1, 0, 0));
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
  }
  // switch (Id) {
  //   case torsoId:
  //     m = rotate(theta[torsoId], 0, 1, 0);
  //     figure[torsoId] = createNode(m, torso, null, neckId);
  //     break;

  //   case neckId:
  //     m = translate(0.0, torsoHeight - neckHeight + 3.5, 0.0);
  //     m = mult(m, rotate(theta[neckId], 1, 0, 0));
  //     m = mult(m, rotate(theta[head2Id], 0, 1, 0));
  //     m = mult(m, translate(0.0, -1 * neckHeight, 0.0));
  //     console.log("pararuntens");
  //     figure[neckId] = createNode(m, neck, leftUpperArmId, headId);
  //     console.log(figure[neckId]);
  //     console.log("Oi");
  //     break;

  //   case headId:
  //   case head1Id:
  //   case head2Id:
  //     m = translate(0.0, torsoHeight + 0.5 * headHeight, 0.0);
  //     m = mult(m, rotate(theta[head1Id], 1, 0, 0));
  //     m = mult(m, rotate(theta[head2Id], 0, 1, 0));
  //     m = mult(m, translate(0.0, -0.5 * headHeight, 0.0));
  //     figure[headId] = createNode(m, head, null, null);
  //     break;

  //   case leftUpperArmId:
  //     m = translate(-(torsoWidth + upperArmWidth), 0.9 * torsoHeight, 0.0);
  //     m = mult(m, rotate(theta[leftUpperArmId], 1, 0, 0));
  //     figure[leftUpperArmId] = createNode(m, leftUpperArm, rightUpperArmId, leftLowerArmId);
  //     break;

  //   case rightUpperArmId:
  //     m = translate(torsoWidth + upperArmWidth, 0.9 * torsoHeight, 0.0);
  //     m = mult(m, rotate(theta[rightUpperArmId], 1, 0, 0));
  //     figure[rightUpperArmId] = createNode(m, rightUpperArm, leftUpperLegId, rightLowerArmId);
  //     break;

  //   case leftUpperLegId:
  //     m = translate(-(torsoWidth + upperLegWidth) + 0.75, 0.1 * upperLegHeight, 0.0);
  //     m = mult(m, rotate(theta[leftUpperLegId], 1, 0, 0));
  //     figure[leftUpperLegId] = createNode(m, leftUpperLeg, rightUpperLegId, leftLowerLegId);
  //     break;

  //   case rightUpperLegId:
  //     m = translate(torsoWidth + upperLegWidth - 0.75, 0.1 * upperLegHeight, 0.0);
  //     m = mult(m, rotate(theta[rightUpperLegId], 1, 0, 0));
  //     figure[rightUpperLegId] = createNode(m, rightUpperLeg, null, rightLowerLegId);
  //     break;

  //   case leftLowerArmId:
  //     m = translate(0.0, upperArmHeight, 0.0);
  //     m = mult(m, rotate(theta[leftLowerArmId], 1, 0, 0));
  //     figure[leftLowerArmId] = createNode(m, leftLowerArm, null, null);
  //     break;

  //   case rightLowerArmId:
  //     m = translate(0.0, upperArmHeight, 0.0);
  //     m = mult(m, rotate(theta[rightLowerArmId], 1, 0, 0));
  //     figure[rightLowerArmId] = createNode(m, rightLowerArm, null, null);
  //     break;

  //   case leftLowerLegId:
  //     m = translate(0.0, upperLegHeight, 0.0);
  //     m = mult(m, rotate(theta[leftLowerLegId], 1, 0, 0));
  //     figure[leftLowerLegId] = createNode(m, leftLowerLeg, null, null);
  //     break;

  //   case rightLowerLegId:
  //     m = translate(0.0, upperLegHeight, 0.0);
  //     m = mult(m, rotate(theta[rightLowerLegId], 1, 0, 0));
  //     figure[rightLowerLegId] = createNode(m, rightLowerLeg, null, null);
  //     break;
  // }
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
  instanceMatrix = mult(modelViewMatrices, translate(0.0, 0.5 * torsoHeight, 0.0));
  instanceMatrix = mult(instanceMatrix, scale4(torsoWidth, torsoHeight, torsoWidth));
  gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
  modelGL.gl.uniformMatrix4fv(modelGL.programInfo.uniformLocations.projectionMatrix, false, projectionMatrix);
  //modelGL.gl.uniformMatrix4fv(modelGL.programInfo.uniformLocations.normalMatrix, false, normalMatrix);
  checkShading(flatten(instanceMatrix), viewMatrix);
  for (var i = 0; i < 6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4 * i, 4);
}

function head() {
  instanceMatrix = mult(modelViewMatrices, translate(0.0, 0.5 * headHeight, 0.0));
  instanceMatrix = mult(instanceMatrix, scale4(headWidth, headHeight, headWidth));
  gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
  modelGL.gl.uniformMatrix4fv(modelGL.programInfo.uniformLocations.projectionMatrix, false, projectionMatrix);
  modelGL.gl.uniformMatrix4fv(modelGL.programInfo.uniformLocations.normalMatrix, false, normalMatrix);
  for (var i = 0; i < 6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4 * i, 4);
}

function neck() {
  console.log("punten");
  instanceMatrix = mult(modelViewMatrices, translate(0.0, 0.5 * neckHeight, 0.0));
  instanceMatrix = mult(instanceMatrix, scale4(neckWidth, neckHeight, neckWidth));
  gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
  modelGL.gl.uniformMatrix4fv(modelGL.programInfo.uniformLocations.projectionMatrix, false, projectionMatrix);
  modelGL.gl.uniformMatrix4fv(modelGL.programInfo.uniformLocations.normalMatrix, false, normalMatrix);
  for (var i = 0; i < 6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4 * i, 4);
}

function leftUpperArm() {
  instanceMatrix = mult(modelViewMatrices, translate(0.0, 0.5 * upperArmHeight, 0.0));
  instanceMatrix = mult(instanceMatrix, scale4(upperArmWidth, upperArmHeight, upperArmWidth));
  gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
  modelGL.gl.uniformMatrix4fv(modelGL.programInfo.uniformLocations.projectionMatrix, false, projectionMatrix);
  modelGL.gl.uniformMatrix4fv(modelGL.programInfo.uniformLocations.normalMatrix, false, normalMatrix);
  for (var i = 0; i < 6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4 * i, 4);
}

function leftLowerArm() {
  instanceMatrix = mult(modelViewMatrices, translate(0.0, 0.5 * lowerArmHeight, 0.0));
  instanceMatrix = mult(instanceMatrix, scale4(lowerArmWidth, lowerArmHeight, lowerArmWidth));
  gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
  modelGL.gl.uniformMatrix4fv(modelGL.programInfo.uniformLocations.projectionMatrix, false, projectionMatrix);
  modelGL.gl.uniformMatrix4fv(modelGL.programInfo.uniformLocations.normalMatrix, false, normalMatrix);
  for (var i = 0; i < 6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4 * i, 4);
}

function rightUpperArm() {
  instanceMatrix = mult(modelViewMatrices, translate(0.0, 0.5 * upperArmHeight, 0.0));
  instanceMatrix = mult(instanceMatrix, scale4(upperArmWidth, upperArmHeight, upperArmWidth));
  gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
  modelGL.gl.uniformMatrix4fv(modelGL.programInfo.uniformLocations.projectionMatrix, false, projectionMatrix);
  modelGL.gl.uniformMatrix4fv(modelGL.programInfo.uniformLocations.normalMatrix, false, normalMatrix);
  for (var i = 0; i < 6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4 * i, 4);
}

function rightLowerArm() {
  instanceMatrix = mult(modelViewMatrices, translate(0.0, 0.5 * lowerArmHeight, 0.0));
  instanceMatrix = mult(instanceMatrix, scale4(lowerArmWidth, lowerArmHeight, lowerArmWidth));
  gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
  modelGL.gl.uniformMatrix4fv(modelGL.programInfo.uniformLocations.projectionMatrix, false, projectionMatrix);
  modelGL.gl.uniformMatrix4fv(modelGL.programInfo.uniformLocations.normalMatrix, false, normalMatrix);
  for (var i = 0; i < 6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4 * i, 4);
}

function leftUpperLeg() {
  instanceMatrix = mult(modelViewMatrices, translate(0.0, 0.5 * upperLegHeight, 0.0));
  instanceMatrix = mult(instanceMatrix, scale4(upperLegWidth, upperLegHeight, upperLegWidth));
  gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
  modelGL.gl.uniformMatrix4fv(modelGL.programInfo.uniformLocations.projectionMatrix, false, projectionMatrix);
  modelGL.gl.uniformMatrix4fv(modelGL.programInfo.uniformLocations.normalMatrix, false, normalMatrix);
  for (var i = 0; i < 6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4 * i, 4);
}

function leftLowerLeg() {
  instanceMatrix = mult(modelViewMatrices, translate(0.0, 0.5 * lowerLegHeight, 0.0));
  instanceMatrix = mult(instanceMatrix, scale4(lowerLegWidth, lowerLegHeight, lowerLegWidth));
  gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
  modelGL.gl.uniformMatrix4fv(modelGL.programInfo.uniformLocations.projectionMatrix, false, projectionMatrix);
  modelGL.gl.uniformMatrix4fv(modelGL.programInfo.uniformLocations.normalMatrix, false, normalMatrix);
  for (var i = 0; i < 6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4 * i, 4);
}

function rightUpperLeg() {
  instanceMatrix = mult(modelViewMatrices, translate(0.0, 0.5 * upperLegHeight, 0.0));
  instanceMatrix = mult(instanceMatrix, scale4(upperLegWidth, upperLegHeight, upperLegWidth));
  gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
  modelGL.gl.uniformMatrix4fv(modelGL.programInfo.uniformLocations.projectionMatrix, false, projectionMatrix);
  modelGL.gl.uniformMatrix4fv(modelGL.programInfo.uniformLocations.normalMatrix, false, normalMatrix);
  for (var i = 0; i < 6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4 * i, 4);
}

function rightLowerLeg() {
  instanceMatrix = mult(modelViewMatrices, translate(0.0, 0.5 * lowerLegHeight, 0.0));
  instanceMatrix = mult(instanceMatrix, scale4(lowerLegWidth, lowerLegHeight, lowerLegWidth));
  gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
  modelGL.gl.uniformMatrix4fv(modelGL.programInfo.uniformLocations.projectionMatrix, false, projectionMatrix);
  modelGL.gl.uniformMatrix4fv(modelGL.programInfo.uniformLocations.normalMatrix, false, normalMatrix);
  for (var i = 0; i < 6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4 * i, 4);
}
