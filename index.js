const express = require('express');
const app = express();
const port = 3000;

const matchId = 2888919284;
const platformId = "NA1";

app.get('/', function(req, res) { res.send("Hello World!"); });

app.listen(port, function() { console.log(`Example app listening on port ${port}`); });