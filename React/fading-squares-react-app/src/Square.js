import React, { useState, useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Square = () => {
  const [top, setTop] = useState(Math.random() * 400);
  const [left, setLeft] = useState(Math.random() * 900);
  const squareRef = useRef(null);
  const tl = useRef(gsap.timeline({ repeat: -1, yoyo: true }));

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      tl.current
        .to(squareRef.current, { opacity: 1, duration: .5 })
        .to(squareRef.current, { opacity: 0, duration: .5 })
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
        opacity: 0,
      }}
    />
  );
};

export default Square;