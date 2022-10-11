function convert(value) {
  const converted = parseFloat(value).toFixed(2).replace('.', ',');
  return converted;
}

function addZero(numero) {
  const magic = 9;
  if (numero <= magic) return `0${numero}`;
  return numero;
}

function convertDate(strDate) {
  const data = new Date(strDate); // .split('T')[0];
  return `${addZero(data
    .getDate())}/${addZero(data
    .getMonth() + 1)}/${data
    .getFullYear()}`;
}

module.exports = { convert, convertDate };
