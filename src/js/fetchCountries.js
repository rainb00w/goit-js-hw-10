function fetchCountry(insertedName) {
    return fetch(
      `https://restcountries.com/v3.1/name/${insertedName}?fields=name,capital,population,flags,languages`
    )  .then(response => {
      if (!response.ok) {
        // console.log('Error !')
        throw Error(response.statusText);
      }
  
      return response.json();
    });
  }

  export default {fetchCountry};

