const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const posts = {}

app.use(bodyParser.json())

app.get('/posts', (req, res) => {
    console.log(posts)
    res.send(posts)
})

app.post('/events', (req, res) => {
    const type = req.body.type

    if(type === 'PostCreated') {
        const {id, title} = req.body.data
        posts[id] = {id, title, comments: []}
    }

    if(type === 'CommentCreated') {
    const {id, content, postID} = req.body.data
    const post = posts[postID]
    post.comments.push({id, content})
    }

    console.log(posts)
    res.send({status: 'OK'});
})


app.listen(4002, () => {
    console.log('Listening on port 4002')
})