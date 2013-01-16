demos.top = {};
demos.top.createBall = function(world, x, y, rad, fixed) {
	var ballSd = new b2CircleDef();
	if (!fixed) ballSd.density = 1.00;
	ballSd.radius = rad || 10;
	ballSd.restitution = 0.6;
	ballSd.friction = 1;
	var ballBd = new b2BodyDef();
	ballBd.AddShape(ballSd);
	ballBd.position.Set(x,y);
	return world.CreateBody(ballBd);
};

demos.top.createPoly = function(world, x, y, points, fixed) {
	var polySd = new b2PolyDef();
	if (!fixed) polySd.density = 1.0;
	polySd.vertexCount = points.length;
	for (var i = 0; i < points.length; i++) {
		polySd.vertices[i].Set(points[i][0], points[i][1]);
	}
	var polyBd = new b2BodyDef();
	polyBd.AddShape(polySd);
	polyBd.position.Set(x,y);
	return world.CreateBody(polyBd)
};

demos.top.initWorld = function(world) {
	createBox(world, 0, 125, 10, 475);
	//createBox(world, 700, 125, 10, 375);
	
	game_ball = demos.top.createBall(world, 350, 300, 20, false);
	perso = create_ragdoll(world, 70, 200);

	game_ball.m_angularDamping=0.97;
	game_ball.AllowSleeping(false);
	perso.AllowSleeping(false);
};
demos.InitWorlds.push(demos.top.initWorld);


