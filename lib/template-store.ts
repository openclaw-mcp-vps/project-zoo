"use client";

import { create } from "zustand";
import type { TemplateDifficulty, TemplateLicense } from "@/types/template";

interface TemplateFilterState {
  search: string;
  stack: string;
  difficulty: "all" | TemplateDifficulty;
  license: "all" | TemplateLicense;
  setSearch: (value: string) => void;
  setStack: (value: string) => void;
  setDifficulty: (value: "all" | TemplateDifficulty) => void;
  setLicense: (value: "all" | TemplateLicense) => void;
  resetFilters: () => void;
}

const initialState = {
  search: "",
  stack: "all",
  difficulty: "all" as const,
  license: "all" as const
};

export const useTemplateFilters = create<TemplateFilterState>((set) => ({
  ...initialState,
  setSearch: (value) => set({ search: value }),
  setStack: (value) => set({ stack: value }),
  setDifficulty: (value) => set({ difficulty: value }),
  setLicense: (value) => set({ license: value }),
  resetFilters: () => set(initialState)
}));
