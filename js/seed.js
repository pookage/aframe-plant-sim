const PLANT_PROPERTIES = {
	"cactus" : {
		"colours" : {
			"seed" : "#000",
			"stalk" : "green"
		},
		"width" : {
			"seed" : 	0.015,
			"stalk" : 	0.015
		},
		"height" : {
			"stalk" : 1
		},
		"growthRate" : 0.0001
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

		this.grow 			= AFRAME.utils.bind(this.grow, this);

		const defaults 		= this.data;
		const properties 	= PLANT_PROPERTIES[defaults.type];

		this.seed 	= plantSeed();
		this.el.appendChild(this.seed);

		function plantSeed(){
			const element 	= document.createElement("a-entity");
			const geometry 	= `primitive: sphere; radius: ${properties.width.seed}`;
			const material 	= `color: ${properties.colours.seed}`;

			setAttributes(element, {
				geometry,
				material
			});
			return element;
		}//plantSeed
	},
	update: function () {},
	tick: function () {
		this.grow();
	},
	remove: function () {},
	pause: function () {},
	play: function () {

		//move seed to surface
		this.surface = this.el.object3D.parent.position.y;
		setAttributes(this.seed, {
			position: `0 ${this.surface} 0`
		});

		//sproud seed with plant
		const defaults 	= this.data;
		this.plant 		= sproutSeed();
		this.seed.appendChild(this.plant);


		function sproutSeed(){
			const properties 	= PLANT_PROPERTIES[defaults.type];
			const element 		= document.createElement("a-entity");
			const geometry 		= `primitive: cylinder; height: 0; radius: 0`;
			const material 		= `color: ${properties.colours.stalk}`;

			setAttributes(element, {
				geometry,
				material
			});

			return element;
		}//sproutSeed
	},
	grow: function(){

		const defaults 		= this.data;
		const currentGeom 	= this.plant.getAttribute("geometry");
		const properties 	= PLANT_PROPERTIES[defaults.type];

		if(currentGeom){
			const currentHeight = currentGeom.height;
			const currentRadius = currentGeom.radius;
			const maxHeight 	= properties.height.stalk;
			const maxRadius 	= properties.width.stalk;

			if(currentHeight < maxHeight){
				const growthAmount 	= properties.growthRate;
				const newHeight 	= currentHeight + growthAmount;
				const grownAmount 	= newHeight / maxHeight;
				const newRadius 	= (maxRadius * grownAmount) * 2; 
				const radius 		= newRadius < maxRadius ? newRadius : maxRadius;
				const geometry 		= `height: ${newHeight}; radius: ${radius}`;
				const position 		= `0 ${newHeight / 2} 0`
				
				setAttributes(this.plant, {
					geometry,
					position
				});
			}
		}
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