import axios from 'axios';
import { alert, error } from '@pnotify/core/dist/PNotify.js';
import { defaults } from '@pnotify/core';

defaults.delay = 2000;

export default function fetchCountries(searchQuery) {
  const baseUrl = 'https://restcountries.com/v2/name/';
  const url = baseUrl + searchQuery;

  return axios.get(url).then(result => {
    result.status !== 200 && error({ text: "Error! Data wasn't received" });
    result.data.status === 404 &&
      error({
        text: 'There are no countries founded by your search query',
      });
    return result.data;
  });
}
