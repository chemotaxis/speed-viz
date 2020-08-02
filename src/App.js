import React, { useRef } from 'react';
import './App.css';
import * as src from './static/hermeus-thumbnail.jpg';
import { motion, useAnimation } from 'framer-motion';


const howMuchSlower = 5;

// Measured in seconds
const fastPlaneSpeed = 1;
const slowPlaneSpeed = fastPlaneSpeed*howMuchSlower;


function Button({onClick}) {
  return (
    <motion.div onClick={onClick} className="button"
      whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
    >
      Run
    </motion.div>
  )
}

function Animation() {
  // Measured in pixels
  const leftBound = 0;
  let rightBound = 0;
  const altitude = 50;

  const trips = 0;

  const animationRef = useRef();
  const circleRef = useRef();

  const slowControls = useAnimation();
  const fastControls = useAnimation();

  const slowY = [0, altitude, 0];
  const fastY = [0, -altitude, 0];

  const onClick = () => {
    rightBound = animationRef.current.offsetWidth
      - circleRef.current.offsetWidth;

    console.log(rightBound);

    const xBounds = [leftBound, rightBound];

    slowControls.start({
      x: xBounds,
      y: slowY,
    });

    fastControls.start({
      x: xBounds,
      y: fastY,
    });
  }

  return (
    <div className="Animation">
      <div className="row">
        <div className="yellowBox"></div>
        <div className="planeName">Mach 5 vs. Today's Planes</div>
        <div className="animationBox"></div>
        <div className="tripCounter">Oneway trips: {trips}</div>
      </div>
      <div className="row">
        <div className="box"></div>
        <div className="cityLabel">NY</div>
        <div ref={animationRef} className="animationBox">
            <div className="ring" style={{position: "absolute"}}/>
            <motion.div className="circle"
              style={{position:"absolute"}}
              animate={slowControls}
              transition={{
                ease: "easeInOut",
                duration: slowPlaneSpeed,
                flip: 0,
              }}
            />
            <motion.img src={src} className="circle"
              animate={fastControls}
              transition={{
                ease: "easeInOut",
                duration: fastPlaneSpeed,
                flip: howMuchSlower - 1,
              }}
            />
          <div ref={circleRef} className="ring"/>
        </div>
        <div className="cityLabel">Paris</div>
      </div>
      <div style={{ height: "20vh" }}/>
      <div className="row" style={{justifyContent: "center"}}>
        <Button onClick={onClick}/>
      </div>
    </div>
  )
}
function App() {
  return (
    <div className="App">
      <h1>Speed Visualization</h1>
      <Animation/>
    </div>
  );
}

export default App;
