import { transports } from 'winston';

export function buildProdTransports() {
  return new transports.Console({ level: 'error' });
};
