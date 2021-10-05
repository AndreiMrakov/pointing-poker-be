export const getAvgScore = (scores: string[]) => {
  const newScores =  scores.filter(score => score && !Number.isNaN(+score)).map(score => +score);
  return newScores.reduce((prev, curr) => prev + curr, 0) / newScores.length;
};
