export const ROT13_PASSWORD_LIST = [
  'Plo3eInygh!2026$Frqq',
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

// Simple ROT13 implementation (symmetric)
export const rot13 = (value) =>
  value.replace(/[A-Za-z]/g, (char) => {
    const charCode = char.charCodeAt(0);
    const offset = charCode >= 97 ? 97 : 65;
    return String.fromCharCode(((charCode - offset + 13) % 26) + offset);
  });

// Example usernames (decoded). We'll encode them at runtime and pair with the encoded password list.
export const USERNAMES = [
  'alice',
  'bob',
  'charlie',
  'devnull',
  'agentx',
  'eve',
  'mallory',
  'trent',
  'peggy',
  'oscar',
  'victor',
  'walter',
  'heidi',
  'judy',
  'ray',
  'sam',
  'kim',
  'lee',
  'pat',
  'mike',
  'zoe',
];

// Build an encoded credential list: ROT13(username):ROT13(password)
export const getEncodedCredentialList = () =>
  USERNAMES.map((u, i) => `${rot13(u)}:${ROT13_PASSWORD_LIST[i % ROT13_PASSWORD_LIST.length]}`);

const ENCODED_SEED_PASSWORD = (() => {
  const parts = ['Plo3e', 'Inygh', '!2026$', 'Frqq'];
  return parts.join('');
})();

export const getHiddenSeedPassword = () => rot13(ENCODED_SEED_PASSWORD);
