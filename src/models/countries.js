const PubSub = require('../helpers/pub_sub.js');
const RequestHelper = require('../helpers/request_helper.js');

class Countries {

  constructor() {
    this.data = [];
  }

  getData() {
    // acquire the countries data from the api
    const url = 'https://restcountries.eu/rest/v2/all';
    const requestHelper = new RequestHelper(url);
    requestHelper.get()

    // then publish the data for use within the application
    .then(data => {
      this.data = data;
      PubSub.publish('Countries:data-loaded', data);
    })
    .catch(message => {
      console.error(message);
    })
  };
};

module.exports = Countries;
