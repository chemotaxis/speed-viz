import React, { useRef, useState } from 'react';
import './App.css';
import src from './static/hermeus-thumbnail.jpg';
import { motion, useAnimation } from 'framer-motion';


const speedRatio = 5/0.85;
const nTripsFastPlane = Math.floor(speedRatio);

// Measured in seconds
const fastPlaneTripDuration = 1;
const slowPlaneTripDuration = fastPlaneTripDuration*speedRatio;


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

  const [curInit, prevInit, tripsInit] = [1, 1, 0];
  const [trips, setTrips] = useState(tripsInit);
  const [cur, setCur] = useState(curInit);
  const [prev, setPrev] = useState(prevInit);

  function onUpdate(latest) {
    setCur(latest.x < leftCollide || latest.x > rightCollide? 1:0);

    if (cur === 1 && prev === 0) {
      setTrips(trips+1);
    }

    setPrev(cur);
  }

  const onClick = () => {
    setCur(curInit);
    setPrev(prevInit);
    setTrips(tripsInit);

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
        <div className="planeName">Mach 5 vs. <br/>Today's Planes</div>
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
                duration: slowPlaneTripDuration,
                flip: 0,
              }}
            />
            <motion.img src={src} className="circle"
              animate={fastControls}
              transition={{
                ease: "easeInOut",
                duration: fastPlaneTripDuration,
                flip: nTripsFastPlane - 1,
              }}
              onUpdate={onUpdate}
            />
          <div ref={ringRef} className="ring"/>
        </div>
        <div className="cityLabel">Paris</div>
      </div>
      <div style={{ height: "20vh" }}/>
      <div className="row center">
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
      <div className="row center sansSerif">
        <a href="https://www.instagram.com/p/B_iZBUfJpw-/"
        target="_blank" rel="noopener noreferrer">
          Link to original visualization
        </a>
      </div>
      <div style={{height: "60px"}}/>
    </div>
  );
}

export default App;
