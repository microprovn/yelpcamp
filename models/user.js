var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = mongoose.Schema({
    username: String,
    password: String
})

//Add all functional methods of passport-local-mongoose to UserSchema 
UserSchema.plugin(passportLocalMongoose);
//Export the user package
module.exports = mongoose.model("User", UserSchema) ;