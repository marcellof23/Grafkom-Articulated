export const translate = (out, a, v) => {
  let x = v[0],
      y = v[1],
      z = v[2];
  if (a !== out) {
      out[0] = a[0];
      out[1] = a[1];
      out[2] = a[2];
      out[3] = a[3];
      out[4] = a[4];
      out[5] = a[5];
      out[6] = a[6];
      out[7] = a[7];
      out[8] = a[8];
      out[9] = a[9];
      out[10] = a[10];
      out[11] = a[11];
  }

  out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
  out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
  out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
  out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
  return out;
};


export function projection(width, height, depth) {
  return [
     2 / width, 0, 0, 0,
     0, -2 / height, 0, 0,
     0, 0, 2 / depth, 0,
    -1, 1, 0, 1,
  ];
};

export const scaling = (sx, sy, sz) => {
  return [
      sx, 0,  0,  0,
      0, sy,  0,  0,
      0,  0, sz,  0,
      0,  0,  0,  1,
    ];
};

export function scale(m, sx, sy, sz){
  return multiply(m, scaling(sx, sy, sz));
};

export function create() {
  let out = new glMatrix.ARRAY_TYPE(16);
  if (glMatrix.ARRAY_TYPE != Float32Array) {
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
  }
  out[0] = 1;
  out[5] = 1;
  out[10] = 1;
  out[15] = 1;
  return out;
}

export function multiply(a, b) {
  var a00 = a[0 * 4 + 0];
  var a01 = a[0 * 4 + 1];
  var a02 = a[0 * 4 + 2];
  var a03 = a[0 * 4 + 3];
  var a10 = a[1 * 4 + 0];
  var a11 = a[1 * 4 + 1];
  var a12 = a[1 * 4 + 2];
  var a13 = a[1 * 4 + 3];
  var a20 = a[2 * 4 + 0];
  var a21 = a[2 * 4 + 1];
  var a22 = a[2 * 4 + 2];
  var a23 = a[2 * 4 + 3];
  var a30 = a[3 * 4 + 0];
  var a31 = a[3 * 4 + 1];
  var a32 = a[3 * 4 + 2];
  var a33 = a[3 * 4 + 3];
  var b00 = b[0 * 4 + 0];
  var b01 = b[0 * 4 + 1];
  var b02 = b[0 * 4 + 2];
  var b03 = b[0 * 4 + 3];
  var b10 = b[1 * 4 + 0];
  var b11 = b[1 * 4 + 1];
  var b12 = b[1 * 4 + 2];
  var b13 = b[1 * 4 + 3];
  var b20 = b[2 * 4 + 0];
  var b21 = b[2 * 4 + 1];
  var b22 = b[2 * 4 + 2];
  var b23 = b[2 * 4 + 3];
  var b30 = b[3 * 4 + 0];
  var b31 = b[3 * 4 + 1];
  var b32 = b[3 * 4 + 2];
  var b33 = b[3 * 4 + 3];
  return [
    b00 * a00 + b01 * a10 + b02 * a20 + b03 * a30,
    b00 * a01 + b01 * a11 + b02 * a21 + b03 * a31,
    b00 * a02 + b01 * a12 + b02 * a22 + b03 * a32,
    b00 * a03 + b01 * a13 + b02 * a23 + b03 * a33,
    b10 * a00 + b11 * a10 + b12 * a20 + b13 * a30,
    b10 * a01 + b11 * a11 + b12 * a21 + b13 * a31,
    b10 * a02 + b11 * a12 + b12 * a22 + b13 * a32,
    b10 * a03 + b11 * a13 + b12 * a23 + b13 * a33,
    b20 * a00 + b21 * a10 + b22 * a20 + b23 * a30,
    b20 * a01 + b21 * a11 + b22 * a21 + b23 * a31,
    b20 * a02 + b21 * a12 + b22 * a22 + b23 * a32,
    b20 * a03 + b21 * a13 + b22 * a23 + b23 * a33,
    b30 * a00 + b31 * a10 + b32 * a20 + b33 * a30,
    b30 * a01 + b31 * a11 + b32 * a21 + b33 * a31,
    b30 * a02 + b31 * a12 + b32 * a22 + b33 * a32,
    b30 * a03 + b31 * a13 + b32 * a23 + b33 * a33,
  ];
};

