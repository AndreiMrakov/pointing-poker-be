require('dotenv').config();
import express from 'express';
const morgan = require('morgan');

const PORT = process.env.PORT || 3000;

const app = express();
app.use(morgan(process.env.LOG_LEVEL));

app.get('/', (req, res) => {
    res.send('Hello from Express');
});

app.listen(PORT, () => console.log(`Server starting at localhost:${PORT}`));
