const express = require("express");
const app = express();

const { quotes } = require("./data");
const { getRandomElement } = require("./utils");

const PORT = process.env.PORT || 4001;

app.use(express.static("public"));

app.listen(PORT, () => {
  console.log(`Listening on server ${PORT}`);
});

app.get("/api/quotes/random", (req, res, next) => {
  res.send({ quote: getRandomElement(quotes) });
});

app.get("/api/quotes", (req, res, next) => {
  if (!req.query.person) {
    res.send({ quotes: quotes });
  } else {
    res.send({
      quotes: quotes.filter((quote) => quote.person === req.query.person),
    });
  }
});

app.post("/api/quotes", (req, res, next) => {
  if (req.query.person && req.query.quote) {
    quotes.push({ quote: req.query.quote, person: req.query.person });
    res
      .status(201)
      .send({ quote: { quote: req.query.quote, person: req.query.person } });
  }
});
