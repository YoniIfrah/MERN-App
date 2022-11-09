const Post = require('../models/post_model')

const getAllPosts = async (req, res, next) => {
    try {
        let posts = {}
        if (req.query.sender == null){
            posts = await Post.find()   
        } else {
            posts = await Post.find({'sender': req.query.sender})
        }
        posts = await Post.find()
        res.status(200).send(posts)
    } catch (error) {
        console.log("fail to get posts in db")
        res.status(400).send({ "error": error.message})
    }    
}

const addNewPost = async (req, res, next) => {
    console.log("this is the request body: ", req.body);

    const post = new Post({
        message:req.body.message,
        sender:req.body.sender
    })

    try {
        newPost = await post.save()
        console.log('save post in db')
        res.status(200).send(newPost)
    } catch (error) {
        console.log("fail to save post in db")
        res.status(400).send({ "error": error.message})
    }

} 

const getPostById = async (req, res, next) => {
    const id = req.params.id
    console.log('getPostById: ', id)
    if ( id == null | id == undefined ) {
        res.status(400).send({
            'status': 'fail',
            'message': 'null or undefined'
        })
    }
    try {
        const posts = await Post.findById(id)
        res.status(200).send(posts)

    } catch (error) {
        res.status(400).send({
            'status': 'fail',
            'message': error.message
        })
    }

}

const putPostById = async (req, res, next) => {
    const id = req.params.id
    console.log('putPostById: ', id)
    if ( id == null | id == undefined ) {
        res.status(400).send({
            'status': 'fail',
            'message': 'id is null or undefined',
        })
    }
    try {
        const posts = await Post.findByIdAndUpdate({'_id':id}, req.body).then(() =>{
            Post.findOne({'_id':id}).then((posts) =>{
                res.status(200).send(posts)
            })
        })

    } catch (error) {
        res.status(400).send({
            'status': 'fail',
            'message': error.message
        })
    }

}

module.exports = {getAllPosts, addNewPost, getPostById, putPostById}