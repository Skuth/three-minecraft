import { useBox } from "@react-three/cannon"
import { ThreeEvent } from "@react-three/fiber"
import { BufferGeometry, Material, Mesh } from "three"
import * as textures from "../../assets/images/textures"

import { useStore } from "../../hooks/useStore"

interface CubeInterface {
  pos: [
    x: number,
    y: number,
    z: number
  ]
  texture: string
}

export const Cube = ({
  pos,
  texture
}: CubeInterface) => {
  const addCube = useStore(state => state.addCube)
  const removeCube = useStore(state => state.removeCube)

  const [ref] = useBox<Mesh<BufferGeometry, Material | Material[]>>(() => ({
    type: "Static",
    position: pos
  }))

  const activeTextureKey = Object.keys(textures)
    .find(item => item.startsWith(texture)) ?? "dirtTexture"
  
  const activeTexture = textures[activeTextureKey as keyof typeof textures]

  const handleMeshClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation()

    const clickedFace = Math.floor((e.faceIndex as number) / 2)

    const { x, y, z } = ref.current!.position

    if (e.nativeEvent.shiftKey) {
      removeCube(x, y, z)
      return
    }
    
    if (clickedFace === 0) {
      addCube(x + 1, y, z)
    }
    if (clickedFace === 1) {
      addCube(x - 1, y, z)
    }

    if (clickedFace === 2) {
      addCube(x, y + 1, z)
    }
    if (clickedFace === 3) {
      addCube(x, y - 1, z)
    }

    if (clickedFace === 4) {
      addCube(x, y, z + 1)
    }
    if (clickedFace === 5) {
      addCube(x, y, z - 1)
    }
  }

  return (
    <mesh
      ref={ref}
      onClick={handleMeshClick}
    >
      <boxBufferGeometry
        attach="geometry"
      />
      <meshStandardMaterial
        attach="material"
        map={activeTexture}
      />
    </mesh>
  )
}