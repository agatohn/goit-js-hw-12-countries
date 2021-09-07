import getRefs from './services/getRefs';
import { fetchCountry } from './services/api-service';
import makeCountryMarkup from '../templates/country.hbs';

const refs = getRefs('#countries');

const getCountry = e => {
  e.preventDefault();
  const country = e.currentTarget.elements.country.value;
  if (!country) {
    printResult();
    // refs.errorRef.textContent = '';
    // refs.result.innerHTML = '';

    alert('Enter country!');
    return;
  }
  fetchCountry(country).then(renderCountry).catch(handleError);
};

const renderCountry = ({ name, capital, population, languages, flag }) => {
  const preparedData = {
    country: name,
    capital: capital,
    population: population,
    icon = flag,
    languages: languages.name,

  };

  const markup = makeCountryMarkup(preparedData);
  printResult(markup);
  // refs.result.innerHTML = makeWeatherMarkup(preparedData);
  // refs.errorRef.textContent = '';
};

const handleError = err => {
  printResult('', err.info);
  // refs.errorRef.textContent = err.info;
  // refs.result.innerHTML = '';
};

const printResult = (result = '', err = '') => {
  refs.result.innerHTML = result;
  refs.errorRef.textContent = err;
};

refs.form.addEventListener('input', getCountry);

// const markupSample = `
// <div>
//   <h4>New York, United States of America</h4>
//   <p>2019-09-07 08:14</p>
//   <p>Current temperature: 13&degC</p>
//   <p>Sunny<img class="logo" src="https://assets.weatherstack.com/images/wsymbols01_png_64/wsymbol_0001_sunny.png" alt="Sunny" width="50"></p>
// </div>`;
