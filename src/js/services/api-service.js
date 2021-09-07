const BASE_COUNTRIES_URL = 'https://restcountries.eu/rest/v2/name/';

const fetchCountry = country => {
  const searchParams = country;
  console.log(country);

  return fetch(`${BASE_COUNTRIES_URL}${searchParams}`)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      if (data.length === 1) {
        return data[0];
      }
      if (data.length >= 2 || data.length <= 10) {
        return data;
      }
      if (data.length > 10) {
        return alert({ text: 'Too many matches found. Enter more!' });
      }
      // return data[0];
    });
};

export { fetchCountry };
