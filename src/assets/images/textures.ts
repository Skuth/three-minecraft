import { NearestFilter, RepeatWrapping, TextureLoader } from "three"

import { dirt, grass, glass, log, wood } from "./images"

const dirtTexture = new TextureLoader().load(dirt)
const groundTexture = new TextureLoader().load(grass)
const grassTexture = new TextureLoader().load(grass)
const glassTexture = new TextureLoader().load(glass)
const logTexture = new TextureLoader().load(log)
const woodTexture = new TextureLoader().load(wood)

dirtTexture.magFilter = NearestFilter
groundTexture.magFilter = NearestFilter
grassTexture.magFilter = NearestFilter
glassTexture.magFilter = NearestFilter
logTexture.magFilter = NearestFilter
woodTexture.magFilter = NearestFilter

groundTexture.wrapS = RepeatWrapping
  groundTexture.wrapT = RepeatWrapping

export {
  dirtTexture,
  groundTexture,
  grassTexture,
  glassTexture,
  logTexture,
  woodTexture
}