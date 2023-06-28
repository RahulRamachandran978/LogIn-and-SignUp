var express = require("express");
var router = express.Router();

const credential = {
    username :"Rahul",
    password :123
}

router.get('/', (req, res) => {
    if(req.session.user){
        res.redirect('/dashboard')
    }else{
        res.render('base', { login: "login" });
    }
   
});
//login user
router.post('/login',(req,res)=>{
    if(req.body.username == credential.username && req.body.password == credential.password){
        req.session.user = req.body.username;

        if(req.session.user){
        res.redirect('/dashboard')
        }

    }else{
        res.render('base',{login:'sdfgh'})
    
    }
})
//route for dashboard
router.get('/dashboard',(req,res)=>{
    if(req.session.user){
        res.render('dashboard', { user: req.session.user });
    }else{
       res.redirect('/');
    }
})
router.get('/logout',(req,res)=>{
    req.session.destroy((err)=>{
        if(err){
            req.send("error")
        }else if(req.session){
            res.redirect('/dashboard')
        }else{
        res.render('base',{logout:"Logout successfuly"});
        }
    })
})
router.get('*',(req,res)=>{
    res.redirect('/');
})


module.exports = router;