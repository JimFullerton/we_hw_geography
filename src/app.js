const StartView = require('./views/start_view.js');
const QuestionView = require('./views/question_view.js');
const AnswerView = require('./views/answer_view.js');
const Countries = require('./models/countries.js');
const questionBank = require('./data/question_bank.js');

document.addEventListener('DOMContentLoaded', () => {

  const startView = new StartView();
  startView.bindEvents();

  const questionView = new QuestionView(questionBank);
  questionView.bindEvents();

  const answerView = new AnswerView();
  answerView.bindEvents();

  const countriesModel = new Countries();
  countriesModel.getData();
});
