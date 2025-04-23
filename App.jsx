// src/MovableCircle.js
import React, { useRef, useEffect, useState } from 'react';

const MovableCircle = () => {
  const canvasRef = useRef(null);
  const [circle, setCircle] = useState({ x: 200, y: 200, radius: 50 });
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const drawCircle = (ctx) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
    ctx.fillStyle = 'blue';
    ctx.fill();
    ctx.closePath();
  };

  const handleMouseDown = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Check if the mouse is inside the circle
    const dx = mouseX - circle.x;
    const dy = mouseY - circle.y;
    if (dx * dx + dy * dy <= circle.radius * circle.radius) {
      setIsDragging(true);
      setOffset({ x: dx, y: dy });
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const rect = canvasRef.current.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      // Update circle position
      setCircle({ ...circle, x: mouseX - offset.x, y: mouseY - offset.y });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');
    drawCircle(ctx);
  }, [circle]);

  return (
    <canvas
      ref={canvasRef}
      width={400}
      height={400}
      style={{ border: '1px solid black' }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp} // Stop dragging if mouse leaves the canvas
    />
  );
};

export default MovableCircle;