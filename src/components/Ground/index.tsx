import { usePlane } from "@react-three/cannon"
import { ThreeEvent } from "@react-three/fiber"
import { BufferGeometry, Material, Mesh } from "three"
import { groundTexture } from "../../assets/images/textures"
import { useStore } from "../../hooks/useStore"

export const Ground = () => {
  const addCube = useStore(state => state.addCube)
  // const removeCube = useStore(state => state.removeCube)

  const [ref] = usePlane<Mesh<BufferGeometry, Material | Material[]>>(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, -0.5, 0],
  }))

  groundTexture.repeat.set(100, 100)

  const handleMeshClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation()

    const [x, y, z] = Object.values(e.point).map(val => Math.ceil(val))
    addCube(x, y, z)
  }

  return (
    <mesh
      ref={ref}
      onClick={handleMeshClick}
    >
      <planeBufferGeometry
        attach="geometry"
        args={[100, 100]}
      />
      <meshStandardMaterial
        attach="material"
        map={groundTexture}
      />
    </mesh>
  )
}