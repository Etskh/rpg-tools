import PropTypes from "prop-types";
// This is a utility to parse the creature block and turn it into a choice list

// Choice list is what a ruleset takes to give a character object

// A character object can be used

// Parse the block into useable stats
// Compute the base stats based on numbers
// Create the choices the creature had based on its base
// Reconstruct the creature based on ruleset (ruleset)




const models = {
    name: 'Ruleset',
    data: {
        stats: PropTypes.arrayOf(PropTypes.shape())
    }
}