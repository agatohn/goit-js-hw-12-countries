const BASE_COUNTRIES_URL = 'https://restcountries.eu/rest/v2/name/';

const fetchCountry = country => {
  const searchParams = country;
  console.log(country);

  return fetch(`${BASE_COUNTRIES_URL}${searchParams}`)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      return data;
    });
};

export { fetchCountry };
