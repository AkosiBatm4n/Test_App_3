export const generateOrderCode = () => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const getRandomLetter = () =>
    letters[Math.floor(Math.random() * letters.length)];

  const letterPart = getRandomLetter() + getRandomLetter();

  const numberPart = String(Math.floor(Math.random() * 999) + 1).padStart(3, '0');

  return letterPart + numberPart;
};
