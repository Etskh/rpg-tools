import { getCreatures } from "./character";
import { computeRuleset } from "./rulesets";

// This function transforms the stat block obtained from parsing the creature
// and then computes it into ruleset-compatible format
function getNPCCharacters() {
    return getCreatures().then(creatures => {
        return creatures.map(creature => ({
            name: creature.name,
            type: creature.type,
            flags: creature.flags.concat([
                "NPC",
            ]),
            stats: {
                level: creature.level,
                //
                str: (creature.scores.str + 5) * 2,
                dex: (creature.scores.dex + 5) * 2,
                con: (creature.scores.con + 5) * 2,
                int: (creature.scores.int + 5) * 2,
                wis: (creature.scores.wis + 5) * 2,
                cha: (creature.scores.cha + 5) * 2,
                //
                base_ac_dc: creature.ac,
                base_hp: creature.hp,
                //
                fort_prof: (creature.saves.fort - creature.scores.con - creature.level) / 2,
                ref_prof: (creature.saves.ref - creature.scores.dex - creature.level) / 2,
                will_prof: (creature.saves.will - creature.scores.wis - creature.level) / 2,
                //
                equipped_armour_value: creature.ac - 10 - creature.scores.dex - creature.level,
            },
            baseStats: {
                ...creature,
            },
            config: {
                equipped_armour_type: "unarmoured",
            },
        }));
    });
}

// This is a placeholder, this should be data driven soon
// It contains the player data. It should be able to be saved somewhere
function getPartyCharacters() {
    const partyData = [{
        name: "Meatshield",
        type: "PC",
        stats: {
            level: 5,
            //
            str: 18,
            dex: 10,
            con: 14,
            wis: 10,
            int: 13,
            cha: 13,
            //
            equipped_armour_value: 6,
            //
            fort_prof: 2,
            will_prof: 1,
            ref_prof: 2,
            //
            skill_perception_prof: 1,
            skill_athletics_prof: 1,
            //
            attack_martial_prof: 1,
            //
            armour_unarmoured_prof: 0,
            armour_light_prof: 1,
            armour_medium_prof: 1,
            armour_heavy_prof: 1,
        },
        config: {
            equipped_armour_type: "heavy",
        },
        flags: [
            "male",
            "goblin",
            "fighter",
            "PC",
        ],
    }, {
        name: "Raspberry",
        type: "PC",
        stats: {
            level: 5,
            //
            str: 11,
            dex: 14,
            con: 13,
            wis: 8,
            int: 18,
            cha: 12,
            //
            equipped_armour_value: 0,
            //
            fort_prof: 1,
            will_prof: 2,
            ref_prof: 1,
            //
            skill_perception_prof: 1,
            skill_occultism_prof: 1,
            //
            attack_martial_prof: 0,
            //
            armour_unarmoured_prof: 1,
            armour_light_prof: 0,
            armour_medium_prof: 0,
            armour_heavy_prof: 0,
        },
        config: {
            equipped_armour_type: "unarmoured",
        },
        flags: [
            "female",
            "gnome",
            "witch",
            "PC",
        ],
    }, {
        name: "Rael",
        type: "PC",
        stats: {
            level: 5,
            //
            str: 11,
            dex: 13,
            con: 13,
            wis: 18,
            int: 12,
            cha: 13,
            //
            equipped_armour_value: 3,
            //
            fort_prof: 2,
            will_prof: 2,
            ref_prof: 1,
            //
            skill_perception_prof: 1,
            skill_occultism_prof: 1,
            //
            attack_martial_prof: 0,
            //
            armour_unarmoured_prof: 1,
            armour_light_prof: 1,
            armour_medium_prof: 1,
            armour_heavy_prof: 0,
        },
        config: {
            equipped_armour_type: "medium",
        },
        flags: [
            "androgynous",
            "elf",
            "cleric",
            "war priest",
            "PC",
        ],
    }, {
        name: "Benedict",
        type: "PC",
        stats: {
            level: 5,
            //
            str: 18,
            dex: 10,
            con: 14,
            wis: 14,
            int: 8,
            cha: 16,
            //
            equipped_armour_value: 5,
            //
            fort_prof: 2,
            will_prof: 2,
            ref_prof: 1,
            //
            skill_perception_prof: 1,
            skill_occultism_prof: 1,
            //
            attack_martial_prof: 0,
            //
            armour_unarmoured_prof: 1,
            armour_light_prof: 1,
            armour_medium_prof: 1,
            armour_heavy_prof: 1,
        },
        config: {
            equipped_armour_type: "heavy",
        },
        flags: [
            "male",
            "human",
            "paladin",
            "PC",
        ],
    }, {
        name: "Aurora",
        type: "PC",
        stats: {
            level: 5,
            //
            str: 11,
            dex: 14,
            con: 13,
            wis: 13,
            int: 18,
            cha: 10,
            //
            equipped_armour_value: 0,
            //
            fort_prof: 1,
            will_prof: 2,
            ref_prof: 1,
            //
            skill_perception_prof: 1,
            skill_arcana_prof: 1,
            //
            attack_martial_prof: 0,
            //
            armour_unarmoured_prof: 1,
            armour_light_prof: 0,
            armour_medium_prof: 0,
            armour_heavy_prof: 0,
        },
        config: {
            equipped_armour_type: "unarmoured",
        },
        flags: [
            "androgynous",
            "elf",
            "cleric",
            "war priest",
            "PC",
        ],
    }];
    return Promise.resolve(partyData);
}


export function getAllCharacters() {
    return Promise.all([
        getPartyCharacters(),
        getNPCCharacters(),
    ]).then(([ party, npcs]) => {
        return [
            ...party.map(computeRuleset),
            ...npcs.map(computeRuleset),
        ];
    });
}


export function loadScenario() {
    const newScenario = {
        name: "Unsaved Scenario",
        characters: [],
    };

    const scenario = localStorage.getItem("scenario");
    if(!scenario) {
        return Promise.resolve(newScenario);
    }
    try {
        return Promise.resolve(JSON.parse(scenario));
    }
    catch(err) {
        console.warn(err);
        return Promise.resolve(newScenario);
    }
}

export function saveScenario(scenario) {
    localStorage.setItem("scenario", JSON.stringify(scenario));
    return Promise.resolve(scenario);
}


export function addCharacterToScenario(scenario, character) {
    return saveScenario({
        ...scenario,
        characters: scenario.characters.concat([{
            id: character.id,
            name: character.name,
            type: character.type,
            data: character,
            conditions: [],
            flags: character.flags,
            current: {
                ...character.stats,
                max_hp: character.stats.hp,
            },
        }]),
    });
}

export function removeCharacterFromScenario(scenario, character) {
    return saveScenario({
        ...scenario,
        characters: scenario.characters.filter(c => c.id !== character.id),
    });
}

export function updateCharacter(scenario, character, current) {
    return saveScenario({
        ...scenario,
        characters: scenario.characters.filter(c => c.id !== character.id).concat([{
            id: character.id,
            name: character.name,
            type: character.type,
            data: character,
            conditions: [],
            flags: character.flags,
            current: {
                ...character.current,
                ...current,
            },
        }]),
    });
}

export function renameScenario(scenario, newName) {
    return saveScenario({
        ...scenario,
        name: newName,
    });
}