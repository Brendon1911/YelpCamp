var express     = require("express");
var router      = express.Router();
var Campground  = require("../models/campground");
var middleware  = require("../middleware");

//INDEX - show all campgrounds
router.get("/", function(req, res){
  var noMatch = null;
  if(req.query.search) {
    const regex = new RegExp(escapeRegex(req.query.search), "gi");
    // Get all campgrounds from DB
    Campground.find({name: regex}, function(err, allCampgrounds){
       if(err){
           console.log(err);
       } else {
          if(allCampgrounds.length < 1) {
            noMatch = "No campgrounds match that query. Please try again, or click 'All Campgrounds' in the top left of the navigation bar to to view all campgrounds.";
          }
          res.render("campgrounds/index",{campgrounds: allCampgrounds, page: 'campgrounds', noMatch: noMatch});
       }
    });
  } else {
    // Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
       if(err){
           console.log(err);
       } else {
          res.render("campgrounds/index",{campgrounds: allCampgrounds, page: 'campgrounds', noMatch: noMatch});
       }
    });
  }
});

//CREATE - Add new campground to DB
router.post("/", middleware.isLoggedIn, function(req, res) {
  //get data from form and add to campgrounds array
  var name = req.body.name;
  var price = req.body.price;
  var image = req.body.image;
  var cost = req.body.cost;
  var desc = req.body.description;
  var author = {
      id: req.user._id,
      username: req.user.username
  };
  var newCampground = {name: name, image: image, cost: cost, description: desc, author:author};
  //Create a new campground and save to DB
  Campground.create(newCampground, function(err, newlyCreated) {
    if (err) {
      console.log(err);
    } else {
      //redirect back to campgrounds page
      console.log(newlyCreated);
        res.redirect("/campgrounds");
    }
  });
});

//NEW - Show form to create new campground
router.get("/new", middleware.isLoggedIn, function(req, res){
  res.render("campgrounds/new");
});

//SHOW - Shows more info about one campground
router.get("/:id", function(req, res) {
  //find the campground with provided id
  Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
    if (err) {
      console.log(err);
    } else {
      console.log(foundCampground);
      //render show template with that campground
      res.render("campgrounds/show", {campground: foundCampground});
    }
  });
});

// Edit Campground Route
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res) {
  Campground.findById(req.params.id, function(err, foundCampground) {
    res.render("campgrounds/edit", {campground: foundCampground});
  });
});

// Update campground Route
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res) {
  // Find and update the correct campground
  var newData = {name: req.body.name, image: req.body.image, cost: req.body.cost, description: req.body.description};
  Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground) {
    if (err) {
      res.redirect("/campgrounds");
    } else {
      res.redirect("/campgrounds/" + req.params.id);
    }
  });
  // Redirect somewhere(show page)
});

// Destroy campground route
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res) {
  Campground.findByIdAndRemove(req.params.id, function(err) {
    if (err) {
      res.redirect("/campgrounds");
    } else {
      res.redirect("/campgrounds");
    }
  });
});

function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

module.exports = router;