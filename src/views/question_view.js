const PubSub = require('../helpers/pub_sub.js');

class QuestionView {

  constructor(questionBank) {
    this.questionBank = questionBank;
    this.countryData = [];
    this.currentQ = {};
    this.currentCountry = {};
    this.startPoint = document.querySelector('div#main');
    this.qZone = document.querySelector('div#question');
  };

  bindEvents() {
    PubSub.subscribe('StartView:start-quiz', (evt) => {
      this.countryData = evt.detail;
      this.clearPage();
      this.renderQuestion();
    });

    PubSub.subscribe('AnswerView:next-q', (nxt) => {
      this.renderQuestion();
    });
  };

  renderQuestion() {
    this.clearQuestion();
    // take a random question type from the question bank
    this.currentQ = this.questionBank[Math.floor(Math.random() * Math.floor(this.questionBank.length))];
    // take a random country from the country data
    this.currentCountry = this.countryData[Math.floor(Math.random() * Math.floor(this.countryData.length))];
    // build the q&a & add to the DOM
    const questionLine = document.createElement('h2');
    questionLine.textContent = `Q: ${this.currentQ.qText} ${this.currentCountry.name} ?`;
    this.qZone.appendChild(questionLine);
    const answerLine =  document.createElement('input');
    this.qZone.appendChild(answerLine);
    answerLine.addEventListener('change', (evt) => {
      PubSub.publish('QuestionView:answer-subbed', [evt.target.value, this.currentQ, this.currentCountry]);
    });
  };

  clearPage() {
    this.startPoint.innerHTML = '';
  };

  clearQuestion() {
    this.qZone.innerHTML = '';
  };

};

module.exports = QuestionView;
