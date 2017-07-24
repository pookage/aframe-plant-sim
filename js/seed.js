const PLANT_PROPERTIES = {
	"cactus" : {
		"colours" : {
			"seed" : "#000"
		}
	}
};

AFRAME.registerComponent('seed', {
	schema: {
		type: {
			type 	: "string",
			default : "cactus"
		}
	},
	init: function(){
		const defaults 		= this.data;
		const properties 	= PLANT_PROPERTIES[defaults.type];

		console.log(this.el.object3D.parent.position.y)

		this.seed = plantSeed();
		this.el.appendChild(this.seed);

		function plantSeed(){
			const element 	= document.createElement("a-entity");
			const geometry 	= `primitive: sphere; radius: 0.015`;
			const material 	= `color: ${properties.colours.seed}`;

			setAttributes(element, {
				geometry,
				material
			});
			return element;
		}//plantSeed
	},
	update: function () {
		console.log(this.el.object3D.parent.position.y)
	},
	tick: function () {},
	remove: function () {},
	pause: function () {},
	play: function () {
		this.surface = this.el.object3D.parent.position.y;
		setAttributes(this.seed, {
			position: `0 ${this.surface} 0`
		});
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