const questionBank = [
  {
    qType: 'capital',
    qText: 'What is the capital city of ',
    qPropertyID: 'capital'
  },
  {
    qType: 'lang',
    qText: 'What is the principal language of ',
    qPropertyID: 'languages[0].name'
  },
  {
    qType: 'pop',
    qText: 'Within about 10%, what is the population of ',
    qPropertyID: 'population'
  },
  {
    qType: 'size',
    qText: 'Within about 10%, what is the size, in square km, of ',
    qPropertyID: 'area'
  },
  {
    qType: 'borders',
    qText: 'How many other countries have borders with ',
    qPropertyID: 'borders'
  },
];

module.exports = questionBank;
