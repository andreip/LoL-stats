'use strict';

const SearchForm = ({ doSearch }) => {
    let input;

    return (
        <div>
            <input ref={node => {input = node;}} />
            <button onClick={() => {
                doSearch(input.value);
                input.value = '';
            }}>
                Search
            </button>
        </div>
    );
};

const LoLMatch = ({ summonerName, ...match }) => {

    let info = R.pipe(
        extractInfoFromMatch,
        prettifyMatchValues
    )(summonerName, match);

    if (!info) {
        console.error(`Something went wrong, we got no info for ${summonerName}`);
        return null;
    }

    console.log("info", info);
    let tableRows = info.map((row, idx) => {
        return (
            <tr key={idx}>
                <td>{row.text}</td>
                <td>{row.pretty}</td>
            </tr>
        );
    });

    return (
        <li>
            <table>
                <tbody>
                    {tableRows}
                </tbody>
            </table>
        </li>
    );
};

const LoLTitle = ({ name }) => {
    if (name) {
        return (
            <h2>Matches for {name}</h2>
        );
    } else {
        return (
            <h2>No matches</h2>
        );
    }
};

const LoLMatchList = ({ searching, summonerName, matches }) => {
    if (searching) {
        return <h2>Searching matches for {summonerName}...</h2>;
    }

    const nodes = matches.map((match, idx) => {
        return (
            <LoLMatch key={idx} summonerName={summonerName} {...match} />
        );
    });

    return (
        <div>
            <LoLTitle name={summonerName} />
            <ul>{nodes}</ul>
        </div>
    );
};

class LoLStatsApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        summonerName: '',
        matches: [],
        searching: false,
    };
    console.log("initial state", this.state);
  }

  doSearch(summonerName) {
    this.setState({ searching: true, matches: [], summonerName });
    // simulates a computation
    console.log("Fetching data...");
    setTimeout(() => {
        console.log("Done fetching data.");
        console.log("DATA", DATA);
        this.setState({ searching: false, ...DATA });
    }, 1000);
  }

  render() {
    return (
        <div className="lol-stats">
            <SearchForm doSearch={this.doSearch.bind(this)} />
            <LoLMatchList {...this.state} />
       </div>
    );
  }
}

const domContainer = document.querySelector('#lol-stats-container');
ReactDOM.render(<LoLStatsApp />, domContainer);

