// TODO: Rename to creature* instead of character

const creatureBlocks = [`
Gnoll Hunter
Creature 2
CEMediumGnollHumanoid
Source Bestiary pg. 178
Perception +7; darkvision
Languages Gnoll
Skills Acrobatics +7, Athletics +8, Intimidation +4, Stealth +7, Survival +5
Str +4, Dex +3, Con +2, Int -1, Wis +1, Cha +0
Items battle axe, leather armor, shortbow (20 arrows)
AC 18; Fort +8, Ref +7, Will +7
HP 29
Speed 25 feet
Melee Single Action battle axe +10 [+5/+0] (sweep), Damage 1d8+4 slashing
Melee Single Action jaws +10 [+6/+2] (agile), Damage 1d8+2 piercing
Ranged Single Action shortbow +10 [+5/+0] (deadly 1d10, range increment 60 feet), Damage 1d6 piercing
Pack Attack A gnoll hunter deals 1d4 extra damage to any creature that’s within reach of at least two of the gnoll hunter’s allies.
Rugged Travel A gnoll ignores the first square of difficult terrain it moves into each time it Steps or Strides.
`,`
Gnoll Cultist
Creature 3
CEMediumGnollHumanoid
Source Bestiary pg. 179
Perception +8; darkvision
Languages Abyssal, Common, Gnoll
Skills Intimidation +7, Medicine +7, Religion +10, Stealth +7, Survival +8
Str +2, Dex +2, Con +0, Int +0, Wis +3, Cha +2
Items falchion, hide armor, wooden religious symbol
AC 19; Fort +8, Ref +6, Will +10
HP 45
Speed 25 feet
Melee Single Action falchion +10 [+5/+0] (forceful, sweep), Damage 1d10+3 slashing
Melee Single Action jaws +10 [+6/+2] (agile), Damage 1d6+3 piercing
Divine Prepared Spells DC 22, spell attack +10; 2nd darkness, harm (x4), spiritual weapon; 1st command, fear, magic weapon; Cantrips (2nd) daze, detect magic, light, read aura, sigil
Pack Attack A gnoll cultist deals 1d4 extra damage to any creature that’s within reach of at least two of the gnoll cultist's allies.
Rugged Travel A gnoll ignores the first square of difficult terrain it moves into each time it Steps or Strides.
`,`
Cacodaemon
Creature 1
NETinyDaemonFiend
Source Bestiary pg. 70
Perception +6; darkvision
Languages Common, Daemonic; telepathy 100 feet
Skills Acrobatics +8, Deception +5, Religion +6, Stealth +8
Str +0, Dex +3, Con +2, Int -1, Wis +1, Cha +2
AC 16; Fort +7, Ref +8, Will +6
HP 22; Immunities death effects; Weaknesses good 3
Speed 5 feet, fly 40 feet
Melee Single Action jaws +8 [+4/+0] (agile, disease, evil, finesse, magical), Damage 1d8 piercing plus 1d4 evil and cacodaemonia
Divine Innate Spells DC 17; 4th read omens; 2nd invisibility (at will; self only); 1st detect alignment (at will; good only), fear; Cantrips (1st) detect magic
Cacodaemonia (disease) The cacodaemon can telepathically communicate with the afflicted creature at any distance on the same plane; Saving Throw DC 17 Fortitude; Stage 1 carrier (1 day); Stage 2 stupefied 1 (1 day); Stage 3 stupefied 2 (1 day)
Change Shape Single Action (concentrate, divine, polymorph, transmutation)
Lizard Speed 20 feet; Melee jaws +8 (agile, finesse), Damage 1d8+1 piercing
Octopus size Small; Speed 20 feet, swim 30 feet; Melee tentacle +8 (finesse), Damage 1d8+1 bludgeoning plus Grab; Melee beak +8 (agile, finesse), Damage 1d6 piercing plus 2 poison
Scorpion size Small; Speed 30 feet; Melee pincer +8 (agile, finesse), Damage 1d6+1 bludgeoning plus Grab; Melee stinger +8 (agile, finesse), Damage 1d6+1 piercing plus 1d4 poison
Soul Lock Three Actions (death, divine, necromancy) Once per day, a cacodaemon can ingest the soul of a sentient creature within 30 feet that died within the last minute. When it does, the cacodaemon grows a fist-sized soul gem (Hardness 2, HP 8) in its gut and can regurgitate it at any time as an Interact action. Destroying the gem frees the soul within but does not return the deceased creature to life. The caster of a spell to return a creature to life whose soul is trapped within a soul gem must succeed at a DC 30 Religion check. On a success, the soul gem shatters and the creature is returned to life as normal for the spell.
By using an Interact action, a fiend can ingest a soul gem it is holding, condemning the soul to the fiend’s home plane. The fiend gains fast healing 5 for 1 minute.
`, `
Skeletal Giant
Creature 3
NELargeMindlessSkeletonUndead
Source Bestiary pg. 299
Perception +7; darkvision
Skills Athletics +12, Intimidation +9
Str +5, Dex +1, Con +3, Int -5, Wis +0, Cha +2
Items glaive, half plate
AC 17; Fort +10, Ref +8, Will +7
HP 50 (negative healing); Immunities death effects, disease, mental, paralyzed, poison, unconscious; Resistances cold 5, electricity 5, fire 5, piercing 5, slashing 5
Speed 30 feet
Melee Single Action glaive +12 [+7/+2] (deadly d8, forceful, reach 15 feet), Damage 1d8+7 slashing
Melee Single Action horns +12 [+8/+4] (agile), Damage 1d10+5 piercing
Broad Swipe Two Actions The giant makes two Strikes with its glaive against two adjacent foes, both of whom are within its reach. The multiple attack penalty does not increase until after both attacks are resolved.
Terrifying Charge Two Actions The giant Strides and makes a horns Strike with a +4 circumstance bonus to damage. If the strike hits, the giant attempts to Demoralize the target.
`];


