import { useEffect, useState } from "react";
import socket from "../socket";

function Counter() {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    function onRequestCounter() {
      socket.emit("counter-value", counter);
    }

    socket.on("request-counter", onRequestCounter);

    return () => {
      socket.off("request-counter", onRequestCounter);
    };
  }, [counter]);

  return (
    <div>
      <h1>Counter: {counter}</h1>
      <button onClick={() => setCounter(counter + 1)}>Increment</button>
    </div>
  );
}

export default Counter;
