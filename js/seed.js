AFRAME.registerComponent('seed', {
	schema: {
		type: {
			type 	: "string",
			default : "cactus"
		}
	},
	init: function(){

		//scoping variables
		//-------------------------
		const seed 			= this.el;
		const defaults 		= this.data;

		//define the geom and material
		//-------------------------
		drawSeed();

		//function definitions
		//-------------------------
		function drawSeed(){
			const geometry 		= `primitive: sphere; radius: 0.015`;
			const material 		= `color: #000`;

			setAttributes(seed, {
				geometry,
				material
			});
		}//drawSeed
	},
	update: function () {},
	tick: function () {},
	remove: function () {},
	pause: function () {},
	play: function () {

		//scope variables
		//-------------------------
		const self 			= this;
		const seed 			= this.el;
		const defaults 		= this.data;

		//move seed to the surface
		//-------------------------
		const soil 			= seed.object3D.parent;
		const surfacePos 	= soil.position.y;
		setAttributes(seed, {
			position: `0 ${surfacePos} 0`
		});

		//start growing the plant
		//--------------------------
		const plant = document.createElement("a-plant");
		plant.setAttribute("type", "cactus");
		seed.appendChild(plant);

	}
});
AFRAME.registerPrimitive('a-seed', {
	defaultComponents: {
		seed: {},
	},
	mappings: {
		type: 'seed.type',
	}
});