var express       = require("express"),
    app           = express(),
    bodyParser    = require("body-parser"),
    mongoose      = require("mongoose"),
    passport      = require("passport"),
    flash         = require("connect-flash"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    Campground    = require("./models/campground"),
    Comment       = require("./models/comment"),
    User          = require("./models/user"),
    seedDB        = require("./seeds")
    

// REQUIRE ROUTES
var commentRoutes = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes = require("./routes/index")

mongoose.connect(process.env.DATABASEURL);
//mongoose.connect("mongodb://localhost:27017/yelp_camp_v4", {useUnifiedTopology: true, useNewUrlParser: true});
// mongoose.connect("mongodb://dba:Passw0rd@ds163360.mlab.com:63360/heroku_w6qlj4s7", {useUnifiedTopology: true, useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
// seedDB();

//====================
// PASSPORT CONFIG
//====================

app.use(require("express-session")({
    secret: "Thea is the best",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

var campgrounds = [
    {name: "Salmon Creak", image: "https://pixabay.com/get/57e0d6424954ac14f6da8c7dda793f7f1636dfe2564c704c7d2d7ad09f4fc350_340.jpg"},
    {name: "Granite Hill", image: "https://pixabay.com/get/57e8d5474f5bad14f6da8c7dda793f7f1636dfe2564c704c7d2d7ad09f4fc350_340.jpg"},
    {name: "Mountain Goat Rest", image:"https://pixabay.com/get/57e2dd4a4351ac14f6da8c7dda793f7f1636dfe2564c704c7d2d7ad09f4fc350_340.jpg"}
]

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use("/", indexRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);

// DEPLOYED CONNECTION

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp Server has started...");
});

// LOCAL CONNECTION

// app.listen(3000, process.env.IP, function(){
//     console.log("The YelpCamp Server has started...");
// });