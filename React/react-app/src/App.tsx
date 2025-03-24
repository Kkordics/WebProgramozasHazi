import { useState } from "react";
import "./App.css";

function NumberGenerator() {
  const [number, setNumber] = useState<number>(0);

  const generateNumber = () => {
    setNumber(Math.floor(Math.random() * 1000));
  };

  return (
    <div className="container">
      <h2 className="title">Szám Generátor</h2>
      <p className="text">Generált szám: {number}</p>
      <button className="button" onClick={generateNumber}>
        Generálj számot
      </button>
    </div>
  );
}

function ColorPicker() {
  const [color, setColor] = useState<string>("#ffffff");

  return (
    <div className="container" style={{ backgroundColor: color }}>
      <h3 className="click">Kattins a szürke négyzetbe!</h3>
      <input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        className="color-picker"
      />
      <p className="text">Kiválasztott szín: {color}</p>
    </div>
  );
}

export default function App() {
  const [menu, setMenu] = useState<"number" | "color">("number");

  return (
    <div className="app">
      <nav className="nav">
        <button className="button" onClick={() => setMenu("number")}>
          Szám Generátor
        </button>
        <button className="button" onClick={() => setMenu("color")}>
          Színválasztó
        </button>
      </nav>
      <div className="content">
        {menu === "number" ? <NumberGenerator /> : <ColorPicker />}
      </div>
    </div>
  );
}
