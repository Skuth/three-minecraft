import { useStore } from "../../hooks/useStore";

import { Cube } from "../Cube";

export const Cubes = () => {
  const cubes = useStore((state) => state.cubes)

  return (
    <>
      {cubes.map(cube => (
        <Cube key={cube.key} pos={cube.pos} texture={cube.texture} />
      ))}
    </>
  )
}