/* Main const*/
var menu_index = 0;
var menu_index_view = 0;

var cubeRotation = 0.0;
var PyramidNumVertices = 246;
var CubeVertices = 216;
var NumOfVertices = 360;
var donutNumVertices = 960;
const cubeFace = 6;

var modelGL;

var cameraAngleRadians = degToRad(0);
var radius = 10;

var colorRgb = hexToRgb(document.getElementById("colorpicker").value);
const at = vec3(0.0, 0.0, 0.0);
const up = vec3(0.0, 1.0, 0.0);
var eye;

var isShading = false;

var headHeight = 3.5;
var headWidth = 1.5;

var menu_index = 0;
