import { useStore } from "../../hooks/useStore"

export const Menu = () => {
  const resetWorld = useStore(state => state.resetWorld)

  const handleButtonClick = () => {
    resetWorld()
  }

  return (
    <div className="absolute top">
      <button
        onClick={handleButtonClick}
      >
        New World
      </button>
    </div>
  )
}