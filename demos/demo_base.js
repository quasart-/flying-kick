function createWorld() {
	var worldAABB = new b2AABB();
	worldAABB.minVertex.Set(-1000, -1000);
	worldAABB.maxVertex.Set(10000, 1000);
	var gravity = new b2Vec2(0, 200);
	var doSleep = true;
	var world = new b2World(worldAABB, gravity, doSleep);
	createGround(world);
	return world;
}

function createGround(world) {
	var groundSd = new b2BoxDef();
	groundSd.extents.Set(10000, 200);
	groundSd.restitution = 0.6;
	var groundBd = new b2BodyDef();
	groundBd.AddShape(groundSd);
	groundBd.position.Set(300, 690);
	return world.CreateBody(groundBd)
}

function createBall(world, x, y, d) {
	d = typeof d !== 'undefined' ? d : 1.0;

	var ballSd = new b2CircleDef();
	ballSd.density = d;
	ballSd.radius = 16;
	ballSd.restitution = 0.005;
	ballSd.friction = 1;
	var ballBd = new b2BodyDef();
	ballBd.AddShape(ballSd);
	ballBd.position.Set(x,y);
	return world.CreateBody(ballBd);
}

function createBalls(world, x, y, n) {
	var b = createBall(world, x, y);
	create_chain( b, world, x+51, y, n-1);
	return b;
}


function create_chain( b1, world, x, y, n, dir) {

	dir = typeof dir !== 'undefined' ? dir : 51;

	var b2 = createBall(world, x, y, 5);

	var jointDef = new b2RevoluteJointDef();
	jointDef.anchorPoint.Set(b1.GetOriginPosition().x, b1.GetOriginPosition().y);
	jointDef.body1 = b1;
	jointDef.body2 = b2;
	jointDef.lowerAngle = -0.125 * 3.1415; 
	jointDef.upperAngle = 0.125 * 3.1415; 
	jointDef.enableLimit = true;	
	world.CreateJoint(jointDef);

	if ( n>1 ) {
		b2 = create_chain( b2, world, x+dir, y, n-1, dir);
	}

	return b2;
}

function create_ragdoll( world, x, y) {
	var b = createBall(world, x, y, 10);
	
	var bassin = create_chain(b, world, x+70, y, 1);
	create_chain(bassin , world, x+141, y-7, 2, +70);
	create_chain(bassin , world, x+141, y+7, 2, +70);

	create_chain( b, world, x, y+17, 3, 51);
	create_chain( b, world, x, y-17, 3, 51);
	
	create_chain( b, world, x-41, y, 1, -51);

	return b;

}



function createBox(world, x, y, width, height, fixed) {
	if (typeof(fixed) == 'undefined') fixed = true;
	var boxSd = new b2BoxDef();
	if (!fixed) boxSd.density = 1.0;
	boxSd.extents.Set(width, height);
	var boxBd = new b2BodyDef();
	boxBd.AddShape(boxSd);
	boxBd.position.Set(x,y);
	return world.CreateBody(boxBd)
}

var demos = {};
demos.InitWorlds = [];


function log(t)
{
	document.getElementById('log').innerHTML = t;
}