export const perspective = (out, fieldOfView, aspect, zNear, zFar) => {
  let f = 1.0 / Math.tan(fieldOfView / 2),
      nf;
  for (let i = 0; i < 16; i++) out[i] = 0;
  out[0] = f / aspect;
  out[5] = f;
  out[10] = -1;
  out[11] = -1;
  out[14] = -2 * zNear;
  if (zFar != null && zFar !== Infinity) {
      nf = 1 / (zNear - zFar);
      out[10] = (zFar + zNear) * nf;
      out[14] = 2 * zFar * zNear * nf;
  }
  return out;
};

export function inverse(m){
  var m00 = m[0 * 4 + 0];
  var m01 = m[0 * 4 + 1];
  var m02 = m[0 * 4 + 2];
  var m03 = m[0 * 4 + 3];
  var m10 = m[1 * 4 + 0];
  var m11 = m[1 * 4 + 1];
  var m12 = m[1 * 4 + 2];
  var m13 = m[1 * 4 + 3];
  var m20 = m[2 * 4 + 0];
  var m21 = m[2 * 4 + 1];
  var m22 = m[2 * 4 + 2];
  var m23 = m[2 * 4 + 3];
  var m30 = m[3 * 4 + 0];
  var m31 = m[3 * 4 + 1];
  var m32 = m[3 * 4 + 2];
  var m33 = m[3 * 4 + 3];
  var tmp_0  = m22 * m33;
  var tmp_1  = m32 * m23;
  var tmp_2  = m12 * m33;
  var tmp_3  = m32 * m13;
  var tmp_4  = m12 * m23;
  var tmp_5  = m22 * m13;
  var tmp_6  = m02 * m33;
  var tmp_7  = m32 * m03;
  var tmp_8  = m02 * m23;
  var tmp_9  = m22 * m03;
  var tmp_10 = m02 * m13;
  var tmp_11 = m12 * m03;
  var tmp_12 = m20 * m31;
  var tmp_13 = m30 * m21;
  var tmp_14 = m10 * m31;
  var tmp_15 = m30 * m11;
  var tmp_16 = m10 * m21;
  var tmp_17 = m20 * m11;
  var tmp_18 = m00 * m31;
  var tmp_19 = m30 * m01;
  var tmp_20 = m00 * m21;
  var tmp_21 = m20 * m01;
  var tmp_22 = m00 * m11;
  var tmp_23 = m10 * m01;

  var t0 = (tmp_0 * m11 + tmp_3 * m21 + tmp_4 * m31) -
      (tmp_1 * m11 + tmp_2 * m21 + tmp_5 * m31);
  var t1 = (tmp_1 * m01 + tmp_6 * m21 + tmp_9 * m31) -
      (tmp_0 * m01 + tmp_7 * m21 + tmp_8 * m31);
  var t2 = (tmp_2 * m01 + tmp_7 * m11 + tmp_10 * m31) -
      (tmp_3 * m01 + tmp_6 * m11 + tmp_11 * m31);
  var t3 = (tmp_5 * m01 + tmp_8 * m11 + tmp_11 * m21) -
      (tmp_4 * m01 + tmp_9 * m11 + tmp_10 * m21);

  var d = 1.0 / (m00 * t0 + m10 * t1 + m20 * t2 + m30 * t3);

  return [
    d * t0,
    d * t1,
    d * t2,
    d * t3,
    d * ((tmp_1 * m10 + tmp_2 * m20 + tmp_5 * m30) -
          (tmp_0 * m10 + tmp_3 * m20 + tmp_4 * m30)),
    d * ((tmp_0 * m00 + tmp_7 * m20 + tmp_8 * m30) -
          (tmp_1 * m00 + tmp_6 * m20 + tmp_9 * m30)),
    d * ((tmp_3 * m00 + tmp_6 * m10 + tmp_11 * m30) -
          (tmp_2 * m00 + tmp_7 * m10 + tmp_10 * m30)),
    d * ((tmp_4 * m00 + tmp_9 * m10 + tmp_10 * m20) -
          (tmp_5 * m00 + tmp_8 * m10 + tmp_11 * m20)),
    d * ((tmp_12 * m13 + tmp_15 * m23 + tmp_16 * m33) -
          (tmp_13 * m13 + tmp_14 * m23 + tmp_17 * m33)),
    d * ((tmp_13 * m03 + tmp_18 * m23 + tmp_21 * m33) -
          (tmp_12 * m03 + tmp_19 * m23 + tmp_20 * m33)),
    d * ((tmp_14 * m03 + tmp_19 * m13 + tmp_22 * m33) -
          (tmp_15 * m03 + tmp_18 * m13 + tmp_23 * m33)),
    d * ((tmp_17 * m03 + tmp_20 * m13 + tmp_23 * m23) -
          (tmp_16 * m03 + tmp_21 * m13 + tmp_22 * m23)),
    d * ((tmp_14 * m22 + tmp_17 * m32 + tmp_13 * m12) -
          (tmp_16 * m32 + tmp_12 * m12 + tmp_15 * m22)),
    d * ((tmp_20 * m32 + tmp_12 * m02 + tmp_19 * m22) -
          (tmp_18 * m22 + tmp_21 * m32 + tmp_13 * m02)),
    d * ((tmp_18 * m12 + tmp_23 * m32 + tmp_15 * m02) -
          (tmp_22 * m32 + tmp_14 * m02 + tmp_19 * m12)),
    d * ((tmp_22 * m22 + tmp_16 * m02 + tmp_21 * m12) -
          (tmp_20 * m12 + tmp_23 * m22 + tmp_17 * m02))
  ];    
};

