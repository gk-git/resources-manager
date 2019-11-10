require('dotenv').config();
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as helmet from 'helmet';
import * as cors from 'cors';
import BOT from './discord-bot';
import routes from './routes';
import { handleError } from './utils/errors';

//Connects to the Database -> then starts the express
createConnection()
  .then(async connection => {
    // Create a new express application instance
    const app = express();
    BOT();
    // Call middleware
    app.use(cors());
    app.use(helmet());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    //Set all routes from routes folder
    app.use('/', routes);

    app.use((err, req, res, next) => {
      handleError(err, res);
    });
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server started on port ${process.env.PORT}!`);
    });
  })
  .catch(error => console.log(error));
