function radToDeg(r) {
  return (r * 180) / Math.PI;
}

function degToRad(d) {
  return (d * Math.PI) / 180;
}

function crossProduct(u, v) {
  var u_x = u[0];
  var u_y = u[1];
  var u_z = u[2];
  var v_x = v[0];
  var v_y = v[1];
  var v_z = v[2];

  return [u_y * v_z - u_z * v_y, u_z * v_x - u_x * v_z, u_x * v_y - u_y * v_x];
}

function normalizeVector(u) {
  var u_x = u[0];
  var u_y = u[1];
  var u_z = u[2];

  var len = Math.sqrt(u_x * u_x + u_y * u_y + u_z * u_z);
  return [u_x / len, u_y / len, u_z / len];
}

function getVectorNormal(u, v) {
  var cross = crossProduct(u, v);
  return normalizeVector(cross);
}

const posi = ["front", "back", "left", "right", "top", "bottom"];

function getNormals(position) {
  const normals = [];
  const numPoints = position.length / 3;
  for (var face = 0; face < numPoints / 4; ++face) {
    // find the normal vector of each face
    var u = [
      position[face * 12 + 3] - position[face * 12 + 0],
      position[face * 12 + 4] - position[face * 12 + 1],
      position[face * 12 + 5] - position[face * 12 + 2],
    ];

    var v = [
      position[face * 12 + 6] - position[face * 12 + 0],
      position[face * 12 + 7] - position[face * 12 + 1],
      position[face * 12 + 8] - position[face * 12 + 2],
    ];
    const norm = getVectorNormal(u, v);
    for (var i = 0; i < 4; ++i) {
      normals.push(norm[0]);
      normals.push(norm[1]);
      normals.push(norm[2]);
    }
  }
  // console.log("normals", normals);
  return normals;
}

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16) / 255,
        g: parseInt(result[2], 16) / 255,
        b: parseInt(result[3], 16) / 255,
      }
    : null;
}

// function flatten(v) {
//   if (v.matrix === true) {
//     v = transpose(v);
//   }

//   var n = v.length;
//   var elemsAreArrays = false;

//   if (Array.isArray(v[0])) {
//     elemsAreArrays = true;
//     n *= v[0].length;
//   }

//   var floats = new Float32Array(n);

//   if (elemsAreArrays) {
//     var idx = 0;
//     for (var i = 0; i < v.length; ++i) {
//       for (var j = 0; j < v[i].length; ++j) {
//         floats[idx++] = v[i][j];
//       }
//     }
//   } else {
//     for (var i = 0; i < v.length; ++i) {
//       floats[i] = v[i];
//     }
//   }

//   return floats;
// }

