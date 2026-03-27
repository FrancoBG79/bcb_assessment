import { createLogger, format,  transports  } from 'winston';

const logger = createLogger({
  format: format.json(),
  level: 'info',
  transports: [new transports.Console()],
});

export default logger;