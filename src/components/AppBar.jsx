import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import DarkTheme from "../contexts/ThemeContext";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import PersonSharpIcon from "@material-ui/icons/PersonSharp";

import PersonAddIcon from "@material-ui/icons/PersonAdd";

import { getCharacters } from "../lib/character";

// TODO: pull into module
import InitiativeList from "./InitiativeList.jsx";
import CombatCard from "./CombatCard.jsx";



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
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));


export default function ApplicationAppBar({
    scenario,
    characters,
    onAddCharacter,
}) {
    const classes = useStyles();
    const [isCharacterModalOpen, setIsCharacterModalOpen] = React.useState(false);

    function handleAddCharacter(character) {
        setIsCharacterModalOpen(false);
        const addedCharacter = characters.find(c => c.id === character.id);
        onAddCharacter(addedCharacter);
    }

    const [addableCharacters, setAddableCharacters] = React.useState([]);

    React.useEffect(() => {
        const characterList = characters.map(character => ({
                id: character.id,
                name: character.name,
                level: character.stats.level,
                isAdded: !!(scenario.characters.find(c => c.id === character.id)),
        }));
        // Sort alphabetically
        characterList.sort((a, b) => {
            return b.name - a.name
        })
        // Then sortby if it's already in the scenario
        characterList.sort((a) => {
            return a.isAdded ? 1 : -1;
        });

        setAddableCharacters(characterList);
    }, [scenario, characters]);

    return (
        <AppBar position="static" color="default">
            <Toolbar variant="dense">
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    <MenuIcon />
                </IconButton>
                <Typography variant="h3" className={classes.title} color="inherit">
                    Combat
                </Typography>
                <Typography variant="h6" className={classes.title} color="inherit">
                    {scenario.name}
                </Typography>
                <IconButton aria-label="display more actions" edge="end" color="inherit" onClick={() => setIsCharacterModalOpen(true)}>
                    <PersonAddIcon />
                </IconButton>
                <SwipeableDrawer
                    anchor="right"
                    open={isCharacterModalOpen}
                    onClose={() => setIsCharacterModalOpen(false)}
                    onOpen={() => setIsCharacterModalOpen(true)}
                >
                    <Container>
                        <h2 id="transition-modal-title">Add NPC to scenario</h2>
                        {/* <p>Search will go here</p> */}
                        <List>
                            {addableCharacters.map(character => (
                                <ListItem
                                    key={character.id}
                                    button
                                    disabled={character.isAdded}
                                    onClick={() => handleAddCharacter(character)}
                                >
                                    <ListItemText
                                        primary={character.name}
                                        secondary={character.isAdded ? 'Already added' : (`Level ${character.level}`)}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Container>
                </SwipeableDrawer>
            </Toolbar>
        </AppBar>
    );
}