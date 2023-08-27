import * as Tone from 'tone'
import * as Matter from 'matter-js'


// write a tone fm synth with sequener and delay
export function harp3() {
  const reverb = new Tone.Reverb({
    decay: 60,
    wet: 0.75,
  }).toDestination();

  const delay = new Tone.PingPongDelay("4n", 0.8).toDestination();
  const delay2 = new Tone.PingPongDelay("12n", .3).toDestination();
  const vibrato = new Tone.Vibrato("4n", 0.8).toDestination();

  const wallSynth = new Tone.FMSynth({
    harmonicity: 5,
    modulationIndex: 40,
    detune: 4,
    modulationEnvelope: {
      attack: 0.5,
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
      type: "amsawtooth29"
    },
  }).connect(delay).connect(reverb).toDestination();
  
  const synth = new Tone.FMSynth({
    harmonicity: 1,
    modulationIndex: 5,
    detune: 1,
    modulationEnvelope: {
      attack: 0.25,
      decay: 0.9,
      release: 0.5,
      sustain: 1,
    },
    envelope: {
      attack: 0.24,
      decay: .9,
      release: 1,
      sustain: 1,
    },
    modulation: {
      type: "sine"
    },
  }).connect(vibrato).connect(reverb).connect(delay2).toDestination();

  const synth3 = new Tone.FMSynth({
    harmonicity: .4,
    modulationIndex: 1,
    detune: 1,
    modulationEnvelope: {
      attack: 0.05,
      decay: 0.9,
      release: 0.5,
      sustain: 0.2,
    },
    envelope: {
      attack: 0.24,
      decay: .9,
      release: 1,
      sustain: 1,
    },
    modulation: {
      type: "fmsquare4"
    },
  }).connect(vibrato).connect(reverb).connect(delay2).toDestination();

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

  let circleC = Bodies.circle(10, 200, 40, 40);
  let circleB = Bodies.circle(450, 50, 40, 40);
  let circleA = Bodies.circle(w * .75, 200, 40, 40);

  let ground = Bodies.rectangle(w / 2, h, w, boundsHeight, { isStatic: true });
  let ceiling = Bodies.rectangle(w / 2, 0, w, boundsHeight + offset, { isStatic: true });
  let leftWall = Bodies.rectangle(0, h / 2, boundsHeight + offset, h, { isStatic: true });
  let rightWall = Bodies.rectangle(w - offset, h / 2, boundsHeight, h, { isStatic: true });

  let centerWall = Bodies.rectangle((w / 2) - boundsHeight, h / 2, boundsHeight, h / 2, { isStatic: true });

  

  // add all of the bodies to the world
  Composite.add(engine.world, [circleC, circleB, circleA, ground, leftWall, rightWall, ceiling, centerWall]);

// when bodies collide trigger synth
  Events.on(engine, 'collisionStart', function(event) {
    const pairs = event.pairs;
    for (let i = 0, j = pairs.length; i != j; ++i) {
      const pair = pairs[i];
      
      if (pair.bodyA === circleA) {
        synth.triggerAttackRelease('D3', '8n')
      } else if (pair.bodyA === circleB) {
        synth.triggerAttackRelease('A3', '8n')
      } else if (pair.bodyA === ground) {
        wallSynth.triggerAttackRelease('C3', '8n')
      } else if (pair.bodyA === leftWall) {
        wallSynth.triggerAttackRelease('A3', '8n')
      }
      
      
      if (pair.bodyC === circleC) {
        synth3.triggerAttackRelease('D2', '8n')
      } else if (pair.bodyC === circleB) {
        synth3.triggerAttackRelease('A2', '8n')
      } else if (pair.bodyC === ground) {
        synth3.triggerAttackRelease('C2', '8n')
      } else if (pair.bodyC === leftWall) {
        synth3.triggerAttackRelease('G2', '8n')
      }

      if (pair.bodyB === circleB) {
        synth.triggerAttackRelease('E8', '2n')
      } else if (pair.bodyB === circleC) {
        synth.triggerAttackRelease('A8', '8n')
      } else if (pair.bodyB === ground) {
        wallSynth.triggerAttackRelease('C7', '8n')
      } else if (pair.bodyB === leftWall) {
        wallSynth.triggerAttackRelease('G7', '8n')
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

  const harpTitle = document.getElementById('harp-title')
  const titleWrapper = document.getElementById('harps')
  harpTitle.innerHTML = '♪ click 2 Start ♪'

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

    circleC.options = {
      render: 1
    }
    circleA.options = {
      render: 1
    }
    circleB.options = {
      render: 1
    }

    titleWrapper.remove()
  }

  

  harpTitle.addEventListener('click', () => {
    if (!initialized) {
      initializeApp()
    } else {
      console.log('already initialized')
    }
  })
}
