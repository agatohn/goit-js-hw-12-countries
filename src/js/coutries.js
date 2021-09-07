import getRefs from './services/getRefs';
import { fetchCountry } from './services/api-service';
import makeCountryMarkup from '../templates/country.hbs';
import { debounce } from 'lodash';
import makeCountrylist from '../templates/countries_list.hbs';
import Handlebars from 'handlebars';
import { error } from '@pnotify/core';

const refs = getRefs('#countries');

const printResult = (result = '', err = '') => {
  refs.result.innerHTML = result;
  refs.errorRef.textContent = err;
};

const getCountry = e => {
  e.preventDefault();
  const country = e.target.value;
  fetchCountry(country)
    .then(data => {
      if (data.length === 1) {
        return renderCountry(data[0]);
      }
      if (data.length >= 2 && data.length <= 10) {
        return renderCountriesList(data);
      }
      if (data.length > 10) {
        printResult('', '');
        return error({
          delay: '4000',
          text: 'Too many matches found. Please enter a more specific query!',
        });
      }
      if (data.status === 404) {
        printResult('', '');
        return error({
          delay: '4000',
          text: 'Error 404! No such country for your query!',
        });
      }
    })
    .catch(handleError);
};
const renderCountriesList = data => {
  printResult('', '');
  refs.result.insertAdjacentHTML('beforeend', makeCountrylist(data, Handlebars));
};

const renderCountry = ({ name, capital, population, languages, flag }) => {
  const preparedData = {
    country: name,
    capital: capital,
    population: population,
    icon: flag,
    languages: languages[0].name,
  };

  const markup = makeCountryMarkup(preparedData, Handlebars);
  printResult(markup);
};

const handleError = err => {
  printResult('', err.status);
};

refs.form.addEventListener('input', debounce(getCountry, 500));