export function yCameraRotation(angleInRadians) {
  var c = Math.cos(angleInRadians);
  var s = Math.sin(angleInRadians);

  return [
    c, 0, -s, 0,
    0, 1, 0, 0,
    s, 0, c, 0,
    0, 0, 0, 1,
  ];
};

export function xCameraRotation(angleInRadians) {
  var c = Math.cos(angleInRadians);
  var s = Math.sin(angleInRadians);

  return [
    1, 0, 0, 0,
    0, c, s, 0,
    0, -s, c, 0,
    0, 0, 0, 1,
  ];
}

export function zCameraRotation(angleInRadians) {
  var c = Math.cos(angleInRadians);
  var s = Math.sin(angleInRadians);

  return [
     c, s, 0, 0,
    -s, c, 0, 0,
     0, 0, 1, 0,
     0, 0, 0, 1,
  ];
}

export function degToRad(d) {
  return d * Math.PI / 180;
}

export function rotateX (out, inp, rad) {
  var sin = Math.sin(rad),
      cos = Math.cos(rad),
      a10 = inp[4],
      a11 = inp[5],
      a12 = inp[6],
      a13 = inp[7],
      a20 = inp[8],
      a21 = inp[9],
      a22 = inp[10],
      a23 = inp[11];
  
  // Perkalian matriks spesifik pada sumbu X
  out[4] = a10 * cos + a20 * sin;
  out[5] = a11 * cos + a21 * sin;
  out[6] = a12 * cos + a22 * sin;
  out[7] = a13 * cos + a23 * sin;
  out[8] = a20 * cos - a10 * sin;
  out[9] = a21 * cos - a11 * sin;
  out[10] = a22 * cos - a12 * sin;
  out[11] = a23 * cos - a13 * sin;

  // Jika source dan output berbeda, copy row terakhir
  if (inp !== out) {
      out[0]  = inp[0];
      out[1]  = inp[1];
      out[2]  = inp[2];
      out[3]  = inp[3];
      out[12] = inp[12];
      out[13] = inp[13];
      out[14] = inp[14];
      out[15] = inp[15];
  }
}

export function rotateY (out, inp, rad) {
  var sin = Math.sin(rad),
      cos = Math.cos(rad),
      a00 = inp[0],
      a01 = inp[1],
      a02 = inp[2],
      a03 = inp[3],
      a20 = inp[8],
      a21 = inp[9],
      a22 = inp[10],
      a23 = inp[11];

  // Perkalian matriks spesifik pada sumbu Y
  out[0] = a00 * cos - a20 * sin;
  out[1] = a01 * cos - a21 * sin;
  out[2] = a02 * cos - a22 * sin;
  out[3] = a03 * cos - a23 * sin;
  out[8] = a00 * sin + a20 * cos;
  out[9] = a01 * sin + a21 * cos;
  out[10] = a02 * sin + a22 * cos;
  out[11] = a03 * sin + a23 * cos;

  // Jika source dan output berbeda, copy row terakhir
  if (inp !== out) {
      out[4]  = inp[4];
      out[5]  = inp[5];
      out[6]  = inp[6];
      out[7]  = inp[7];
      out[12] = inp[12];
      out[13] = inp[13];
      out[14] = inp[14];
      out[15] = inp[15];
  }
}

