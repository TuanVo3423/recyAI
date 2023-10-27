import { create } from "zustand";

export interface UserStoriesStoreState {
    userStories: object[];
    flag: boolean;
    setUserStories: (todos: object[]) => void;
    updateTodos: (todo: object) => void;
    setFlag: (flag: boolean) => void;
}

const useUserStoriesStore = create<UserStoriesStoreState>((set, get) => ({
    userStories: [],
    flag: false,
    setUserStories: (userStories: object[]) => set({ userStories }),
    updateTodos: (todo: object) => {},
    setFlag: (flag: boolean) => set({ flag }),
}));
export default useUserStoriesStore;
