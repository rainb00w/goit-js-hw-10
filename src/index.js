import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import fetchC from '../src/js/fetchCountries';

const DEBOUNCE_DELAY = 300;

const refs = {
  inputBox: document.querySelector('#search-box'),
  outputList: document.querySelector('.country-list'),
  outputInfo: document.querySelector('.country-info'),
};

refs.inputBox.addEventListener('input', debounce(OutputData, DEBOUNCE_DELAY));

function OutputData(e) {
  e.preventDefault();
  refs.outputInfo.innerHTML = '';
  refs.outputList.innerHTML = '';

  const searchData = e.target.value.trim();

  if (searchData === '') {
    console.log('Надобно что-то ввести');
    return;
  }

  fetchC
    .fetchCountry(searchData)
    .then(country => {
      // console.log(country.length);
      // console.log(country);
      if (country.length === 0) {
        refs.outputInfo.innerHTML = `Oops, there is no country with that name`;
      } else if (country.length > 10) {
        Notiflix.Notify.info(`Too many matches found. Please enter a more specific name`);
      } else if (country.length > 1 && country.length < 10) {
          console.log(country);
        country.forEach(element => {
        
          refs.outputList.innerHTML += `<li class="country-list"> <img src="${element.flags.svg}" alt="Country flag" height="15"> ${element.name.official} </li>`;
          // refs.outputList.innerHTML += `<li class="country-list"> List. You were searched for - ${element.name.common}, flag - ${element.flag} </li>`;
        });
      } else if (country.length === 1) {

        for (const currentCountry of country) {
          refs.outputInfo.innerHTML = `<li class="country-list"> <img src="${
            currentCountry.flags.svg
          }" alt="Country flag" height="15"> ${
            currentCountry.name.official
          } </li><li class="country-list"> Capital: ${
            currentCountry.capital
          } </li><li class="country-list"> Population: ${
            currentCountry.population
          } </li><li class="country-list"> Languages: ${Object.values(currentCountry.languages)} </li>`;
        }
      }
    })
    .catch(error => {
      console.log('CATCH !');
      Notiflix.Notify.failure('Oops, there is no country with that name');
    });
}

