"use strict";

/**
 * A light source positioned directly above the scene, with color fading from the sky color to the ground color.
 * 
 * Based on THREE.HemisphereLight documentation for the object can be found at https://threejs.org/docs/index.html#Reference/Lights/HemisphereLight
 * 
 * @param {Number} skyColor Sky light color in hex RGB
 * @param {Number} groundColor Ground light color in hex RGB
 * @param {Number} intensity Light intensity
 * @class HemisphereLight
 * @extends {HemisphereLight}
 * @module Lights
 * @constructor
 */
function HemisphereLight(skyColor, groundColor, intensity)
{
	THREE.HemisphereLight.call(this, skyColor, groundColor, intensity);

	this.name = "hemisphere";
}

HemisphereLight.prototype = Object.create(THREE.HemisphereLight.prototype);
