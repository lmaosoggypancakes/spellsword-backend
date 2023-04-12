export const consonants = 'BCDFGHJKLMNPQRSTVWXYZ';
export const vowels = 'AEIOU';
export const alphabet = consonants + vowels;
export const numVowels = 3;
export const numConsonants = 5;
export const generateRandomSequence = () => {
  const randomVowels = [...Array(numVowels)].map(
    () => vowels[Math.floor(Math.random() * vowels.length)],
  );
  const randomConsonants = [...Array(numConsonants)].map(
    () => consonants[Math.floor(Math.random() * consonants.length)],
  );
  const seq = randomVowels.concat(randomConsonants);
  return seq.join('');
};

export const verifyWord = async (word: string): Promise<boolean> => {
  // TODO: use dictionary API to verify word
  return false;
};
