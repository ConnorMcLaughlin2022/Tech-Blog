
const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const {User,Post} = require('../models');

router.get("/", (req,res) =>{
    User.findAll().then(userData=>{
        res.json(userData)
    }).catch(err=>{
        console.log(err);
        res.status(500).json({msg:"something went wrong..", err})
    })
})
router.post("/", (req,res)=>{
    console.log(req.body);
    User.create({
        email:req.body.email,
        password:req.body.password
    }).then(userData=>{
        res.json(userData)
    }).catch(err=>{
        console.log(err);    
        res.status(500).json({msg:"something went wrong.."})
    })
})


router.get("/:id", (req,res)=>{
    User.findByPk(req.params.id,{
        include:[Post]
    }).then(userData=>{
        res.json(userData)
    }).catch(err=>{
        console.log(err);
        res.status(500).json({msg:"something went wrong..", err})
    })
})

router.post("/login",(req,res)=>{
    User.findOne({
        where:{
            email:req.body.email
        }
    }).then(userData=>{
        if(!userData){
            return res.status(401).json({msg:"incorrect email or password"})
        }else{
            if(bcrypt.compareSync(req.body.password,userData.password)){  
                req.session.userId = userData.id;
                req.session.userEmail = userData.email;
                req.session.logged_in = true;
                return res.json(userData)
            }else{
                return res.status(401).json({msg:"incorrect email or password"})
            }
        }
    }).catch(err=>{
        console.log(err);
        res.status(500).json({msg:"something went wrong.."})
    })
});

router.post("/signup", (req,res)=>{
    console.log(req.body);
    User.create({
        email:req.body.email,
        password: req.body.password,
    }).then ((userData)=>{
        req.session.userId = userData.id;
        req.session.userEmail = userData.email;
        req.session.logged_in = true;
        res.json(userData);
    }).catch((err)=>{
        console.log(err);
        res.status(500).json({msg:err});
    });
});

router.delete("/logout", (req,res)=>{
    if (req.session) {
        req.session.destroy((err) => {
          if (err) {
            res.status(400).json({ msg: "Unable to log out" });
          } else {
            res.redirect("/");
          }
        });
      } else {
        res.end();
      }
    });

router.get("/profile")


module.exports = router;