precision mediump float;

uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;
varying vec3 pos;

float level(float x, float t) {
	return abs(sin(x * t));
}

#ifdef FRAG
	void main() {
		gl_FragColor = vec4(pos, 1.0);
	}
#elif defined VERT
	attribute vec4 vertexPosition;

	void main() {
		gl_Position = projectionMatrix * modelViewMatrix * vertexPosition;

		float t = 0.2;
		pos = vec3(
			level(gl_Position.x, t),
			level(gl_Position.y, t),
			level(gl_Position.x * gl_Position.y, t)
		);
	}
#endif