// TODO: eventually fetch it from server.
const DATA = {
    summonerName: "TF Blade",
    matches: [
        {
            gameId: 2888919284,
            platformId: "NA1",
            gameCreation: 1539790867247,
            gameDuration: 1487,
            queueId: 420,
            mapId: 11,
            seasonId: 11,
            gameVersion: "8.20.249.1952",
            gameMode: "CLASSIC",
            gameType: "MATCHED_GAME",
            teams: [],
            participants: [
                {
                    participantId: 3,
                    teamId: 100,
                    championId: 24,
                    spell1Id: 4,
                    spell2Id: 12,
                    highestAchievedSeasonTier: "CHALLENGER",
                    stats: {
                    participantId: 3,
                    win: true,
                    item0: 3077,
                    item1: 1037,
                    item2: 3052,
                    item3: 3047,
                    item4: 3812,
                    item5: 3078,
                    item6: 3340,
                    kills: 10,
                    deaths: 4,
                    assists: 3,
                    largestKillingSpree: 3,
                    largestMultiKill: 3,
                    killingSprees: 3,
                    longestTimeSpentLiving: 673,
                    doubleKills: 1,
                    tripleKills: 1,
                    quadraKills: 0,
                    pentaKills: 0,
                    unrealKills: 0,
                    totalDamageDealt: 135816,
                    magicDamageDealt: 21757,
                    physicalDamageDealt: 111698,
                    trueDamageDealt: 2360,
                    largestCriticalStrike: 0,
                    totalDamageDealtToChampions: 18078,
                    magicDamageDealtToChampions: 3594,
                    physicalDamageDealtToChampions: 12123,
                    trueDamageDealtToChampions: 2360,
                    totalHeal: 2015,
                    totalUnitsHealed: 1,
                    damageSelfMitigated: 14244,
                    damageDealtToObjectives: 9029,
                    damageDealtToTurrets: 6284,
                    visionScore: 21,
                    timeCCingOthers: 13,
                    totalDamageTaken: 17748,
                    magicalDamageTaken: 5538,
                    physicalDamageTaken: 10403,
                    trueDamageTaken: 1805,
                    goldEarned: 13020,
                    goldSpent: 12258,
                    turretKills: 2,
                    inhibitorKills: 1,
                    totalMinionsKilled: 180,
                    neutralMinionsKilled: 24,
                    neutralMinionsKilledTeamJungle: 19,
                    neutralMinionsKilledEnemyJungle: 0,
                    totalTimeCrowdControlDealt: 52,
                    champLevel: 15,
                    visionWardsBoughtInGame: 2,
                    sightWardsBoughtInGame: 0,
                    wardsPlaced: 10,
                    wardsKilled: 2,
                    firstBloodKill: false,
                    firstBloodAssist: false,
                    firstTowerKill: true,
                    firstTowerAssist: false,
                    firstInhibitorKill: true,
                    firstInhibitorAssist: false,
                    combatPlayerScore: 0,
                    objectivePlayerScore: 0,
                    totalPlayerScore: 0,
                    totalScoreRank: 0,
                    playerScore0: 0,
                    playerScore1: 0,
                    playerScore2: 0,
                    playerScore3: 0,
                    playerScore4: 0,
                    playerScore5: 0,
                    playerScore6: 0,
                    playerScore7: 0,
                    playerScore8: 0,
                    playerScore9: 0,
                    perk0: 8010,
                    perk0Var1: 1017,
                    perk0Var2: 0,
                    perk0Var3: 0,
                    perk1: 9111,
                    perk1Var1: 1211,
                    perk1Var2: 260,
                    perk1Var3: 0,
                    perk2: 9104,
                    perk2Var1: 15,
                    perk2Var2: 0,
                    perk2Var3: 0,
                    perk3: 8014,
                    perk3Var1: 331,
                    perk3Var2: 0,
                    perk3Var3: 0,
                    perk4: 8275,
                    perk4Var1: 10,
                    perk4Var2: 0,
                    perk4Var3: 0,
                    perk5: 8210,
                    perk5Var1: 0,
                    perk5Var2: 0,
                    perk5Var3: 0,
                    perkPrimaryStyle: 8000,
                    perkSubStyle: 8200
                    },
                    timeline: {
                    participantId: 3,
                    creepsPerMinDeltas: {
                    "10-20": 7.5,
                    "0-10": 8.7
                    },
                    xpPerMinDeltas: {
                    "10-20": 481.9,
                    "0-10": 521.4
                    },
                    goldPerMinDeltas: {
                    "10-20": 549.4000000000001,
                    "0-10": 330
                    },
                    csDiffPerMinDeltas: {
                    "10-20": -0.6000000000000001,
                    "0-10": 2.3000000000000003
                    },
                    xpDiffPerMinDeltas: {
                    "10-20": -5.499999999999972,
                    "0-10": 166.3
                    },
                    damageTakenPerMinDeltas: {
                    "10-20": 891.1999999999999,
                    "0-10": 342.8
                    },
                    damageTakenDiffPerMinDeltas: {
                    "10-20": -110.80000000000007,
                    "0-10": -61.39999999999996
                    },
                    role: "SOLO",
                    lane: "MIDDLE"
                    }
                }
            ],
            participantIdentities: [
            {
            participantId: 1,
            player: {
            platformId: "NA1",
            accountId: 239152536,
            summonerName: "Bardly Missed",
            summonerId: 88109144,
            currentPlatformId: "NA1",
            currentAccountId: 239152536,
            matchHistoryUri: "/v1/stats/player_history/NA1/239152536",
            profileIcon: 3587
            }
            },
            {
            participantId: 2,
            player: {
            platformId: "NA1",
            accountId: 46309262,
            summonerName: "CLG Auto",
            summonerId: 31588136,
            currentPlatformId: "NA1",
            currentAccountId: 46309262,
            matchHistoryUri: "/v1/stats/player_history/NA1/46309262",
            profileIcon: 543
            }
            },
            {
            participantId: 3,
            player: {
            platformId: "NA1",
            accountId: 202988570,
            summonerName: "TF Blade",
            summonerId: 40036262,
            currentPlatformId: "NA1",
            currentAccountId: 202988570,
            matchHistoryUri: "/v1/stats/player_history/NA1/202988570",
            profileIcon: 2075
            }
            },
            {
            participantId: 4,
            player: {
            platformId: "NA1",
            accountId: 44275610,
            summonerName: "Kumo9",
            summonerId: 30045762,
            currentPlatformId: "NA1",
            currentAccountId: 44275610,
            matchHistoryUri: "/v1/stats/player_history/NA1/44275610",
            profileIcon: 3150
            }
            },
            {
            participantId: 5,
            player: {
            platformId: "NA1",
            accountId: 208000448,
            summonerName: "lc0nic",
            summonerId: 45186258,
            currentPlatformId: "NA1",
            currentAccountId: 208000448,
            matchHistoryUri: "/v1/stats/player_history/NA1/208000448",
            profileIcon: 622
            }
            },
            {
            participantId: 6,
            player: {
            platformId: "NA1",
            accountId: 244134321,
            summonerName: "KatEvolved",
            summonerId: 91615420,
            currentPlatformId: "NA1",
            currentAccountId: 244134321,
            matchHistoryUri: "/v1/stats/player_history/NA1/244134321",
            profileIcon: 3270
            }
            },
            {
            participantId: 7,
            player: {
            platformId: "NA1",
            accountId: 48968551,
            summonerName: "Special Kay",
            summonerId: 34583468,
            currentPlatformId: "NA1",
            currentAccountId: 48968551,
            matchHistoryUri: "/v1/stats/player_history/NA1/48968551",
            profileIcon: 3507
            }
            },
            {
            participantId: 8,
            player: {
            platformId: "NA",
            accountId: 32968085,
            summonerName: "Wiggily",
            summonerId: 20130821,
            currentPlatformId: "NA1",
            currentAccountId: 32968085,
            matchHistoryUri: "/v1/stats/player_history/NA/32968085",
            profileIcon: 3554
            }
            },
            {
            participantId: 9,
            player: {
            platformId: "NA",
            accountId: 33374552,
            summonerName: "Proto Kaisa",
            summonerId: 20414291,
            currentPlatformId: "NA1",
            currentAccountId: 33374552,
            matchHistoryUri: "/v1/stats/player_history/NA/33374552",
            profileIcon: 3783
            }
            },
            {
            participantId: 10,
            player: {
            platformId: "NA1",
            accountId: 233688383,
            summonerName: "sóphist sage",
            summonerId: 76603307,
            currentPlatformId: "NA1",
            currentAccountId: 233688383,
            matchHistoryUri: "/v1/stats/player_history/NA1/233688383",
            profileIcon: 3587
            }
            }
            ]
        }
    ]
};