export function getLineOfStats(text) {
    return text.split(",").reduce((acc, statText) => {
        const stat = statText.trim().split(" ");
        return {
            ...acc,
            [stat[0].toLowerCase()]: parseInt(stat[1]),
        };
    }, {});
}

export function parseFlags(text) {
    const alignmentFlags = text
        .match(/([A-Z])+/g).map(flag => flag.substring(0, flag.length - 1))
        .filter(flag => flag.length > 0);

    return alignmentFlags.concat(text.match(/([A-Z][a-z]+)/g));
}

export function extractLists(texts, list) {
    return texts.reduce((acc, text) => {
        const correctThing = list.find(t => text.trim().startsWith(t));
        if(!correctThing) {
            return acc;
        }
        return {
            ...acc,
            [correctThing]: text
                .trim()
                .substring(correctThing.length)
                .split(",")
                .map(t => t.trim()),
        };
    }, {});
}


// TODO: test
function createTypeFromBlock(infoBlock) {
    const infoLines = infoBlock.trim().split("\n");
    return infoLines.reduce((acc, cur) => {

        if(cur.startsWith("Languages")) {
            // TODO: pull out extra-sense abilities (Telepathy)
            acc.languages = cur.substring(10).split(",").map(lang => lang.trim());
        }

        if(cur.startsWith("Str")) {
            acc.stats = getLineOfStats(cur);
        }

        if(cur.startsWith("HP")) {
            
            const hitpoints = cur.split(";");
            const hp = hitpoints.shift();
            acc.hp = parseInt(hp.split(" ")[1]);
            acc.isHealedNegative = hp.includes("negative healing");
            const hpTraits = extractLists(hitpoints, ["Immunities", "Weaknesses", "Resistances"]);
            acc.hpTraits = hpTraits;
            // TODO: pull out immunities, vunerabilities, and weaknesses
            // acc.hp = parseInt(cur.split(" ")[1]);
        }

        if(cur.startsWith("Creature")) {
            acc.level = parseInt(cur.split(" ")[1]);
        }

        if(cur.startsWith("Skills")) {
            acc.skills = getLineOfStats(cur.substring(7));
        }

        if(cur.startsWith("Speed")) {
            // TODO: pull out different speeds
            acc.speed = parseInt(cur.split(" ")[1]);
        }

        if(cur.startsWith("AC")) {
            const defenses = cur.split(";");
            acc.ac = parseInt(defenses[0].split(" ")[1]);
            acc.saves = getLineOfStats(defenses[1]);
        }

        return acc;
    }, {
        name: infoLines[0],
        flags: parseFlags(infoLines[2]),
    });
}


