import React from "react";
import Atom from "./Atom";
import AtomR from "./AtomR";

const App = () => {
  return (
    <div>
      <Atom />
      <div style={{ marginTop: 100 }}>
        <AtomR />
      </div>
    </div>
  );
};

export default App;
