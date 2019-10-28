const express = require('express');
const db = require('./data/hubs-model.js');

const server = express(); 


server.use(express.json()); // teaches express how to read JSON

//request/route handlers

server.get('/', (req, res) => {
res.send('Hello Node server');
});

// GET to /hubs, returns list of hubs
server.get('/hubs', (req, res) => {
    db.find() // sim to axios.get
    .then(hubs => {
        res.status(200).json(hubs);
    })
    .catch(err => {
        res.json({error: 'failed to get hubs from db'})
    })
})

//POST to /hubs

server.post('/hubs', (req, res) => {
    const hubInformation = req.body;

    db.add(hubInformation)
    .then(hub => {
        res.status(201).json(hub);
    })
    .catch(err => {
        res.status(500).json({error: 'failed to add hub to db'})
    })
})

server.delete('/hubs/:id', (req, res) => {
    const id = req.params.id;

    db.remove(id).then(count => {
        res.status(200).json({Message: `hubs with id ${id} deleted`})
    })
    .catch(err => {
        res.status(500).json({error: 'failed to delete hub from db'})
    })
})


const port = 8000; // localhost:8000
server.listen(port, () => console.log('\n=== API on port 8000 ===\n'));