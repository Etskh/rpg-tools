import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import DarkTheme from "../contexts/ThemeContext";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from "@material-ui/core/Toolbar";
// import Typography from "@material-ui/core/Typography";
// import Button from "@material-ui/core/Button";
// import IconButton from "@material-ui/core/IconButton";
// import MenuIcon from "@material-ui/icons/Menu";
// import PersonAddIcon from "@material-ui/icons/PersonAdd";


import AppBar from "./AppBar.jsx";

import { getCharacters } from "../lib/character";

// TODO: pull into module
import InitiativeList from "./InitiativeList.jsx";
import CombatCard from "./CombatCard.jsx";


// const characterDatabase = [{
//     name: "Benedict",
//     stats: {
//         ac: 18,
//         fort: 15,
//         ref: 7,
//         will: 10,
//     },
// }, {
//     name: "Meatshield",
//     stats: {
//         ac: 21,
//         fort: 13,
//         ref: 10,
//         will: 9,
//     },
//     conditions: [{
//         name: "Raise Shield",
//         ac: 2,
//     }],
// }, {
//     name: "Raspberry",
//     stats: {
//         ac: 21,
//         fort: 7,
//         ref: 7,
//         will: 13,
//     },
// }, {
//     name: "Aurora",
//     stats: {
//         ac: 21,
//         fort: 9,
//         ref: 10,
//         will: 13,
//     },
// }, {
//     name: "Rael",
//     stats: {
//         ac: 22,
//         fort: 10,
//         ref: 9,
//         will: 13,
//     },
// }];

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));
  

export default function Application() {
    const classes = useStyles();

    const [selectedCharacterId, setSelectedCharacterId] = React.useState(null);

    const [scenario, setScenario] = React.useState({
        name: 'Unsaved Scenario',
        characters: [],
    });

    const [characters, setCharacters] = React.useState([]);

    React.useEffect(() => {
        document.title = "RPG Tools";
        document.body.className = "darkmode";
    });

    React.useEffect(() => {
        getCharacters().then(loadedCharacters => {
            setCharacters(loadedCharacters.map(character => ({
                ...character,
                id: character.name,
            })));
        })
    }, []);

    function handleAddCharacter(character) {
        setScenario({
            ...scenario,
            characters: scenario.characters.concat([{
                id: character.id,
                name: character.name,
                data: character,
                current: {
                    stats: character.stats,
                    hp: character.hp,
                    conditions: []
                },
            }]),
        });
    }

    function handleRemoveCharacter(character) {
        setScenario({
            ...scenario,
            characters: scenario.characters.filter(c => c.id !== character.id),
        });
    }

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
                <CombatCard
                    character={scenario.characters.find(character => character.id === selectedCharacterId)}
                    onRemoveCharacter={() => {
                        handleRemoveCharacter(scenario.characters.find(character => character.id === selectedCharacterId));
                    }}
                />
            </Grid>
        </ThemeProvider>
    );
}