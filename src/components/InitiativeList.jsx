import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import { getCharacters } from "../lib/character";

import PersonSharpIcon from "@material-ui/icons/PersonSharp";


const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        maxWidth: 360,
    },
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: "none",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

export default function InsetDividers({
    characters,
    onSelectCharacter,
    onRemoveCharacter,
}) {
    const classes = useStyles();

    const sortedByInitiative = Array.from(characters);
    sortedByInitiative.sort((a, b) => (b.initiative || 0) - (a.initiative || 0));

    const [activeCharacterId, setActiveCharacterId] = React.useState(null);

    return (
        <List className={classes.root}>
            {sortedByInitiative.map(character => {
                return (
                    <ListItem
                        key={character.name}
                        button
                        selected={activeCharacterId === character.id}
                        onClick={() => {
                            onSelectCharacter(character.id);
                            setActiveCharacterId(character.id);
                        }}
                    >
                        <ListItemAvatar>
                            <Avatar>
                                <PersonSharpIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={character.name}
                            secondary={(
                                character.initiative ? `Initiative ${character.initiative}` : ""
                            )}
                        />
                    </ListItem>
                );
            })}
        </List>
    );
}
