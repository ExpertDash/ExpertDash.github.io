precision mediump float;

uniform vec3 color;
uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;

#ifdef FRAG
	void main() {
		gl_FragColor = vec4(color, 1.0);
	}
#elif defined VERT
	attribute vec4 vertexPosition;

	void main() {
		gl_Position = projectionMatrix * modelViewMatrix * vertexPosition;
	}
#endif