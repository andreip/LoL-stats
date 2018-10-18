import { join } from 'path';
import { URL } from 'url';

import express from 'express';
import request from 'request';

import { FAKE_MATCH } from './fake_data';


const LOL_API_KEY = process.env.LOL_API_KEY;
if (!LOL_API_KEY) {
    throw new Error("Please setup a valid LOL_API_KEY env variable (https://developer.riotgames.com/).");
}

const app = express();
const port = 3000;

// hardcoded data for LOL
const baseURI = 'https://na1.api.riotgames.com/';
const matchURI = matchId => `/lol/match/v3/matches/${matchId}`;
const matchId = 2888919284;
const platformId = 'NA1';
const summonerName = 'TF Blade';

app.use(express.static(join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, '/public/index.html'));
});

app.get('/summoner/:summonerName/most-recent-matches', (req, res) => {
    // TODO: summonerName get it from req.params.
    // and also test that summonerName matches regex, so we don't
    // run anything that user gives.
    res.json({
        summonerName: "TF Blade",
        matches: [FAKE_MATCH]
    });
    return;

    const url = new URL(matchURI(matchId), baseURI);
    url.searchParams.append('api_key', LOL_API_KEY);
    //console.log("Doing API call to", url.href);
    request(url, {json: true}, (err, res2, body) => {
        if (!err && res2.statusCode == 200) {
            res.json({
                summonerName,
                matches: [body]
            });
        } else {
            if (err) {
                console.log("Error while fetching", err);
            } else {
                console.log("Got a non-200 response", body);
            }
            res.json({err: "Request failed."});
        }
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}`));
