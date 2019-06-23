//For load things we need 
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

// mongodb connect
mongoose.connect("mongodb://localhost/plancong", { useNewUrlParser: true });

// public directory
app.use(express.static(__dirname + "/public"));

// passing data
app.use(bodyParser.urlencoded({ extended: true }));

// Schema setup
var usersSchema = new mongoose.Schema({
    frontName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

//Validation
function validateRegisterInput(data) {
    let errors = {};

    data.frontName = !isEmpty(data.frontName) ? data.frontName : "";
    data.lastName = !isEmpty(data.lastName) ? data.lastName : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";

    if (Validator.isEmpty(data.frontName)) {
        errors.frontName = "field is required";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
};

var User = mongoose.model("User", usersSchema);


// set the view engine to ejs
app.set("view engine", "ejs");

//use res.render to load up an ejs view file

//home page
app.get("/", function (req, res) {
    res.render("pages/home");
});

//about page
app.get("/about", function (req, res) {
    res.render("pages/about");
});

//login page
app.get("/login", function (req, res) {
    res.render("pages/login");
});

//signup page
app.get("/regist", function (req, res) {
    res.render("pages/regist")
})

var hotelSchema = new mongoose.Schema({
    image: String
});

var Hotels = mongoose.model("Hotels", hotelSchema);

//Hotel Page
app.get("/hotel", function (req, res) {
    Hotels.find({}, function (err, hotel) {
        if (err) {
            console.log(err);
        } else {
            res.render("pages/hotel", { collection: hotel });
        }
    })
})

var restoSchema = new mongoose.Schema({
    image: String
});

var Resto = mongoose.model("Resto", restoSchema);

// Resto.create(
//     {
//         image: "https://www.elitetraveler.com/wp-content/uploads/2012/12/Mirabelle.jpg"
//     }
// );

//Resto Page
app.get("/resto", function (req, res) {
    Resto.find({}, function (err, resto) {
        if (err) {
            console.log(err);
        } else {
            res.render("pages/resto", { collection: resto });
        }
    })
})

var recreationSchema = new mongoose.Schema({
    image: String
});

var Recreation = mongoose.model("Recreation", recreationSchema);

// Recreation.create(
//     {
//         image: "https://www.elitetraveler.com/wp-content/uploads/2012/12/Mirabelle.jpg"
//     }
// );

//Recreation Page
app.get("/recreation", function (req, res) {
    Recreation.find({}, function (err, recreation) {
        if (err) {
            console.log(err);
        } else {
            res.render("pages/recreation", { collection: recreation });
        }
    })
})

//About Page
app.get("/about", function (req, res) {
    res.render("pages/about");
})

app.post("/regist", function (req, res) {
    var frontName = req.body.frontName;
    var lastName = req.body.lastName;
    var email = req.body.email;
    var password = req.body.password;
    var newUser = {
        frontName: frontName,
        lastName: lastName,
        email: email,
        password: password
    }
    User.create(newUser, function (err, newCreated) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/");
        }
    });
});

app.get("/regist/data", function (req, res) {
    res.render("dashboard.ejs");
});
app.listen(8080);
console.log("The Plancong Server is activated");