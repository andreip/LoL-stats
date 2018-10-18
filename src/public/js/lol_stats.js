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
  }

  doSearch(summonerName) {
    this.setState({ searching: true, matches: [], summonerName });
    fetch(`/summoner/${summonerName}/most-recent-matches`)
        .then(resp => resp.json())
        .then(data => {
            console.log('parsed json', data)
            this.setState({ searching: false, ...data });
        }).catch(ex => {
          console.log('parsing failed', ex)
        })
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
