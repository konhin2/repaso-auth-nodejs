const User = require("./../models/User")
const bcryptjs = require("bcryptjs")

exports.getRegister = (req, res) => {
  res.render("authentication/signup")
}

exports.postRegister = async (req, res) => {
  // Get Data
  const {
    username,
    email,
    password
  } = req.body

  // Regex
  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/
  // Validation
  if (!username || !email || !password) {
    return res.render("authentication/signup", {
      msg: "Enter all fields"
    })
  } else if (!regex.test(password)) {
    return res.render("authentication/signup", {
      msg: "Please include password requirements, 6 chars, 1 number, 1 uppercase and 1 lowecase",
    })
  }

  try {
    // Encrypting
    const salt = await bcryptjs.genSalt(10); // Times of hashing
    const hashed = await bcryptjs.hash(password, salt); // Password Hashed

    // Create user
    const createdUser = await User.create({
      username,
      email,
      passwordHashed: hashed,
    })
    console.log(createdUser)
    res.redirect("/")

  } catch (e) {
    if(error instanceof mongoose.Error.ValidationError) {
      res.status(500).render('authentication/signup', {
        msg: 'Please enter a valid email'
      })
    } else if(error.code === 11000) {
      res.status(500).render('authentication/signup', {
        msg: 'Username or email already exists. Try another.'
    })
    }
  }
}