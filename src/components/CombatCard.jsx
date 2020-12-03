import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import SetValueDialogButton from "./SetValueDialogButton.jsx";
import { getDamageTypes } from "../lib/rulesets";

const useStyles = makeStyles(() => ({
    root: {
        minWidth: 350,
        flexGrow: true,
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    flag: {
        textTransform: "capitalize",
    },
}));



function DamageModalButton({
    stats,
    onSetValue,
}) {
    // Check for all damage types
    const [selectedTypes, setSelectedTypes] = React.useState({
        // empty
    });

    const damageTypes = getDamageTypes();

    return (
        <SetValueDialogButton
            label="Damage amount"
            // extraInfo={"Immunities and resistances and vunerabilities go here"}
            extraInfo={(
                <>{damageTypes.map(type => (
                    <Button key={type.name}>{type.name}</Button>
                ))}</>
            )}
            onSetValue={onSetValue}
        >
            Damage
        </SetValueDialogButton>
    );
}


export default function CombatCard({
    character,
    onRemoveCharacter,
    onUpdateCurrentCharacter,
}) {
    const classes = useStyles();

    if (!character) {
        return null;
    }

    const defenses = [{
        name: "AC",
        value: character.current.ac_check + 10,
    }, {
        name: "Fort",
        value: character.current.fort_check + 10,
    }, {
        name: "Ref",
        value: character.current.ref_check + 10,
    }, {
        name: "Will",
        value: character.current.will_check + 10,
    }];

    return (
        <Card className={classes.root} variant="outlined">
            <CardContent>
                {/* <div>
                    <Button size="small">+ Condition</Button>
                    {character.conditions.map(condition => (
                        <Chip
                            key={condition.name}
                            label={condition.name}
                            onClick={() => {}}
                            onDelete={() => {}}
                            variant="outlined"
                        />
                    ))}
                </div> */}
                <Typography variant="h5" component="h2">
                    {character.name}
                </Typography>
                <Typography variant="h6" component="h3">
                    {character.type}
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
                <Typography variant="h4" component="h3">
                    {character.current.hp} / <small>{character.current.max_hp}</small>
                    <ButtonGroup
                        variant="outlined"
                        size="small"
                    >
                        <SetValueDialogButton
                            label="Heal amount"
                            disabled={character.current.hp === character.current.max_hp}
                            onSetValue={(healAmount) => {
                                onUpdateCurrentCharacter(character, {
                                    hp: character.current.hp + healAmount,
                                });
                            }}
                        >
                            Heal
                        </SetValueDialogButton>
                        <DamageModalButton
                            extraInfo={(
                                <Button>Fire</Button>
                            )}
                            onSetValue={(damageAmount) => {
                                onUpdateCurrentCharacter(character, {
                                    hp: character.current.hp - damageAmount,
                                });
                            }}
                        />
                    </ButtonGroup>
                </Typography>
                <div>
                    {character.flags.map(flag => (
                        <Chip
                            key={flag}
                            label={flag}
                            className={classes.flag}
                            variant="default"
                        />
                    ))}
                </div>
            </CardContent>
            <CardActions>
                <SetValueDialogButton
                    size="small"
                    label="Initiative"
                    defaultValue={character.current.initiative}
                    allowRandom
                    onSetValue={(newValue, isRandom) => {
                        if(!isNaN(newValue)) {
                            onUpdateCurrentCharacter(character, {
                                initiative: newValue + (isRandom ? (
                                    character.current.skill_perception_check
                                ) : 0),
                            });
                        }
                    }}
                >
                    {character.current.initiative ? `Initiative ${character.current.initiative}` : "Set Initiative"}
                </SetValueDialogButton>
                <Button
                    size="small"
                    onClick={() => onRemoveCharacter(character)}
                >
                    Remove
                </Button>
            </CardActions>
        </Card>
    );
}

CombatCard.propTypes = {
    character: PropTypes.shape({
        name: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        conditions: PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string.isRequired,
        })).isRequired,
        current: PropTypes.shape({
            initiative: PropTypes.number,
            ac_check: PropTypes.number.isRequired,
            fort_check: PropTypes.number.isRequired,
            ref_check: PropTypes.number.isRequired,
            will_check: PropTypes.number.isRequired,
            skill_perception_check: PropTypes.number.isRequired,
            max_hp: PropTypes.number.isRequired,
            hp: PropTypes.number.isRequired,
        }).isRequired,
    }).isRequired,
    onRemoveCharacter: PropTypes.func.isRequired,
    onUpdateCurrentCharacter: PropTypes.func.isRequired,
};
