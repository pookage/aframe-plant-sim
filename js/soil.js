AFRAME.registerComponent('soil', {
	schema: {
		color: {
			type: "color",
			default: "#382c1d"
		}
	},
	init: function(){
		const potElement 	= this.el;
		const defaults 		= this.data;
		
		const soil 			= setupSoil();

		potElement.appendChild(soil);

		function setupSoil(){

			//NOTE - would be better to add this geometry to the <a-pot> without the <a-entity> (?)

			const soilElement 	= document.createElement("a-entity");
			const potGeom 		= potElement.getAttribute("geometry");
			const potScale 		= potElement.getAttribute("scale");

			const height 		= potGeom.height;
			const radiusTop 	= potGeom.radiusTop * 0.9;
			const radiusBottom 	= potGeom.radiusBottom * 0.9;
			const yOffset 		= potScale.y * 0.01;

			const geometry 		= `primitive: cone; height: ${height}; radiusTop: ${radiusTop}; radiusBottom: ${radiusBottom};`;
			const material 		= `metalness: 0; roughness: 1; color: ${defaults.color}`;
			const position 		= `0 ${yOffset} 0`;
			const scale 		= `${potScale.x} ${potScale.y} ${potScale.z}`;

			setAttributes(soilElement, {
				geometry,
				material,
				position,
				scale
			});

			return soilElement;
		}//setupSoil

	},
	update: function () {},
	tick: function () {},
	remove: function () {},
	pause: function () {},
	play: function () {}
});