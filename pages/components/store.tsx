import create from "zustand";

export const useStore = create(set => ({
    card: false,
    updateCard: (newCard: boolean) => {
       set({ card: newCard })
    },
    title: '',
    updateTitle: (newTitle: string) => {
        set({ title: newTitle })
    },
    price: 0,
    updatePrice: (newPrice: number) => {
        set({ price: newPrice})
    },
    addPrice: () => set((state: any) => ({price: state.price + state.price})),
    subPrice: () => set((state: any) => ({price: state.price - state.price })),
 }));
