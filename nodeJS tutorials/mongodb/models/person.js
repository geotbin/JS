const addressSchema = require('./address');

// definition of schema for persons
const personSchema = new mongoose.Schema({
    name : { type : String, required : true },
    surnames : [String],                        // type is an Array of String
    age : { type : Number, default : 18, set : v => Math.floor(v) }, // 'set' property is a function applied each time a new value is assigned
    birth : Date,
    address : addressSchema                     // use another schema ('addressSchema') as a type for subdocument
});


module.exports = personSchema;
