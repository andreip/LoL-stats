const multiKills = ['doubleKills', 'tripleKills', 'quadraKills', 'pentaKills', 'unrealKills'];

function extractInfoFromMatch(accountId, match) {
    const participant = match.participantIdentities.find(p => p.player.accountId == accountId);
    console.log("Participant", participant);

    if (!participant) {
        console.error(`Something went wrong, couldn't find participant with accountId ${accountId}`);
        return null;
    }

    const participantId = participant.participantId;
    const participantInfo = match.participants.find(p => p.participantId == participantId);
    console.log("Participant info", participantInfo);

    if (!participantInfo) {
        console.error(`Something went wrong, couldn't find participant info for id ${participantId}`);
        return null;
    }

    const stats = participantInfo.stats;

    return [
        {text: "Game Id", value: match.gameId},
        {text: "Outcome", value: stats.win},
        {text: "Duration", value: match.gameDuration},
        {text: "Summoner Name", value: participant.player.summonerName},
        {text: "First Summoner Spell", value: participantInfo.spell1Id},
        {text: "Second Summoner Spell", value: participantInfo.spell2Id},
        {
            text: "Runes",
            value: R.pipe(
                R.pickBy((v, k) => R.test(/^perk\d$/, k)),
                R.values,
                R.filter(v => v > 0),
            )(stats)
        },
        {text: "Champion Id", value: participantInfo.championId},
        {text: "KDA", value: {k: stats.kills, d: stats.deaths, a: stats.assists}},
        {text: "Champion Level", value: stats.champLevel},
        {
            text: "Item ids",
            value: R.pipe(
                R.pickBy((v, k) => R.test(/^item\d$/, k)),
                R.values,
                R.filter(v => v > 0),
            )(stats)
        },
        {
            text: "MultiKills",
            value: R.pipe(
                R.pick(multiKills),
                R.filter((v, k) => v > 0),
                R.toPairs,
            )(stats)
        }
    ];
}

function prettifyMatchValues(matchInfo) {
    console.log("match info", matchInfo);
    return matchInfo.map(({text, value}) => {
        let pretty = null;

        if (text == "Outcome") {
            pretty = value ? "win" : "defeat";
        } else if (text == "Duration") {
            let seconds = value;
            const days = Math.floor(seconds / (3600*24));
            seconds  -= days*3600*24;
            const hrs   = Math.floor(seconds / 3600);
            seconds  -= hrs*3600;
            const mnts = Math.floor(seconds / 60);
            seconds  -= mnts*60;
            const parts_with_suffixes = [[days, 'd'], [hrs, 'h'], [mnts, 'm'], [seconds, 's']];

            pretty = parts_with_suffixes.filter(e => e[0] > 0).map(e => `${e[0]}${e[1]}`).join(" ");
        } else if (text == "Runes") {
            pretty = value.join(", ");
        } else if (text == "KDA") {
            let {k, d, a} = value;
            pretty = `${k} / ${d} / ${a}`;
        } else if (text == "Item ids") {
            pretty = value.join(", ");
        } else if (text == "MultiKills") {
            // 0 doubleKills, 1 tripleKills etc.
            pretty = value.map(kill => `${kill[1]} ${kill[0]}`).join(", ");
        } else {
            pretty = value;
        }

        return {text, value, pretty};
    });
}
