const router = require("express").Router();
const User = require("../models/User")
const Post = require("../models/Post")

//CREATE POST
router.post("/", async (req, res) => {
    try {
        const newPost = new Post(req.body);
        const savedPost = await newPost.save()
        res.status(200).json(savedPost);
    } catch(err) {
        res.status(500).json(err)
    }
});

// UPDATING
router.put("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if(post.username === req.body.username) {
            try {
                const updatedPost = await Post.findByIdAndUpdate(
                    req.params.id,
                    {
                        $set: req.body
                    },
                    {new: true}
                )
                res.status(200).json(updatedPost)
            } catch(err) {
                res.status(500).json(err)
            }
        } else {
            res.status(401).json("You can only update your post!")
        }
    } catch(err) {
        res.status(500).json(err)
    }
});

//DELETE

router.delete("/:id", async (req, res)=>{
    try {
        const post = await Post.findById(req.params.id);
        if(post.username === req.body.username) {
            try {
                await post.delete();
                res.status(200).json("Post is deleted!");
            } catch(err){
                res.status(500).json(err);
            }
        } else {
            res.status(401).json("You can only delete your post!");
        }
    } catch(err) {
        res.status(500).json(err);
    }
});

// GET ONE POST

router.get("/:id", async (req,res) => {
    try {
        const post = await Post.findById(req.params.id)
        res.status(200).json(post);
    } catch(err) {
        res.status(500).json(err)
    }
});

// GET ALL POSTS(Node js request query)

router.get("/", async (req, res) => {
    const username = req.query.user;
    const catName = req.query.cat;
    try {
        let posts;
        if( username){
            posts = await Post.find({username:username})
        } else if (catName) {
            posts = await Post.find({
                $in: [catName],
            })
        } else {
            posts = await Post.find()
        }
        res.status(200).json(posts)
    } catch(err){
        res.status(500).json(err)
    }
})




module.exports =router