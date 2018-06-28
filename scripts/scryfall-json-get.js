/* eslint-disable camelcase */
const fetch = require('node-fetch');
const fs = require('fs');

let fullData = [];

const fetcher = async (url) => {
  const val = await fetch(url);
  const jsonData = await val.json();
  const { has_more, next_page, data } = jsonData;
  fullData = fullData.concat(data);
  if (has_more) {
    fetcher(next_page);
  } else {
    fs.writeFileSync('magicJson.json', JSON.stringify({ fullData }));
  }
};

fetcher('https://api.scryfall.com/cards?page=1');
