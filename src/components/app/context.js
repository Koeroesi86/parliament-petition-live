import { createContext } from 'react';

let state = { data: { } };
const listeners = [];

const fetchData = () => {
  let timeout = 10000;

  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  // if (process.env.NODE_ENV === "development") console.log('connection', connection);
  const mobileConnTypes = [
    'bluetooth',
    'cellular',
    '3g',
    '2g',
  ];
  if (connection && (
    connection.saveData ||
    mobileConnTypes.includes(connection.type) ||
    mobileConnTypes.includes(connection.effectiveType)
  )) {
    timeout = 30000;
  }
  // fetch(`https://petition.parliament.uk/petitions/${PETITION_ID}.json`)
  fetch(`https://chris.koro.si/petition/data.php`)
    .then(response => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response;
    })
    .then(response => response.json())
    .then(response => {
      // prevent rerender on no update
      if (state.data.updated_at !== response.data.attributes.updated_at) {
        const data = {
          ...response.data.attributes,
          id: response.data.id || state.data.id
        };

        localStorage.setItem('petitionData', JSON.stringify(data));
        state = { data, error: false };
        notifyListeners();
      }
    })
    .catch(error => { state.error = error; });
  setTimeout(fetchData, timeout)
};

const notifyListeners = () => {
  listeners.forEach(listener => {
    listener(state);
  })
};

const initialise = () => {
  const initialData = localStorage.getItem('petitionData');
  if (initialData) state = { data: JSON.parse(initialData) };
  notifyListeners();
  fetchData();
};

const addListener = (listener) => {
  if (!listeners.includes(listener)) listeners.push(listener);
};

const removeListener = (listener) => {
  const index = listeners.indexOf(listener);
  if (index !== -1) {
    listeners.splice(index, 1);
  }
};

export function numberWithCommas(x) {
  return !x ? '' : x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export default createContext({
  initialise,
  addListener,
  removeListener,
  formatNumber: numberWithCommas
})
