const router = require("express").Router();
const User = require("../models/User")
const Post = require("../models/Post")
//Importing bcrypt pakage for making hash password
const bcrypt = require('bcrypt');
//REGISTER

//UPDATE USER
router.put("/:id", async (req,res) => {
    // comparing 
    if(req.body.userId === req.params.id) {
        // if password should be updated it should be hashed
        if(req.body.password){
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }
        try{
            // Updating
            const updatedUser = await User.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body,
                },
                { new : true}
            );
            res.status(200).json(updatedUser)
        } catch {
            res.status(500).json(err)
        } 
    } else {
        res.status(401).json("Please use your account")
    }

});

// DELETE
router.delete("/:id", async (req, res) =>{
     // comparing 
     if(req.body.userId === req.params.id) {
        try{
            const user = User.findById(req.params.is);
            try {
                await Post.deleteMany({username: user.username});
                await User.findByIdAndDelete(req.params.id);
                res.status(200).json("User is successfuly deleted!")
            } catch(err) {
                res.status(500).json(err);
            }
        
        } catch(err) {
            res.status(401).json("User not found");
        } 
    } else {
        res.status(401).json("Please use your account");
    }
});

//GET user

router.get("/:id", async (req, res)=> {
    try {
        const user = await User.findById(req.params.id)
        const {password, ...others} = user._doc
        res.status(200).json(others)
    } catch(err) {
        res.status(500).json(err)
    }
})




module.exports =router