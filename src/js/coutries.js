import getRefs from './services/getRefs';
import { fetchCountry } from './services/api-service';
import makeWeatherMarkup from '../templates/3-weather.hbs';

const refs = getRefs('#countries');

const getWeather = e => {
  e.preventDefault();
  const city = e.currentTarget.elements.city.value;
  if (!city) {
    printResult();
    // refs.errorRef.textContent = '';
    // refs.result.innerHTML = '';

    alert('Enter city!');
    return;
  }
  fetchWeather(city).then(renderWeather).catch(handleError);
};

const renderWeather = ({ request, current, location }) => {
  const preparedData = {
    place: request.query,
    time: location.localtime,
    temp: current.temperature,
    desc: current.weather_descriptions[0],
    icon: current.weather_icons[0],
  };

  const markup = makeWeatherMarkup(preparedData);
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

refs.form.addEventListener('submit', getWeather);

// const markupSample = `
// <div>
//   <h4>New York, United States of America</h4>
//   <p>2019-09-07 08:14</p>
//   <p>Current temperature: 13&degC</p>
//   <p>Sunny<img class="logo" src="https://assets.weatherstack.com/images/wsymbols01_png_64/wsymbol_0001_sunny.png" alt="Sunny" width="50"></p>
// </div>`;
