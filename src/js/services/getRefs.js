const getRefs = parentSelector => {
  const container = document.querySelector(parentSelector);
  return {
    form: container.querySelector('.search-form'),
    result: container.querySelector('.result'),
    errorRef: container.querySelector('.error1'),
  };
};

export default getRefs;
