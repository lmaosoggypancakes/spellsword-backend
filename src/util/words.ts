import { Difficulty } from '@prisma/client';
export const consonants = 'BCDFGHJKLMNPQRSTVWXYZ';
export const vowels = 'AEIOU';
export const alphabet = consonants + vowels;
export const numVowels = {
  [Difficulty.CASUAL]: 6,
  [Difficulty.ADVENTURE]: 4,
  [Difficulty.MASTER]: 2,
};
export const numConsonants = {
  [Difficulty.CASUAL]: 12,
  [Difficulty.ADVENTURE]: 9,
  [Difficulty.MASTER]: 6,
};
export const generateRandomSequence = (
  difficulty: Difficulty = Difficulty.ADVENTURE,
) => {
  console.log(difficulty);
  const randomVowels = [...Array(numVowels[difficulty])].map(
    () => vowels[Math.floor(Math.random() * vowels.length)],
  );
  const randomConsonants = [...Array(numConsonants[difficulty])].map(
    () => consonants[Math.floor(Math.random() * consonants.length)],
  );
  const seq = randomVowels.concat(randomConsonants);
  return seq.join('');
};

export const verifyWord = async (word: string): Promise<boolean> => {
  // TODO: use dictionary API to verify word
  return false;
};