// TODO: test
function applyDeltas(character, deltas) {
    return Object.keys(deltas).reduce((acc, fieldName) => {
        if(typeof deltas[fieldName] === "object") {
            return {
                ...acc,
                [fieldName]: Object.keys(character[fieldName]).reduce((acc, stat) => ({
                    ...acc,
                    [stat]: (character[fieldName][stat] || 0) + (deltas[fieldName][stat] || 0),
                }), {}),
            };
        }

        return {
            ...acc,
            [fieldName]: (character[fieldName] || 0) + (deltas[fieldName] || 0),
        };
    }, character);
}


// TODO: test
function getTemplates() {
    return Promise.resolve([{
        name: "Weak Adjustment",
        translate: (character) => applyDeltas(character, {
            ac: -2,
            stats: {
                str: -2,
                con: -2,
                dex: -2,
                int: -2,
                wis: -2,
                cha: -2,
            },
            saves: {
                fort: -2,
                ref: -2,
                will: -2,
            },
            hp: (() => {
                if(character.level < 3) return -10;
                if(character.level < 6) return -15;
                if(character.level < 21) return -20;
                return -30;
            })(),
        }),
    }, {
        name: "Elite Adjustment",
        translate: (character) => applyDeltas(character, {
            ac: 2,
            stats: {
                str: 2,
                con: 2,
                dex: 2,
                int: 2,
                wis: 2,
                cha: 2,
            },
            saves: {
                fort: 2,
                ref: 2,
                will: 2,
            },
            hp: (() => {
                if(character.level < 2) return 10;
                if(character.level < 5) return 15;
                if(character.level < 20) return 20;
                return 30;
            })(),
        }),
    }, {
        name: "Zombie",
    }, {
        name: "Vampire",
    }, {
        name: "Skeleton",
        flags: [
            "Mindless",
            "Undead",
            "Skeleton",
        ],
        translate: (character) => applyDeltas(character, {
            stats: {
                // empty
            },
        }),
    }]);
}


// TODO: test
function getCreatureType() {
    return Promise.resolve(creatureBlocks.map(block => createTypeFromBlock(block)));
}


// TODO: test
function getCreatureData() {
    return Promise.resolve([{
        name: "Hax",
        template: "Weak Adjustment",
        type: "Gnoll Hunter",
        flags: [
            "Male",
        ],
    }, {
        name: "Zig",
        template: "Skeleton",
        type: "Gnoll Hunter",
        flags: [
            "Male",
            "Friendly",
        ],
    }, {
        name: "Zag",
        type: "Gnoll Hunter",
        flags: [
            "Male",
            "Friendly",
        ],
    }, {
        name: "G'Kath",
        type: "Cacodaemon",
        template: "Elite Adjustment",
    }, {
        name: "Faust",
        type: "Skeletal Giant",
        template: "Elite Adjustment",
    }, {
        name: "Fiora",
        type: "Skeletal Giant",
    }]);
}


export function getCreatures() {
    return Promise.all([
        getTemplates(),
        getCreatureType(),
        getCreatureData(),
    ]).then(([templates, types, data]) => {

        return data.map(character => {

            const creatureType = types.find(type => type.name === character.type);
            if(!creatureType) {
                return null;
            }

            const template = templates.find(template => template.name === character.template) || {
                name: "",
                translate: () => creatureType,
            };
            const computedCreature = template.translate(creatureType);
            
            console.log(computedCreature);

            return {
                name: character.name,
                level: creatureType.level,
                type: `${creatureType.name} ${template.name}`,
                ac: computedCreature.ac,
                saves: computedCreature.saves,
                hp: computedCreature.hp,
                hpTraits: computedCreature.hpTraits,
                skills: computedCreature.skills,
                scores: computedCreature.stats,
                languages: creatureType.languages,
                items: [],
                resistances: computedCreature.hpTraits.Resistances,
                flags: [
                    ...character.flags || [],
                    ...creatureType.flags || [],
                    ...template.flags || [],
                ],
            };
        });
    });
}
