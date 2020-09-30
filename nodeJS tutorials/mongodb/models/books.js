const mongoose = require('mongoose');

const  DEFAULT_COVER = "/images/book.png";
/**
 * setter for cover field in bookSchema, used to set a default value to cover field if cover is UNDEFINED
 * @param cover the provided cover field
 * @return the cover value
*/
const setDefaultCover =
   cover => {
              if (cover === undefined || cover === "")
                return DEFAULT_COVER;
              else  return cover;
            }

/* bookdetail Schema*/
const bookDetailsSchema = new mongoose.Schema({
  language : String,
  pages :  Number,
  series : String
});

// definition of schema for books
const bookSchema = new mongoose.Schema({
  title : { type : String, required : true },        // a title must be given
  author : String,
  cover : { type : String, set : setDefaultCover },  // set a default cover if none provided
  year : Number,
  details : bookDetailsSchema
});

// export the schema
module.exports = bookSchema;


// schema must be "compiled" into a model and "bound" to a collection of a database managed by a connection
const dbConnection = require('../controllers/db');
const Books = dbConnection.model('Book',bookSchema,'books');

// export the model
module.exports.model = Books;
