import axios from 'axios';

export default async function fetchCountries(searchQuery) {
  const BASE_URL = 'https://restcountries.com/v2/name/';
  const url = BASE_URL + searchQuery;

  const response = await axios.get(url);
  if (response.status === 200) return response.data;
  throw new Error('Error fetching data');
}
