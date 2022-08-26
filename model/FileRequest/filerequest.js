const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FileRequest = new Schema({
    file_path:{
        type:String
    },
    from_id:{
        type:String
    },
    
});

module.exports = mongoose.model('FileRequest', FileRequest,'FileRequest');









