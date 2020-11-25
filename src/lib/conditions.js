
// const allChecks = [
    
// ];



// function toAllChecks(magnitude) {
//     return allChecks.reduce((acc, cur)=> ({
//         ...acc,
//         [cur]: magnitude,
//     }), {});
// }

// function toAllDCs(magnitude) {
//     return allDCs.reduce((acc, cur)=> ({
//         ...acc,
//         [cur]: magnitude,
//     }), {});
// }



const allConditions = [{
    name: "Flat-footed",
    // getDeltas: () => ({
    //     ac: -2,
    // }),
    hasMagnitude: false,
    isBad: true,
}, {
    name: "Prone",
    // getDeltas: () => ({
    //     attack_rolls: -2,
    // }),
    childConditions: [
        "Flat-footed",
    ],
}, {
    name: "Frightened",
    // getDeltas: (magnitude) => ({
    //     ...toAllChecks(-magnitude),
    //     ...toAllDCs(-magnitude),
    // }),
    hasMagnitude: true,
    isBad: true,
}, {
    name: "Sickened",
    // getDeltas: (magnitude) => ({
    //     ...toAllChecks(-magnitude),
    //     ...toAllDCs(-magnitude),
    // }),
    hasMagnitude: true,
    isBad: true,
}, {
    name: "Raise Steel Shield",
    hasMagnitude: false,
    isBad: false,
}, {
    name: "Raise Steel Shield",
    hasMagnitude: false,
    isBad: false,
}];



export function getConditions() {
    return Promise.resolve([
        ...allConditions,
    ]);
}