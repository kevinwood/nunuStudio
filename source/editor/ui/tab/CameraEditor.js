"use strict";

function CameraEditor(parent, closeable, container, index)
{
	TabElement.call(this, parent, closeable, container, index, "camera", Editor.filePath + "icons/camera/camera.png");

	this.camera = null;
	
	//Main container
	this.main = new DualDivisionResizable(this.element);
	this.main.tabPosition = 0.6;
	this.main.tabPositionMin = 0.05;
	this.main.tabPositionMax = 0.95;

	//Canvas
	this.canvas = new Canvas(this.main.divA);

	//Renderer
	this.renderer = new THREE.WebGLRenderer({canvas: this.canvas.element, antialias: Settings.render.antialiasing});

	//Change main div aspect
	this.main.divB.style.overflow = "auto";
	this.main.divB.style.cursor = "default";
	this.main.divB.style.backgroundColor = Editor.theme.panelColor;
}

CameraEditor.prototype = Object.create(TabElement.prototype);

//Destroy
CameraEditor.prototype.destroy = function()
{
	TabElement.prototype.destroy.call(this);

	if(this.renderer !== null)
	{
		this.renderer.dispose();
		this.renderer.forceContextLoss();
		this.renderer = null;
	}
};

CameraEditor.prototype.update = function()
{
	if(this.camera !== null)
	{
		var scene = this.camera.parent;
		while(!scene instanceof Scene)
		{
			scene = scene.parent;
		}

		this.camera.aspect = this.canvas.size.x / this.canvas.size.y;
		this.camera.updateProjectionMatrix();

		this.renderer.render(scene, this.camera);
	}
};

CameraEditor.prototype.updateMetadata = function()
{
	if(this.camera !== null)
	{
		var camera = this.camera;

		this.setName(camera.name);

		var found = false;
		Editor.program.traverse(function(obj)
		{
			if(obj.uuid === camera.uuid)
			{
				found = true;
			}
		});

		if(!found)
		{
			this.close();
		}
	}
};

CameraEditor.prototype.attach = function(camera)
{
	this.camera = camera;

	this.updateMetadata();
};

CameraEditor.prototype.isAttached = function(camera)
{
	return this.camera === camera;
};

CameraEditor.prototype.updateInterface = function()
{
	//Visibility
	if(this.visible)
	{
		this.element.style.display = "block";

		//Main
		this.main.visible = this.visible;
		this.main.size.copy(this.size);
		this.main.updateInterface();

		//Canvas
		this.canvas.visible = this.visible;
		this.canvas.size.set(this.main.divA.offsetWidth, this.main.divA.offsetHeight);
		this.canvas.updateInterface();

		//Renderer
		this.renderer.setSize(this.canvas.size.x, this.canvas.size.y);

		//Element
		this.element.style.top = this.position.y + "px";
		this.element.style.left = this.position.x + "px";
		this.element.style.width = this.size.x + "px";
		this.element.style.height = this.size.y + "px";
	}
	else
	{
		this.element.style.display = "none";
	}
};
