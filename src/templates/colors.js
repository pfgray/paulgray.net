const colors = [
  '#093145',
  '#107896',
  '#60d878',
  '#DB504A',
  '#9A2617',
  '#58d4c8',
  '#747C92',
  '#c16ed6'
];

function hasher(string) {
  let hash = 0, i, chr, len;
  if (string.length === 0) return hash;
  for (i = 0, len = string.length; i < len; i++) {
    chr   = string.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}

export function getColorForString(input) {
  const number = Math.abs(hasher(input));
  return colors[Math.floor(number % colors.length)];
}
