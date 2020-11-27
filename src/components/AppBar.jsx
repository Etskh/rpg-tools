import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";


const useStyles = makeStyles((theme) => ({
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        cursor: "pointer",
    },
}));


export default function ApplicationAppBar({
    scenario,
    characters,
    onAddCharacter,
}) {
    const classes = useStyles();
    const [isCharacterModalOpen, setIsCharacterModalOpen] = React.useState(false);
    const [isBulkAdd, setBulkAdd] = React.useState(false);
    const [addableCharacters, setAddableCharacters] = React.useState([]);
    const [isScenarioModalOpen, setIsScenarioModalOpen] = React.useState(false);

    function handleAddCharacter(character) {
        // If bulk add is off, then close the panel
        if(!isBulkAdd) {
            setIsCharacterModalOpen(false);
        }
        
        const addedCharacter = characters.find(c => c.id === character.id);
        onAddCharacter(addedCharacter);
    }

    React.useEffect(() => {
        const characterList = characters.map(character => ({
            id: character.id,
            name: character.name,
            level: character.stats.level,
            isAdded: !!(scenario.characters.find(c => c.id === character.id)),
        }));
        // Sort alphabetically
        characterList.sort((a, b) => {
            return b.name - a.name;
        });
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
                {/* <TextField
                    id="scenario-name"
                    defaultValue={scenario.name}
                    fullWidth
                /> */}
                <Typography
                    variant="h6"
                    className={classes.title}
                    color="inherit"
                    onClick={() => {
                        console.log("asdf");
                    }}
                >
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
                        <h2 id="transition-modal-title">Add Character to scenario</h2>
                        {/* <p>Search will go here</p> */}
                        <FormControlLabel
                            control={(
                                <Switch
                                    checked={isBulkAdd}
                                    onChange={(ev) => {
                                        setBulkAdd(ev.target.checked);
                                    }}
                                    name="Bulk Add"
                                />
                            )}
                            label="Bulk add"
                        />
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
                                        secondary={character.isAdded ? "Already added" : (`Level ${character.level}`)}
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

ApplicationAppBar.propTypes = {
    scenario: PropTypes.shape({
        name: PropTypes.string.isRequired,
        characters: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number,
            ]).isRequired,
        })).isRequired,
    }).isRequired,
    characters: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ]).isRequired,
    })),
    onAddCharacter: PropTypes.func.isRequired,
};