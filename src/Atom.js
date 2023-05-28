import React, { useEffect, useState, useRef } from "react";

const Atom = () => {
  const canvasRef = useRef(null);
  // Constants
  // Velocity = nH/2pi m r
  const nucleusRadius = 10;
  const electronRadius = 7;
  const [electronOrbitRadiusBase, setElectronOrbitRadiusBase] = useState(60);
  const electronVelocityBase = 0.017471538226884735;
  const [atoms, setAtoms] = useState(5);
  const [nucleusN, setNucleusN] = useState(6);
  const [nucleusP, setNucleusP] = useState(6);
  const x = [
    -1.9867252364160926, -1.2323251741127306, 22.050954388399962,
    -4.583487802569419, 2.7254209586275726, 16.506636504464993,
    -12.164545485947997, -1.7387415491454783, -11.030207113248236,
    14.005718664954381, 12.288456055805241, -5.6413455236196235,
    -1.1687169432860967, -7.061498781185121, 1.638584184282299,
    -8.328529827401548, 14.98523624739171, -13.397496959995731,
    5.292927902162148, -7.099667441740215,
  ];
  const y = [
    6.840956197356418, -0.3047433308610459, 8.880685867036803,
    -16.881953456086134, 1.2637399448720943, 16.406103177594687,
    -0.7673455264365747, -0.7687072272109463, 16.606235331887298,
    -1.7604273218727207, -4.292120280097256, 3.559598615383186,
    1.3186326935187398, -7.688268622928746, -0.8724799124334548,
    8.29307082878003, 14.292995480347681, 6.645976187099468, -7.625956616984553,
    12.741849026823754,
  ];
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    setElectronOrbitRadiusBase((prev) => 60);
    // n - number of orbiter
    // r - orbiter radius
    // const calculateVelocity = () => {
    //   const electronMass = 9.10938356; //-31; // kilograms
    //   // Plank const
    //   const h = 1;
    //   let res = (n * h) / (2 * Math.PI * electronMass * r);
    //   console.log(res);
    //   return res;
    // };

    const calculateRadius = (n) => {
      return electronOrbitRadiusBase + 20 * Math.floor(n / 3);
    };

    // Animation loop
    const animate = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);

      for (let index = 0; index < nucleusN; index++) {
        // Draw nucleusN
        context.setLineDash([]);
        context.beginPath();
        context.arc(
          centerX + x[index],
          centerY + y[index],
          nucleusRadius,
          0,
          2 * Math.PI
        );
        context.fillStyle = "red";
        context.fill();
      }
      for (let index = 0; index < nucleusP; index++) {
        // Draw nucleusP
        context.setLineDash([]);
        context.beginPath();
        context.arc(
          centerX + x[x.length - index],
          centerY + y[x.length - index],
          nucleusRadius,
          0,
          2 * Math.PI
        );

        context.fillStyle = "grey";
        context.fill();
      }

      for (let index = 1; index <= atoms; index++) {
        // Draw dashed orbit
        context.setLineDash([5, 5]);
        context.beginPath();
        context.arc(centerX, centerY, calculateRadius(index), 0, 2 * Math.PI);
        context.strokeStyle = "gray";
        context.stroke();

        // Calculate electron position
        const angle =
          (new Date().getTime() * // FIX POSITION
            electronVelocityBase *
            (1 + Math.floor(index / 3))) /
            calculateRadius(index) +
          (index * (2 * Math.PI * calculateRadius(index))) / 3;
        const electronX = centerX + Math.cos(angle) * calculateRadius(index);
        const electronY = centerY + Math.sin(angle) * calculateRadius(index);

        // Draw electron
        context.beginPath();
        context.arc(electronX, electronY, electronRadius, 0, 2 * Math.PI);
        context.fillStyle = "blue";
        context.fill();

        // Draw minus (-) sign on the electron
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
  const test = () => {
    let x = [];
    let y = [];
    for (let index = 0; index < 20; index++) {
      x.push((Math.random() - Math.random()) * 25);
      y.push((Math.random() - Math.random()) * 25);
    }
  };
  return (
    <>
      <canvas ref={canvasRef} width={1000} height={500}></canvas>
      <h2>Модель атома Бора</h2>
      <h3>Электронов: {atoms}</h3>
      <button onClick={handleMinusClick}>-</button>
      <button onClick={handlePlusClick}>+</button>
      {/* <button onClick={test}>CLICK</button> */}
    </>
  );
};

export default Atom;
