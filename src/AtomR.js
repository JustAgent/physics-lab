import React, { useEffect, useState, useRef } from "react";

const Atom = () => {
  const canvasRef = useRef(null);
  const [atoms, setAtoms] = useState(1);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    const calculateRadius = (n) => {
      return 100;
    };

    const animate = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);

      for (let index = 0; index < atoms; index++) {
        context.setLineDash([5, 5]);
        context.beginPath();
        // Orbiters
        const rotationAngle = (index * 45 * Math.PI) / 180; // Convert degrees to radians
        const a = calculateRadius(index) * 1.5; // Semi-major axis
        const b = calculateRadius(index) * 0.4; // Semi-minor axis
        const centerX = canvas.width / 2; // X-coordinate of the ellipse center
        const centerY = canvas.height / 2; // Y-coordinate of the ellipse center
        const startAngle = rotationAngle;
        const endAngle = rotationAngle + 2 * Math.PI;
        context.ellipse(
          centerX,
          centerY,
          a,
          b,
          rotationAngle,
          startAngle,
          endAngle
        );
        context.strokeStyle = "gray";
        context.stroke();

        // Nuclear
        context.setLineDash([]);
        context.beginPath();
        context.arc(centerX, centerY, 20, 0, 2 * Math.PI);
        context.fillStyle = "red";
        context.fill();

        context.font = "32px Arial";
        context.fillStyle = "white";
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillText("+", centerX, centerY);

        // Electrons Position
        const coefVelocity = 40;
        const currentTime = Date.now();
        const timeAngle =
          (((currentTime / 1000) % 60) / 60) * 2 * Math.PI * coefVelocity +
          index * 0.1;
        const electronX =
          centerX +
          a * Math.cos(timeAngle) * Math.cos(rotationAngle) -
          b * Math.sin(timeAngle) * Math.sin(rotationAngle);
        const electronY =
          centerY +
          a * Math.cos(timeAngle) * Math.sin(rotationAngle) +
          b * Math.sin(timeAngle) * Math.cos(rotationAngle);

        // const currentTime = Date.now();
        // const angle =
        //   (currentTime * 0.017471538226884735 * (index + 1)) % (2 * Math.PI); // Calculate actual angle based on current time and index
        // const electronX = centerX + a * Math.cos(angle);
        // const electronY = centerY + b * Math.sin(angle);

        // Dot, where x,y = position
        context.beginPath();
        context.arc(electronX, electronY, 7, 0, 2 * Math.PI);
        context.fillStyle = "blue";
        context.fill();

        context.font = "20px Arial";
        context.fillStyle = "white";
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillText("-", electronX, electronY);
      }

      requestAnimationFrame(animate);
    };

    animate();
  }, [atoms]);

  const handleMinusClick = () => {
    if (atoms > 1) {
      setAtoms((prev) => prev - 1);
    }
  };

  const handlePlusClick = () => {
    setAtoms((prev) => prev + 1);
  };

  return (
    <>
      <canvas ref={canvasRef} width={500} height={500}></canvas>
      <h2>Модель атома Резерфорда</h2>
      <h3>Электронов: {atoms}</h3>
      <button onClick={handleMinusClick}>-</button>
      <button onClick={handlePlusClick}>+</button>
    </>
  );
};

export default Atom;
