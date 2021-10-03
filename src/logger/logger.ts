import { createLogger, format, transports } from 'winston';

export const logger = createLogger({
  format: format.combine(
    format.timestamp(),
    format.simple(),
    format.errors({ stack: true }),
  ),
  transports: [new transports.Console()]
});
