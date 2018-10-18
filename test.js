const assert = require('assert');
const utils = require('./utils.js');

describe("Summoner Name regex", function() {
    it("should accept regular names", function() {
        assert(utils.summonerNameRegex.test("Summoner Name"));
        assert(utils.summonerNameRegex.test("123._name"));
    });

    it("should accept unicode names", function() {
        assert(utils.summonerNameRegex.test("Русский"));
    });

    it("should not accept other stuff", function() {
        assert.equal(utils.summonerNameRegex.test(";()= {}"), false);
    });
});

