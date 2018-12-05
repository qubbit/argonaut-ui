export function generateToken(length) {
  const keySpace = 'abcdef0123456789';
  const keySpaceLength = keySpace.length;

  let token = '';
  for (var i = 0; i < length; i++) {
    token += keySpace[Math.floor(Math.random() * keySpaceLength)];
  }
  return token;
}

export function colorForToday() {
  var now = new Date();
  var start = new Date(now.getFullYear(), 0, 0);
  var diff =
    now -
    start +
    (start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000;
  var oneDay = 1000 * 60 * 60 * 24;
  var day = Math.floor(diff / oneDay);
  return `hsl(${day}, 50%, 50%)`;
}
