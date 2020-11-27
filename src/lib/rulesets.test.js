import {
    getProf,
    getRuleset,
} from "./rulesets";

test("getProf", () => {
    const stats = {
        "level": 1,
        "athletics_prof": 3,
        "dex_mod": 2,
    };
    expect(getProf(stats, "athletics", "dex")).toBe(9);
    expect(() => {
        // This will throw because there's no stat block
        getProf();
    }).toThrow();
    expect(() => {
        // this will throw because we don't have arcana or int
        getProf(stats, "arcana", "int");
    }).toThrow();
});

test("getRuleset", () => {
    const ruleset = getRuleset();

    expect(ruleset).toHaveLength(60);
    ruleset.forEach(stat => {
        expect(stat.name).toBeDefined();
        expect(stat.needs).toBeDefined();
        expect(stat.getValue).toBeDefined();
    });
});