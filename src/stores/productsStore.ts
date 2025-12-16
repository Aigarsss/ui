import { create } from "zustand";

interface ProductsStoreState {
	appliedFilters: string[];
	appliedLayout: "list" | "grid";
	actions: {
		setAppliedFilters: (filters: string[]) => void;
		setAppliedLayout: (appliedLayout: "list" | "grid") => void;
	};
}

const useProductsStore = create<ProductsStoreState>()((set) => ({
	appliedFilters: [],
	appliedLayout: "list",
	actions: {
		setAppliedFilters: (appliedFilters: string[]) => set({ appliedFilters }),
		setAppliedLayout: (appliedLayout: "list" | "grid") =>
			set({ appliedLayout }),
	},
}));

export const useAppliedFilters = () =>
	useProductsStore((state) => state.appliedFilters);
export const useAppliedLayout = () =>
	useProductsStore((state) => state.appliedLayout);
export const useProductsStoreActions = () =>
	useProductsStore.getState().actions;
