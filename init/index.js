const mongoose = require('mongoose');
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const dbURL = "url";

main().then(() => {
    console.log('connected to database');
}).catch((err) => {
    console.log('error connecting to database', err);
});

async function main() {
    await mongoose.connect(dbURL);
}

const initDB = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({ 
        ...obj, 
        owner: '69ea17aad4fe30e4e41e69a0'
    }));
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
    mongoose.connection.close();
}

initDB();