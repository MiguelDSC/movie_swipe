import apiClient from './apiClient';

const defaultDiscoverParams = {
  include_adult: false,
  include_video: false,
  language: 'en-US',
  sort_by: 'popularity.desc',
};

export async function discoverMovies({ page = 1, ...overrides } = {}) {
  const params = { ...defaultDiscoverParams, page, ...overrides };
  const data = await apiClient.get('/discover/movie', { params });
  return data;
}

export async function getMovieDetails(id, { language = 'en-US' } = {}) {
  if (!id) throw new Error('Movie id is required');
  return apiClient.get(`/movie/${id}`, { params: { language } });
}
