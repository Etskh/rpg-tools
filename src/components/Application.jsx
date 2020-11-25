import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import DarkTheme from "../contexts/ThemeContext";
import Grid from "@material-ui/core/Grid";
import {
    getAllCharacters,
    addCharacterToScenario,
    removeCharacterFromScenario,
    loadScenario,
    updateCharacter,
} from "../lib/scenario";
import {
    getConditions,
} from "../lib/conditions";
import AppBar from "./AppBar.jsx";
import InitiativeList from "./InitiativeList.jsx";
import CombatCard from "./CombatCard.jsx";

export default function Application() {
    // The selected character in the scenario
    const [selectedCharacterId, setSelectedCharacterId] = React.useState(null);
    // The current loaded scenario
    const [scenario, setScenario] = React.useState({
        name: "Unsaved Scenario",
        characters: [],
    });
    // All characters, in the scenario or not
    const [characters, setCharacters] = React.useState([]);
    // All conditions
    const [conditions, setConditions] = React.useState([]);

    // Document effects: title and theme
    React.useEffect(() => {
        document.title = "RPG Tools";
        document.body.className = "darkmode";
    });

    // Loading initial data
    React.useEffect(() => {
        getAllCharacters().then(loadedCharacters => {
            setCharacters(loadedCharacters.map(character => ({
                ...character,
                id: character.name,
            })));
        });
        
        loadScenario().then(scenario => {
            setScenario(scenario);
        });

        getConditions().then(loadedConditions => {
            setConditions(loadedConditions);
        });
    }, []);

    // When a character is added to the scenario
    function handleAddCharacter(character) {
        addCharacterToScenario(scenario, character).then(updatedScenario => {
            setScenario(updatedScenario);
        });
    }

    // When a character is removed from the scenario
    function handleRemoveCharacter(character) {
        removeCharacterFromScenario(scenario, character).then(updatedScenario => {
            setScenario(updatedScenario);
        });
    }

    // When a character has things changed about them in the scenario
    function handleUpdateCurrentCharacter(character, current) {
        updateCharacter(scenario, character, current).then(updatedScenario => {
            setScenario(updatedScenario);
        });
    }

    const selectedCharacter = scenario.characters.find(character => character.id === selectedCharacterId);

    return (
        <ThemeProvider theme={DarkTheme}>
            <AppBar
                scenario={scenario}
                characters={characters}
                onAddCharacter={handleAddCharacter}
            />
            <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
            >
                <InitiativeList
                    characters={scenario.characters}
                    onSelectCharacter={(characterId) => {
                        setSelectedCharacterId(characterId);
                    }}
                />
                {selectedCharacter && <CombatCard
                    character={selectedCharacter}
                    onRemoveCharacter={handleRemoveCharacter}
                    onUpdateCurrentCharacter={handleUpdateCurrentCharacter}
                />}
            </Grid>
        </ThemeProvider>
    );
}
