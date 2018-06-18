var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    { name: "Cloud's Rest",
      image: "https://images.unsplash.com/photo-1492648272180-61e45a8d98a7?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=45fc8a446ad11a120c543c426382119f&auto=format&fit=crop&w=1650&q=80",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam a tortor viverra, eleifend diam sed, mattis nulla. In hac habitasse platea dictumst. Quisque in vulputate ligula. Vivamus imperdiet pretium ex, in consectetur metus lacinia viverra. Suspendisse tincidunt auctor lectus. Nullam sapien ipsum, congue id elit a, facilisis fermentum dolor. Sed consequat pulvinar dignissim. Sed a mi eget enim porta fringilla. Sed lacinia ullamcorper vulputate. Suspendisse iaculis metus turpis, vel tempor neque consequat non. Vestibulum vitae magna non lacus dignissim sagittis. Pellentesque velit diam, consequat sit amet pretium non, tempor id tellus."
    },
    { name: "Canyon Floor",
      image: "https://images.unsplash.com/photo-1465800872432-a98681fc5828?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=8f3874f8c325f769c5b726960ca3f598&auto=format&fit=crop&w=1792&q=80",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam a tortor viverra, eleifend diam sed, mattis nulla. In hac habitasse platea dictumst. Quisque in vulputate ligula. Vivamus imperdiet pretium ex, in consectetur metus lacinia viverra. Suspendisse tincidunt auctor lectus. Nullam sapien ipsum, congue id elit a, facilisis fermentum dolor. Sed consequat pulvinar dignissim. Sed a mi eget enim porta fringilla. Sed lacinia ullamcorper vulputate. Suspendisse iaculis metus turpis, vel tempor neque consequat non. Vestibulum vitae magna non lacus dignissim sagittis. Pellentesque velit diam, consequat sit amet pretium non, tempor id tellus."
    },
    { name: "Desert Mesa",
      image: "https://images.unsplash.com/photo-1522031153701-b3eba74004e8?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=78d51c49f731c56ff8bf3bd2cf2d3301&auto=format&fit=crop&w=1650&q=80",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam a tortor viverra, eleifend diam sed, mattis nulla. In hac habitasse platea dictumst. Quisque in vulputate ligula. Vivamus imperdiet pretium ex, in consectetur metus lacinia viverra. Suspendisse tincidunt auctor lectus. Nullam sapien ipsum, congue id elit a, facilisis fermentum dolor. Sed consequat pulvinar dignissim. Sed a mi eget enim porta fringilla. Sed lacinia ullamcorper vulputate. Suspendisse iaculis metus turpis, vel tempor neque consequat non. Vestibulum vitae magna non lacus dignissim sagittis. Pellentesque velit diam, consequat sit amet pretium non, tempor id tellus."
    }
];

function seedDB() {
  // Removed all campgrounds
  Campground.remove({}, function(err) {
    if (err) {
      console.log(err);
    }
    console.log("Removed campgrounds!");
    // Add a few campgrounds
    data.forEach(function(seed) {
      Campground.create(seed, function(err, campground) {
        if (err) {
          console.log(err);
        } else {
            console.log("Added campground");
            // Create a comment
            Comment.create(
              { text: "This place is great, but I wish there was internet!", 
                author: "Homer"
            }, function(err, comment) {
              if (err) {
                console.log(err);
              } else {
                campground.comments.push(comment);
                campground.save();
                console.log("Created new comment!");
              }
            });
        }
      });
    });
  });
  
  
  // Add a few comments
}

module.exports = seedDB;