const mongoose = require('mongoose')

async function  connectDB() {
    await mongoose.connect(process.env.MONGODB, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
    console.log('Connected to DataBase')
}

module.exports = connectDB