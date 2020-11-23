import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import DarkTheme from "../contexts/ThemeContext";
import Grid from "@material-ui/core/Grid";
import { getCharacters } from "../lib/character";
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

    // Document effects: title and theme
    React.useEffect(() => {
        document.title = "RPG Tools";
        document.body.className = "darkmode";
    });

    // Loading initial data
    React.useEffect(() => {
        getCharacters().then(loadedCharacters => {
            setCharacters(loadedCharacters.map(character => ({
                ...character,
                id: character.name,
            })));
        });

        // TODO: pull scenario data from local storage
    }, []);

    // When a character is added to the scenario
    function handleAddCharacter(character) {
        // Should pull into utility so it saves in local storage
        setScenario({
            ...scenario,
            characters: scenario.characters.concat([{
                id: character.id,
                name: character.name,
                data: character,
                conditions: [],
                flags: character.flags,
                current: {
                    ...character.stats,
                },
            }]),
        });
    }

    // When a character is removed from the scenario
    function handleRemoveCharacter(character) {
        setScenario({
            ...scenario,
            characters: scenario.characters.filter(c => c.id !== character.id),
        });
    }

    // When a character has things changed about them in the scenario
    function handleUpdateCurrentCharacter(character, current) {
        setScenario({
            ...scenario,
            characters: scenario.characters.filter(c => c.id !== character.id).concat([{
                id: character.id,
                name: character.name,
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
