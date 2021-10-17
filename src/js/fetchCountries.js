import axios from 'axios';

export default function fetchCountries(searchQuery) {
  const baseUrl = 'https://restcountries.com/v2/name/';
  const url = baseUrl + searchQuery;

  return axios.get(url).then(response => {
    if (response.status === 200) return response.data;
    throw new Error('Error fetching data');
  });
}
