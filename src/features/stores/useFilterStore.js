import { defineStore } from "pinia";
import { view_modes } from "../../shared/constants";
import { filters } from "../../shared/filters";

export const useFilterStore = defineStore("filter", {
  state: () => {
    return {
      activeViewMode: view_modes.CardView,
      filters: filters,
      activeFilter: null,
    };
  },
  getters: {
    getActiveViewMode: (state) => {
      return state.activeViewMode;
    },
    getFilters: (state) => {
      return state.filters;
    },
    getActiveFilterName: (state) => {
      return (
        state.filters.find((f) => f.id === state.activeFilter?.id)?.name ||
        "All"
      );
    },
  },
  actions: {
    setActiveViewMode(viewMode) {
      this.activeViewMode = viewMode;
    },
    setActiveFilter(filter) {
      this.activeFilter = filter;
    },
  },
});
