import PropTypes from "prop-types";
// This is a utility to parse the creature block and turn it into a choice list

// Choice list is what a ruleset takes to give a character object

// A character object can be used

// Parse the block into useable stats
// Compute the base stats based on numbers
// Create the choices the creature had based on its base
// Reconstruct the creature based on ruleset (ruleset)




const models = [{
    name: "Ruleset",
    // This represents the ruleset and has all the math to do with the game in its
    // dataset
    data: {
        stats: PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string,
            // Which stats this stat needs to be able to compute
            needs: PropTypes.arrayOf(PropTypes.string),
            // How to get the value of the stat
            getValue: PropTypes.func,
        })),
    },
}, {
    name: "Creature Block",
    data: {
        name: PropTypes.string,
        blockText: PropTypes.string,
    },
}, {
    name: "Choice List",
    // These are the different types of characters you can create from, and they
    // represent an object that can be consumed by ruleset to create a character
    data: {
        id: PropTypes.string,
        name: PropTypes.string,
        stats: PropTypes.object,
    },
}, {
    name: "Character",
    data: {
        id: PropTypes.string,
        name: PropTypes.string,
        choicesId: PropTypes.string,
        stats: PropTypes.object,
    },
}, {
    name: "Scenario Character",
    data: {
        name: PropTypes.string,
        characterId: PropTypes.string,
        current: PropTypes.object,
    },
}];