const {randomBytes} = require("crypto")
const fastifyCors = require('@fastify/cors');
const fastify = require('fastify')({
    logger: true
});
const axios = require('axios')

fastify.register(fastifyCors, {
    origin: "*"
})

const commentsByPostId = {};

fastify.get('/posts/:id/comments', (req, reply) => {
    reply.code(201).send(commentsByPostId[req.params.id] || [])
})

fastify.post('/posts/:id/comments', async (req, reply) => {
    const commentId = randomBytes(4).toString('hex');
    const {content} = req.body;
    const allCommentsForPost = commentsByPostId[req.params.id] || [];
    allCommentsForPost.push({id: commentId, content});
    commentsByPostId[req.params.id] = allCommentsForPost;

    await axios.post('http://localhost:4005/events', {
        type: 'CommentCreated',
        data: {
            id: commentId,
            content,
            postID: req.params.id
        }
    })

    reply.code(201).send(allCommentsForPost)
})

fastify.post('/events', (req,res) => {
    console.log(`Event received of type ${req.body.type}`)
    res.send({status: 'OK'})
})

fastify.listen({port: 4001}, (err, address) => {
    if(err) {
        fastify.log.error(err);
        process.exit(1);
    }
})