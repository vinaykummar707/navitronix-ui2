import { create } from "zustand";

type TestingFormStore = {
  input: string;
  radio: string;
  setForm: (partial: Partial<Pick<TestingFormStore, "input" | "radio">>) => void;
  setInput: (value: string) => void;
  setRadio: (value: string) => void;
  reset: () => void;
};

const initialState = {
  input: "",
  radio: "write",
};

const useTestingFormStore = create<TestingFormStore>((set) => ({
  ...initialState,
  setForm: (partial) => set((state) => ({ ...state, ...partial })),
  setInput: (value) => set({ input: value }),
  setRadio: (value) => set({ radio: value }),
  reset: () => set(initialState),
}));

export default useTestingFormStore;