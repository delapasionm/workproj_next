import create from "zustand";
import { Order } from "./Order";

interface OrderState {
    orders : Order[];
    addOrders : (titolo : string, prezzo : number) => void;
    removeOrder : (id : number) => void;
    card : boolean;
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
    updateCard: (newCard: boolean) => {
       set({ card: newCard })
    },
 }));
