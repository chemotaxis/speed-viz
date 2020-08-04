import React, { useRef, useState } from 'react';
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

  const [leftCollide, setLeftCollide] = useState(leftBound);
  const [rightCollide, setRightCollide] = useState(rightBound);

  const animationRef = useRef();
  const ringRef = useRef();

  const slowControls = useAnimation();
  const fastControls = useAnimation();

  const slowY = [0, altitude, 0];
  const fastY = [0, -altitude, 0];

  const [trips, setTrips] = useState(0);
  const [cur, setCur] = useState(1);
  const [prev, setPrev] = useState(1);

  function onUpdate(latest) {
    setCur(latest.x < leftCollide || latest.x > rightCollide? 1:0);

    if (cur === 1 && prev === 0) {
      setTrips(trips+1);
    }

    setPrev(cur);
  }

  const onClick = () => {
    setTrips(0);

    const ringDiameter = ringRef.current.offsetWidth;

    rightBound = animationRef.current.offsetWidth - ringDiameter;

    setLeftCollide(leftBound + ringDiameter);
    setRightCollide(rightBound - ringDiameter);

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
        <div className="tripCounter">One-way trips: {trips}</div>
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
              onUpdate={onUpdate}
            />
          <div ref={ringRef} className="ring"/>
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
