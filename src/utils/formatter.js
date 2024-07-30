export function formatORCID(value) {
  const clearValue = clearNumber(value);
  const part1 = clearValue.slice(0, 4);
  const part2 = clearValue.slice(4, 8);
  const part3 = clearValue.slice(8, 12);
  const part4 = clearValue.slice(12, 16);

  let formattedORCID = part1;
  if (clearValue.length > 4) {
    formattedORCID += `-${part2}`;
  }
  if (clearValue.length > 8) {
    formattedORCID += `-${part3}`;
  }
  if (clearValue.length > 12) {
    formattedORCID += `-${part4}`;
  }

  return formattedORCID;
}

function clearNumber(value) {
  return value.replace(/\D/g, ""); // Bu, sadece sayıları tutar
}
