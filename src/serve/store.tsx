import { create } from "zustand";

interface Box {
  color: string;
  pos: number;
  id: number;
  scale: number;
}

type StoreState = {
  colors: string[];
  color: string;
  boxs: Box[];
  selected_id: number;
  last_index: number;
  addBoxs: (newbox: Box) => void;
  delBoxs: (selected_id: number) => void;
  setColor: (newcolor: string) => void;
  setBoxColor: (boxIndex: number, newColor: string) => void;
  setLastIndex: (newlastIndex: number) => void;
  setSelectedId: (newselectedID: number) => void;
};

export const useStore = create<StoreState>((set) => ({
  colors: ["#EAEAEA", "#EFBD4E", "#80C670", "#726DE8", "#EF674E", "#353934"],
  color: "#EFBD4E",
  boxs: [{ color: "#EFBD4E", pos: 0.1, id: 0, scale: 0.3 }],
  selected_id: -1,
  last_index: 1,
  addBoxs: (newbox) => set((state) => ({ boxs: [...state.boxs, newbox] })),
  delBoxs: (selected_id) =>
    set((state) => ({
      boxs: state.boxs.filter((item) => item.id !== selected_id),
    })),
  setColor: (newcolor) => set(() => ({ color: newcolor })),
  setBoxColor: (boxIndex, newColor) =>
    set((state) => {
      const box = state.boxs[boxIndex];
      const updatedBoxs = [...state.boxs];
      updatedBoxs[boxIndex] = { ...box, color: newColor };
      return { boxs: updatedBoxs };
    }),
  setLastIndex: (newLastIndex) => set(() => ({ last_index: newLastIndex })),
  setSelectedId: (newSelectedID) => set(() => ({ selected_id: newSelectedID })),
}));
