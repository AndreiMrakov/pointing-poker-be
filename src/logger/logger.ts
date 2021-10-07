import { createLogger, format, transports } from 'winston';

const logLevel = process.env.NODE_ENV === 'production' ? 'error' : 'info';

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
    new transports.Console({ level: logLevel }),
  ],
  format:format.combine(
    format.colorize(),
    format.timestamp({format: 'MMM-DD-YYYY HH:mm:ss'}),
    format.align(),
    format.printf(info => `${info.level}: ${[info.timestamp]}: ${info.message}`),
  ),
});
