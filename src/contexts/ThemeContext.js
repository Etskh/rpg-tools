// const theme = createMuiTheme({
//     palette: {
//         type: "dark",
//         primary: red,
//         secondary: {
//             main: '#b9f6ca',
//         },
//     },
// });


import { createMuiTheme } from "@material-ui/core/styles";
import green from "@material-ui/core/colors/green";
import grey from "@material-ui/core/colors/grey";

const theme = createMuiTheme({
    palette: {
        type: "dark",
        primary: {
            main: green[300],
        },
        secondary: {
            main: grey[300],
        },
    },
    props: {
        MuiTypography: {
            style: {
                fontWeight: 100,
            },
        },
    },
});

export default theme;