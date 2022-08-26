const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FileRequest = new Schema({
    file_path:{
        type:String
    },
    from_id:{
        type:String
    },
    approved:{
        type:Boolean,
    }
    
});

module.exports = mongoose.model('FileRequest', FileRequest,'FileRequest');









