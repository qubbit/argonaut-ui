export function generateToken(length) {
  const keySpace = 'abcdef0123456789';
  const keySpaceLength = keySpace.length;

  let token = '';
  for(var i = 0; i < length; i++) {
    token += keySpace[Math.floor(Math.random() * keySpaceLength)]
  }
  return token;
}
