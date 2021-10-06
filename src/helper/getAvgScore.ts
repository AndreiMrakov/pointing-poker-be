export const getAvgScore = (scores: string[]) => {
  const newScores =  scores.filter(score => score && !Number.isNaN(+score)).map(score => +score);
  const result = newScores.reduce((prev, curr) => prev + curr, 0) / newScores.length;
  return isNaN(result) ? 0 : result;
};
