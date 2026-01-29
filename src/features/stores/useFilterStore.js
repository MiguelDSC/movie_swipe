import { defineStore } from "pinia";

import { filters } from "../../shared/filters";

export const useFilterStore = defineStore("filter", {
  state: () => {
    return {
      filters: filters,
      activeFilter: null,
    };
  },
  getters: {
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
    setActiveFilter(filter) {
      this.activeFilter = filter;
    },
  },
});
