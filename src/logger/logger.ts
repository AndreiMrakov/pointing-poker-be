import { createLogger, format, transports } from 'winston';
import { buildDevTransports } from './buildDevLogger';
import { buildProdTransports } from './buildProdLogger';

export const logger = createLogger({
  transports: [
    /* new transports.File({
      filename: 'LOG_LVL.log',
      format:format.combine(
          format.colorize(),
          format.timestamp({format: 'MMM-DD-YYYY HH:mm:ss'}),
          format.align(),
          format.printf(info => `${info.level}: ${[info.timestamp]}: ${info.message}`),
      )
    }), */
    process.env.NODE_ENV === 'production' ? buildProdTransports() : buildDevTransports(),
  ],
  format:format.combine(
    format.colorize(),
    format.timestamp({format: 'MMM-DD-YYYY HH:mm:ss'}),
    format.align(),
    format.printf(info => `${info.level}: ${[info.timestamp]}: ${info.message}`),
  ),
});
