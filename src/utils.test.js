import assert from 'assert';
import { summonerNameRegex } from './utils';

describe("Summoner Name regex", function() {
    it("should accept regular names", function() {
        assert(summonerNameRegex.test("Summoner Name"));
        assert(summonerNameRegex.test("123._name"));
    });

    it("should accept unicode names", function() {
        assert(summonerNameRegex.test("Русский"));
    });

    it("should not accept other stuff", function() {
        assert.equal(summonerNameRegex.test(";()= {}"), false);
    });
});

