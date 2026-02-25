const express = require("express");
const router = express.Router();
let cards = require("../data/cards");

// GET all cards
router.get("/", (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || cards.length;

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const results = cards.slice(startIndex, endIndex);

  res.status(200).json({
    page,
    limit,
    total: cards.length,
    data: results
  });
});

// POST add new card
router.post("/", (req, res) => {
  const newCard = {
    id: Date.now(),
    ...req.body
  };
  cards.push(newCard);
  res.status(201).json(newCard);
});

// PUT update full card
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = cards.findIndex(card => card.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Card not found" });
  }

  cards[index] = { id, ...req.body };
  res.status(200).json(cards[index]);
});

// PATCH update partial card
router.patch("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const card = cards.find(card => card.id === id);

  if (!card) {
    return res.status(404).json({ message: "Card not found" });
  }

  Object.assign(card, req.body);
  res.status(200).json(card);
});

// DELETE card
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  cards = cards.filter(card => card.id !== id);
  res.status(200).json({ message: "Card deleted" });
});

module.exports = router;