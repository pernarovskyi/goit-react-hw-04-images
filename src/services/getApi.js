import axios from 'axios';

export const getPictures = async (query, page) => {
  const BASE_URL = 'https://pixabay.com/api';
  const API_KEY = '25354007-4da20173cd76d61434be87abf';
  const OPTIONS = `key=${API_KEY}&q=${query}&page=${page}&image_type=photo&orientation=horizontal&per_page=12`;

  const response = await axios.get(`${BASE_URL}/?${OPTIONS}`);

  return response.data;
};
