var express = require("express");
var router = express.Router();
var User = require("../models/user");
var Campground = require("../models/campground") ;
var passport =require("passport") ;


// var bodyParser = require('body-parser');
// var jsonParser = bodyParser.json({ type: 'application/json'});

//=====================================
// AUTH ROUTES
//======================================


//==================================
// SIGN UP ROUTES
//==================================
//show register page
router.get("/register", function(req,res){
   res.render("register") ;
});


// handle sign up logic
router.post("/register", function(req,res){
    
    if(req.body.username && req.body.username !== "" && req.body.password && req.body.password !== "") {
        User.register(new User({username: req.body.username}), req.body.password, function (err, user){
            if(err){
                req.flash("error" , "This given username is invalid");
                res.locals.error = req.flash();
                res.send(res.locals)
            } else {
                passport.authenticate("local")(req, res, function(){
                    var user = {} ;
                    user._id = req.user._id ;
                    user.username = req.user.username ;
                    res.locals.currentUser = user ;
                    req.flash("success", "Welcome to YelpCamp")
                    res.locals.success = req.flash() ;
                    res.send(res.locals)
                });
            }
        });
    }
    else {
        req.flash("error" , "This given username or password is invalid");
        res.locals.error = req.flash();
        res.send(res.locals)
    }
}); 


//=================================
// LOGIN ROUTE
//=================================

// Show login
// router.get("/login" , function(req, res) {
//     res.render("login");
//     //console.log(res);
// });


// handle login logic

//router.post("/login", passport.authenticate("local",
//    {
        //successRedirect: '/',
        //failureRedirect: '/',
        //failureFlash: "Invalid username or password",
        //successFlash: "successfully logged in"
//    }),function(req,res){
        // var user = {};
        // user._id = req.user._id ;
        // user.username = req.user.username ;
        // res.locals.currentUser = user ;
        //res.send(res.locals)
//});



router.post('/login', passport.authenticate('local') , function(req,res){
    var user = {} ;
    user._id = req.user._id ;
    user.username = req.user.username ;
    res.locals.currentUser = user ;
    res.send(res.locals)
});


// router.get('/login', function(req, res, next) {
//   passport.authenticate('local', function(err, user, info) {
//     if (err) { return next(err); }
//     if (!user) { 
//         req.flash("error","Invalid username or password");
//         req.flash();
//         res.locals.error = req.flash();
//         //return res.redirect('/login'); }
//     req.logIn(user, function(err) {
//       if (err) { return next(err); }
//         req.flash("success","Successfully logged in")
//         req.flash();
//         //res.locals.success = req.flash();
//         res.locals.currentUser = user.username ;
//       return res.send(res.locals)
//     });
//   })(req, res, next);
// });




//====================
// LOGOUT
//====================


router.get("/logout", function(req, res) {
    req.logout();
    res.locals.currentUser = req.user ;
    res.send(res.locals)
});


//======================================
// HOME PAGE ROUTE
//=======================================

router.get("/", function(req,res){
//   res.render("landing") ;
    res.sendfile("./public/index.html")
});


router.get("/home", function(req,res){
   res.render("home") ;
});


router.get("/campgrounds", function(req,res){
    //console.log(req.user);
    Campground.find(function(err, campgrounds){
        if(err){
            console.log(err);
        } else {
             res.render("campgrounds/campgrounds", { campgrounds: campgrounds});
        }
    });
});

router.get("/api/campgrounds", function(req,res){
    //console.log(req.user);
    Campground.find(function(err, campgrounds){
        if(err){
            console.log(err);
        } else {
             //res.render("campgrounds/campgrounds", { campgrounds: campgrounds});
             res.json({campgrounds: campgrounds})
             //console.log(res.currentUser);
        }
    });
});


// router.get("/modal" , function(req,res){
//     res.render("modal")
// })

router.get("/delete" , function(req,res){
    res.render("confirm_delete")
})

router.get("/auth", function(req, res){
    res.send(res.locals) ;
})


router.get("/campgrounds/:authorId", function(req,res){
    var id = req.params.authorId ;
    Campground.find( { "author.id" : id }, function(err, campgrounds){
        if(err){
            console.log(err)
        } else {
            res.json({campgrounds: campgrounds})
        }
    })
})
module.exports = router ;