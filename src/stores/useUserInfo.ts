import { create } from "zustand";

export interface USerStoreState {
    UserInfo: object;
    selectionID: number[];
    setSelectionID: (selectionIDs: number[]) => void;
    setUserInfo: (user: object) => void;
}

const useUSerStoreState = create<USerStoreState>((set, get) => ({
    selectionID: [],
    UserInfo: {},
    setSelectionID: (selectionID) => set({ selectionID }),
    setUserInfo: (user: object) => set({ UserInfo: user }),
}));
export default useUSerStoreState;
