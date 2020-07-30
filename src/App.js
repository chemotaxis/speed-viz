import React from 'react';
import { useState } from 'react';
import './App.css';

import { motion } from 'framer-motion';

const howMuchSlower = 5;

// Measured in seconds
const fastPlaneSpeed = 1;
const slowPlaneSpeed = fastPlaneSpeed*howMuchSlower;

// Measured in pixels
const leftBound = 0;
const rightBound = 240;
const altitude = 100;

function Button({onClick}) {
  return (
    <button onClick={onClick}>
      Run again
    </button>
  )
}

function Animation() {
  return (
    <div className="Animation">
      <div className="row">
        <div className="yellowBox"></div>
        <div className="planeName">Mach 5</div>
        <div className="animationBox"></div>
        <div className="tripCounter">Oneway trips:</div>
      </div>
      <div className="row">
        <div className="box"></div>
        <div className="cityLabel">NY</div>
        <div className="animationBox">
          <div className="container">
            <div className="ring" style={{position: "absolute"}}/>
            <motion.div className="circle"
              style={{position:"absolute"}}
              animate={{
                x: [leftBound, rightBound],
                y: [0, altitude, 0]
              }}
              transition={{
                ease: "easeInOut",
                duration: slowPlaneSpeed,
                flip: 0,
              }}
            />
            <motion.div className="circle"
              animate={{
                x: [leftBound, rightBound],
                y: [0, -altitude, 0],
              }}
              transition={{
                ease: "easeInOut",
                flip: howMuchSlower - 1,
                duration: fastPlaneSpeed,
              }}
            />

          </div>
          <div className="container">
            <div className="ring"/>
          </div>
        </div>
        <div className="cityLabel">Paris</div>
      </div>
    </div>
  )
}
function App() {
  const [count, setCount] = useState(0);
  return (
    <div className="App">
      <h1>Speed Visualization</h1>
      <Animation key={count}/>
      <Button onClick={() => setCount(count?0:1)}/>
    </div>
  );
}

export default App;
