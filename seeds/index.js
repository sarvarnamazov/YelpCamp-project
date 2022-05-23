if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const mongoose = require('mongoose');
const cities = require('./cities')
const { places, descriptors } = require('./seedHelpers')
const Campground = require('../models/campground')



const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/yelp-camp'



mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true
});


const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
});

const sample = array => array[Math.floor(Math.random() * array.length)]

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            // YOUR USER ID
            author: '6280f7a62e2e51ef75fea403',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus officiis excepturi dolorum! Fugit beatae autem expedita repellat necessitatibus quis, possimus ipsum atque vitae blanditiis vel quos recusandae, sunt deserunt!',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [

                // {
                //     url: 'https://res.cloudinary.com/dcrnsjlxv/image/upload/v1652533837/YelpCamp/ql7ysdbghwdvdjnb8nyc.jpg',
                //     filename: 'YelpCamp/ql7ysdbghwdvdjnb8nyc'
                // },
                {
                    url: 'https://res.cloudinary.com/dcrnsjlxv/image/upload/v1652533849/YelpCamp/kw2oipu3m26umojqods1.jpg',
                    filename: 'YelpCamp/kw2oipu3m26umojqods1'
                },
                {
                    url: 'https://res.cloudinary.com/dcrnsjlxv/image/upload/v1652533853/YelpCamp/i0ershuvt08w5n52px7y.jpg',
                    filename: 'YelpCamp/i0ershuvt08w5n52px7y'
                },
                {
                    url: 'https://res.cloudinary.com/dcrnsjlxv/image/upload/v1652533860/YelpCamp/iiupjqac54gcp6ybiubv.jpg',
                    filename: 'YelpCamp/iiupjqac54gcp6ybiubv'
                },
                {
                    url: 'https://res.cloudinary.com/dcrnsjlxv/image/upload/v1652533862/YelpCamp/vjjtbyhg0czfhaick1fr.jpg',
                    filename: 'YelpCamp/vjjtbyhg0czfhaick1fr'
                }

            ]
        })
        await camp.save()
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})