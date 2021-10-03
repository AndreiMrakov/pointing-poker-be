import { transports } from 'winston';

export function buildDevTransports() {
  return new transports.Console();
};
