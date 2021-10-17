import './sass/main.scss';
import '@pnotify/core/dist/BrightTheme.css';
import debounce from 'lodash.debounce';
import countryListTemplate from './templates/country-list.hbs';
import countryInfoTemplate from './templates/country-info.hbs';
import refs from './js/refs';
import fetchCountries from './js/fetchCountries';

const { input } = refs;
input.addEventListener(
  'input',
  debounce(() => {
    onInput();
  }, 500),
);

function onInput() {
  const inputValue = input.value;
  fetchCountries(inputValue)
    .then(result => console.log(result.length))
    .catch(err => console.error(err));
}
