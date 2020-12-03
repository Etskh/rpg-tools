import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import SetValue from "./SetValue.jsx";


const useStyles = makeStyles((theme) => ({
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

export default function SetValueDialogButton({
    variant,
    color,
    size,
    disabled,
    onSetValue,
    defaultValue,
    extraInfo,
    label,
    allowRandom,
    children,
}) {
    const classes = useStyles();

    const [isModalOpen, setIsModalOpen] = React.useState(false);

    return (
        <>
            <Button
                color={color}
                variant={variant}
                size={size}
                disabled={disabled}
                onClick={() => setIsModalOpen(true)}
            >
                {children}
            </Button>
            <Modal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                className={classes.modal}
            >
                <div className={classes.paper}>
                    <Typography variant="body2" component="div">{extraInfo}</Typography>
                    <SetValue
                        name={label}
                        allowRandom={allowRandom}
                        defaultValue={defaultValue}
                        onSetValue={(newValue, isRandom) => {
                            setIsModalOpen(false);
                            onSetValue(newValue, isRandom);
                        }}
                    />
                </div>
            </Modal>
        </>
    );
}

SetValueDialogButton.propTypes = {
    defaultValue: PropTypes.number,
    extraInfo: PropTypes.any,
    label: PropTypes.string,
    onSetValue: PropTypes.func.isRequired,
    children: PropTypes.any,
    // Button propTypes
    variant: PropTypes.oneOf([
        "contained",
        "outlined",
        "text",
    ]),
    color: PropTypes.oneOf([
        "default",
        "inherit",
        "primary",
        "secondary",
    ]),
    size: PropTypes.oneOf([
        "large",
        "medium",
        "small",
    ]),
    disabled: PropTypes.bool,
    // SetValue propTypes
    allowRandom: SetValue.propTypes.allowRandom,
};
