const express = require('express');
const router = express.Router();

const { data } = require('../data/flashcardData.json');
const { cards } = data;
const numCards = cards.length;
console.log(numCards);

router.get('/:id', (req, res) => {
  const { side } = req.query;
  const { id } = req.params;
  const text = cards[id][side];
  const { hint } = cards[id];
  const templateData = { id, text };

  if (side === 'question') {
    templateData.hint = hint;
    templateData.side = 'answer';
    templateData.sideDisplay = 'Answer';
  } else {
    templateData.side = 'question';
    templateData.sideDisplay = 'Question';
  }
  res.render(`card`, templateData);
});

router.get('/', (req, res) => {
  const randomCard = Math.floor(Math.random() * (numCards - 1 + 1)) + 1;
  res.redirect(`/cards/${randomCard}?side=question`);
})

module.exports = router;
