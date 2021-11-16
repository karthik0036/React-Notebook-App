const mongoose = require('mongoose')
const mongooURL = "mongodb://localhost:27017/inotes?readPreference=primary&appname=MongoDB%20Compass&ssl=false"

const connectToMongo = () => {
    mongoose.connect(mongooURL, () => {
        console.log("Connected to mongo sucessfully")
    })
}

module.exports = connectToMongo