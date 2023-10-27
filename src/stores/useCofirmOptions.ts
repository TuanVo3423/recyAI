import { create } from "zustand";

type option = {
    question_id?: number;
    option_id?: number[];
    answers?: string;
};
export interface ConfirmStoreState {
    confirmOptions: option[];
    addconfirmOption: (optionItem: object) => void;
    clearOptions: () => void;
}

const useConfirmStore = create<ConfirmStoreState>((set, get) => ({
    confirmOptions: [],
    addconfirmOption: (optionItem: option) => {
        const index = get().confirmOptions.findIndex(
            (e: option) => e.question_id === optionItem.question_id
        );

        if (index !== -1) {
            get().confirmOptions[index].answers = optionItem.answers;
            get().confirmOptions[index].option_id = optionItem.option_id;
        } else {
            get().confirmOptions.push(optionItem);
        }
    },
    clearOptions: () => set({ confirmOptions: [] }),
}));
export default useConfirmStore;
