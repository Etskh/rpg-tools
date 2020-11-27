import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import Modal from "@material-ui/core/Modal";
// Icons
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
// Components
import SetValue from "./SetValue.jsx";


const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 350,
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
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

export default function CombatCard({
    character,
    onRemoveCharacter,
    onUpdateCurrentCharacter,
}) {
    const classes = useStyles();

    const [isInitiativeModalOpen, setIsInitiativeModalOpen] = React.useState(false);

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

    function handleSetInitiative(newInitiative, addModifiers) {
        setIsInitiativeModalOpen(false);
        
        // FIXME: make sure it sets the right value
        onUpdateCurrentCharacter(character, {
            initiative: newInitiative + (addModifiers ? (
                character.current.skill_perception_check
            ) : 0),
        });
    }

    return (
        <Card className={classes.root} variant="outlined">
            <CardContent>
                <div>
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
                </div>
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
                <Typography variant="body2" component="div">
                    <ArrowForwardIcon/>
                </Typography>
            </CardContent>
            <CardActions>
                <Button
                    size="small"
                    onClick={() => setIsInitiativeModalOpen(true)}
                >
                    {character.current.initiative ? `Initiative ${character.current.initiative}` : "Set Initiative"}
                </Button>
                <Modal
                    open={isInitiativeModalOpen}
                    onClose={() => setIsInitiativeModalOpen(false)}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    className={classes.modal}
                >
                    <div className={classes.paper}>
                        <SetValue
                            name="Initiative"
                            allowRandom
                            defaultValue={character.current.initiative}
                            onSetValue={(newValue, isRandom) => {
                                if(!isNaN(newValue)) {
                                    handleSetInitiative(newValue, isRandom);
                                }
                            }}
                        />
                    </div>
                </Modal>
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
