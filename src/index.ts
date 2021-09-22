require('dotenv').config();
import express from 'express';
import morgan from 'morgan';
import { createServer } from 'http';
import { sequelize } from './models';
import { runAllSeeds } from './seeders';
import { router } from './routers';
import { createApplication } from './socket';
import { errorHandling } from './middleware/ErrorHandlingMiddleware';

const LOG_LEVEL = process.env.LOG_LEVEL as string;

const PORT = process.env.PORT;

const app = express();


app.get('/', (req, res) => {
  res.send('Hello from Express');
});

app.use(morgan(LOG_LEVEL));
app.use(express.json());
app.use('/api', router);

app.use(errorHandling);

const server = createServer(app);

createApplication(
  server,
  {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  },
);

(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    await runAllSeeds();
    server.listen(PORT, () => console.log(`Server started at localhost:${PORT}`));
  } catch(e) {
     console.log(e);
  }
})();