export function rotateZ (out, inp, rad) {
  var sin = Math.sin(rad),
      cos = Math.cos(rad),
      a00 = inp[0],
      a01 = inp[1],
      a02 = inp[2],
      a03 = inp[3],
      a10 = inp[4],
      a11 = inp[5],
      a12 = inp[6],
      a13 = inp[7];

  // Perkalian matriks spesifik pada sumbu Z
  out[0] = a00 * cos + a10 * sin;
  out[1] = a01 * cos + a11 * sin;
  out[2] = a02 * cos + a12 * sin;
  out[3] = a03 * cos + a13 * sin;
  out[4] = a10 * cos - a00 * sin;
  out[5] = a11 * cos - a01 * sin;
  out[6] = a12 * cos - a02 * sin;
  out[7] = a13 * cos - a03 * sin;

  // Jika source dan output berbeda, copy row terakhir
  if (inp !== out) {
      out[8]  = inp[8];
      out[9]  = inp[9];
      out[10] = inp[10];
      out[11] = inp[11];
      out[12] = inp[12];
      out[13] = inp[13];
      out[14] = inp[14];
      out[15] = inp[15];
  }
}

export function orthographic (out, left, right, bottom, top, near, far) {
  var rl = right - left,
      tb = top - bottom,
      fn = far - near;
      
  out[0] = 2 / rl;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = 2 / tb;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = -2 / fn;
  out[11] = 0;
  out[12] = -1 * (left + right) / rl;
  out[13] = -1 * (top + bottom) / tb;
  out[14] = -1 * (far + near) / fn;
  out[15] = 1;

  return out;
}

export function oblique(m, theta, phi){    
  var t = theta * Math.PI / 180;
  var p = phi * Math.PI / 180;

  var cotT = -1/Math.tan(t);
  var cotP = -1/Math.tan(p);
  
  m[0] = 1;
  m[1] = 0;
  m[2] = cotT;
  m[3] = 0;
  m[4] = 0;
  m[5] = 1;
  m[6] = cotP;
  m[7] = 0;
  m[8] = 0;
  m[9] = 0;
  m[10] = 1;
  m[11] = 0;
  m[12] = 0
  m[13] = 0
  m[14] = 0
  m[15] = 1;
  
  return transpose(m);	
};

export function transpose(m) {
  return [
    m[0], m[4], m[8], m[12],
    m[1], m[5], m[9], m[13],
    m[2], m[6], m[10], m[14],
    m[3], m[7], m[11], m[15],
  ];
};

export function getNormalVector(positions) {
  const n = positions.length;
  var normals = [];
  var vecNormal = [];
  for (let i = 0; i < n; i += 12){
      const p1 = [positions[i], positions[i+1], positions[i+2]];
      const p2 = [positions[i+3], positions[i+4], positions[i+5]];
      const p3 = [positions[i+6], positions[i+7], positions[i+8]];
      const vec1 = [p2[0] -p1[0], p2[1] - p1[1], p2[2] - p1[2]];
      const vec2 = [p3[0] -p1[0], p3[1] - p1[1], p3[2] - p1[2]];
      const normalDirection = [vec1[1] * vec2[2] - vec1[2] * vec2[1],
                              vec1[2] * vec2[0] - vec1[0] * vec2[2],
                              vec1[0] * vec2[1] - vec1[1] * vec2[0]];
      
      var length = Math.sqrt(normalDirection[0] * normalDirection[0]
                              + normalDirection[1] * normalDirection[1]
                              + normalDirection[2] * normalDirection[2]);

      // make sure we don't divide by 0.
      if (length > 0.00001) {
          vecNormal = [normalDirection[0] / length,
                      normalDirection[1] / length,
                      normalDirection[2] / length];
      } else {
          vecNormal = [0, 0, 0];
      }

      for (let j = 0; j < 4; j++){
          normals = normals.concat(vecNormal);
      }
  }

  return normals;
}