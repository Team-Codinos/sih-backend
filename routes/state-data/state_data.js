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
const literacyRoute=require('./literacy-state');
const dropoutRoute = require('./dropouts-state');



//ASSIGNING APPROPRIATE ROUTES
router.use("/pass-fail-rate",passFailRoute);
router.use("/literacy-rate",literacyRoute);
router.use("/dropout-rate",dropoutRoute);


module.exports = router;



