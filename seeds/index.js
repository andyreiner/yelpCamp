const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

main().catch((err) => console.log(err));
async function main() {
  await mongoose
    .connect("mongodb://127.0.0.1:27017/yelp-camp")
    .then(() => {
      console.log("Mongo connection open...");
    })
    .catch((err) => {
      console.log("---- Connection error to Mongo!-----");
      console.log(err);
    });
}

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => {
  console.log("Database connected...");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20 + 10);
    const camp = new Campground({
      author: "639d34c839f734bf861e9419",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero repudiandae incidunt quos in, vitae, ex fuga autem reprehenderit dolore odit labore saepe quam ullam, qui dolorum? Aliquam, quos animi? Itaque.",
      price: price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      images: [
        {
          url: "https://res.cloudinary.com/dzodcoe0t/image/upload/v1671281281/YelpCamp/j7wzrgdmuuvypjfubink.jpg",
          filename: "YelpCamp/j7wzrgdmuuvypjfubink",
        },
        {
          url: "https://res.cloudinary.com/dzodcoe0t/image/upload/v1671281282/YelpCamp/feplfvpajtmrvcs1uwdn.jpg",
          filename: "YelpCamp/feplfvpajtmrvcs1uwdn",
        },
        {
          url: "https://res.cloudinary.com/dzodcoe0t/image/upload/v1671281282/YelpCamp/a6xdkjjmko2mv4cpkjlw.jpg",
          filename: "YelpCamp/a6xdkjjmko2mv4cpkjlw",
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
