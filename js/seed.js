const PLANT_PROPERTIES = {
	"cactus" : {
		"colours" : {
			"seed" : "#000",
			"stalk" : "green"
		},
		"width" : {
			"seed" : 	0.015,
			"stalk" : 	0.275
		},
		"height" : {
			"stalk" : 1.25
		},
		"growthRate" : 0.001
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

		const element = this;
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
			const stalk 		= document.createElement("a-entity");
			const stalkGeometry = `primitive: cylinder; height: 0; radius: 0`;
			const stalkMaterial = `color: ${properties.colours.stalk}; metalness: 0; roughness: 1`;

			const tip 			= document.createElement("a-entity");
			const tipGeometry 	= `primitive: sphere; height: 0; radius: 0`;

			setAttributes(stalk, {
				geometry: stalkGeometry,
				material: stalkMaterial
			});
			setAttributes(tip, {
				geometry: tipGeometry,
				material: stalkMaterial
			});

			element.tip = tip;
			stalk.appendChild(tip);

			return stalk;
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

				//stalk properties
				const growthAmount 	= properties.growthRate;
				const newHeight 	= currentHeight + growthAmount;
				const grownAmount 	= newHeight / maxHeight;
				const newRadius 	= (maxRadius * grownAmount) * 1.25; 
				const radius 		= newRadius < maxRadius ? newRadius : maxRadius;
				const geometry 		= `height: ${newHeight}; radius: ${radius}`;
				const position 		= `0 ${newHeight / 2} 0`
				

				//tip properties
				const tipOffset		= currentHeight - ((radius * 2) + (0.075 * grownAmount));
				const tipGeometry 	= `radius: ${radius}`;
				const tipPosition 	= `0 ${tipOffset} 0`;

				setAttributes(this.plant, {
					geometry,
					position
				});

				setAttributes(this.tip, {
					geometry: tipGeometry,
					position: tipPosition
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