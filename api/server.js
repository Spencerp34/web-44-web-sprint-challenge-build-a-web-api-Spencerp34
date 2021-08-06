const express = require('express')
const helmet = require('helmet')
const actionsRouter = require('./actions/actions-router')
const projectsRouter = require('./projects/projects-router')

const server =express()

server.use(express.json())
server.use(helmet())
server.use('/api/actions', actionsRouter)
server.use('/api/projects', projectsRouter)

server.get('/', (req, res) => {
    res.send(`
        <h1>Welcome to my api!</h1>
    `)
})

server.use('*', (req, res) =>{
    res.json({message: 'Something aint right about what you just asked for...'})
})


module.exports = server;
