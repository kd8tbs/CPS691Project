import React, { useState, useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Square = () => {
  const [top, setTop] = useState(Math.random() * 400);
  const [left, setLeft] = useState(Math.random() * 900);
  const squareRef = useRef(null);
  const tl = useRef(gsap.timeline({ repeat: -1, yoyo: true }));

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const duration = .5; // Set the total duration for growth and shrink animations

      tl.current
        .to(squareRef.current, { scale: 10, duration })
        .fromTo(
          squareRef.current,
          { backgroundColor: 'red' },
          { backgroundColor: 'blue', duration: duration / 2 },
          0 // Start color transition at the beginning of the timeline
        )
        .to(squareRef.current, { scale: 0, duration })
        .fromTo(
          squareRef.current,
          { backgroundColor: 'blue' },
          { backgroundColor: 'red', duration: duration / 2 },
          `-=${duration / 2}` // Start color transition halfway through the timeline
        )
        .eventCallback('onRepeat', () => {
          setTop(Math.random() * 400);
          setLeft(Math.random() * 900);
        });
    }, squareRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={squareRef}
      style={{
        position: 'absolute',
        top: `${top}px`,
        left: `${left}px`,
        width: '10px',
        height: '10px',
        backgroundColor: 'red',
        transformOrigin: '50% 50%', // Set transform origin to the center
      }}
    />
  );
};

export default Square;
