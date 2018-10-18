import express from 'express';
import request from 'request';
import { URL } from 'url';

const app = express();
const port = 3000;

// hardcoded data for LOL
const baseURI = 'https://na1.api.riotgames.com/';
const matchURI = matchId => `/lol/match/v3/matches/${matchId}`;
const matchId = 2888919284;
const platformId = 'NA1';
const summonerName = 'TF Blade';

app.get('/', (req, res) => {
    res.send("Hello World");
});

app.get('/summoner/:summonerName/most-recent-matches', (req, res) => {
    // TODO: summonerName get it from req.params.
    // and also test that summonerName matches regex, so we don't
    // run anything that user gives.

    const url = new URL(matchURI(matchId), baseURI);
    url.searchParams.append('api_key', process.env.LOL_API_KEY);
    //console.log("Doing API call to", url.href);
    request(url, {json: true}, (err, res2, body) => {
        res.send({
            summonerName,
            matches: [body]
        });
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}`));
