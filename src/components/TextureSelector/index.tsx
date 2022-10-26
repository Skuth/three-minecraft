import { useState, useEffect, useMemo } from "react"

import * as texturesImages from "../../assets/images/textures"
import { useKeyboard } from "../../hooks/useKeyboard"
import { useStore } from "../../hooks/useStore"

export const TextureSelector = () => {
  const [visible, setVisible] = useState(true)

  const activeTexture = useStore(state => state.texture)
  const setTexture = useStore(state => state.setTexture)

  const { dirt, grass, glass, wood, log } = useKeyboard()

  const activeTextureKey = Object.keys(texturesImages)
    .find(item => item.startsWith(activeTexture)) ?? "dirtTexture"
  
  const activeTextureImage = texturesImages[activeTextureKey as keyof typeof texturesImages].image

  const textures = useMemo(() => ({
    dirt,
    grass,
    glass,
    wood,
    log
  }), [dirt, grass, glass, wood, log])

  useEffect(() => {
    const pressedTexture = Object.entries(textures).find(([_, v]) => v)

    if (pressedTexture) {
      setTexture(pressedTexture[0])
    }
  }, [setTexture, textures])


  useEffect(() => {
    setVisible(false)

    const visibilityTimeout = setTimeout(() => {
      setVisible(false)
    }, 1000 * 2)

    setVisible(true)

    return () => {
      clearTimeout(visibilityTimeout)
    }
  }, [activeTexture])


  return visible ? (
    <div
      className="absolute block fadeInUp"
    >
      {activeTextureImage && (
        <img src={activeTextureImage.src} width={48} height={48} alt={activeTexture} />
      )}
    </div>
  ) : <></>
}