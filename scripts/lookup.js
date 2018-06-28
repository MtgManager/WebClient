/* eslint-disable import/no-dynamic-require */
const lookupTable = require('./cardsTable.json');

const card = require(`./cards/${lookupTable[Object.keys(lookupTable)[0]]}.json`);

console.log(Object.keys(card.card));
