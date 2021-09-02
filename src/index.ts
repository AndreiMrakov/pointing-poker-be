require('dotenv').config();
import express from 'express';

const PORT = process.env.PORT || 3000;

const app: express.Application = express();

app.get('/', (req, res) => {
    res.send('Hello from Express');
});

app.listen(PORT, () => console.log(`Server starting at localhost:${PORT}`));