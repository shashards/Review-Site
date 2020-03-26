var mongoose = require("mongoose");
Campground = require("./models/campground"),
Comment = require("./models/comment")

var data = [
    {
        name: "Clouds Rest",
        image: "https://media-cdn.tripadvisor.com/media/photo-s/01/2b/7b/97/campsite-78-loop-3-had.jpg",
        description: "Bla Bla Bla"
    },
    {
        name: "Desert Place",
        image: "https://boyslifeorg.files.wordpress.com/2014/04/tent-featured.jpg?w=700&h=525",
        description: "Bla Bla Bla"
    },
    {
        name: "Canyon Floor",
        image: "https://i2.wp.com/www.campingbreconbeacons.com/wp-content/uploads/2014/04/a-Cwmdu-campsite-sunny-day-bottom-field-022-1.jpg?w=700&h=525",
        description: "Bla Bla Bla"
    }
]

function seedDB(){
    //Remove All Campgrounds
Campground.remove({}, function(err){
    if(err){
        console.log(err);
    } else {
        console.log("Removed Campgrounds");
        //Add Campgrounds
        data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
                if(err){
                    console.log(err);
                } else {
                    console.log("Campground Added!")
                    //create a comment
                    Comment.create(
                                    {
                                        text: "This is great, no wifi",
                                        author: "Shane Shardlow"
                                    }, function(err, comment){
                                        if(err){
                                            console.log(err);
                                        } else {
                                        campground.comments.push(comment);
                                        campground.save();
                                        console.log("created new comment");
                                    }
                                });
                }
            });
        });
    }
});
    
    
}

module.exports = seedDB;

