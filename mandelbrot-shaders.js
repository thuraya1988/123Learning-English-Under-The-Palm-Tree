// Mandelbrot fractal — GLSL source ported from the user's reference
// WebGL fractal explorer (smooth escape-time coloring, 5 color modes).
// Adapted here as a full-screen "signal interference" backdrop: instead
// of user-driven pan/zoom/color, uniforms are driven by the interference
// zone's own state (see space-adventure.js) — same math, same color
// functions, just a different driver.

export const MANDELBROT_VERT = /* glsl */`
attribute vec2 a_position;
varying vec2 vUv;
void main() {
  vUv = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

export const MANDELBROT_FRAG = /* glsl */`
precision highp float;

uniform vec2 u_resolution;
uniform vec2 u_center;
uniform float u_zoom;
uniform int u_maxIterations;
uniform int u_colorMode;
uniform float u_opacity;

vec3 hsv2rgb(vec3 c) {
  vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

vec3 rainbowColor(float t) {
  float hue = fract(t * 0.08 + 0.5);
  float saturation = 0.85 + 0.15 * sin(t * 0.5);
  float value = 0.9 + 0.1 * sin(t * 0.3);
  return hsv2rgb(vec3(hue, saturation, value));
}
vec3 classicColor(float t) {
  float hue = fract(t * 0.04);
  return hsv2rgb(vec3(hue, 1.0, 1.0));
}
vec3 electricColor(float t) {
  float hue = fract(t * 0.06 + 0.6);
  return hsv2rgb(vec3(hue, 0.95, 1.0));
}
vec3 fireColor(float t) {
  float hue = fract(0.05 + t * 0.02);
  float saturation = 0.9 + 0.1 * sin(t * 0.4);
  return hsv2rgb(vec3(hue, saturation, 1.0));
}
vec3 oceanColor(float t) {
  float hue = fract(0.55 + t * 0.03);
  return hsv2rgb(vec3(hue, 0.85, 0.95));
}

void main() {
  vec2 uv = (gl_FragCoord.xy - u_resolution * 0.5) / min(u_resolution.x, u_resolution.y);
  vec2 c = u_center + uv * 3.0 / u_zoom;

  vec2 z = vec2(0.0);
  int iterations = 0;
  float smoothVal = 0.0;

  for (int i = 0; i < 400; i++) {
    if (i >= u_maxIterations) break;
    float x = (z.x * z.x - z.y * z.y) + c.x;
    float y = (2.0 * z.x * z.y) + c.y;
    float mag = x * x + y * y;
    if (mag > 4.0) {
      smoothVal = float(i) + 1.0 - log(log(sqrt(mag))) / log(2.0);
      break;
    }
    z.x = x; z.y = y;
    iterations = i;
  }

  vec3 color;
  if (iterations >= u_maxIterations - 1) {
    color = vec3(0.0);
  } else {
    if (u_colorMode == 0) color = rainbowColor(smoothVal);
    else if (u_colorMode == 1) color = classicColor(smoothVal);
    else if (u_colorMode == 2) color = electricColor(smoothVal);
    else if (u_colorMode == 3) color = fireColor(smoothVal);
    else color = oceanColor(smoothVal);
    float edgeFactor = 1.0 - smoothstep(float(u_maxIterations) - 20.0, float(u_maxIterations), float(iterations));
    color = mix(color, vec3(1.0), edgeFactor * 0.3);
  }

  gl_FragColor = vec4(color, u_opacity);
}
`;
