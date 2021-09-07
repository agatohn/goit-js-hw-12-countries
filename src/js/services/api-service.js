const BASE_COUNTRIES_URL = 'https://restcountries.eu/rest/v2/name/';

const fetchCountry = city => {
  const searchParams = city.toString().toLowerCase(),
  

  return fetch(`${BASE_COUNTRIES_URL}${searchParams}`)
    .then(res => res.json())
    .then(data => {
      if (data.error) {
        return Promise.reject(data.error);
      }
      return data;
    });

  // return fetch(`${BASE_WEATHER_URL}/current?access_key=${WEATHER_API_KEY}&query=${city}`).then(
  //   res => res.json(),
  // );
};

export { fetchCountry };
