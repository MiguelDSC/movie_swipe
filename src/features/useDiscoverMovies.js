import {discoverMovies} from "../services/tmdbService";

export const useDiscoverMovies = {
  async fetchMovies(page = 1) {
    try {   
        const data = await discoverMovies({ page });
        return Array.isArray(data?.results) ? data.results : [];
    } catch (e) {
        console.error('Failed to fetch movies:', e);
        return [];
    }
    }
};

