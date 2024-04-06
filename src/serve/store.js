import { create } from 'zustand'

export const useStore = create((set) => ({
  colors: ['#EAEAEA', '#EFBD4E', '#80C670', '#726DE8', '#EF674E', '#353934'],
  color: '#EFBD4E',
  boxs: [{ color: '#EFBD4E', pos: 0.1, id: 0, scale: 0.3 }],
  selectedID: -1,
  lastIndex: 1,
  addboxs: (newboxs) => set((state) => ({ boxs: [...state.boxs, newboxs] })),
  delboxs: (selectedID) => set((state) => ({ boxs: state.boxs.filter((item) => item.id !== selectedID) })),
  setBoxColor: (boxIndex, newColor) =>
    set((state) => {
      const box = state.boxs[boxIndex]
      const updatedBoxs = [...state.boxs]
      updatedBoxs[boxIndex] = { ...box, color: newColor }
      return { boxs: updatedBoxs }
    }),
  setlastIndex: (newlastIndex) => set(() => ({ lastIndex: newlastIndex })),
  setselectedID: (newselectedID) => set(() => ({ selectedID: newselectedID }))
}))
