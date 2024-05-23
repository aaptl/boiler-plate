require('dotenv').config();

import 'reflect-metadata';
import logger from './configs/logger.config';
import app from './configs/express.config';

const PORT = process.env.PORT || 5000;

const connect = async () => {
  try {
    app.listen(PORT, () => {
      logger.info(`Server running at ${PORT}`);
    });
  } catch (e) {
    logger.info(`The connection to database was failed with error: ${e}`);
  }
}

connect();
