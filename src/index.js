import 'dotenv/config';
import cors from 'cors';
import bodyParser from 'body-parser';
import express from 'express';
import httpLogger from 'express-bunyan-logger';
import bformat from 'bunyan-format';
import logger from './utils/logger';
import { connectDb, models } from './models';


// import models, { connectDb } from './models';
import routes from './routes';

const formatOut = bformat({ outputMode: 'short', levelInString: true });

const app = express();
const HTTP_LOGGER = false;
// Application-Level Middleware

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(async (req, res, next) => {
  // req.context = {
  //   models,
  //   me: await models.User.findByLogin('rwieruch'),
  // };
  next();
});

if (HTTP_LOGGER) {
  app.use(httpLogger({
    stream: formatOut,
    parseUA: false,
  }));
}

app.use('/', routes.main);


async function start() {
  try {
    await connectDb();
    const { User } = models;
    await User.deleteMany({});
    await User.create({ username: 'some username' });
    const all = await User.find();
    logger.info(all);
  } catch (e) {
    logger.error(e);
  }
  app.listen(process.env.PORT || 3000, () => {
    logger.info(`Server listening on port ${process.env.PORT || 3000}`);
  });
}

start();

// connectDb().then(async () => {
//   if (eraseDatabaseOnSync) {
//     await Promise.all([
//       models.User.deleteMany({}),
//       models.Message.deleteMany({}),
//     ]);
//
//     createUsersWithMessages();
//   }
//
//   app.listen(process.env.PORT, () =>
//     console.log(`Example app listening on port ${process.env.PORT}!`),
//   );
// });
