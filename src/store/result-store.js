import { createStore } from "zustand/vanilla";
import { persist } from "zustand/middleware";
import { useStore } from "zustand";

export const resultStore = createStore(
  persist(
    (set) => ({
      selectedTech: "",
      generatedResult: [],
      setSelectedTech: (tech) => set({ selectedTech: tech }),
      setGeneratedResult: (details) => set({ generatedResult: details }),
    }),
    {
      name: "result-storage", // The key in localStorage (or chosen storage)
    }
  )
);

export const useResultStore = (selector) => useStore(resultStore, selector);
