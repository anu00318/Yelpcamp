const mongoose = require('mongoose');
const cities = require('./cities');
const Campground = require('../models/campground');
const { places, descriptors } = require('./seedHelpers');
mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    // useNewUrlParser: true,
    // useCreateIndex: true,
    // useUnifiedTopology: true
});



const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '66a218c2cd2963a1fe1ddae2',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
            price,
            geometry: {
                type: "Point",
                coordinates: [cities[random1000].longitude,
            cities[random1000].latitude]
            },
            images: [{
                url: 'https://res.cloudinary.com/ditw3yolm/image/upload/v1722366099/Yelpcamp/iteaw9lj6bo0kxiqxaqo.jpg',
                filename: 'Yelpcamp/iteaw9lj6bo0kxiqxaqo',
            }
            ]

        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})