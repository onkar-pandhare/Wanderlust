if(process.env.NODE_ENV!=="production"){
    require('dotenv').config();
}




//express setup
const express=require('express');
const app=express();
const wrapAsync=require("./utils/wrapAsync.js");
const ExpressError=require("./utils/ExpressError.js");
const session=require('express-session');
const {MongoStore} = require('connect-mongo');
const flash=require('connect-flash');
const passport=require('passport');
const LocalStrategy=require('passport-local');
const User=require('./models/user.js');


//ejs setup
let ejs=require('ejs');
app.set('view engine','ejs');
const path=require('path');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
const ejsMate=require("ejs-mate");
app.engine("ejs",ejsMate);

//body parser setup
app.use(express.urlencoded({extended:true}));



//method override setup
const methodOverride=require('method-override');
app.use(methodOverride('_method')); 

//joi setup
const { listingSchema,reviewSchema } = require('./schema.js');
const Reviews=require("./models/review.js");

//router setup
const listingRouter=require("./routes/listing.js");
const reviewRouter=require("./routes/review.js");
const userRouter=require("./routes/user.js");

//mongoose setup

const dbURL=process.env.ATLAS_URL;
const mongoose=require('mongoose');
const Listing=require("./models/listing.js");
  main().then((res)=>{
    console.log('connected to database');
  }).catch((err)=>{
    console.log('error connecting to database');
  });
async function main(){
    await mongoose.connect(dbURL);
   
}



const store=MongoStore.create({
    mongoUrl:dbURL,
    crypto:{
        secret:process.env.SESSION_SECRET
    },
    touchAfter:24*60*60
});
store.on("error",function(e){
    console.log("Error in session store",e);
});


//session setup
const sessionConfig={
    store,
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:true, 
    cookie :{
        httpOnly:true,
        expires:Date.now()+1000*60*60*24*7,
        maxAge:1000*60*60*24*7
    } 
};


app.get('/', (req, res) => {
    res.redirect('/listings');
});



app.use(session(sessionConfig));
app.use(flash());

//passport setup
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.get('/',(req,res)=>{
    res.send("Hello i am  root");
});

app.use((req,res,next)=>{
  res.locals.success = req.flash("success");  
   res.locals.error = req.flash("error");  
   res.locals.currUser=req.user;
  next();
});



app.get("/demouser",async(req,res)=>{
    let fakeuser=new User({
        email:"demouser@example.com",
        username:"demouser"
    });
      let registeredUser=await User.register(fakeuser,"demopassword");
      res.send(registeredUser);
    });

//routes setup

app.use("/listings",listingRouter);
app.use("/listings/:id/reviews",reviewRouter);
app.use("/",userRouter);





app.all("*path", (req, res, next) => {
    next(new ExpressError(404,"Page Not Found"));
});

app.use((err,req,res,next)=>{
 let {statusCode=500,message="Internal Server Error"}=err;
 res.status(statusCode).render("Error.ejs",{err});
//  res.status(statusCode).send(message);
});

app.listen(8080,(req,res)=>{
    console.log('server is running on port 8080');
})
