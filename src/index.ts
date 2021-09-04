require('dotenv').config();
import express from 'express';
import morgan from 'morgan';
import './socket-io';

const PORT = process.env.PORT || 3000;
const LOG_LEVEL = process.env.LOG_LEVEL as string;

const app = express();
app.use(morgan(LOG_LEVEL));

app.get('/', (req, res) => {
  res.send('Hello from Express');
});

app.listen(PORT, () => console.log(`Server starting at localhost:${PORT}`));
