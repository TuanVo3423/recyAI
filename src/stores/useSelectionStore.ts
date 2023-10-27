import { create } from "zustand";

export interface SelectionStoreState {
    category: string | undefined | number;
    setCategory: (category: string) => void;

    options: number[];
    addOption: (option: number) => void;
    addOptions: (options: number[]) => void;
    updateOptions: (options: number[]) => void;
    removeOption: (option: number) => void;
    // removeBackOptions: (updateNumberBack: number) => void;
    clearOptions: () => void;

    // numberBack: number;
    // updateNumberBack: (data: number) => void;
    // optionsHistory: object[];
    // addHistory: (history: object[]) => void;
    // removeHistory: () => void;
}

const useSelectionStore = create<SelectionStoreState>((set, get) => ({
    category: undefined,
    setCategory: (category) => set({ category }),

    options: [],
    addOption: (option) => set({ options: [...get().options, option] }),
    addOptions: (options) => set({ options: [...get().options, ...options] }),
    // removeBackOptions: (updateNumberBack) => {
    //     get().options.splice(-updateNumberBack, updateNumberBack);
    // },
    updateOptions: (options) => set({ options: options }),
    removeOption: (optionId) =>
        set({ options: get().options.filter((id) => id !== optionId) }),
    clearOptions: () => set({ options: [] }),

    // numberBack: 0,
    // updateNumberBack: (data) => set({ numberBack: data }),

    // optionsHistory : [],
    // addHistory : (history) => set({ optionsHistory: [...get().optionsHistory, history] }),
    // removeHistory : () => set({ optionsHistory: get().optionsHistory.slice(0,-1) }),
}));

export default useSelectionStore;
