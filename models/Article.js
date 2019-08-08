const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
 
const article = new Schema({

  title:{
    type:String,
   required: true
    
  },
  link:{
    type:String,
    required: true
  }
  // date:String,
  // saved:{
  //   type: Boolean,
  //   default:false
  // }



 
  // title: String,
  // link: String

});
module.exports = mongoose.model("Article",article)
