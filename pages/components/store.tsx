import create from "zustand";
import { Order } from "./Order";

interface OrderState {
    orders : Order[];
    addOrders : (titolo : string, prezzo : number) => void;
    removeOrder : (id : number) => void;
    clearOrders : () => void;
    newOrders : Order[];
    copyOrders : (titolo : string, prezzo : number) => void;
    removeNewOrder : (id : number) => void;
    add : boolean;
    setAdd : (newAdd : boolean) => void;
    card : boolean;
    updateCard: (newCard : boolean) => void;
    prezzo : number;
    addPrezzo : (newPrezzo : number) => void;
    subPrezzo : (newPrezzo : number) => void;
    clearPrezzo : () => void;
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
    clearOrders: () => set({ orders : [] }),
    newOrders: [],
    copyOrders: (titolo : string, prezzo : number) => {
        set((state) => ({
            newOrders: [
                ...state.newOrders,
                {
                    id : Math.floor(Math.random() * 100),
                    titolo,
                    prezzo,
                } as Order,
            ],
        }));
    },
    removeNewOrder:  (id) => {
        set((state) => ({
            newOrders : state.newOrders.filter((newOrder) => newOrder.id !== id),
        }));
    },
    add : false,
    setAdd : (newAdd : boolean) => set({ add : newAdd }),
    card: false,
    updateCard: (newCard : boolean) => set({ card : newCard }),
    prezzo : 0,
    addPrezzo : (newPrezzo : number) => set(state => ({ prezzo : state.prezzo + newPrezzo })),
    subPrezzo : (newPrezzo : number) => set(state => ({ prezzo : state.prezzo - newPrezzo})),
    clearPrezzo : () => set({ prezzo : 0 }),
 }));
