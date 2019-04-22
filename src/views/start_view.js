const PubSub = require('../helpers/pub_sub.js');

class StartView {

  constructor() {
    this.startPoint = document.querySelector('div#main');
  };

  bindEvents() {
    PubSub.subscribe('Countries:data-loaded', (evt) => {
      const countryData = evt.detail;
      this.startUp(countryData);
    });
  };

  startUp(countryData) {
    const startButton = document.createElement('button');
    startButton.textContent = 'Start Here';
    startButton.addEventListener('click', (evt) => {
      PubSub.publish('StartView:start-quiz', countryData);
    });
    this.startPoint.appendChild(startButton);
  };
};

module.exports = StartView;
