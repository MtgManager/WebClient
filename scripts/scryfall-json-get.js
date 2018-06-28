/* eslint-disable camelcase */
const fetch = require('node-fetch');
const fs = require('fs-extra');
const path = require('path');

let fullData = [];

const cardsDir = path.resolve(__dirname, 'cards');
const jsonPath = path.resolve(__dirname, 'cardsTable.json');
// Ensure cards lookup table is new
if (fs.existsSync(jsonPath)) fs.unlinkSync(jsonPath);
// Ensure cards dir exists and is empty
if (!fs.existsSync(cardsDir)) fs.mkdirSync(cardsDir);
fs.emptyDirSync(cardsDir);

fs.appendFileSync(jsonPath, '{');
let firstCard = true;
const fetcher = async (fetchUrl) => {
  console.log(fetchUrl);
  const val = await fetch(fetchUrl);
  const jsonData = await val.json();
  const { has_more, next_page, data } = jsonData;
  fullData = fullData.concat(data);

  data.forEach((card) => {
    if (card.lang === 'en') {
      fs.writeFileSync(`${cardsDir}/${card.id}.json`, JSON.stringify({ card }));
      fs.appendFileSync(jsonPath, `${firstCard ? '' : ','}"${card.name}": "${card.id}"`);

      if (firstCard) firstCard = false;
    }
  });

  if (has_more) {
    fetcher(next_page);
  } else {
    fs.appendFileSync(jsonPath, '}');
  }
};

fetcher('https://api.scryfall.com/cards?page=1');
