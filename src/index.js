import './sass/main.scss';
import '@pnotify/core/dist/BrightTheme.css';
import debounce from 'lodash.debounce';
import { alert, error } from '@pnotify/core/dist/PNotify.js';
import { defaults } from '@pnotify/core';
import countryListTemplate from './templates/country-list.hbs';
import countryInfoTemplate from './templates/country-info.hbs';
import refs from './js/refs';
import fetchCountries from './js/fetchCountries';

const DEBOUNCE_DELAY = 500;
const SHOW_MESSAGE_DELAY = 1000;

defaults.delay = SHOW_MESSAGE_DELAY;
const { input, container } = refs;

input.addEventListener(
  'input',
  debounce(() => {
    onInput();
  }, DEBOUNCE_DELAY),
);

function onInput() {
  insertMarkup(''); // Clear markup before fetching new data

  const inputValue = input.value;

  if (inputValue.trim() === '') {
    alert({ text: 'Please, enter some country name.' });
    return;
  }

  fetchCountries(inputValue)
    .then(result => {
      if (result.status === 404) {
        error({
          text: 'No results match your search.',
        });
        return;
      }

      if (result.length > 10) {
        error({ text: 'Too many matches found. Please enter a more specific query!' });
        return;
      }

      if (result.length > 1) {
        insertMarkup(countryListTemplate(result));
        return;
      }

      insertMarkup(countryInfoTemplate(result[0]));
    })
    .catch(err => console.error(err));
}

function insertMarkup(markup) {
  container.innerHTML = markup;
}
