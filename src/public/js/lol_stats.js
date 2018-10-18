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

const LoLMatch = ({ summonerName, gameId  }) => {
    return (
        <li>
            <div>{summonerName}: match with id {gameId}</div>
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
    }, 2000);
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
            participants: [],
            participantIdentities: []
        }
    ]
};
