import { join } from 'path';

import express from 'express';
import axios from 'axios';
import R from 'ramda';

import { FAKE_MATCH } from './fake_data';
import { summonerNameRegex } from './utils';


const LOL_API_KEY = process.env.LOL_API_KEY;
if (!LOL_API_KEY) {
    throw new Error("Please setup a valid LOL_API_KEY env variable (https://developer.riotgames.com/).");
}

// hardcoded data for LOL
const baseURL = 'https://na1.api.riotgames.com/';
const getMatchesForAccountURL = accountId => `/lol/match/v3/matchlists/by-account/${accountId}`;
const getMatchURL = matchId => `/lol/match/v3/matches/${matchId}`;
const getSummonerURL = summonerName => `/lol/summoner/v3/summoners/by-name/${summonerName}`;
const maxRecentGames = 5;  // number of most games to fetch


class App {
    constructor(port=3000) {
        this.port = port;
        this.app = express();
        this.app.use(express.static(join(__dirname, 'public')));

        this.app.get('/', this.indexPage());
        this.app.get('/summoner/:summonerName/most-recent-matches/fake', this.fakeMatches());
        this.app.get('/summoner/:summonerName/most-recent-matches', this.mostRecentMatches());
        this.app.listen(port,
            () => console.log(`Example app listening on port ${port}`));
    }

    indexPage() {
        return (req, res) => {
            res.sendFile(join(__dirname, '/public/index.html'));
        }
    }

    fakeMatches() {
        return (req, res) => {
            res.json({
                summonerName: "TF Blade",
                accountId: 202988570,
                matches: [FAKE_MATCH]
            });
        }
    }

    mostRecentMatches() {
        return (req, outerRes) => {
            const { summonerName } = req.params;
            console.log(`Looking for summoner name ${summonerName}`);

            // check user's input before API call.
            if (!summonerNameRegex.test(summonerName)) {
                outerRes.send({err: `Invalid summoner name ${summonerName}`});
                return;
            }

            const config = {params: {api_key: LOL_API_KEY}, baseURL};
            this.fetchAccountInfo({outerRes, summonerName, config});
        }
    }

    //
    // first do API call to find out summoner's account id.
    //
    fetchAccountInfo({outerRes, summonerName, config}) {
        axios.get(getSummonerURL(summonerName), config)
        .then(({data: account}) => {
            const accountId = account.accountId;
            this.fetchListOfMatches({summonerName, outerRes, accountId, config});
        }).catch(e => {
            // of the range of 2xx
            if (e.response) {
                console.log(`Couldn't get ${summonerName} account; status`, e.response.status);
                outerRes.send({err: `Account for ${summonerName} was not found.`});
            } else {
                console.log("Error fetching account", e);
                outerRes.send({err: `Failed to fetch account info for ${summonerName}`});
            }
        });
    }

    //
    // now do API call to get latest matches for accountId
    //
    fetchListOfMatches(params) {
        let {summonerName, accountId, matches, config} = params;
        axios.get(getMatchesForAccountURL(accountId),
                  R.mergeDeepLeft(config, {params: {endIndex: maxRecentGames}}))
        .then(r => {
            const matchIds = r.data.matches.map(R.prop('gameId'));
            console.log(`Got ${matchIds.length} most recent match ids.`);
            this.fetchMatchDetails({matchIds, ...params});
        }).catch(e => {
            // of the range of 2xx
            if (e.response) {
                console.log(`Couldn't get ${summonerName} matches; status`, e.response.status);
                outerRes.send({summonerName, accountId, matches: []});
            } else {
                console.log("Error fetching matches", e);
                outerRes.send({err: `Failed to fetch matches for ${summonerName}`});
            }
        });
    }

    //
    // now fetch info for all games and bundle them together to send
    // to frontend.
    //
    fetchMatchDetails({summonerName, outerRes, matchIds, config, accountId}) {
        let promises = matchIds.map(id => {
            return axios.get(getMatchURL(id), config)
              .catch(e => {
                if (e.response) {
                    console.log(`Could not fetch matchId ${id} for ${summonerName}; status`, e.response.status);
                } else {
                    console.log(`Failed for matchId ${id} for ${summonerName}`, e);
                }
              });
        });
        axios.all(promises)
        .then(responses => {
            console.log("After Fetched match details");
            // for some reason axios returns all responses here where some
            // are empty (the failed ones).
            const matches = R.pipe(
                R.map(R.prop('data')),
                R.reject(R.isEmpty),
                R.reject(R.isNil),
            )(responses);
            console.log(`Successfully fetched ${matches.length}/${matchIds.length} matches.`);
            outerRes.send({summonerName, accountId, matches});
        });
    }
}

if (require.main == module) {
    new App();
}
