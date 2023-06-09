const express =require('express');
const jwt = require('jsonwebtoken');
const app = express();
const secert ="pradeeptechnical";


app.get('/',(req,res)=>{
    res.json({
        message:"Sample API"
    });
})


app.post('/user',(req,res)=>{
    const user={
        id:'335345345',
        name: "Pradeep",
        username:"pradeeptechnical",
        email:'pradeep@technical.com'
    }
    jwt.sign({user}, secert, { expiresIn:'300s'},(err,token)=>{
        res.json({
            user:user,
            token
        });
    });
});

app.post('/profile',verifyToken,(req,res)=>{
    try{
        jwt.verify(req.token,secert, (err,authdata)=>{
            if(err){
                res.send({message:"Result With Invalid Token"})
            }else{
                res.json({
                    status: true,
                    message:"Your Token is Valid",
                    autData:authdata
                });
            }
        })
    }catch(err){
        res.send({
            status:false,
            message:"Token Expired"
        })
    }
});



function verifyToken(req,res,next){
    const beaererHeaders = req.headers['authorization'];
    if(typeof beaererHeaders!==undefined){
        const bearer = beaererHeaders.split(" ");
        const token  = bearer[1]; 
        req.token = token;
        next();
    }else{
        res.json({
            result: "Token is not valid"
        })
    }
}





app.listen(5000,()=>{
   console.log("Your Server is listin to port 5000");
});


