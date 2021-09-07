import getRefs from './services/getRefs';
import { fetchCountry } from './services/api-service';
import makeCountryMarkup from '../templates/country.hbs';
import { debounce } from 'lodash';
import makeCountrylist from '../templates/countrieslist.hbs';
import Handlebars from 'handlebars';

const refs = getRefs('#countries');

const getCountry = e => {
  e.preventDefault();
  const country = e.target.value;
  fetchCountry(country)
    .then(data => {
      if (data.length === 1) {
        return renderCountry(data[0]);
      }
      if (data.length >= 2 || data.length <= 10) {
        return renderCountriesList(data);
      }
    })
    .catch(handleError);
};
const renderCountriesList = data => {
  const markup = makeCountrylist(data, Handlebars);
  printResult(markup);
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
  printResult('', err.info);
};

const printResult = (result = '', err = '') => {
  refs.result.innerHTML = result;
  refs.errorRef.textContent = err;
};

refs.form.addEventListener('input', debounce(getCountry, 500));
