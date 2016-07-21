var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middlewareObject = {} ;
var flash = require("connect-flash")

middlewareObject.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "please login first") ;
    res.locals.error = req.flash()
    res.send(res.locals);
};

middlewareObject.checkCampgroundOwnership = function(req, res, next){
    if(req.isAuthenticated())  {
        Campground.findById(req.params.id, function(err,foundCampground){
            if(err){
                req.flash("error", "Something is wrong. Please try again") ;
                res.locals.error = req.flash()
                res.send(res.locals);
            } else {
                if(foundCampground.author.id.equals(req.user._id)){
                    next();
                } else {
                    req.flash("error", "Permission denided") ;
                    res.locals.error = req.flash()
                    res.send(res.locals) ;
                }
            }
        });
    } else {
        req.flash("error", "please login first") ;
        res.locals.error = req.flash() ;
        res.send(res.locals) ;
    }
    
};

middlewareObject.checkCommentOwnership = function(req, res, next){
    if(req.isAuthenticated()) {
        Comment.findById(req.params.commentId, function(err,comment){
            if(err){
                req.flash("error", "Something is wrong. Please try again") ;
                res.locals.error = req.flash()
                res.send(res.locals);
            } else {
                if(!comment.author.id || !req.user._id || comment.author.id.toString() !== req.user._id.toString() ) {
                    req.flash("error", "Permission denided") ;
                    res.locals.error = req.flash()
                    res.send(res.locals);
                  
                } else {
                   next();
                }
            }
        }); 
    } else {
        req.flash("error", "please login first") ;
        res.locals.error = req.flash()
        res.send(res.locals);
    }
}

module.exports = middlewareObject;