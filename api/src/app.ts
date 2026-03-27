import { json, urlencoded } from 'body-parser';
import express, { type NextFunction, type Request, type Response } from 'express';

import logger from './winstonLogger.js';

class App {
  public httpServer = express();

  constructor() {
    this.httpServer.use(json({ limit: '500mb' }));

    this.httpServer.use(urlencoded({ extended: true, limit: '500mb' }));

    this.httpServer.set('trust proxy', true);

    this.httpServer.get('/', (req: Request, res: Response) => {
      console.log('Welcome to API!');
      res.send('Welcome to API!');
    });


    this.httpServer.use(
      (err: Error, req: Request, res: Response, next: NextFunction) => {
        console.log(`error in url ${req.originalUrl} - error: ${err}`);
        logger.error(`error in url ${req.originalUrl} - error: ${err.message}`);
        res.send(err.message);
        next();
      }
    );
  }
}

export default new App().httpServer;