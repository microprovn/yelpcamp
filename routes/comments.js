var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground") ;
var Comment = require("../models/comment");
var middleware = require("../middleware") ;
var bodyParser = require('body-parser');


var jsonParser = bodyParser.json({ type: 'application/json'});


//================================
// COMMENTS ROUTES
//================================

// Add new comment
router.get("/new", middleware.isLoggedIn , function(req,res){
    Campground.findById(req.params.id, function(err,campground){
       if(err){
           console.log(err);
           res.redirect("/campgrounds");
       } else {
           res.render("comments/new", {campground : campground}) ;
       }
    });
});


router.post("/", middleware.isLoggedIn, jsonParser , function(req,res){
   Campground.findById(req.params.id, function(err,campground){
       if(err){
           console.log(err);
           //res.redirect("/campgrounds");
           req.flash("error" , "Cannot find campground")
            res.locals.error = req.flash();
            res.send(res.locals)
       } else {
           //console.log(req.body) ;
           Comment.create(req.body.comment, function(err, comment){
              if(err){
                  console.log(err);
              } else {
                  //console.log(comment);
                  //add username and id to comment
                  comment.author.id = req.user._id ;
                  comment.author.username = req.user.username;
                  //save comment
                  comment.save();
                  //push the comment to array of comments 
                  campground.comments.push(comment);
                  campground.save();
                  //res.redirect('/campgrounds/' + campground.id);
                  req.flash("success" , "Comment Added")
                  res.locals.success = req.flash();
                  res.send(res.locals)
              }
           });
       }
   });
});

//Render Edit Comment
router.get("/:commentId/edit", middleware.checkCommentOwnership , function(req,res){
   //console.log(req.params);
   Campground.findById(req.params.id, function(err, campground) {
       if(err){
           console.log(err);
       } else {
            Comment.findById(req.params.commentId, function(err,comment){
               if(err){
                   console.log(err);
                   res.redirect("/campgrounds");
               } else {
                   res.render("comments/edit", {comment : comment , campgroundId : req.params.id , name: campground.name}) ;
                   //console.log(comment);
               }
            });
       }
   });
  
});

// Edit Comment logic 
router.put("/:commentId", middleware.checkCommentOwnership , function(req,res){
    //console.log(req.body)
  Comment.findByIdAndUpdate(req.params.commentId, req.body.comment ,function(err,comment){
      if(err){
        req.flash("error" , "Comment id not found")
        res.locals.error = req.flash();
        res.send(res.locals)
      } else {
          //console.log("response: " + res.user);
          //console.log(comment)
            req.flash("success" , "Comment updated")
            res.locals.success = req.flash();
            res.send(res.locals)
      }
  }); 
});


// delete comment 
router.delete("/:commentId", middleware.checkCommentOwnership ,function(req, res){
    Comment.findByIdAndRemove(req.params.commentId, function(err){
        if(err){
            req.flash("Error" , "Comment id not found")
            res.locals.error = req.flash();
            res.send(res.locals)
        } else {
            req.flash("success" , "Comment deleted")
            res.locals.success = req.flash();
            res.send(res.locals)
        }
    })
})


//============================================


module.exports = router ;