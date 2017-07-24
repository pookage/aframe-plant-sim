AFRAME.registerComponent('pot', {
	schema: {
		size: {
			type 	: "int",
			default : 1
		},
		color: {
			type 	: "color",
			default	: "#8a3020"
		}
	},
	init: function(){

		const element 	= this.el;
		const defaults	= this.data;
	
		setupPot();

		function setupPot(){

			const height 			= 0.75;
			const radiusTop 		= 0.45;
			const radiusBottom		= 0.30;
			const position 			= element.getAttribute("position");
			const colour 			= defaults.color;
			const geometry 			= `primitive: cone; height: ${height}; radiusTop: ${radiusTop}; radiusBottom: ${radiusBottom};`;
			const material 			= `metalness: 0.1; roughness: 1; color: ${colour}`;
			const offsetPosition 	= `${position.x} ${position.y + ((height * defaults.size) / 2)} ${position.z}`;

			setAttributes(element, {
				geometry: geometry,
				material: material,
				position: offsetPosition,
				scale: `${defaults.size} ${defaults.size} ${defaults.size}`
			});
		}//setupPot
	},
	update: function () {},
	tick: function () {},
	remove: function () {},
	pause: function () {},
	play: function () {}
});

AFRAME.registerPrimitive('a-pot', {
	defaultComponents: {
		pot: {},
		soil: {}
	},
	mappings: {
		size: 'pot.size',
	}
});