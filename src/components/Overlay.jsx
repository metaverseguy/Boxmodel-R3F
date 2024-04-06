import { motion, AnimatePresence } from 'framer-motion'
import { useStore } from '../serve/store'

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
  const store = useStore()
  return (
    <div className="customizer">
      <div className="color-options">
        {store.colors.map((color) => (
          <div
            key={color}
            className={`circle`}
            style={{ background: color, transform: `scale(${store.color === color ? 1.2 : 1})` }}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              const boxID = store.boxs.findIndex((item) => item.id === store.selectedID)
              if (boxID > -1) store.setBoxColor(boxID, color)
            }}></div>
        ))}
      </div>
      <div className="button-options">
        <button
          className="button"
          onClick={() => {
            store.addboxs({ color: store.color, pos: 0, id: store.lastIndex })
            store.setlastIndex(store.lastIndex + 1)
          }}>
          Add
        </button>
        <button
          className="button"
          style={{ background: '#e00011' }}
          onClick={() => {
            if (store.selectedID > -1) store.delboxs(store.selectedID)
          }}>
          Delete
        </button>
      </div>
    </div>
  )
}
