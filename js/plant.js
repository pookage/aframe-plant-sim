AFRAME.registerComponent('plant', {
	schema: {
		type: {
			type 	: "string",
			default : "cactus"
		}
	},
	init: function(){

		//GENERIC PLANT RULES
		//--------------------------
		this.PLANT_PROPERTIES = {
			"cactus" : {
				"colours" : {
					"stalk" : "green"
				},
				"width" : {
					"stalk" : 	0.275
				},
				"height" : {
					"stalk" : 1.25
				},
				"growthRate" : 0.0001
			}
		};

		//function binding
		//-------------------------
		this.grow 			= AFRAME.utils.bind(this.grow, this);

		//scope variables
		//-------------------------
		const self 				= this;
		const stalk				= this.el;
		const defaults 			= this.data;
		const PLANT_PROPERTIES 	= this.PLANT_PROPERTIES;

		//set up the stalk and the tip
		//--------------------------
		setupPlant();


		//function definitions
		//-------------------------
		function setupPlant(){
			const properties 	= PLANT_PROPERTIES[defaults.type];

			//stalk setup
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

			//drawNeedles(stalk);

			self.tip = tip;
			stalk.appendChild(tip);

			return stalk;
		}//setupPlant
		function drawNeedles(entity){
			const vertices = entity.getObject3D("mesh");//entity.object3DMap.mesh.geometry.attributes.position.array;
			console.log(vertices);
		}//drawNeedles


	},
	update: function () {},
	tick: function () {
		this.grow();
	},
	remove: function () {},
	pause: function () {},
	play: function () {},
	grow: function(){

		const currentGeom 	= this.el.getAttribute("geometry");

		//only start growing if 
		if(currentGeom){

			//scoping stuff
			const defaults 		= this.data;
			const properties 	= this.PLANT_PROPERTIES[defaults.type];

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
				const position 		= `0 ${newHeight / 2} 0`;

				//tip properties
				//-----------------------------
				const tipOffset		= (currentHeight / 2);
				const tipGeometry 	= `radius: ${radius}`;
				const tipPosition 	= `0 ${tipOffset} 0`;

				//update geometries
				//----------------------------------
				setAttributes(this.el, {
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
AFRAME.registerPrimitive('a-plant', {
	defaultComponents: {
		plant: {},
	},
	mappings: {
		type: 'plant.type',
	}
});