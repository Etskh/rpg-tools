import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import EmojiEmotionsSharpIcon from "@material-ui/icons/EmojiEmotionsSharp";
import MoodBadTwoToneIcon from "@material-ui/icons/MoodBadTwoTone";

const useStyles = makeStyles((theme) => ({
    root: {
        // width: "100%",
        // maxWidth: 360,
    },
}));

export default function InititativeList({
    characters,
    onSelectCharacter,
}) {
    const classes = useStyles();

    const sortedByInitiative = Array.from(characters);
    sortedByInitiative.sort((a, b) => (b.current.initiative || 0) - (a.current.initiative || 0));

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
                                {character.flags.find(flag => flag === "PC") ? (
                                    <EmojiEmotionsSharpIcon />
                                ) : (
                                    <MoodBadTwoToneIcon />
                                )}
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={character.name}
                            secondary={(
                                character.current.initiative ? "" : "Initiative not set"
                            )}
                        />
                    </ListItem>
                );
            })}
        </List>
    );
}

InititativeList.propTypes = {
    characters: PropTypes.arrayOf(PropTypes.shape({
        current: PropTypes.shape({
            initiative: PropTypes.number,
        }).isRequired,
    })).isRequired,
    onSelectCharacter: PropTypes.func.isRequired,
};
