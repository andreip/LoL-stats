import express from 'express'

const app = express();
const port = 3000;

const matchId = 2888919284;
const platformId = "NA1";

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example app listening on port ${port}`));
