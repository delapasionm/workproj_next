import create from "zustand";
import { Order } from "./Order";

interface OrderState {
    orders : Order[];
    addOrders : (titolo : string, prezzo : number) => void;
    removeOrder : (id : number) => void;
    card : boolean;
    updateCard: (newCard : boolean) => void;
    prezzo : number;
    addPrezzo : (newPrezzo : number) => void;
    subPrezzo : (newPrezzo : number) => void;
}

export const useStore = create<OrderState>((set) => ({
    orders: [],
    addOrders: (titolo : string, prezzo : number) => {
        set((state) => ({
            orders: [
                ...state.orders,
                {
                    id : Math.floor(Math.random() * 100),
                    titolo,
                    prezzo,
                } as Order,
            ],
        }));
    },
    removeOrder: (id) => {
        set((state) => ({
            orders : state.orders.filter((order) => order.id !== id),
        }));
    },
    card: false,
    updateCard: (newCard : boolean) => set({ card : newCard }),
    prezzo : 0,
    addPrezzo : (newPrezzo : number) => set(state => ({ prezzo : state.prezzo + newPrezzo })),
    subPrezzo : (newPrezzo : number) => set(state => ({ prezzo : state.prezzo - newPrezzo})),
 }));
