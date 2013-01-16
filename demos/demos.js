var initId = 0;
var world = createWorld();
var ctx;
var canvasWidth;
var canvasHeight;
var canvasTop;
var canvasLeft;

var perso = null;
var perso2 = null;
var game_ball = null;

var keys = [];
var distance_max = 0;

function setupWorld(did) {
	if (!did) did = 0;
	world = createWorld();
	initId += did;
	initId %= demos.InitWorlds.length;
	if (initId < 0) initId = demos.InitWorlds.length + initId;
	demos.InitWorlds[initId](world);
}
function setupNextWorld() { setupWorld(1); }
function setupPrevWorld() { setupWorld(-1); }
function step(cnt) {
	var stepping = false;
	var timeStep = 1.0/60;
	var iteration = 1;
	world.Step(timeStep, iteration);
	ctx.clearRect(0, 0, canvasWidth, canvasHeight);
	drawWorld(world, ctx);
	setTimeout('step(' + (cnt || 0) + ')', 10);
}

Event.observe(window, 'load', function() {
	setupWorld();
	ctx = $('canvas').getContext('2d');
	var canvasElm = $('canvas');
	canvasWidth = parseInt(canvasElm.width);
	canvasHeight = parseInt(canvasElm.height);
	canvasTop = parseInt(canvasElm.style.top);
	canvasLeft = parseInt(canvasElm.style.left);
	
	Event.observe('canvas', 'click', function(e) {
		//setupNextWorld();
		if (Math.random() < 10.5) 
		{	
			//createBalls(world, Event.pointerX(e) - canvasLeft, Event.pointerY(e) - canvasTop, 6);
			perso = create_ragdoll(world,Event.pointerX(e) - canvasLeft +200, Event.pointerY(e) - canvasTop);
			perso2 = create_ragdoll(world,Event.pointerX(e) - canvasLeft -200, Event.pointerY(e) - canvasTop);
		}
		else 
			createBox(world, Event.pointerX(e) - canvasLeft, Event.pointerY(e) - canvasTop, 10, 10, false);
	});

	Event.observe('canvas', 'contextmenu', function(e) {
		if (e.preventDefault) e.preventDefault();
		//setupPrevWorld();
		return false;
	});

    window.addEventListener('keydown',handleKeyDown,true);  
    window.addEventListener('keyup',handleKeyUp,true);  
	
	step();
});



    function handleKeyDown(evt){  
        keys[evt.keyCode] = true;  
		
		if ( evt.keyCode == 38 || evt.keyCode == 40) {
			evt.preventDefault();
		}
		
		log(evt.keyCode);

		if ( keys[78] ) // n
			setupPrevWorld();

		var isPersoIn = perso.GetCenterPosition().y>0 && perso.GetCenterPosition().x < 650;

		if ( keys[38] && isPersoIn ) // up
			perso.GetLinearVelocity().y  = -300;
		if ( keys[37] ) // left
			perso.GetLinearVelocity().x  = -300;
		if ( keys[39] && isPersoIn ) // right
			perso.GetLinearVelocity().x  = +300;
		if ( keys[40] ) // down
			perso.GetLinearVelocity().y  = +300;

		if ( perso2 && keys[74] ) // j
			perso2.GetLinearVelocity().x = -200;
		if ( perso2 && keys[75] ) // k
			perso2.GetLinearVelocity().y = -200;
		if ( perso2 && keys[76] ) // l
			perso2.GetLinearVelocity().x = +200;


		if ( keys[80] ) // p 
			perso = create_ragdoll( world, 200, 200 );

		if ( game_ball && keys[66] ) // b 
		{
			game_ball.GetCenterPosition().Set( 350, 260 );
			game_ball.GetLinearVelocity().Set( 0, 0 );
		}


		return false;
    }  

    function handleKeyUp(evt){  
        keys[evt.keyCode] = false;  
    }  
    // disable vertical scrolling from arrows :)  
    document.onkeydown=function() { return event.keyCode!=38 && event.keyCode!=40; }  

/*
   function mJoint(e) {

         if (mj) {
            var b2Vec2 = new b2Vec2(Event.pointerX(e) - canvasLeft, Event.pointerY(e) - canvasTop);
            mj.SetTarget(p2);
         }
      }


    function Update(e:Event):void {
         m_world.Step(m_timeStep, m_iterations);

         for (var bb:b2Body = m_world.m_bodyList; bb; bb = bb.m_next) {
            if (bb.m_userData is Sprite) {
               bb.m_userData.x = bb.m_position.x;
               bb.m_userData.y = bb.m_position.y;
               bb.m_userData.rotation = bb.m_rotation * (180/Math.PI);
            }
         }
      }
*/
