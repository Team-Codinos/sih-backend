// DOCSSS
//IN STATE DATA WE RETURN THE DATA OF ALL THE STATES 
//REQUEST FORMAT
// {
//  year:xxxx,
//  std:PRIM|SECOND|TECH //optional 
//

//RESPONSE FORMAT

// {
//     "<STATE1>":{
//         BOYS:<COUNT>
//         GIRL:<COUNT>    
//     },
//     .
//     .
//     . 
//     "<STATE N>":{
//         BOYS:<COUNT>
//         GIRL:<COUNT>    
//     },

// }
// `

const router = require("express").Router();

//ROUTE IMPORTS
const passFailRoute = require('./pass-fail-state');
const literacyRoute = require('./literacy-state');
const dropoutRoute = require('./dropouts-state');
const enrollmentRoute = require("./enrollment-state");
const castewise = require("./caste_wise");



//ASSIGNING APPROPRIATE ROUTES
router.use("/pass-fail-rate", passFailRoute);
router.use("/literacy-rate", literacyRoute);
router.use("/dropout-rate", dropoutRoute);
router.use("/enrollment-rate", enrollmentRoute);
router.use("/castewise", castewise);


module.exports = router;



