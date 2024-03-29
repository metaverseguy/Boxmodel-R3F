import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "../serve/store";

export function Overlay() {
  const transition = { type: "spring", duration: 0.8 };
  const config = {
    initial: { x: -100, opacity: 0, transition: { ...transition, delay: 0.5 } },
    animate: { x: 0, opacity: 1, transition: { ...transition, delay: 0 } },
    exit: { x: -100, opacity: 0, transition: { ...transition, delay: 0 } },
  };
  return (
    <div>
      <AnimatePresence>
        <motion.section key="custom" {...config}>
          <Customizer />
        </motion.section>
      </AnimatePresence>
    </div>
  );
}

function Customizer() {
  const store = useStore();
  return (
    <div className="customizer">
      <div className="color-options">
        {store.colors.map((color) => (
          <div
            key={color}
            className={`circle`}
            style={{
              background: color,
              transform: `scale(${store.color === color ? 1.2 : 1})`,
            }}
            onClick={() => {
              const boxID = store.boxs.findIndex(
                (item) => item.id === store.selected_id
              );
              if (boxID > -1) {
                store.setBoxColor(boxID, color);
                store.setColor(color);
              }
            }}
          ></div>
        ))}
      </div>
      <div className="button-options">
        <button
          className="button"
          onClick={() => {
            store.addBoxs({
              color: store.color,
              pos: 0,
              id: store.last_index,
              scale: 0,
            });
            store.setLastIndex(store.last_index + 1);
          }}
        >
          Add
        </button>
        <button
          className="button"
          style={{ background: "#e00011" }}
          onClick={() => {
            if (store.selected_id > -1) store.delBoxs(store.selected_id);
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
