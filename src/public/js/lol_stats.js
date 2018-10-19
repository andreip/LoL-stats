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

const LoLMatch = ({ accountId, summonerName, ...match }) => {

    let info = R.pipe(
        extractInfoFromMatch,
        prettifyMatchValues
    )(accountId, match);

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

    const outcomeEntry = R.find(R.propEq('text', 'Outcome'), info);
    console.log("outcome", outcomeEntry);

    return (
        <li>
            <table className={outcomeEntry.pretty}>
                <tbody>
                    {tableRows}
                </tbody>
            </table>
        </li>
    );
};

const LoLTitle = ({ name, n }) => {
    if (name) {
        return (
            <h2>Most recent {n} matches for {name}</h2>
        );
    } else {
        return (
            <h2>No matches</h2>
        );
    }
};

const LoLMatchList = ({ searching, summonerName, accountId, matches, err }) => {
    if (err) {
        return <h2>{err}</h2>;
    }

    if (searching) {
        return <h2>Searching matches for {summonerName}...</h2>;
    }

    const nodes = matches.map((match, idx) => {
        return (
            <LoLMatch key={idx} accountId={accountId} summonerName={summonerName} {...match} />
        );
    });

    return (
        <div>
            <LoLTitle n={matches.length} name={summonerName} />
            <ul>{nodes}</ul>
        </div>
    );
};

class LoLStatsApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        summonerName: '',
        accountId: null,
        matches: [],
        searching: false,
        err: null,
    };
  }

  doSearch(summonerName) {
    this.setState({ err: null, searching: true, matches: [], summonerName });
    fetch(`/summoner/${summonerName}/most-recent-matches`)
        .then(resp => resp.json())
        .then(data => {
            console.log('parsed json', data)
            this.setState({ searching: false, ...data });
        }).catch(ex => {
          console.log('parsing failed', ex)
          this.setState({err: `Failed to fetch matches for ${summonerName}`});
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
