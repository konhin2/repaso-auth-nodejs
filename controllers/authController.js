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
    res.status(500).render('authentication/signup', {
      msg: 'Something happens'
    })
  }
}

exports.getLogin = async (req, res) => {
  res.render('authentication/login')
}

exports.postLogin = async (req, res) => {
  // Get Data
  const { email, password } = req.body

  // Find user
  try {
    const findUser = await User.findOne({ email })
    if (!findUser){
      return res.render('authentication/login', {
        msg: 'No coincidences'
      })
    }
    
    // Check password
    const checkPassword = await bcryptjs.compareSync(password, findUser.passwordHashed)
    if (!checkPassword ) {
      return res.render('authentication/login', {
        msg: 'Wrong email or password'
      })
    }
    req.session.currentUser = {
      _id: findUser._id,
      username: findUser.username,
      email: findUser.email,
      msg: 'We did it',
    }
    // Redirection
    res.redirect('/users/profile')
    
  } catch (error) {
    console.log(error)
  }
}

exports.postLogout = async (req, res) => {
  res.clearCookie('session-token')
  req.session.destroy(err => {
		if(err){
			console.log(err)
		}
		res.redirect("/")
	})
}