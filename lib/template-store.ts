"use client";

import { create } from "zustand";

type PricingFilter = "all" | "free" | "premium";

type FilterStore = {
  query: string;
  category: string;
  technology: string;
  pricing: PricingFilter;
  setQuery: (value: string) => void;
  setCategory: (value: string) => void;
  setTechnology: (value: string) => void;
  setPricing: (value: PricingFilter) => void;
  reset: () => void;
};

const defaultState = {
  query: "",
  category: "All",
  technology: "All",
  pricing: "all" as PricingFilter
};

export const useTemplateFilterStore = create<FilterStore>((set) => ({
  ...defaultState,
  setQuery: (query) => set({ query }),
  setCategory: (category) => set({ category }),
  setTechnology: (technology) => set({ technology }),
  setPricing: (pricing) => set({ pricing }),
  reset: () => set(defaultState)
}));
