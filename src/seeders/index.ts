import { roomStateSeed } from './roomStateSeed';
import { roleSeed } from './roleSeed';

export const runAllSeeds = async () => {
  await roomStateSeed();
  await roleSeed();
};
