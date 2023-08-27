import * as Tone from 'tone'
import * as Matter from 'matter-js'

export function harp2() {
  const reverb = new Tone.Reverb({
    decay: 40,
    wet: 0.5,
  }).toDestination();

  const delay = new Tone.PingPongDelay("2n", 0.68).toDestination();

  const synth = new Tone.FMSynth({
    harmonicity: 1,
    modulationIndex: 20,
    detune: 0,
    modulationEnvelope: {
      attack: 0.01,
      decay: 0.9,
      release: 0.5,
      sustain: 0.272,
    },
    envelope: {
      attack: 0.964,
      decay: .9,
      release: 1,
      sustain: 0.9,
    },
    modulation: {
      type: "triangle19"
    },
  }).connect(delay).connect(reverb).toDestination();
 
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
      options: {
        height: h,
        width: w,
        background: 'rgba(0,0,0,0)',
        wireframes: false,
        pixelRatio: window.devicePixelRatio
      }
  });

  // create two boxes and a ground
  let boxA = Bodies.circle(400, 200, 80, 80);
  let boxB = Bodies.circle(450, 50, 80, 80);
  let boxC = Bodies.circle(450, 150, 30, 30);
  let ground = Bodies.rectangle(w / 2, h, w, 1, { isStatic: true });

  Events.on(engine, 'collisionStart', function(event) {
    console.log(event)  
  });

  // add all of the bodies to the world
  Composite.add(engine.world, [boxA, boxB, boxC, ground]);

  // run the renderer
  Render.run(render);

  // create runner
  let runner = Runner.create();

  // run the engine
  Runner.run(runner, engine);
}