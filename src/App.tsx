import Cosmos from "./components/Cosmos";
import WebGLError from "./components/WebGLError";

const available = () => {
  const canvas = document.createElement("canvas");
  const available = canvas.getContext("webgl2");
  canvas.remove();
  return available;
};

function App() {
  return <>{available() ? <Cosmos /> : <WebGLError />}</>;
}

export default App;
