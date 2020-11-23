import React from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";


export default function SetValue({
    name,
    defaultValue,
    // minValue,
    // maxValue,
    allowRandom,
    onSetValue,
}) {
    const [value, setValue] = React.useState(defaultValue);

    return (
        <div>
            <div>
                <TextField
                    id="filled-number"
                    label={name}
                    type="number"
                    variant="filled"
                    defaultValue={value}
                    onChange={(ev) => {
                        setValue(ev.target.value);
                    }}
                />
                <Button
                    variant="contained"
                    size="medium"
                    onClick={() => {
                        onSetValue(parseInt(value, 10));
                    }}
                >
                    Set
                </Button>
            </div>
            {allowRandom && (
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={() => {
                        onSetValue(Math.ceil(Math.random()*20), true);
                    }}
                >
                    1d20
                </Button>
            )}
        </div>
    );
}

SetValue.propTypes = {
    name: PropTypes.string.isRequired,
    defaultValue: PropTypes.number,
    allowRandom: PropTypes.bool,
    onSetValue: PropTypes.func.isRequired,
};
