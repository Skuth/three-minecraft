import { useEffect, useState, useCallback } from "react"

type KeyOptionsType =
| "KeyW"
| "KeyS"
| "KeyA"
| "KeyD"
| "Space"
| "Digit1"
| "Digit2"
| "Digit3"
| "Digit4"
| "Digit5"

const actionByKey = (key: KeyOptionsType) => {
  const keyActionMap = {
		KeyW: 'moveForward',
		KeyS: 'moveBackward',
		KeyA: 'moveLeft',
		KeyD: 'moveRight',
		Space: 'jump',
		Digit1: 'dirt',
		Digit2: 'grass',
		Digit3: 'glass',
		Digit4: 'wood',
		Digit5: 'log',
    ControlLeft: "sprint"
	}

  return keyActionMap[key]
}

export const useKeyboard = () => {
  const [actions, setActions] = useState({
    moveForward: false,
		moveBackward: false,
		moveLeft: false,
		moveRight: false,
		jump: false,
		dirt: false,
		grass: false,
		glass: false,
		wood: false,
		log: false,
    sprint: false
  })

  const handleKeyEvent = useCallback((event: KeyboardEvent, eventState = true) => {
    const action = actionByKey(event.code as any)

    if (action) {
      setActions(state => ({ ...state, [action]: eventState }))
    }
  }, [])

  useEffect(() => {
    document.addEventListener("keydown", e => handleKeyEvent(e, true))
    document.addEventListener("keyup", e => handleKeyEvent(e, false))

    return () => {
      document.removeEventListener("keydown", e => handleKeyEvent(e, true))
      document.removeEventListener("keyup", e => handleKeyEvent(e, false))
    }
  }, [handleKeyEvent])

  return actions
}