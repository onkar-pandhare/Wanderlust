const User=require('../models/user.js');

module.exports.renderSignupForm=(req,res)=>{
    res.render("users/signup.ejs");
}


module.exports.signup=async(req,res)=>{
    try{let {email,username,password}=req.body;
 const newuser=new User({email,username});
 const registereduser = await User.register(newuser,password);
 console.log(registereduser);
  req.login(registereduser,(err)=>{
    if(err){
        return next(err);
    }   
 req.flash("success","Welcome to Wonderlust");
    res.redirect("/listings");
});

 
}catch(e){
    req.flash("error",e.message);
    res.redirect("/signup");        
}
}


module.exports.renderLoginForm=(req,res)=>{
    res.render("users/login.ejs");
}

module.exports.login=async(req,res)=>{
    req.flash("success","Welcome back to Wonderlust");
    let redirectUrl=res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
}

module.exports.logout=(req,res)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","Logged out successfully");
        res.redirect("/listings");
    })
}