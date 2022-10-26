import create from "zustand"
import { persist } from "zustand/middleware"

import { nanoid } from "nanoid"

type CubeType = {
  key: string
  pos: [
    x: number,
    y: number,
    z: number
  ]
  texture: string
}

interface useStoreInterface {
  texture: string
  cubes: CubeType[]

  findCubePos(x: number, y: number, z: number): CubeType | undefined
  addCube(x: number, y: number, z: number): void
  removeCube(x: number, y: number, z: number): void
  setTexture(texture: string): void
  resetWorld(): void
}

export const useStore = create(
  persist<useStoreInterface>(
    (set, get) => ({
      texture: "dirt",
      cubes: [],
    
      findCubePos(x, y, z) {
        const cube = get().cubes
        .find(cube => 
          cube.pos[0] === x &&
          cube.pos[1] === y &&
          cube.pos[2] === z
        )
    
          return cube
      },
    
      addCube: (x, y, z) => {
        const hasCube = !!get().findCubePos(x, y, z)
    
        if (hasCube) return
        
    
        set(state => ({
          ...state,
          cubes: [
            ...state.cubes,
            {
              key: nanoid(),
              pos: [x, y, z],
              texture: state.texture
            }
          ]
        }))
      },
      removeCube: (x, y, z) => {
        const cube = get().findCubePos(x, y, z)
    
        if (cube) {
          set(state => ({
            ...state,
            cubes: state.cubes.filter(item => item.key !== cube.key)
          }))
        }
      },
      setTexture: (texture) => {
        set(() => ({
          texture
        }))
      },
      resetWorld: () => {
        set(() => ({
          cubes: []
        }))
      }
    }),
    {
      name: "mine@cubes"
    }
  )
)