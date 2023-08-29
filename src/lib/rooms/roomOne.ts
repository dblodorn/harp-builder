import * as Tone from 'tone'
import * as Matter from 'matter-js'
import { wallSynth, simpleSynth } from '../synths'
// write a tone fm synth with sequener and delay
export function roomOne() {
  // module aliases
  let Engine = Matter.Engine,
      Render = Matter.Render,
      Runner = Matter.Runner,
      Bodies = Matter.Bodies,
      Events = Matter.Events,
      Composite = Matter.Composite;

  const w = window.innerWidth
  const h = window.innerHeight

  // create an engine
  let engine = Engine.create();

  // create a renderer
  let render = Render.create({
      element: document.body,
      engine: engine,
      bounds: {
        min: {
          x: 0,
          y: 0
        },
        max: {
          x: w,
          y: h,
        }
      },
      options: {
        height: h,
        width: w,
        background: 'rgba(0,0,0,0)',
        wireframes: false,
        pixelRatio: window.devicePixelRatio,
        hasBounds: true,
        showInternalEdges: true,
      }
  });

  // create two boxes and a ground
  const boundsHeight = 10
  const offset = boundsHeight / 2

  const addCircle = () => {
    const createCircle = () => Bodies.circle(Math.random() * 400 + 30, 30, 30);
    Composite.add(engine.world, createCircle());
  };


  let circleC = Bodies.circle(10, 200, 40);
  let circleB = Bodies.circle(450, 50, 40);
  let circleA = Bodies.circle(w * .75, 200, 40);

  let ground = Bodies.rectangle(w / 2, h, w, boundsHeight, { isStatic: true });
  let ceiling = Bodies.rectangle(w / 2, 0, w, boundsHeight + offset, { isStatic: true });
  let leftWall = Bodies.rectangle(0, h / 2, boundsHeight + offset, h, { isStatic: true });
  let rightWall = Bodies.rectangle(w - offset, h / 2, boundsHeight, h, { isStatic: true });
  let centerWall = Bodies.rectangle((w / 2) - boundsHeight, h / 2, boundsHeight, h / 2, { isStatic: true });

  // add all of the bodies to the world
  Composite.add(engine.world, [circleC, circleB, circleA, ground, leftWall, rightWall, ceiling, centerWall]);
  
  // when bodies collide trigger synth
  const wallASynth = wallSynth({reverbDelay: 10})  
  const synth = simpleSynth()

  Events.on(engine, 'collisionStart', function(event) {
    const pairs = event.pairs;
    for (let i = 0, j = pairs.length; i != j; ++i) {
      const pair = pairs[i];
      
      if (pair.bodyA === circleA) {
        synth.triggerAttackRelease('D3', '8n')
      } else if (pair.bodyA === circleB) {
        synth.triggerAttackRelease('A3', '8n')
      } else if (pair.bodyA === ground) {
        wallASynth.triggerAttackRelease('C3', '8n')
      } else if (pair.bodyA === leftWall) {
        wallASynth.triggerAttackRelease('A3', '8n')
      }

      if (pair.bodyB === circleB) {
        synth.triggerAttackRelease('E8', '2n')
      } else if (pair.bodyB === circleC) {
        synth.triggerAttackRelease('A8', '8n')
      } else if (pair.bodyB === ground) {
        wallASynth.triggerAttackRelease('C7', '8n')
      } else if (pair.bodyB === leftWall) {
        wallASynth.triggerAttackRelease('G7', '8n')
      }  else if (pair.bodyB === rightWall) {
        synth.triggerAttackRelease('F8', '8n')
      }
    }
  });

  // add mouse control
  let mouse = Matter.Mouse.create(render.canvas),
      mouseConstraint = Matter.MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
          render: { visible: false }
        }
      });

  let initialized = false

  const initializeApp = () => {
    initialized = true
    Tone.start()
    Runner.run(engine);
    Render.run(render);
    Composite.add(engine.world, mouseConstraint);

    leftWall.render.fillStyle = 'pink'
    ground.render.fillStyle = 'red'
    ceiling.render.fillStyle = 'blue'
    rightWall.render.fillStyle = 'yellow'
    centerWall.render.fillStyle = 'beige'
  }

  return {
    addCircle,
    initializeApp,
    initialized,
  }
}
