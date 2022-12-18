const User = require("../models/user");

// Render register controller
module.exports.renderRegister = (req, res) => {
  res.render("users/register");
};

// Register controller
module.exports.register = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const user = new User({ email, username });
    const newUser = await User.register(user, password);
    req.login(newUser, function (err) {
      if (err) {
        return next(err);
      }
      req.flash("success", "Welcome to YelpCamp!");
      res.redirect("/campgrounds");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/register");
  }
};

// Render login controller
module.exports.renderLogin = (req, res) => {
  res.render("users/login");
};

// Login controller
module.exports.login = (req, res) => {
  const { username } = req.body;
  req.flash("success", `Welcome back, ${username}!`);
  const redirectUrl = req.session.returnTo || "/campgrounds";
  res.redirect(redirectUrl);
  delete req.session.returnTo;
};

// Logout controller
module.exports.logout = (req, res) => {
  // need callback for express 0.6.0
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
  });
  req.flash("success", "Goodbye!");
  res.redirect("/campgrounds");
};
