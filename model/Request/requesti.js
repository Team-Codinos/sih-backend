const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Requesti = new Schema({
    student_id:{
        type:String
    },
    from_id:{
        type:String
    },
    
});

module.exports = mongoose.model('Requesti', Requesti,'Requesti');









