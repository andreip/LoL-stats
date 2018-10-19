Simple LoL game stats app
====

You get to enter a League of Legends summoner name and the API will give you
back last 5 matches statistics. Built with react and express.


You need a LoL valid API key though, get one here https://developer.riotgames.com/.
The inspiration was http://na.op.gg/ but it looks no way that cool. Nevertheless,
it looks something like this:

<img src="/src/public/img/screenshot.png" height="500" />

### Running ###

* You need to have a `LOL_API_KEY` valid env variable in your current terminal first

```bash
$ npm install
$ npm run start
# and head over to localhost:3000

# running tests
$ npm t
```
