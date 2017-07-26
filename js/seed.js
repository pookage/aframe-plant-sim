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

		//function binding
		//-------------------------
		this.grow 			= AFRAME.utils.bind(this.grow, this);

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
			const properties 	= PLANT_PROPERTIES[defaults.type];
			const geometry 		= `primitive: sphere; radius: ${properties.width.seed}`;
			const material 		= `color: ${properties.colours.seed}`;

			setAttributes(seed, {
				geometry,
				material
			});
		}//drawSeed
	},
	update: function () {},
	tick: function () {
		this.grow();
	},
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

		//sproud seed with plant
		//-------------------------
		this.plant = sproutSeed();
		this.el.appendChild(this.plant);


		//function definitions
		//-------------------------
		function sproutSeed(){
			const properties 	= PLANT_PROPERTIES[defaults.type];

			//stalk setup
			const stalk 		= document.createElement("a-entity");
			const stalkGeometry = `primitive: cylinder; height: 0; radius: 0`;
			const stalkMaterial = `color: ${properties.colours.stalk}; metalness: 0; roughness: 1`;

			//tip setup
			const tip 			= document.createElement("a-entity");
			const tipGeometry 	= `primitive: sphere; radius: 0;`;

			setAttributes(stalk, {
				geometry: stalkGeometry,
				material: stalkMaterial
			});
			setAttributes(tip, {
				geometry: tipGeometry,
				material: stalkMaterial
			});

			self.tip = tip;
			stalk.appendChild(tip);

			return stalk;
		}//sproutSeed
	},
	grow: function(){

		const currentGeom 	= this.plant.getAttribute("geometry");

		//only start growing if 
		if(currentGeom){

			//scoping stuff
			const defaults 		= this.data;
			const properties 	= PLANT_PROPERTIES[defaults.type];

			//get current state
			const currentHeight = currentGeom.height;
			const currentRadius = currentGeom.radius;
			const maxHeight 	= properties.height.stalk;
			const maxRadius 	= properties.width.stalk;

			//don't grow any more if already at max height
			if(currentHeight < maxHeight){

				//stalk properties
				//-----------------------------
				const growthAmount 	= properties.growthRate;
				const newHeight 	= currentHeight + growthAmount;
				const grownAmount 	= newHeight / maxHeight;
				const newRadius 	= (maxRadius * grownAmount) * 1.25; 
				const radius 		= newRadius <= maxRadius ? newRadius : maxRadius;
				const geometry 		= `height: ${newHeight}; radius: ${radius}`;
				const position 		= `0 ${newHeight / 2} 0`

				//tip properties
				//-----------------------------
				const tipOffset		= (currentHeight / 2);
				const tipGeometry 	= `radius: ${radius}`;
				const tipPosition 	= `0 ${tipOffset} 0`;

				//update geometries
				//----------------------------------
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