const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
 
const noteschema = new Schema({

  articleId:{
    type: schema,Types,ObjectId,
   ref: "article"},
  
  date:String,
  notetext:String

});
module.exports = mongoose.model("Note",noteschema)
module.exports=Note;