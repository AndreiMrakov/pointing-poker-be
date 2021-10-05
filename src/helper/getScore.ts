export const getScore = (score: number) => {
  const fibanacci = [0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89];
  let result = 1_000_000;
  fibanacci.forEach(val => {
    if (Math.abs(val - score) < Math.abs(result - score)) {
      result = val;
    }
  });
  
  return result;
};
