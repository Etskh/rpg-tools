import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

export default function CombatCard({
    character,
    onRemoveCharacter,
}) {
    const classes = useStyles();

    if (!character) {
        return null;
    }

    const defenses = character.data.stats ? [{
        name: "AC",
        value: character.data.stats.ac,
    }, {
        name: "Fort",
        value: character.data.stats.fort + 10,
    }, {
        name: "Ref",
        value: character.data.stats.ref + 10,
    }, {
        name: "Will",
        value: character.data.stats.will + 10,
    }] : [];


    return (
        <Card className={classes.root} variant="outlined">
            <CardContent>
                <div>
                    <Button size="small">+ Condition</Button>
                    {character.conditions ? (
                        <Chip
                            label="Condition!"
                            onClick={() => {}}
                            onDelete={() => {}}
                            variant="outlined"
                            />
                    ) : (null)}
                </div>
                <Typography variant="h5" component="h2">
                    {character.name}
                </Typography>
                <Typography variant="body2" component="div">
                    {defenses.map((defense) => (
                        <Chip
                            key={defense.name}
                            avatar={<Avatar>{defense.name}</Avatar>}
                            label={defense.value}
                            onClick={() => {}}
                            variant="outlined"
                        />
                    ))}
                </Typography>
            </CardContent>
            <CardActions>
                <Button
                    size="small"
                    onClick={() => {
                        console.log('open window');
                    }}
                >
                    Set Initiative
                </Button>
                <Button
                    size="small"
                    onClick={() => onRemoveCharacter()}
                >
                    Remove
                </Button>
            </CardActions>
        </Card>
    );
}