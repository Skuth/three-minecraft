import { Canvas } from "@react-three/fiber";
import { Sky } from "@react-three/drei";
import { Physics } from "@react-three/cannon";

import { FirstPersonView } from "./components/FirstPersonView";
import { Player } from "./components/Player";
import { Cubes } from "./components/Cubes";
import { Ground } from "./components/Ground";
import { TextureSelector } from "./components/TextureSelector";
import { Menu } from "./components/Menu";

function App() {
  return (
    <>
      <Canvas>
        <Sky sunPosition={[100, 100, 20]} />
        <ambientLight intensity={0.5} />
        <FirstPersonView />
        <Physics>
          <Player />
          <Cubes />
          <Ground />
        </Physics>
      </Canvas>

      <div className="absolute centered cursor">+</div>

      <Menu />
      <TextureSelector />
    </>
  );
}

export default App;
