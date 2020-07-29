import React from 'react';
import './App.css';

import { motion } from 'framer-motion';

const howMuchSlower = 5;

// Measured in seconds
const fastPlaneSpeed = 1;
const slowPlaneSpeed = fastPlaneSpeed*howMuchSlower;

// Measured in pixels
const leftBound = -200;
const rightBound = 200;
const altitude = 100;

function App() {
  return (
    <div className="App">
      <h1>Speed Visualization</h1>
      <div className="Animation">
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
        <div className="ring"
          style={{
            position: "relative",
            left: `${leftBound}px`,
            top: "-80px",
          }}
        />
        <div className="ring"
          style={{
            position: "relative",
            right: `-${rightBound}px`,
            top: "-160px",
          }}
        />
        <motion.div className="circle"
          style={{
            position: "relative",
            top: "-240px",
          }}
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
      </div>
    </div>
  );
}

export default App;
