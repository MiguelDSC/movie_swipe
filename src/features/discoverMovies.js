import { discoverMovies } from "../services/tmdbService";



export async function fetchMovies(page = 1) {
    try {
        const data = await discoverMovies({ page });
        return data.results;
    } catch (e) {
        console.error('Error fetching movies:', e);
        throw e;

    }
}
