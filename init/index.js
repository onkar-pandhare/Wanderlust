const mongoose=require('mongoose');
const initData=require("./data.js");
const Listing=require("../models/listing.js");

 main().then((res)=>{
    console.log('connected to database');
  }).catch((err)=>{
    console.log('error connecting to database');
  });
async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/wonderlust');
   
}

const initDB= async()=>{
   await Listing.deleteMany({});
   initData.data = initData.data.map((obj) => ({ ...obj, owner: '69e5e55d1f67954e57cae2c7' }));
   await Listing.insertMany(initData.data);
  console.log("data was initialized");
}

initDB();