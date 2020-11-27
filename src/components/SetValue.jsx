import React from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CasinoTwoToneIcon from "@material-ui/icons/CasinoTwoTone";

export default function SetValue({
    name,
    defaultValue,
    allowRandom,
    onSetValue,
}) {
    const [value, setValue] = React.useState(defaultValue);

    return (
        <Grid
            container
            spacing={3}
            direction="column"
            justify="center"
            alignItems="center"
        >
            <Grid item xs={12}>
                <TextField
                    id="filled-number"
                    fullWidth
                    label={name}
                    type="number"
                    variant="filled"
                    style={{
                        textAlign: "center",
                    }}
                    defaultValue={value}
                    onChange={(ev) => {
                        setValue(ev.target.value);
                    }}
                    onKeyPress={(ev) => {
                        if(ev.key === "Enter") {
                            onSetValue(parseInt(value, 10));
                        }
                    }}
                />
                <Button
                    fullWidth
                    variant="contained"
                    onClick={() => {
                        onSetValue(parseInt(value, 10));
                    }}
                >
                    Set
                </Button>
            </Grid>
            <Grid item xs={12}>
                {allowRandom && (
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        size="large"
                        startIcon={<CasinoTwoToneIcon />}
                        onClick={() => {
                            onSetValue(Math.ceil(Math.random()*20), true);
                        }}
                    >
                        Roll
                    </Button>
                )}
            </Grid>
        </Grid> 
    );
}

SetValue.propTypes = {
    name: PropTypes.string.isRequired,
    defaultValue: PropTypes.number,
    allowRandom: PropTypes.bool,
    onSetValue: PropTypes.func.isRequired,
};
