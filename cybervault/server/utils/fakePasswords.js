export const ROT13_PASSWORD_LIST = [
  'Plo3eInygh!2026$Frq',
  'PeloreInygh!2025',
  'P0q3Z4fg3e!#',
  'C4ffj0eq123',
  'Nqzva$rpher2026',
  'InyghOernxre!9',
  'FunqbXrl!88',
  'Fcrgerer1234',
  'Unpx3eA0g!',
  'TubfgInygh!01',
  'FrpherTngr!42',
  'ZnegvkXrl!7',
  'MrebQnl!2026',
  'DhanhzgYbpx!5',
  'QnexPvcure!77',
  'OveanelYbpx!24',
  'PelcgbGenC!K',
  'CunagbzCnff!3',
  'BoshfP8gr!99',
  'Sveneeyy!8080',
  'CloYngkn!@#',
];

export const decodeRot13 = (value) =>
  value.replace(/[A-Za-z]/g, (char) => {
    const charCode = char.charCodeAt(0);
    const offset = charCode >= 97 ? 97 : 65;
    return String.fromCharCode(((charCode - offset + 13) % 26) + offset);
  });

export const getDecodedPasswordList = () => ROT13_PASSWORD_LIST.map(decodeRot13);

export const getHiddenSeedPassword = () => {
  const decoded = getDecodedPasswordList();
  // This list contains 20 ROT13-encoded passwords. The real seed password is hidden among them.
  return decoded.find((item) => item.startsWith('Cyb3rVault')) || 'Cyb3rVault!2026$Seed';
};
