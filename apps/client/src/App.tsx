import { useEffect } from "react";
import Counter from "./components/Counter";
import socket from "./socket";

function App() {
  useEffect(() => {
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);
  return <Counter />;
}

export default App;
