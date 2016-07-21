var express = require("express");
var router = express.Router();
var Campground = require("../models/campground") ;
var middleware = require("../middleware") ;


//================================
//ADD NEW CAMPGROUND
//================================


router.get("/new", middleware.isLoggedIn ,function(req, res){
    res.render("campgrounds/new") ;
});


router.post("/", middleware.isLoggedIn, function(req, res){
    //Get data from form, and add to campgrounds array
    var name = req.body.name ;
    var image = req.body.image ;
    var description = req.body.description ;
    var author = {id: req.user._id, username: req.user.username} ;
    var campground = {
        name : name , 
        image : image , 
        description : description,
        author : author 
    } ;
    
    if(name && image && description) {
        Campground.create(campground, function(err,newCreated){
            if(err){
                console.log(err);
                req.flash("error", "Can not create campground")
                res.locals.error = req.flash()
                res.send(res.locals);
            } else {
                req.flash("success", "your campground is updated")
                res.locals.success = req.flash()
                res.send(res.locals)
            }
        });
    }
    else {
        console.log("error with data")
    }
   
    
});

//=================================
//SHOW ROUTE
//=================================

router.get("/:id", function(req,res){
     var id = req.params.id ;
     //Need to populate associate collection comments with the campground id and send it to client
     Campground.findById(id).populate("comments").exec(function(err,campground){
        if(err){
            console.log("Can not find campground")
            res.redirect("/")
        } else {
            //console.log(campground.comments);
            res.render("campgrounds/show", {campground:campground})
        }
    });
});



router.get("/api/:id", function(req,res){
     var id = req.params.id ;
     //Need to populate associate collection comments with the campground id and send it to client
     Campground.findById(id).populate("comments").exec(function(err,campground){
        if(err){
            console.log("Can not find campground")
            res.redirect("/campgrounds")
        } else {
            //console.log(campground.comments);
            res.json(campground)
        }
    });
});


//==========================
// Edit ROUTES
//==========================


router.get("/:id/edit", middleware.checkCampgroundOwnership ,function(req, res) {
    
    Campground.findById(req.params.id, function(err,campground){
       if(err){
           console.log(err);
           res.redirect("../");
       } else {
           res.render("campgrounds/edit", {campground : campground}) ;
       }
    });
});


// Edit Logic

router.put("/:id", middleware.checkCampgroundOwnership ,function(req,res){
   
    Campground.findByIdAndUpdate(req.params.id, req.body, function(err, updateCampground){
        console.log(req.body)
       if(err){
           req.flash("error", "Cannot Edit Campground");
           res.locals.error = req.flash()
           res.send(err)
       } else {
          
            req.flash("success", "Successfully Updated");
            res.locals.success = req.flash()
            res.send(res.locals);
       }
    });
});

//==============================================
//DESTROY ROUTE


// delete campground 
router.delete("/:id", middleware.checkCampgroundOwnership ,function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            req.flash('error', err)
            res.locals.error = req.flash() ;
            res.send(res.locals)
        } else {
            req.flash('success', 'your post deleted successfully')
            res.locals.success = req.flash() ;
            res.send(res.locals);
        }
    })
})





module.exports = router ;