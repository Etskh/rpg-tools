import {
    getLineOfStats,
    parseFlags,
} from "./character";

test("getLineOfStats from line", () => {
    expect(getLineOfStats("Str +5, Dex +1, Con +3, Int -5, Wis +0, Cha +2")).toStrictEqual({
        str: 5,
        dex: 1,
        con: 3,
        int: -5,
        wis: 0,
        cha: 2,
    });
});

test("parseFlags", () => {
    expect(parseFlags("NETinyDaemonFiend")).toStrictEqual(["NE", "Tiny", "Daemon", "Fiend"]);
});

