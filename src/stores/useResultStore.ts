import { create } from "zustand";

export interface ResultStoreState {
    result: object;
    setResult: (result: object) => void;
}

const useResultStore = create<ResultStoreState>((set, get) => ({
    result: {},
    setResult: (result) => set({ result }),
}));
export default useResultStore;
