const { randomBytes } = require('crypto');
const fastifyCors = require('@fastify/cors');
const axios = require('axios')

const fastify = require('fastify')({
    logger: true
});

fastify.register(fastifyCors, {
    origin: "*"
})

const posts = {}


fastify.get('/posts', (req, reply) => {
    reply.send(posts);
})

fastify.post('/posts', async (req, reply) => {
    const id = randomBytes(4).toString('hex')
    const { title } = req.body;

    posts[id] = {id, title};
    await axios.post('http://localhost:4005/events', {
        type: 'PostCreated',
        data: {
            id,
            title
        }
    })
    reply.code(201).send(posts[id]);
})

fastify.post('/events', (req,res) => {
    console.log(`Event received of type ${req.body.type}`)
    res.send({status: 'OK'})
})

fastify.listen({port: 4000}, (err, address) => {
    if(err) {
        fastify.log.error(err);
        process.exit(1)
    }
})
