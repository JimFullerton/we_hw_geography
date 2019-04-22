const PubSub = require('../helpers/pub_sub.js');

class AnswerView {

  constructor() {
    this.incomingAns = [];
    this.aZone = document.querySelector('div#answer');
  };

  bindEvents() {
    PubSub.subscribe('QuestionView:answer-subbed', (payload) => {
      this.incomingAns = event.detail;
      this.clearPrevious();
      this.markAnswer();
      this.nextQ();
    });
  };

  markAnswer() {

    const givenAnswer = this.incomingAns[0];
    const questInfo = this.incomingAns[1];
    const countryInfo = this.incomingAns[2];
    let rightAnswer = null;

    const ansKey = questInfo.qPropertyID;
    const corrAns = countryInfo[ansKey];
    console.log('countyrty info', countryInfo);
    console.log('correct ans', corrAns);

    switch (questInfo.qType) {
      case 'capital': rightAnswer = countryInfo.capital; break;
      case 'lang': rightAnswer = countryInfo.languages[0].name; break;
      case 'pop': rightAnswer = countryInfo.population; break;
      case 'size': rightAnswer = countryInfo.area; break;
      case 'borders': rightAnswer = countryInfo.borders.length; break;
      // default: ERROR PROCESS; break;
    }
    if (givenAnswer == rightAnswer) {
      this.writeMark('Correct');
    } else {
      this.writeMark(`Wrong:  The correct answer is ${rightAnswer}.`);
    }

    const test1 = countryInfo.population
    console.log('pop = ', test1);
    const test2 = countryInfo.area
    console.log('size = ', test2);
    const test3 = countryInfo.capital
    console.log('capital = ', test3);
    const test4 = countryInfo.borders
    console.log('border countries = ', test4);
    const test4a = countryInfo.borders.length
    console.log('No of neighbours = ', test4a);
    const test5 = countryInfo.languages[0].name
    console.log('1st lang = ', test5);
  };

  clearPrevious() {
    this.aZone.innerHTML = '';
  };

  writeMark(content) {
    const writeOut = content;
    const markLine = document.createElement('h2');
    markLine.textContent = writeOut;
    this.aZone.appendChild(markLine);
  };

  nextQ() {
    const nxtQButton = document.createElement('button');
    nxtQButton.textContent = 'Next Question';
    nxtQButton.addEventListener('click', (evt) => {
      PubSub.publish('AnswerView:next-q');
      this.clearPrevious();
    });
    this.aZone.appendChild(nxtQButton);
  };
};

module.exports = AnswerView;
