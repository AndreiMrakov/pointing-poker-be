import { createLogger, format, transports } from 'winston';

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
    new transports.Console(),
  ],
  format:format.combine(
    format.colorize(),
    format.timestamp({format: 'MMM-DD-YYYY HH:mm:ss'}),
    format.align(),
    format.printf(info => `${info.level}: ${[info.timestamp]}: ${info.message}`),
)
});
