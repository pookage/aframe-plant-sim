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
			const topRadius 		= 0.45;
			const bottomRadius		= 0.30;
			const position 			= element.getAttribute("position");
			const color 			= defaults.color;
			const geometry 			= `primitive: cone; height: ${height}; radiusTop: ${topRadius}; radiusBottom: ${bottomRadius};`;
			const material 			= `metalness: 0; roughness: 1; color: ${color}`;
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