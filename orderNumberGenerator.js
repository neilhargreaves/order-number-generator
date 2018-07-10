const uuIdV4 = require('uuid/v4');
const bigInt = require("big-integer");
const allowedCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

function generateOrderNumber() {
  const guid = uuIdV4();
  const byteArray = convertToByteArray(guid);
  const aggregateValue = aggregateByteArray(byteArray);
  const encodedNumber = encodeOrderNumber(aggregateValue);
  const orderNumberString = numberToRandomString(encodedNumber);
  return padOrderNumber(orderNumberString);
}

function generateOrderNumberSimple() {
  //Array of characters foreach part of the order.
  return [4, 4, 4, 1]
    .map(characterCount => randomCharacterString(characterCount))
    .join("-");
}

function randomCharacterString(characterCount = 4) {
  let orderNumberPart = "";

  for (let i = 0; i < characterCount; i++) {
    orderNumberPart += allowedCharacters.charAt(Math.floor(Math.random() * allowedCharacters.length));
  }

  return orderNumberPart;
}

function convertToByteArray(guid) {
  let bytes = [];
  for (let i = 0; i < guid.length; i++) {
    const char = guid.charCodeAt(i);
    bytes.push(char >>> 8, char & 0xFF);
  }

  return bytes;
}

function aggregateByteArray(byteArray) {
  const aggregateValue = byteArray.reduce((aggregate, byte) => {
    const byteValue = byte + 1;
    return bigInt(aggregate).times(byteValue);
  }, bigInt(1));

  return aggregateValue.toString().substr(0, 19);
}

function encodeOrderNumber(orderNumber) {
  const date = new Date();
  const number = bigInt(orderNumber).minus(date.getMilliseconds()).abs();

  return number.toString();
}

function numberToRandomString(orderNumber) {
  const bitsInLong = 64;
  const radix = 36;
  let index = bitsInLong - 1;
  let currentNumber = bigInt(orderNumber).abs().toString();
  let charArray = new Array(bitsInLong);

  while (currentNumber != 0) {
    const remainder = bigInt(currentNumber).divmod(radix).remainder;
    index = index - 1;
    charArray.splice(index, 1, allowedCharacters.charAt(parseInt(remainder)));
    currentNumber = bigInt(currentNumber).divide(radix);
  }

  return charArray.join().replace(/,/g, '');
}

function padOrderNumber(orderNumber) {
  return chunkString(orderNumber, 4).join("-");
}

function chunkString(str, length) {
  return str.match(new RegExp('.{1,' + length + '}', 'g'));
}

module.exports = [
  generateOrderNumber,
  generateOrderNumberSimple
];