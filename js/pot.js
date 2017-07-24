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

		const potElement 	= this.el;
		const defaults		= this.data;
		const height 		= 0.75;
		const topRadius 	= 0.45;
		const bottomRadius	= 0.30;
		const position 		= potElement.getAttribute("position");

		setupPot();
		setupSoil();

		function setupPot(){

			const colour 			= defaults.color;
			const geometry 			= `primitive: cone; height: ${height}; radiusTop: ${topRadius}; radiusBottom: ${bottomRadius};`;
			const material 			= `metalness: 0.1; roughness: 1; color: ${colour}`;
			const offsetPosition 	= `${position.x} ${position.y + ((height * defaults.size) / 2)} ${position.z}`;

			setAttributes(potElement, {
				geometry: geometry,
				material: material,
				position: offsetPosition,
				scale: `${defaults.size} ${defaults.size} ${defaults.size}`
			});
		}//setupPot
		function setupSoil(){

			const soilElement 		= document.createElement("a-entity");
			const colour 			= "#382c1d";
			const geometry 			= `primitive: cone; height: ${height}; radiusTop: ${topRadius * 0.9}; radiusBottom: ${bottomRadius * 0.8};`;
			const material 			= `metalness: 0; roughness: 1; color: ${colour}`;
			const offsetPosition 	= `0 ${0.01 * defaults.size} 0`;

			setAttributes(soilElement, {
				geometry: geometry,
				material: material,
				position: offsetPosition,
				scale: `${defaults.size} ${defaults.size} ${defaults.size}`
			});

			potElement.appendChild(soilElement);
		}//setupSoil
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
	},
	mappings: {
		size: 'pot.size',
	}
});