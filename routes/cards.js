const express = require('express');
const router = express.Router();

const { data } = require('../data/flashcardData.json');
const { cards } = data;

router.get('/', (req, res) => {
  const numCards = cards.length;
  const randomCard = Math.floor(Math.random() * numCards);
  res.redirect(`/cards/${randomCard}`);
});

router.get('/:id', (req, res) => {
  const { side } = req.query;
  const { id } = req.params;
  const text = cards[id][side];
  const { hint } = cards[id];
  const templateData = { id, text };

  if (!side) {
    res.redirect(`/cards/${id}?side=question`);
  }

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


module.exports = router;
