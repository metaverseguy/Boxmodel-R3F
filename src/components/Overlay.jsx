import { motion, AnimatePresence } from 'framer-motion'
import { useSnapshot } from 'valtio'
import { state } from '../serve/store'

export function Overlay() {
  const transition = { type: 'spring', duration: 0.8 }
  const config = {
    initial: { x: -100, opacity: 0, transition: { ...transition, delay: 0.5 } },
    animate: { x: 0, opacity: 1, transition: { ...transition, delay: 0 } },
    exit: { x: -100, opacity: 0, transition: { ...transition, delay: 0 } }
  }
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
      <AnimatePresence>
        <motion.section key="custom" {...config}>
          <Customizer />
        </motion.section>
      </AnimatePresence>
    </div>
  )
}

function Customizer() {
  const snap = useSnapshot(state)
  return (
    <div className="customizer">
      <div className="color-options">
        {snap.colors.map((color) => (
          <div
            key={color}
            className={`circle`}
            style={{ background: color, transform: `scale(${state.color === color ? 1.2 : 1})` }}
            onClick={() => {
              const boxID = state.boxs.findIndex((item) => item.id === state.selectedID)
              if (boxID > -1) state.boxs[boxID].color = color
            }}></div>
        ))}
      </div>
      <div className="button-options">
        <button
          className="button"
          onClick={() => {
            state.boxs = [...state.boxs, { color: state.color, pos: 0, id: state.lastIndex }]
            state.lastIndex = state.lastIndex + 1
          }}>
          Add
        </button>
        <button
          className="button"
          style={{ background: '#e00011' }}
          onClick={() => {
            if (state.selectedID > -1) state.boxs = state.boxs.filter((item) => item.id !== state.selectedID)
            console.log(state.boxs)
          }}>
          Delete
        </button>
      </div>
    </div>
  )
}
