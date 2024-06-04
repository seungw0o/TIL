import { func } from "prop-types";
import { useState, useEffect } from "react";

function Hello() {
  function byFn() {
    console.log("bye");
  }
  function hiFn() {
    console.log("created");
    return byFn;
  }
  useEffect(() => {
    console.log("hi");
    return () => console.log("bye");
  }, []);
  useEffect(function () {
    console.log("hi");
    return function () {
      console.log("by");
    };
  }, []);
  return <h1>Hello</h1>;
}

function App() {
  const [Hide, setHide] = useState(false);
  const onClick = () => setHide(prev => !prev);
  return (
    <div>
      {Hide ? <Hello /> : null}
      <button onClick={onClick}>{Hide ? "Hide" : "Show"}</button>
    </div>
  );
}

export default App;
