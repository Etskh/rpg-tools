
const baseStats = [
    "str",
    "con",
    "dex",
    "int",
    "wis",
    "cha",
];

const saves = [
    { stat: "con", name: "fort" },
    { stat: "dex", name: "ref" },
    { stat: "wis", name: "will" },
];

const skills = {
    "acrobatics": "dex",
    "arcana": "int",
    "athletics": "str",
    "crafting": "int",
    "deception": "cha",
    "diplomacy": "cha",
    "intimidation": "cha",
    "lore": "int",
    "medicine": "wis",
    "nature": "wis",
    "occultism": "int",
    "performance": "cha",
    "society": "int",
    "stealth": "dex",
    "survival": "wis",
    "thievery": "dex",
};

const armours = [
    "unarmoured",
    "light",
    "medium",
    "heavy",
];

const equipmentStats = [
    "armour_value",
    "weapon_attack",
];

const availableFlags = [{
    name: "equipped_armour_type",
    values: armours,
}];


function getProf(stats, profName, score) {
    return stats[`${profName}_prof`] * 2 + stats.level + stats[`${score}_mod`];
}


function addNextGeneration(base, next, flags) {
    if(next.length === 0) {
        return base;
    }

    // Shortlist those we can add because their parents exist
    const nextWeCanAdd = next.filter(stat => {
        // Go through the needs, and see that each is in base
        return typeof base[stat.name] === "number" || stat.needs.reduce((acc, cur) => {
            return typeof base[cur] === "number" && acc;
        }, true); // true because if needs === 0 we can add it
    });
    const wontAdd = next.filter(stat => {
        return typeof base[stat.name] !== "number" && stat.needs.reduce((acc, cur) => {
            return typeof base[cur] !== "number" || acc;
        }, false);
    });
    console.log("To add next:", nextWeCanAdd, wontAdd);
    if(nextWeCanAdd.length === 0) {
        console.warn(`Couldn't add the rest of ${JSON.stringify(next)}`);
        return base;
    }

    // Return the base, plus new stuff
    const nextBase = nextWeCanAdd.reduce((acc, stat) =>({
        ...acc,
        // FIXME: Add getValue arguments here 
        [stat.name]: stat.getValue(base, flags),
    }), base);

    // If there remains more next entries, then recurse
    if(nextWeCanAdd.length > 1) {
        return addNextGeneration(nextBase, wontAdd, flags);
    }

    // Otherwise return our nextBase
    return nextBase;
}

/*
idea; follow along with a programmer and generaize the changes they make
in their code. For example, what kind of mistake is mixing up "<" with ">"?

How do we avoid that mistake?
*/


function addGenerationsToStats(base, stats, flags) {
    // a generation is the largest parent's generation
    // a stats's default gen is 1 if no parents

    const baseWithoutGen1Stats = stats.filter(stat => stat.needs.length > 0);

    // TODO: check that all base1gen is in base or set them to 0
    const startingStats = stats.filter(stat => {
        return stat.needs.length === 0;
    }).reduce((acc, stat) => ({
        ...acc,
        [stat.name]: base[stat.name] || 0,
    }), base);

    // Return the recursive function result

    return addNextGeneration(startingStats, baseWithoutGen1Stats, flags);
}


function getRuleset() {

    // export function getRuleset() {
    return []
        .concat([{
            name: "level",
        }])
        // str, dex, con, ...
        .concat(baseStats.map(stat => ({
            name: stat,
        })))
        // str_mod, dex_mod, con_mod, ...
        .concat(baseStats.map(stat => ({
            name: `${stat}_mod`,
            needs: [stat],
            getValue: (stats) => {
                return Math.floor((stats[stat] / 2) - 5);
            },
        })))
        // fort_prof, ref_prof, will_prof
        .concat(saves.map(save => ({
            name: `${save.name}_prof`,
        })))
        // skill_athletics_prof
        .concat(Object.keys(skills).map(skill => ({
            name: `skill_${skill}_prof`,
        })))
        // skill_athletics_check, skill_acrobatics_check
        .concat(Object.keys(skills).map(skill => ({
            name: `skill_${skill}_check`,
            needs: [`skill_${skill}_prof`, `${skills[skill]}_mod`],
            getValue: (stats) => {
                return getProf(stats, `skill_${skill}`, skills[skill]);
            },
        })))
        // armour_unarmoured_prof, etc,
        .concat(armours.map(armour => ({
            name: `armour_${armour}_prof`,
        })))
        // equipped_armour_value, etc
        .concat(equipmentStats.map(stat => ({
            name: `equipped_${stat}`,
        })))
        // fort_check, ref_check, will_check
        .concat(saves.map(save => ({
            name: `${save.name}_check`,
            needs: ["level", `${save.name}_prof`, `${save.stat}_mod`],
            getValue: (stats) => {
                return getProf(stats, save.name, save.stat);
            },
        })))
        // fort_dc, ref_dc, will_dc
        // FIXME: This will run because the needs is a number, despite being 0
        //          it's important to not set them all to zero, or have a different initial value
        .concat(saves.map(save => ({
            name: `${save.name}_dc`,
            needs: [`${save.name}_check`],
            getValue: (stats) => {
                console.log("stats check ", stats);
                return stats[`${save.name}_check`] + 10;
            },
        })))
        // ac_dc
        .concat([{
            name: "ac_check",
            needs: [
                "level",
                "armour_unarmoured_prof",
                "armour_light_prof",
                "armour_medium_prof",
                "armour_heavy_prof",
                "dex_mod",
                "equipped_armour_value",
            ],
            getValue: (stats, flags) => {
                const armourType = flags["equipped_armour_type"];
                return getProf(stats, `armour_${armourType}`, "dex") + stats.equipped_armour_value;
            },
        }])
        .map(stat => ({
            ...stat,
            getValue: stat.getValue || function() { return 0; },
            needs: stat.needs || [],
        }));
}



function computeRuleset({ name, stats, flags }) {
    const ruleset = getRuleset();

    // TODO: Check flags against availableFlags

    return {
        name,
        baseStats: stats,
        ruleset,
        flags,
        stats: addGenerationsToStats(stats, ruleset, flags),
    };
}

function getCharacterData() {
    return {
        name: "Gerald",
        stats: {
            level: 3,
            //
            str: 12,
            dex: 18,
            con: 17,
            wis: 6,
            int: 14,
            cha: 15,
            //
            equipped_armour_value: 2, // armour ac
            //
            fort_prof: 1, // 1: trained
            //
            athletics_prof: 2, // 2: expert
            //
            attack_martial_prof: 1, // 1: trained
            //
            armour_light_prof: 1, // 1: trained
        },
        flags: {
            equipped_armour_type: "light",
        },
    };
}



console.log(computeRuleset(getCharacterData()));


