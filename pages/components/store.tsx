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
    price: '',
    updatePrice: (newPrice: string) => {
        set({ price: newPrice})
    }
 }));
