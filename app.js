var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    flash = require("connect-flash"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment"),
    passport =require("passport"),
    LocalStrategy = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    User =require("./models/user"),
    seedDB = require("./seed");

var session = require('express-session');

var methodOverride = require("method-override");
//app.use(methodOverride("_method"))


//Require Routes
var commentRoutes = require("./routes/comments");
var campgroundRoutes = require("./routes/campgrounds");
var indexRoutes = require("./routes/index");
    
//seedDB() ;  
//Connect to db. V3 added Comments
//mongoose.connect("mongodb://localhost/yelp_camp_v9");
mongoose.connect("mongodb://namnguyen:daniel2007@ds061355.mlab.com:61355/yelpcamplab");
//Use body-parser to parse the http request and get params
app.use(bodyParser.urlencoded({extended: true})) ;
app.use(bodyParser.json({extended: true})) ;


//set view engine
app.set("view engine", "ejs");
app.use(express.static(__dirname +"/public"));

//=============================
// PASSPORT CONFIGURATION
//=============================

var sessionMiddleware = session({
    secret: "This is a secret key",
    resave: true,
    saveUninitialized: true
    //cookie:{maxAge:6000}
  
});

app.use(sessionMiddleware) ;

// app.use(require("express-session")({
//     secret: "This is a secret key",
//     resave: true,
//     saveUninitialized: true
//     //cookie:{maxAge:6000}
  
// }));


app.use(flash());

app.use(passport.initialize()) ;
app.use(passport.session()) ;
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser()) ;




//Add currentUser variable to all routes
app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   //console.log(res.locals);
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
   
});


app.use(indexRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);
app.get('/', indexRoutes);
app.get('*', indexRoutes);



app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server Started") ;
}); 