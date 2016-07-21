var mongoose = require("mongoose");
var Campground = require("./models/campground")
var Comment = require("./models/comment");


var campgrounds = [
        {
            name: "Cloud's Rest",
            image: "https://farm3.staticflickr.com/2464/3694344957_14180103ed.jpg",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
        },
        {
            name: "Desert Mesa",
            image: "https://farm3.staticflickr.com/2353/2069978635_2eb8b33cd4.jpg",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
        },
        {
            name: "Boom Beach",
            image: "https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
        }
    ]


function seedDB(){
    // Remove all camprounds
    Campground.remove({},function(err){
      if(err){
          console.log(err);
      } else {
          console.log("removed campgrounds!")
      } 
    })
    
    // Remove all Comments
    Comment.remove({},function(err){
      if(err){
          console.log(err);
      } else {
          console.log("removed comments")
      } 
    })
    
    //add a few campground
    campgrounds.forEach(function(campground){
        Campground.create(campground,function(err, campground){
            if(err){
                console.log(err)
            } else {
                console.log("added a campground");
                Comment.create ({
                    text: "This is is great",
                    author: "Tommy"
                }, function(err, comment){
                    if(err){
                        console.log(err);
                    } else {
                        campground.comments.push(comment) ;
                        campground.save();
                        console.log("comment saved")
                    }
                }) ;
            }
        });
    });
    
}


module.exports = seedDB ;