const XRegExp = require('xregexp');

exports.summonerNameRegex = XRegExp("^[0-9 ._\\p{L}]+$");
